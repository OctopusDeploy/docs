---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Azure targets
description: Configure your Azure infrastructure
navOrder: 40
hideInThisSection: true
---

Octopus models your platform-as-a-service endpoints as deployment targets. Read more PaaS targets [blog: PaaS deployment targets](https://octopus.com/blog/paas-targets).

Octopus's Azure targets provide a reference to actual targets in your Azure infrastructure, allowing you to target several PaaS products by role during a deployment. Azure targets are added the same way as regular deployment targets and go through health checks, so you know the status of your Azure infrastructure targets and can spot any problems.

The currently supported Azure targets are:

- [Azure Service Fabric Clusters](/service-fabric-cluster-targets/index.md).
- [Azure Web Apps](/web-app-targets/index.md) (also works for Azure Functions).
- [Azure Cloud Services](/cloud-service-targets/index.md).

:::warning
Regarding Azure Cloud Services, Microsoft [announced](https://blogs.msdn.microsoft.com/appserviceteam/2018/03/12/deprecating-service-management-apis-support-for-azure-app-services/) that from June 30th 2018 they are retiring support for Azure Service Management API (which indicates Cloud Services). Microsoft stated that _"Cloud Services is similar to Service Fabric in degree of control versus ease of use, but it’s now a legacy service and Service Fabric is recommended for new development"_ ([source](https://docs.microsoft.com/en-us/azure/app-service/choose-web-site-cloud-service-vm)).
:::
