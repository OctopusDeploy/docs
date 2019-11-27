---
title: Deployment Process
description: Your deployment process is the steps the deployment automation server will take to deploy your software.
---

The deployment process is the steps the Octopus Deploy server orchestrates to deploy your software.

You define your deployment processes by creating [projects](/docs/deployment-process/projects/index.md) and then adding [steps](/docs/deployment-process/steps/index.md) to the project. Each step contains a specific action (or set of actions) that is executed as part of the deployment process each time your software is deployed.

Octopus comes with over 300+ built-in and [community-contributed steps](/docs/deployment-process/steps/index.md) templates for deploying just about anything.

After the initial setup, your deployment process shouldn't change between deployments even though the software being deployed will change as part of the development process, however, you can continue to add and edit steps as your process evolves or your infrastructure changes.

Learn more about managing your [deployment processes](/docs/deployment-process/index.md).

## See Also

- [Projects](/docs/deployment-process/projects/index.md).
- [Steps](/docs/deployment-process/steps/index.md)
