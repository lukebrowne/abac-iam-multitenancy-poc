import middy from '@middy/core';
import validator from '@middy/validator';
import bodyParser from '@middy/http-json-body-parser';
import headerNormaliser from '@middy/http-header-normalizer';
import responseSerialiser from '@middy/http-response-serializer';
import errorHandler from '@middy/http-error-handler';
import { serializers } from '../serializers';
import type { Event } from '../types';
import { putAdvice } from '../helpers/putAdvice';
import { iamMultiTenancy } from '../helpers/iamMultiTenancy';
import { env } from '../helpers/env';

interface Body {
  monthlyPensionContributions: number;
}

async function saveAdvice(event: Event<Body>) {
  const tenant = event.headers?.['x-tenant-id'] as string;

  const advice = await putAdvice(tenant, event.body);

  console.log('Put advice');

  return {
    statusCode: 200,
    body: advice,
  };
}

const schema = {
  inputSchema: {
    type: 'object',
    required: ['body'],
    properties: {
      body: {
        type: 'object',
        required: ['monthlyPensionContributions'],
        properties: {
          monthlyPensionContributions: { type: 'number' },
        },
      },
    },
  },
};

export default middy(saveAdvice)
  .use(headerNormaliser())
  .use(iamMultiTenancy(env.ADVICE_TABLE_ACCESS_ROLE_ARN))
  .use(bodyParser())
  .use(validator(schema))
  .use(responseSerialiser(serializers))
  .use(errorHandler());
