---
title: Infrastructure
description: Configure your infrastructure so Octopus Deploy can deploy software to your Windows servers, Linux servers, Microsoft Azure, AWS, an offline package drop, or Cloud Regions.
position: 2
---

## Deployment Targets

With Octopus Deploy you can deploy software to Windows servers, Linux servers, Microsoft Azure, AWS, an offline package drop, or cloud regions, or Kubernetes. These machines and services are your *deployment targets*, and because software is typically deployed to more than one machine (or deployment target) Octopus organizes your deployment targets into groups called [environments](/docs/infrastructure/environments/index.md). Typical environments are **Development**, **Test**, and **Production**.

You can manage your environments and deployment targets from the **Infrastructure** tab of the **Octopus Web Portal**.

## Adding Accounts

You need to set up accounts for certain deployment targets before you can use them:

- [Azure Subscriptions](/docs/azure/index.md)
- [Amazon Web Services Accounts](/docs/infrastructure/aws/index.md)
- [SSH Key Pairs](/docs/infrastructure/ssh-targets/ssh-key-pair.md)
- [Username/Passwords](/docs/infrastructure/ssh-targets/username-and-password.md)
- Tokens

## Adding Deployment Targets to Environments

Deployment targets are added to environments in different ways, depending on the type of target and how they will communicate with the Octopus Deploy Server.

- Listening and Polling [Tentacles](/docs/infrastructure/windows-targets/index.md)
- [SSH Connection](/docs/infrastructure/ssh-targets/index.md)
- [Offline Package Drop](/docs/infrastructure/offline-package-drop.md)
- [Azure Web App](/docs/infrastructure/azure/web-app-targets/index.md)
- [Azure Cloud Service](/docs/infrastructure/azure/cloud-service-targets/index.md)
- [Azure Service Fabric Cluster](/docs/infrastructure/azure/service-fabric-cluster-targets/index/md)
- Kubernetes (Currently in beta)
- [Cloud Regions](/docs/infrastructure/cloud-regions.md)

## Workers

Octopus comes with a [built-in worker](/docs/administration/workers/built-in-worker.md) that can run scripts and perform tasks that don't run on deployment targets. You can configure [external workers](/docs/infrastructure/workers/index.md) and pools of workers to move these tasks off the Octopus Server for better performance and increased security.
