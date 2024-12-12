---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-12-12
title: Azure targets
description: Configure your Azure infrastructure
navOrder: 40
hideInThisSection: true
---

Octopus models your platform-as-a-service endpoints as deployment targets. Read more PaaS targets [blog: PaaS deployment targets](https://octopus.com/blog/paas-targets).

Octopus's Azure targets provide a reference to actual targets in your Azure infrastructure, allowing you to target several PaaS products by [target tag](/docs/infrastructure/deployment-targets/target-tags) during a deployment. Azure targets are added the same way as regular deployment targets and go through health checks, so you know the status of your Azure infrastructure targets and can spot any problems.

The currently supported Azure targets are:

- [Azure Service Fabric Clusters](/docs/infrastructure/deployment-targets/azure/service-fabric-cluster-targets).
- [Azure Web Apps](/docs/infrastructure/deployment-targets/azure/web-app-targets) (also works for Azure Functions).
- Azure Kubernetes Service via the [Kubernetes Agent](/docs/kubernetes/targets/kubernetes-agent) and [Kubernetes API](/docs/kubernetes/targets/kubernetes-api) deployment targets.
- Azure VM via [Tentacle using Desired State Configuration (DSC)](/docs/infrastructure/deployment-targets/tentacle/windows/azure-virtual-machines/via-an-arm-template-with-dsc).

:::div{.warning}
Octopus Deploy versions prior to `2024.1` deploying to Azure Cloud Services was supported([See deprecation notice for more details](/docs/deprecations#azure-cloud-services-classic)) but as of September 1st 2024 Azure Cloud Services(Classic) Microsoft has deprecated these services and as of October 1st 2024 Microsoft is shutting down any existing running Cloud Service deployments. ([Source](https://learn.microsoft.com/en-us/azure/cloud-services/cloud-services-choose-me))
:::
