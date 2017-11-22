---
title: Deployment Targets
description: Configure your infrastructure so Octopus can deploy software to your Windows servers, Linux servers, or Cloud Regions.
position: 3
---

Deployment targets are the machines and services that your [packaged software](docs/packaging-applications/index.md) is deployed to. These deployment targets could be Windows servers, Linux servers, Cloud Regions, or an offline package drop.

Octopus organizes your infrastructure (those deployment targets) into groups called environments. Typical examples of environments are **Test**, **Staging**, and **Production**.  Grouping deployment targets in this way lets you define your deployment processes (no matter how many machines are involved) and have Octopus deploy the right versions of your software to the right environments at the right time. 

Learn how to configure and manage your [environments](/docs/deployment-targets/environments/index.md).

Octopus also uses roles to further refine which software is deployed to which deployment targets in each environment. This is useful when you have a different number of deployment targets in different environment.

Learn more about [machine roles](/docs/deployment-targets/machine-roles/index.md).

The process for configuring deployment targets depends on the type of target being configured:
## Windows Targets

For Windows systems, we have tentacles. Tentacles are a secure, lightweight agent service that Octopus uses to deploy software to your Windows infrastructure. Tentacles can configured in [listening mode](/docs/deployment-targets/windows-targets/listening-tentacles.md)  or [polling mode](/docs/deployment-targets/windows-targets/polling-tentacles.md) .

Learn more about installing and configuring [Tentacles](/docs/deployment-targets/windows-targets/index.md) .

## Linux Targets

For Linux and Unix systems, you can configure Octopus Deploy to communicate with your deployment targets through [SSH](/docs/deployment-targets/ssh-targets/index.md).

## Cloud Region

A [Cloud Region](/docs/deployment-targets/cloud-regions.md) is a way to model multi-region deployments as a way to replace the deprecated Azure Web App and Azure Cloud Service targets.

:::warning
Azure Web App and Azure Cloud Service deployment targets were deprecated in Octopus 3.1. If you need to migrate your Azure Targets to use the equivalent Azure steps, following [this guide](/docs/how-to/migrate-azure-targets-into-azure-steps.md).
:::

## Offline Package Drop

For scenarios where it is not possible to connect directly with the deployment target, Octopus can be configured to bundle all of the files needed to perform the deployment on the target server. These bundles can be copied directly to the deployment target to execute the deployment.

Learn more about [Offline Package Drops](/docs/deployment-targets/offline-package-drop.md).
