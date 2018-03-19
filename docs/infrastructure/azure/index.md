---
title: Azure
description: Configure your infrastructure so Octopus can deploy software to your Windows servers, Linux servers, or Cloud Regions.
hideInThisSection: true
position: 6
---

Octopus Deploy provides first-class support for deploying Azure Web Applications and Service Fabric Clusters. To deploy software to Azure, you must add your Azure subscription to Octopus Deploy, create your Azure targets and then use the built-in step templates to deploy to the given targets.

Learn how to [create an Azure account](/docs/infrastructure/azure/creating-an-azure-account/index.md).

## Azure targets

Octopus' Azure targets provide a reference to actual targets in your Azure infrastructure, allowing you to target Web Apps or Service Fabric Cluster Apps by role during a deployment. Azure targets are setup the same way as regular deployment targets and go through health checks, so you can know the status of your Azure infrastructure targets and spot any problems early.

Learn how to [create an Azure Web App target](/docs/infrastructure/azure/web-app-targets/index.md).

Learn how to [create an Azure Service Fabric Cluster targets](/docs/infrastructure/azure/service-fabric-cluster-targets/index.md).

:::warning
Azure Cloud Service deployment targets were deprecated in Octopus 3.1 and Azure has [announced](https://blogs.msdn.microsoft.com/appserviceteam/2018/03/12/deprecating-service-management-apis-support-for-azure-app-services/) that from June 30th 2018 they are retiring support for Cloud Services. Azure has stated that _"Cloud Services is similar to Service Fabric in degree of control versus ease of use, but it’s now a legacy service and Service Fabric is recommended for new development"_ ([source](https://docs.microsoft.com/en-us/azure/app-service/choose-web-site-cloud-service-vm)).
:::