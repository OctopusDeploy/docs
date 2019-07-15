---
title: Deployment Targets
description: How to configure deployment targets in Octopus
position: 20
hideInThisSection: True
---

Deployment targets are the servers and services you deploy your software to. You can manage your deployment targets by navigating to **{{Infrastructure,Deployment Targets}}** in the Octopus Web Portal.

From the **Deployment Targets** tab you can add new deployment targets, disable or delete deployment targets, check on the status of your targets, and run health checks.

## Adding Deployment Targets

Deployment targets are added in different ways, depending on the type of target you are adding and how the target will communicate with the Octopus Deploy server. For instructions, see:

- [Listening and Polling Windows Tentacles](/docs/infrastructure/deployment-targets/windows-targets/index.md)
- [Linux SSH Connection](/docs/infrastructure/deployment-targets/linux/index.md)
- [Linux Tentacle (early Access)](docs/infrastructure/deployment-targets/linux/tentacle/index.md)
- [Azure Web App](/docs/infrastructure/deployment-targets/azure/web-app-targets/index.md)
- [Azure Cloud Service](/docs/infrastructure/deployment-targets/azure/cloud-service-targets/index.md)
- [Azure Service Fabric Cluster](/docs/infrastructure/deployment-targets/azure/service-fabric-cluster-targets/index.md)
- [Kubernetes Target](/docs/infrastructure/deployment-targets/kubernetes-target/index.md)
- [Offline Package Drop](/docs/infrastructure/deployment-targets/offline-package-drop.md)
- [Cloud Regions](/docs/infrastructure/deployment-targets/cloud-regions.md)

## Accounts

In addition to the deployment targets above, you may also need to configure accounts to use in conjunction with your infrastructure during your deployments. The configuration instructions for the individual deployment targets tell you when you need to configure an account.

You can configure the following accounts:

- [Azure Subscriptions](/docs/infrastructure/deployment-targets/azure/index.md)
- [Amazon Web Services Accounts](/docs/infrastructure/deployment-targets/awsindex.md)
- [SSH Key Pairs](/docs/infrastructure/deployment-targets/linux/ssh-key-pair.md)
- [Username/Passwords](/docs/infrastructure/deployment-targets/username-and-password.md)
- [Tokens](/docs/infrastructure/deployment-targets/tokens.md)

## Target Roles {#target-roles}

Before you can deploy software to the deployment targets in your environments, you need to tag your deployment targets with target roles. This ensures you deploy the right pieces of software to the right deployment targets. Deployment targets can have multiple roles, but they must have at least one. Typical target roles include:

- web-server
- app-server
- db-server

Using target roles means the infrastructure in each of your environments doesn't need to be identical. For instance, in the **Test** environment, you might be using a single VM to test all of your software, and so you tag that VM with all of the target roles you use in your deployment process. However, in the **Production** environment you might have dedicated deployment targets per functional role, for instance, one deployment target for the database server which you would tag with the target role `db-server`, and another deployment target that performs the role of web server and is tagged with the target role `web-server`.

Deployment targets can have more than one role, and more than one deployment target can have the same role.

As you decide on the target roles for your infrastructure, try to name the target roles based on the function the deployment targets will serve.

### Creating Target Roles

Roles are created and saved in the database as soon as you assign them to a deployment target.

Decide on the naming convention you will use before creating your first target role as it's not possible to change the case after the role has been created, for instance, all lowercase to camel case.

1. Register a deployment target or click on an already registered deployment target and go to **Settings**.
2. In the **Target Roles** field, enter the target role you'd like to use (no spaces).
3. Save the target settings.

The role has been created and assigned to the deployment target and can be added to other deployment targets.

You can check all the roles assigned to your deployment targets from the **Infrastructure** tab.

## Dynamic Infrastructure

You can use scripts to create Azure Service Principal Accounts, Azure Web Apps, Azure Service Fabric, Azure Cloud Services and Kubernetes targets.

Learn about [Managing resources with scripts](/docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md).
