---
title: Infrastructure
description: Configure your infrastructure so Octopus Deploy can deploy software to your Windows servers, Linux servers, Microsoft Azure, an offline package drop, or Cloud Regions.
position: 2
---

With Octopus Deploy you can deploy software to Windows servers, Linux servers, Microsoft Azure, AWS, an offline package drop, or cloud regions. These machines and services are your *deployment targets*, and because software is typically deployed to more than one machine (or deployment target) Octopus organizes your deployment targets into groups called [environments](/docs/infrastructure/environments/index.md). Typical environments are **Development**, **Test**, and **Production**.

Your environments and deployment targets are managed from the **Infrastructure** tab of the **Octopus Web Portal**.

## Lifecycles

After you've configured your environments, you can define [lifecycles](/docs/infrastructure/lifecycles/index.md) that specify how your software is promoted through your environments, and which projects are associated with which environments.

Learn more about [Lifecycles](/docs/infrastructure/lifecycles/index.md).

## Adding Deployment Targets to Environments

Deployment targets are added to environments in different ways, depending on the type of target and how they will communicate with the Octopus Deploy Server.

- [Tentacles on Windows targets in listening mode](/docs/infrastructure/windows-targets/listening-tentacles/index.md)
- [Tentacles on Windows targets in polling mode](/docs/infrastructure/windows-targets/polling-tentacles/index.md)
- [SSH targets](/docs/infrastructure/ssh-targets/index.md)
- [AWS targets](/docs/infrastructure/aws/index.md)
- [Azure targets](/docs/infrastructure/azure/index.md)
