import { MiddlewareObj } from "@middy/core";
import * as jwt from 'jsonwebtoken';
import HttpError from 'http-errors';
import type { Event } from '../types';
import { assumeRole } from "./assumeRole";
import * as AWS from 'aws-sdk';

export const iamMultiTenancy = (roleArn: string): MiddlewareObj<Event<unknown>> => ({
  before: async (request) => {
    const [scheme, token] = request.event.headers.authorization?.split(' ') as string[];

    const { 'cognito:groups': groups } = jwt.decode(token);

    const tenant = request.event.headers['x-tenant-id'];

    if (tenant === undefined || !groups.includes(tenant)) {
      throw new HttpError.BadRequest('`x-tenant-id` header was not found in user groups');
    }

    const credentials = await assumeRole(tenant, roleArn);

    AWS.config.update({
      credentials: {
        accessKeyId: credentials.AccessKeyId,
        secretAccessKey: credentials.SecretAccessKey,
        sessionToken: credentials.SessionToken
      }
    });
  },
  after: async () => {
    AWS.config.update({ credentials: null });
  }
});
