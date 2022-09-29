import { STS } from 'aws-sdk';
import { env } from './env';
import { ulid } from 'ulid';

export async function assumeRole(tenant: string, roleArn: string) {
  const client = new STS({ region: env.REGION });

  const roleSessionName = `${tenant}-${ulid()}`;
  
  const { Credentials: creds } = await client
    .assumeRole({
      RoleSessionName: roleSessionName,
      RoleArn: roleArn,
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
