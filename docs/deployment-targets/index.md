---
title: Deployment targets
position: 5
---


Now that you have packaged your application, you need something to deploy it to. The destination might be a Windows server, or an Azure web application, or a Linux server running SSH. In Octopus, each of these destinations are called *Deployment Targets*.


Deployment targets are added to an environment from the Environments page.


![](/docs/images/3048059/3277592.png)


A deployment target can be one of the following types:

- [Listening Tentacle](/docs/home/deployment-targets.md)
- [Polling Tentacle](/docs/home/deployment-targets.md)
- [Offline Package Drop](/docs/home/deployment-targets.md)
- [SSH Connection](/docs/home/deployment-targets.md)
- [Cloud Region](/docs/home/deployment-targets.md)



![](/docs/images/3048059/5865591.png)




## Listening Tentacle 


A [Listening Tentacle](/docs/home/installation/installing-tentacles/listening-tentacles.md) is a machine with the Tentacle service installed in *listening* mode.

## Polling Tentacle 


A [Polling Tentacle](/docs/home/installation/installing-tentacles/polling-tentacles.md) is a machine with Tentacle service installed in *polling* mode.

## Offline Package Drop 


An [Offline Package Drop](/docs/home/deployment-targets/offline-package-drop.md) target is designed to allow deploying to a machine which the Octopus Deploy server cannot communicate with; for example, due to security policy or network topology.

## SSH Connection 


Currently, the Tentacle service can only be installed servers running Microsoft Windows. An [SSH Connection](/docs/home/deployment-targets/ssh-targets.md) target allows deployment to Linux machines.

## Cloud Region


A [Cloud Region](/docs/home/deployment-targets/cloud-regions.md) is a way to model multi-region deployments as a way to replace the deprecated Azure Web App and Azure Cloud Service targets.

## Azure Web App 

:::warning
Azure Cloud Service deployment targets have been deprecated in Octopus 3.1. Don't worry - you can migrate your Azure Targets to use the equivalent Azure Steps by following [this guide](/docs/home/how-to/migrate-azure-targets-into-azure-steps.md).
:::

## Azure Cloud Service 

:::warning
Azure Web App deployment targets have been deprecated in Octopus 3.1. Don't worry - you can migrate your Azure Targets to use the equivalent Azure Steps by following [this guide](/docs/home/how-to/migrate-azure-targets-into-azure-steps.md).
:::
