---
title: Azure
description: Configure your infrastructure so Octopus can deploy software to your Windows servers, Linux servers, or Cloud Regions.
hideInThisSection: true
position: 6
---

Octopus Deploy provides first-class support for deploying to different PaaS products in the Azure Cloud by using [Azure Targets](#azure-targets). To deploy software to Azure, remember that you must first add your Azure subscription to Octopus Deploy by [creating an Azure account](/docs/infrastructure/azure/creating-an-azure-account/index.md). Once that's done, follow the below links depending on the Azure Target you want to deploy to.

## Azure targets

:::hint
These new target types were introduced in `2018.4`. You can read more about all the new PaaS targets [in our blog](https://octopusdeploy.com/blog/paas-targets).
:::

Octopus' Azure targets provide a reference to actual targets in your Azure infrastructure, allowing you to target several PaaS products by role during a deployment. Azure targets are setup the same way as regular deployment targets and go through health checks, so you can know the status of your Azure infrastructure targets and spot any problems early.

The currently supported Azure targets are:

- [Azure Web Apps](/web-app-targets/index.md) (also works for Azure Functions).

- [Azure Service Fabric Clusters](/service-fabric-cluster-targets/index.md).

- The one you were looking for is not here? [Let us know in Uservoice!](https://octopusdeploy.uservoice.com/).

:::warning
Azure Cloud Service deployment targets were deprecated in Octopus 3.1 and Azure has [announced](https://blogs.msdn.microsoft.com/appserviceteam/2018/03/12/deprecating-service-management-apis-support-for-azure-app-services/) that from June 30th 2018 they are retiring support for Cloud Services. Azure has stated that _"Cloud Services is similar to Service Fabric in degree of control versus ease of use, but it’s now a legacy service and Service Fabric is recommended for new development"_ ([source](https://docs.microsoft.com/en-us/azure/app-service/choose-web-site-cloud-service-vm)).
:::