---
title: Connect your deployment targets to Octopus
description: Learn how to configure the servers and services you deploy software to with Octopus Deploy.
position: 70
---

Octopus organizes your deployment targets (the VMs, servers, and services where you deploy your software) into [environments](/docs/getting-started/environments.md). 

## Add your deployment targets

1. Navigate to **{{ Infrastructure, Deployment Targets }}** and click **ADD DEPLOYMENT TARGET**.
1. Select the type of deployment target you are adding.
1. Select the type of connection your deployment target will make, and follow the on-screen instructions.

If you run into any issues, refer to the documentation for the type of deployment target you are configuring:

- [Windows](/docs/infrastructure/deployment-targets/windows-targets/index.md)
- [Linux](/docs/infrastructure/deployment-targets/linux/index.md)
- [Azure](/docs/infrastructure/deployment-targets/azure/index.md)
- [Kubernetes](/docs/infrastructure/deployment-targets/kubernetes-target/index.md)
- [Offline package drop](/docs/infrastructure/deployment-targets/offline-package-drop.md)
- [Cloud region](/docs/infrastructure/deployment-targets/cloud-regions.md)

As you configure your deployment targets, select the environment they will belong to, and assign the target role(s).

## Target roles

Target roles tell Octopus which deployment targets within an environment should be deployed to. This ensures your software is deployed to the right deployment target. Some example target roles are: 

- web-server
- app-server
- db-server

:::success
To learn more about managing and configuring your infrastructure, refer to the [infrastructure documentation](/docs/infrastructure/index.md).
:::

Next, learn how to [package your software](/docs/getting-started/package-your-software.md).