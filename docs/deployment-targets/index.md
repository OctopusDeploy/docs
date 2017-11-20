---
title: Deployment Targets
description: Configure your infrastructure so Octopus can deploy software to your Windows servers, Linux servers, or Azure cloud services.
position: 3
---


Now that you have packaged your application, you need something to deploy it to. The destination might be a Windows server, or an Azure web application, or a Linux server running SSH. In Octopus, each of these destinations are called *Deployment Targets*.

Before you can add deployments targets, you need to set up Environments.

Learn about [Environments](/docs/deployment-targets/environments/index.md).

Deployment targets are added to an environment from the Environments page.

![](/docs/images/3048059/3277592.png "width=500")

A deployment target can be one of the following types:

!toc

![](/docs/images/3048059/5865591.png "width=500")

## Listening Tentacle  {#Deploymenttargets-ListeningTentacleListeningTentacle}

A [Listening Tentacle](/docs/deployment-targets/windows-targets/listening-tentacles.md) is a machine with the Tentacle service installed in *listening* mode.

## Polling Tentacle  {#Deploymenttargets-PollingTentaclePollingTentacle}

A [Polling Tentacle](/docs/deployment-targets/windows-targets/polling-tentacles.md) is a machine with Tentacle service installed in *polling* mode.

## Offline Package Drop  {#Deploymenttargets-OfflinePackageDropOfflinePackageDrop}

An [Offline Package Drop](/docs/deployment-targets/offline-package-drop.md) target is designed to allow deploying to a machine which the Octopus Deploy server cannot communicate with; for example, due to security policy or network topology.

## SSH Connection  {#Deploymenttargets-SSHConnectionSSHConnection}

Currently, the Tentacle service can only be installed servers running Microsoft Windows. An [SSH Connection](/docs/deployment-targets/ssh-targets/index.md) target allows deployment to Linux machines.

## Cloud Region {#Deploymenttargets-CloudRegion}

A [Cloud Region](/docs/deployment-targets/cloud-regions.md) is a way to model multi-region deployments as a way to replace the deprecated Azure Web App and Azure Cloud Service targets.

## Azure Web App  {#Deploymenttargets-AzureWebAppAzureWebApp}

:::warning
Azure Cloud Service deployment targets have been deprecated in Octopus 3.1. Don't worry - you can migrate your Azure Targets to use the equivalent Azure Steps by following [this guide](/docs/how-to/migrate-azure-targets-into-azure-steps.md).
:::

## Azure Cloud Service  {#Deploymenttargets-AzureCloudServiceAzureCloudService}

:::warning
Azure Web App deployment targets have been deprecated in Octopus 3.1. Don't worry - you can migrate your Azure Targets to use the equivalent Azure Steps by following [this guide](/docs/how-to/migrate-azure-targets-into-azure-steps.md).
:::
