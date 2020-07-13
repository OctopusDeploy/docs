---
title: Runbooks vs deployments
description: Dexribing the diffrences between a deployment and a runbook
position: 10
---

For users familiar with Octopus prior to the introduction of Operations Runbooks, an obvious question may be _how are runbooks different to a deployment process?_  They are similar in many ways: a runbook process is a series of steps, which can reference packages and variables. The key differences are:

- No release needs to be created to execute a runbook.
- Lifecycles do not apply to runbooks.
- Runbook executions are not displayed on the deployment dashboards.
- Many runbooks can live in the same project, along with a deployment process.
- Runbooks have different roles and permissions to deployments.

## Variables

A [project's variables](/docs/projects/variables/index.md) are shared between the deployment process and any runbooks in the project (though specific values can be scoped exclusively to specific runbooks or to the deployment process). This means the following configurations can be shared between your deployment process and runbooks:
- Database connection strings
- Passwords
- Certificates
- Accounts

### Current limitations

**Scoping to Steps/Actions**
- You cannot currently scope project variables to a deployment process step and a runbook process step, but we do aim to support this in the near future.


## Environments

Runbooks can be executed against any environment for which the user has an appropriately scoped `RunbookRun` permission.

Lifecycles do not apply to runbooks (only deployments).