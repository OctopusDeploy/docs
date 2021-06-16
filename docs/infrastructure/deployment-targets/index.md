---
title: Deployment targets
description: How to configure deployment targets in Octopus
position: 10
hideInThisSection: True
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/CBws8yDaN4w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

!include <deployment-targets>

From the **Deployment Targets** tab you can add new deployment targets, disable or delete deployment targets, check on the status of your targets, and run health checks.

## Adding deployment targets

Deployment targets are added in different ways, depending on the type of target you are adding and how the target will communicate with the Octopus Server. For instructions, see:

- [Listening and Polling Windows Tentacles](/docs/infrastructure/deployment-targets/windows-targets/index.md)
- [Linux SSH connection](/docs/infrastructure/deployment-targets/linux/ssh-target.md)
- [Linux Tentacle](docs/infrastructure/deployment-targets/linux/tentacle/index.md)
- [Azure Web App](/docs/infrastructure/deployment-targets/azure/web-app-targets/index.md)
- [Azure Cloud Service](/docs/infrastructure/deployment-targets/azure/cloud-service-targets/index.md)
- [Azure Service Fabric cluster](/docs/infrastructure/deployment-targets/azure/service-fabric-cluster-targets/index.md)
- [AWS](/docs/infrastructure/accounts/aws/index.md)
- [Kubernetes target](/docs/infrastructure/deployment-targets/kubernetes-target/index.md)
- [Offline package drop](/docs/infrastructure/deployment-targets/offline-package-drop.md)
- [Cloud regions](/docs/infrastructure/deployment-targets/cloud-regions.md)

## Target roles {#target-roles}

!include <target-roles>

### Add target roles {#create-target-roles}

Roles are created and saved in the database as soon as you assign them to a deployment target.

Decide on the naming convention you will use before creating your first target role as it's not possible to change the case after the role has been created, for instance, all lowercase to camel case.

1. Register a deployment target or click on an already registered deployment target and go to **Settings**.
2. In the **Target Roles** field, enter the target role you'd like to use (no spaces).
3. Save the target settings.

The role has been created and assigned to the deployment target and can be added to other deployment targets.

You can check all the roles assigned to your deployment targets from the **Infrastructure** tab.

## Dynamic infrastructure

You can use scripts to create Azure Service Principal Accounts, Azure Web Apps, Azure Service Fabric, Azure Cloud Services and Kubernetes targets.

Learn about [Managing resources with scripts](/docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md).

## Learn more

 - [Machine policies](/docs/infrastructure/deployment-targets/machine-policies.md)
 - [Proxy support](/docs/infrastructure/deployment-targets/proxy-support.md)
