export const serializers = {
  serializers: [
    {
      regex: /^application\/json$/,
      serializer: ({ body }) => JSON.stringify(body),
    },
  ],
  default: 'application/json',
};
