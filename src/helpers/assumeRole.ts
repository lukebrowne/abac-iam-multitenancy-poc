import { STS } from 'aws-sdk';
import { env } from './env';

export async function assumeRole(tenant: string) {
  const client = new STS({ region: env.REGION });

  const { Credentials: creds } = await client
    .assumeRole({
      RoleSessionName: 'luke',
      RoleArn: env.ADVICE_TABLE_ACCESS_ROLE_ARN,
      Tags: [
        {
          Key: 'Tenant',
          Value: tenant,
        },
      ],
    })
    .promise();

  return creds as STS.Credentials;
}
