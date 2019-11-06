---
title: Variables
description: Octopus allows you to define variables and scope them for use in different phases of your deployments.
---

Octopus uses variables so you can use the same [deployment process](/docs/octopus-concepts/deployment-process.md) across your different [infrastructure](/docs/octopus-concepts/infrastructure.md) without having to manually update the configuration settings for the different [environments](/docs/octopus-concepts/environments.md), for instance, changing the connection string from the test database to the production database when a [release](/docs/octopus-concepts/releases.md) has been promoted to production.

Octopus achieves this by allowing you to define scopes for your variables. The following scopes are supported in Octopus:

- Environments (most common).
- Deployment targets.
- Target roles.
- Deployment steps.
- Channels.
- Tenants.

You can define Octopus Library Variable Sets so that you can define variables that are used with multiple [projects](/docs/octopus-concepts/projects.md).

You can use variables to store your secrets securely, and you can use prompted variables if the value of a variable won't be known until deployment time. You can use system variables in your deployment process and capture the results of a command with output variables.

## See also

- [Variables](/docs/deployment-process/variables/index.md).
- [Library Variable Sets](/docs/deployment-process/variables/library-variable-sets.md).
- [Output Variables](/docs/deployment-process/variables/output-variables.md).
- [Prompted Variables](/docs/deployment-process/variables/prompted-variables.md).
- [Sensitive Variables](/docs/deployment-process/variables/sensitive-variables.md).
- [System Variables](/docs/deployment-process/variables/output-variables.md).
