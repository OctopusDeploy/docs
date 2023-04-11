---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Azure Service Fabric
description: Learn how Octopus Deploy fits into a Continuous Deployment pipeline for your Azure Service Fabric applications.
navOrder: 2
---

This section contains resources for using Octopus to deploy your Azure Service Fabric applications. We assume you already have a Service Fabric cluster set up in Azure. If you don't yet, check out Microsoft's documentation on [getting started with Azure Service Fabric](https://azure.microsoft.com/en-us/services/service-fabric/)

## Service Fabric Deployment Targets in Octopus

Octopus provides a built in Deployment Target for Azure Service Fabric clusters. Check out [this page](/docs/infrastructure/deployment-targets/azure/service-fabric-cluster-targets/index.md) for help setting up and configuring your target.

## Packaging

Learn how to [package a Service Fabric application](/docs/deployments/azure/service-fabric/packaging.md) for use with Octopus Deploy.

## Step Templates

Octopus comes with two built-in step templates facilitating deployment and management of Azure Service Fabric apps.

- [Deploy a Service Fabric App](/docs/deployments/azure/service-fabric/deploying-a-package-to-a-service-fabric-cluster.md#step-4-create-the-service-fabric-application-deployment-step)
- [Run a Service Fabric SDK PowerShell Script](/docs/deployments/custom-scripts/service-fabric-powershell-scripts.md)

## Security modes

Both step template types above require an authorized connection to a cluster.

Octopus provides two options for connecting to Service Fabric clusters securely:

1. Using [Client Certificates](/docs/deployments/azure/service-fabric/connecting-securely-with-client-certificates/index.md).
1. Using [Azure Active Directory](/docs/deployments/azure/service-fabric/connecting-securely-with-azure-active-directory/index.md).

## Versioning

Individual applications in a Service Fabric cluster have their own version numbers while the entire clustered app has a separate version number independent of its constituent parts.
Octopus does not enforce a particular process for managing application/service versions. Learn more about using Octopus Deploy to [automate updates to the application/service versions](/docs/deployments/azure/service-fabric/version-automation-with-service-fabric-application-packages/index.md).

### Overwrite vs rolling upgrades

The default behavior of the Service Fabric deployments is to overwrite an existing application. What this means is that if the application already exists in the cluster it will be removed first and the redeployed (you'll see it using *RegisterAndCreate* in the logs).

The alternative approach is to use rolling deployments. To use this, add the following line to your publish profile in the source

```xml
<UpgradeDeployment Enabled="true" />
```

It will then update each node in turn with the new version (you'll see it using *RegisterAndUpgrade* in the logs).
