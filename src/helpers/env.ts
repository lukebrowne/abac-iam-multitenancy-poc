import * as envalid from 'envalid';

export const env = envalid.cleanEnv(process.env, {
  REGION: envalid.str(),
  ADVICE_TABLE: envalid.str(),
  ADVICE_TABLE_ACCESS_ROLE_ARN: envalid.str(),
});
