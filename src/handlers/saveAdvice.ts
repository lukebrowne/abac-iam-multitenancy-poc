import middy from '@middy/core';
import validator from '@middy/validator';
import bodyParser from '@middy/http-json-body-parser';
import responseSerialiser from '@middy/http-response-serializer';
import errorHandler from '@middy/http-error-handler';
import { serializers } from '../serializers';
import type { Event } from '../types';
import { createPutAdvice } from '../helpers/putAdvice';
import { assumeRole } from '../helpers/assumeRole';
import { STS } from 'aws-sdk';

interface Body {
  monthlyPensionContributions: number;
}

async function saveAdvice(event: Event<Body>) {
  const creds = await assumeRole('turo');

  const putAdvice = createPutAdvice('turo', creds);

  const advice = await putAdvice(event.body);

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
  .use(bodyParser())
  .use(validator(schema))
  .use(responseSerialiser(serializers))
  .use(errorHandler());
