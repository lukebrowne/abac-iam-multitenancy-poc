# abac-iam-multitenancy-poc

## Context

This is somewhere that I'm trying out the Attribute Based Access Control (ABAC) pattern
for facilitating multi-tenancy as described [here](https://aws.amazon.com/blogs/security/how-to-implement-saas-tenant-isolation-with-abac-and-aws-iam/).

The TL;DR of this is approach is parameterising IAM roles to include a tenant id.
As an example, a JWT is used to read the tenant id parameter of the actor, this is used
to set a session tag in AWS STS, which is then injected into an IAM role that's assumed
dynamically by a Lambda function. The approach is outlined really well in the blog post
above.

I'm working on this to propose a new approach for work ([Wealth Wizards](https://github.com/WealthWizardsEngineering)), but saw no reason
to not work in public on this.

I would like the output of this to be a proposal on how we could approach multitenancy.
To the end of making the platform easy to adopt, we have an ambition of the platform
being as easy to signing up for a Netflix subscription.

## Plan

- [x] Try setting STS session tag based on JWT
- [x] Try using session tag in a parameterised IAM policy
- [ ] Try to use seperate DynamoDB tables
- [ ] Try using a unified DynamoDB table, with IAM policy containing partition key restrictions
- [ ] Evaluate options to ensure we fail safe, or ways to have assurance we won't fail\*

\* Goal is to not be reliant on well behaved code to respect boundaries, or have a automated assurance
