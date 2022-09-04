import type { APIGatewayEvent } from 'aws-lambda';

export type Event<TBody> = Omit<APIGatewayEvent, 'body'> &
  Record<'body', TBody>;
