---
title: Deployment Targets
description: How to configure deployment targets in Octopus
position: 1
hideInThisSection: True
---

Deployment targets are the servers and services you deploy your software to. You can manage your deployment targets by navigating to {{Infrastructure,Deployment Targets}}.

From here you can add new deployment targets, disable or delete deployment targets, check on the status of your targets, and run [health checks](/docs/infrastructure/machine-policies.md#health-checks) on them.

## Adding Deployment Targets

Deployment targets are added in different ways, depending on the type of target and how they will communicate with the Octopus Deploy Server. For instructions, see:

- [Listening and Polling Windows Tentacles](/docs/deployment-targets/infrastructure/windows-targets/index.md)
- [SSH Connection](/docs/deployment-targets/infrastructure/ssh-targets/index.md)
- [Azure Web App](/docs/deployment-targets/infrastructure/azure/web-app-targets/index.md)
- [Azure Cloud Service](/docs/deployment-targets/infrastructure/azure/cloud-service-targets/index.md)
- [Azure Service Fabric Cluster](/docs/deployment-targets/infrastructure/azure/service-fabric-cluster-targets/index.md)
- Kubernetes Clusters
- [Offline Package Drop](/docs/deployment-targets/infrastructure/offline-package-drop.md)
- [Cloud Regions](/docs/deployment-targets/infrastructure/cloud-regions.md)

## Target Roles

The deployment targets that you add must have at least one target role assigned to them. Learn about [target roles](/docs/infrastructure/Deployment-targets/target-roles/index.md)

## Dynamic infrastructure

You can use scripts to create Azure Service Principal Accounts, Azure Web Apps, Azure Service Fabric, Azure Cloud Services and Kubernetes targets. Learn more about [Managing resources with scripts](/docs/infrastructure/deployment-targets/dynamic-iInfrastructure/index.md).
