---
title: Azure
description: Configure your infrastructure so Octopus can deploy software to your Windows servers, Linux servers, or Cloud Regions.
position: 30
hideInThisSection: true
---

You can deploy software to the Azure cloud by adding your Azure subscription to Octopus. With an active Azure subscription, you can use Octopus to deploy to [Azure Cloud Service](/docs/infrastructure/deployment-targets/azure/cloud-service-targets/index.md) targets, [Azure Service Fabric](/docs/infrastructure/deployment-targets/azure/service-fabric-cluster-targets/index.md) targets, and [Azure Web App](/docs/infrastructure/deployment-targets/azure/web-app-targets/index.md) targets.

Before you can deploy software to Azure, you need to add your Azure subscription to Octopus Deploy.

Learn more about adding [Azure Accounts](/docs/infrastructure/accounts/azure/index.md).

## Azure Targets {#azure-targets}

The Azure target types were added in **Octopus 2018.5**.

Octopus models your platform-as-a-service endpoints as deployment targets. Read more PaaS targets [blog: PaaS Deployment Targets](https://octopus.com/blog/paas-targets).

Octopus's Azure targets provide a reference to actual targets in your Azure infrastructure, allowing you to target several PaaS products by role during a deployment. Azure targets are added the same way as regular deployment targets and go through health checks, so you know the status of your Azure infrastructure targets and can spot any problems.

The currently supported Azure targets are:

- [Azure Service Fabric Clusters](/service-fabric-cluster-targets/index.md).
- [Azure Web Apps](/web-app-targets/index.md) (also works for Azure Functions).
- [Azure Cloud Services](/cloud-service-targets/index.md).

:::warning
Regarding Azure Cloud Services, Azure has [announced](https://blogs.msdn.microsoft.com/appserviceteam/2018/03/12/deprecating-service-management-apis-support-for-azure-app-services/) that from June 30th 2018 they are retiring support for Service Management API (which indicates Cloud Services). Azure has stated that _"Cloud Services is similar to Service Fabric in degree of control versus ease of use, but it’s now a legacy service and Service Fabric is recommended for new development"_ ([source](https://docs.microsoft.com/en-us/azure/app-service/choose-web-site-cloud-service-vm)).
:::
