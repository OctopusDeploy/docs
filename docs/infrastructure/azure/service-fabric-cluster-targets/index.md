---
title: Azure Service Fabric Cluster targets
description: Azure Service Fabric Cluster deployment targets allow you to reference existing Service Fabric Cluster apps that are available in your Azure subscription, that you can then reference by role during deployments.
position: 100
version: "[2018.5,)"
---

Azure Service Fabric Cluster deployment targets allow you to reference existing Service Fabric Cluster apps that are available in your Azure subscription, that you can then reference by role during deployments.

## Requirements

:::hint
This new target type was introduced in `2018.5`. You can read more about all the new PaaS targets [in our blog](https://octopusdeploy.com/blog/paas-targets).
:::

:::hint
The [Service Fabric SDK](https://g.octopushq.com/ServiceFabricSdkDownload) must be installed on the Octopus Server. If this SDK is missing, the step will fail with an error: _"Could not find the Azure Service Fabric SDK on this server."_

**PowerShell script execution** may also need to be enabled. See the _"Enable PowerShell script execution"_ section from the above link for more details.

After the above SDK has been installed, you will need to restart your Octopus service before the changes will take effect.
:::

You will need to create a Service Fabric cluster (either in Azure, on-prem or in other clouds). Octopus needs an existing Service Fabric cluster to connect to in order to reference it as a deployment target.

To learn more about App Services, the Azure team provide [useful documentation on Service Fabric](https://azure.microsoft.com/en-au/services/service-fabric/) that can help you get started.

## Creating Service Fabric Cluster targets

Once you have a Service Fabric Cluster application setup within your Azure subscription, you are then ready to map that to an Octopus deployment target.

To create an Azure Service Fabric Cluster target within Octopus:

- Go to `Infrastructure` > `Deployment Targets` > `Add Deployment Target`
- Select `Azure Service Fabric Cluster` from the list of available targets and click _Next_
- Fill out the necessary fields, being sure to provide a unique role that clearly identifies your Azure Service Fabric Cluster target

![](create-azure-service-fabric-cluster-target.png "width=500")

- After clicking _Save_, your deployment target will be added and go through a health check to ensure Octopus can connect to it.
- If all goes well, you should see your newly created target in your `Deployment Targets` list, with a status of _Healthy_

## Deploying to Service Fabric Targets

See our [documentation about this topic](/docs/deploying-applications/azure-deployments/deploying-to-service-fabric/index.md)

## Troubleshooting

If your Azure Service Fabric Cluster target is not completing a health check successfully, you may need to check that your Octopus Server can communicate with Azure. If your Octopus Server is behind a proxy or firewall, you will need to consult with your Systems Administrator to ensure it is able to communicate with Azure.

Alternatively, it could be the security settings of your Service Fabric Cluster denying access. Our deployments documentation discusses [the various security modes of Service Fabric](/docs/deploying-applications/azure-deployments/deploying-to-service-fabric/index.md#security-modes) in greater detail.