---
title: Deploying to Service Fabric
description: Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Service Fabric clusters.
position: 27
version: "[3.13,)"
---

Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Service Fabric clusters.

## What kind of applications can I deploy to Service Fabric?

The short answer is: anything and everything! As long as you can script the deployment, Octopus can automate your deployments into a Service Fabric cluster.

We provide built-in first-class support for application package deployments in Service Fabric. For everything else, we provide a special step for running PowerShell scripts against Service Fabric.

:::hint
**Where do Service Fabric Steps execute?**
All Service Fabric Steps are executed on the Octopus Server, however, you will need a [Service Fabric Deployment Target](/docs/infrastructure/azure/service-fabric-cluster-targets/index.md) configured for each Service Fabric cluster you deploy to.
:::

### Service Fabric Applications

Octopus Deploy provides first-class support for [deploying Service Fabric application packages into Service Fabric clusters](/docs/deployment-examples/azure-deployments/deploying-to-service-fabric/deploying-a-package-to-a-service-fabric-cluster/index.md).

### Service Fabric PowerShell Scripts

Octopus Deploy provides a convenient step for [executing PowerShell scripts using the Service Fabric SDK cmdlets](/docs/deployment-examples/custom-scripts/service-fabric-powershell-scripts.md)

### Security Modes

Both Service Fabric Applications and PowerShell Scripts require connection to a cluster.

Octopus provides an option for connecting to Service Fabric clusters securely with [Client Certificates](/docs/deployment-examples/azure-deployments/deploying-to-service-fabric/connecting-securely-with-client-certificates/index.md).

Octopus also provides an option for connecting to Service Fabric clusters securely with [Azure Active Directory](/docs/deployment-examples/azure-deployments/deploying-to-service-fabric/connecting-securely-with-azure-active-directory/index.md).

### Versioning

To learn more about how you can automate Service Fabric versioning with Octopus, see our guide on [Version Automation with Service Fabric application packages](/docs/deployment-examples/azure-deployments/service-fabric/version-automation-with-service-fabric-application-packages/index.md).

### Application Packaging

To learn more about the requirements for your Service Fabric application packages, see our guide to [Packaging a Service Fabric application](/docs/deployment-examples/azure-deployments/service-fabric/packaging.md).
