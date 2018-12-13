---
title: Deployment Targets
description: How to configure deployment targets in Octopus
position: 20
hideInThisSection: True
---

Deployment targets are the servers and services you deploy your software to. You can manage your deployment targets by navigating to {{Infrastructure,Deployment Targets}} in the Octopus Web Portal.

From The Deployment Targets tab you can add new deployment targets, disable or delete deployment targets, check on the status of your targets, and run health checks.

## Adding Deployment Targets

Deployment targets are added in different ways, depending on the type of target you are adding and how the target will communicate with the Octopus Deploy server. For instructions, see:

- [Listening and Polling Windows Tentacles](/docs/infrastructure/deployment-targets/windows-targets/index.md)
- [SSH Connection](/docs/infrastructure/deployment-targets/ssh-targets/index.md)
- [Azure Web App](/docs/infrastructure/deployment-targets/azure/web-app-targets/index.md)
- [Azure Cloud Service](/docs/infrastructure/deployment-targets/azure/cloud-service-targets/index.md)
- [Azure Service Fabric Cluster](/docs/infrastructure/deployment-targets/azure/service-fabric-cluster-targets/index.md)
- [Kubernetes Cluster](/docs/infrastructure/deployment-targets/kubernetes-cluster.md)
- [Offline Package Drop](/docs/infrastructure/deployment-targets/offline-package-drop.md)
- [Cloud Regions](/docs/infrastructure/deployment-targets/cloud-regions.md)

## Target Roles

The deployment targets that you add must have at least one target role assigned to them.

Learn about [target roles](/docs/infrastructure/Deployment-targets/target-roles/index.md)

## Dynamic Infrastructure

You can use scripts to create Azure Service Principal Accounts, Azure Web Apps, Azure Service Fabric, Azure Cloud Services and Kubernetes targets.

Learn about [Managing resources with scripts](/docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md).
