---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Deployment targets
description: How to configure deployment targets in Octopus
navOrder: 10
hideInThisSection: true
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/CBws8yDaN4w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

!include <deployment-targets>

From the **Deployment Targets** tab you can add new deployment targets, disable or delete deployment targets, check on the status of your targets, and run health checks.

## Adding deployment targets

Deployment targets are added in different ways, depending on the type of target you are adding and how the target will communicate with the Octopus Server. For instructions, see:

- [Listening and Polling Windows Tentacles](/docs/infrastructure/deployment-targets/tentacle/windows/)
- [Linux SSH connection](/docs/infrastructure/deployment-targets/linux/ssh-target/)
- [Linux Tentacle](/docs/infrastructure/deployment-targets/tentacle/linux/)
- [Azure Web App](/docs/infrastructure/deployment-targets/azure/web-app-targets/)
- [Azure Cloud Service](/docs/infrastructure/deployment-targets/azure/cloud-service-targets/)
- [Azure Service Fabric cluster](/docs/infrastructure/deployment-targets/azure/service-fabric-cluster-targets/)
- [AWS](/docs/infrastructure/accounts/aws/)
- [Kubernetes target](/docs/infrastructure/deployment-targets/kubernetes-target/)
- [Offline package drop](/docs/infrastructure/deployment-targets/offline-package-drop/)
- [Cloud regions](/docs/infrastructure/deployment-targets/cloud-regions/)

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

Learn about [Managing resources with scripts](/docs/infrastructure/deployment-targets/dynamic-infrastructure/).

## Learn more

 - [Machine policies](/docs/infrastructure/deployment-targets/machine-policies/)
 - [Proxy support](/docs/infrastructure/deployment-targets/proxy-support/)
