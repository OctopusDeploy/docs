---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-04-30
title: Azure Service Fabric cluster targets
description: Azure Service Fabric Cluster deployment targets allow you to reference existing Service Fabric Cluster apps that are available in your Azure subscription, that you can then reference by target tag during deployments.
navOrder: 10
---

Azure Service Fabric Cluster deployment targets let you reference existing Service Fabric Cluster apps that are available in your Azure subscription. You can then reference these by [target tag](/docs/infrastructure/deployment-targets/#target-roles) during deployments.

## Requirements

1. The **Service Fabric SDK** must be installed on the Octopus Server. For details, see [Service Fabric SDK](https://oc.to/ServiceFabricSdkDownload).
  If this SDK is missing, the step will fail with an error: _"Could not find the Azure Service Fabric SDK on this server."_

2. The **PowerShell script execution** may also need to be enabled. For details see [Enable PowerShell script execution](https://oc.to/ServiceFabricEnableScriptExection).

After the above SDK has been installed, you will need to restart your Octopus Server for the changes to take effect.

You need to create a Service Fabric cluster (either in Azure, on-premises, or in other clouds). Octopus needs an existing Service Fabric cluster to connect to in order to reference it as a deployment target.

To learn about building Azure Service Fabric apps see the [Service Fabric documentation](https://azure.microsoft.com/en-au/services/service-fabric/).

## Creating Service Fabric cluster targets

Once you have a Service Fabric Cluster application setup within your Azure subscription, you are ready to map that to an Octopus deployment target.

To create an Azure Service Fabric Cluster target within Octopus:

- Navigate to **Infrastructure ➜ Deployment Targets ➜ Add Deployment Target**.
- Select **Azure Service Fabric Cluster** from the list of available targets and click _Next_.
- Fill out the necessary fields, being sure to provide a unique target tag (formerly target role) that clearly identifies your Azure Service Fabric Cluster target.

:::figure
![](/docs/infrastructure/deployment-targets/azure/service-fabric-cluster-targets/create-azure-service-fabric-cluster-target.png)
:::

- After clicking _Save_ your deployment target will be added and a health check task will run to ensure Octopus can connect to the target.
- If all goes well, you should see your newly created target in your **Deployment Targets** list with a status of _Healthy_.

## Troubleshooting

If your Azure Service Fabric Cluster target does not successfully complete a health check, you may need to check that your Octopus Server can communicate with Azure. If your Octopus Server is behind a proxy or firewall, you will need to consult your Systems Administrator to ensure it can communicate with Azure.

Alternatively, it could be the security settings of your Service Fabric Cluster denying access. Our deployments documentation discusses [the various security modes of Service Fabric](/docs/deployments/azure/service-fabric/#security-modes) in greater detail.

## Deploying to Service Fabric targets

To learn about deploying to Service Fabric targets, see our [documentation about this topic](/docs/deployments/azure/service-fabric).
