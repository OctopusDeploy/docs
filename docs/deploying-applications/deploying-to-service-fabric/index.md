---
title: Deploying to Service Fabric
description: Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Service Fabric clusters.
position: 28
---

Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Service Fabric clusters.

## What kind of applications can I deploy to Service Fabric? {#DeployingtoServiceFabric-Whatkindofapplications?}

The short answer is: anything and everything! As long as you can script the deployment, Octopus can automate your deployments into a Service Fabric cluster.

We provide built-in first-class support for application package deployments in Service Fabric. For everything else, we provide a special step for running PowerShell scripts against Service Fabric.

:::hint
**Where do Service Fabric Steps execute?**
All Service Fabric Steps are executed on the Octopus Server, so no Targets/Tentacles are needed for them.
:::

### Service Fabric Applications {#DeployingtoServiceFabric-Applications}

Octopus Deploy provides first-class support for [deploying Service Fabric application packages into Service Fabric clusters](/docs/deploying-applications/deploying-to-service-fabric/deploying-a-package-to-a-service-fabric-cluster/index.md).

### Service Fabric PowerShell Scripts {#DeployingtoServiceFabric-PowerShellScripts}

Octopus Deploy provides a convenient step for [executing PowerShell scripts using the Service Fabric SDK cmdlets](/docs/deploying-applications/custom-scripts/service-fabric-powershell-scripts.md)

### Security Modes {#DeployingtoServiceFabric-SecurityModes}
Both Service Fabric Applications and PowerShell Scripts require connection to a cluster.

Octopus provides an option for connecting to Service Fabric clusters securely with [Client Certificates](/docs/deploying-applications/deploying-to-service-fabric/connecting-securely-with-client-certificates/index.md).

Octopus also provides an option for connecting to Service Fabric clusters securely with [Azure Active Directory](/docs/deploying-applications/deploying-to-service-fabric/connecting-securely-with-azure-active-directory/index.md).
