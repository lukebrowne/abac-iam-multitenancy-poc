import { DynamoDB, STS } from 'aws-sdk';
import { env } from '../helpers/env';
import { ulid } from 'ulid';

interface Advice {
  monthlyPensionContributions: number;
}

export const createPutAdvice =
  (tenant: string, creds: STS.Credentials) => async (advice: Advice) => {
    const client = new DynamoDB.DocumentClient({
      region: env.REGION,
      accessKeyId: creds.AccessKeyId,
      secretAccessKey: creds.SecretAccessKey,
      sessionToken: creds.SessionToken,
    });

    const date = new Date();
    const createdAt = date.toISOString();
    const id = ulid(date.getTime());

    await client
      .put({
        TableName: env.ADVICE_TABLE,
        Item: {
          ...advice,
          PK: `Tenant:${tenant}|Advice:${id}`,
          SK: `Pension:${createdAt}`,
        },
      })
      .promise();

    return {
      id,
      ...advice,
    };
  };
