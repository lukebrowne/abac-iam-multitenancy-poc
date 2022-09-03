# abac-iam-multitenancy-poc

## Context

This is somewhere that I'm trying out the Attribute Based Access Control (ABAC) pattern
for facilitating multi-tenancy as described [here](https://aws.amazon.com/blogs/security/how-to-implement-saas-tenant-isolation-with-abac-and-aws-iam/).

The TL;DR of this is approach is parameterising IAM roles to include a tenant id.
As an example, a JWT is used to read the tenant id parameter of the actor, this is used
to set a session tag in AWS STS, which is then injected into an IAM role that's assumed
dynamically by a Lambda function. The approach is outlined really well in the blog post
above.

I'm working on this to propose a new approach for work (Wealth Wizards), but saw no reason
to not work in public on this.
