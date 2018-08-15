---
title: Managing Resources using scripts
description: Octopus resources can be created using service messages allowing resources that you currently can script in Azure to be modeled in Octopus.
position: 120
---

Some resources can be created within Octopus from the same scripts that you use to create them on Azure. By adding some additional commands Web Apps you create on Azure can also be created within Octopus as deployment targets.

:::success
As of the `2018.5` release, only Azure Service Principal Accounts, Azure Web Apps, Azure Service Fabric and Azure Cloud Services targets are supported.
:::

## Available Commands and Syntax

Each of the resource commands is available as a PowerShell function anywhere that a step allows you to run a PowerShell script.

### Accounts

[Azure Service Principal Account](/docs/infrastructure/dynamic-infrastructure/azure-accounts.md)

### Targets

:::warning
Before you can create dynamic targets in an Environment, the environment needs to be configured to allow it. See [Dynamic Targets in an Environment](/docs/infrastructure/environments/index.md#dynamic-targets-in-an-environment) for more information.
:::

[Azure Web App](/docs/infrastructure/dynamic-infrastructure/azure-web-app-target.md)

[Azure Service Fabric](/docs/infrastructure/dynamic-infrastructure/azure-service-fabric-target.md)

[Azure Cloud Service](/docs/infrastructure/dynamic-infrastructure/azure-cloud-service-target.md)

[Remove Target](/docs/infrastructure/dynamic-infrastructure/remove-target.md)

### Restrictions

All of the commands will result in an Account or Deployment Target, which will automatically be scoped to the Environment and Tenant (if the deployment is for a tenant).
This cannot be overridden through the commands.

:::warning
These commands are not available in the **Script Console**
:::


## Examples

### Creating an Azure Web App

Let's say you need to deploy an application to a different Azure Resource Group each time you deploy, one per developer or tester for example. The Resource Group, Application Service Plan, and Web App can all be created through an Azure PowerShell script step, and then the Octopus Target can be created in the same step.

```powershell
# Octopus variables
$environment = $OctopusParameters['Octopus.Environment.Name']
$releaseNumber = $OctopusParameters['Octopus.Release.Number'].Replace(".", "-")
$deploymentId = $OctopusParameters['Octopus.Deployment.Id']

# A unique name based on the Octopus environment, release, and deployment
$uniqueName = "Acme-$environment-$releaseNumber-$deploymentId"

# Create resources in Azure
New-AzureRmResourceGroup -Name $uniqueName -Location "WestUS"
New-AzureRmAppServicePlan -Name $uniqueName -Location "WestUS" -ResourceGroupName $uniqueName -Tier Free
New-AzureRmWebApp -Name $uniqueName -Location "WestUS" -AppServicePlan $uniqueName -ResourceGroupName $uniqueName

# Create new target in Octopus
New-OctopusAzureWebAppTarget -Name $uniqueName -AzureWebApp $uniqueName -AzureResourceGroupName $uniqueName -OctopusAccountIdOrName "my-octopus-azure-serviceprincipal-account" -OctopusRoles "acme-web"
```

### Tearing down a test environment

Building on the Web App example, you may wish to spin up an application and then tear it down at the end of the day. By combining [Recurring Deployments](https://octopus.com/blog/recurring-deployments) and a tear-down script, you can keep your cloud hosting costs down.

Using as little as two lines of PowerShell you can remove all the resources from Azure and Octopus:
```
Remove-AzureRmResourceGroup -Name "AzureWebAppResourceGroup" -Force
Remove-OctopusTarget -targetIdOrName "AzureWebApp"
```

### Deploying an ARM template

You can also use the above PowerShell Cmdlets when deploying Azure resources using an ARM template.

Firstly, turn on **Custom deployment scripts** under _Configure Features_ on your _Deploy an Azure Resource Group_ step.

![Configure features on ARM template step](arm-template-step-configure-features.png "width=500")

Under the _Features_ section you will have _Pre-deployment_, _Deployment_, and _Post-deployment_ scripts.

In the _Post-deployment_ script section, you can [access the output paramaters](/docs/deployment-examples/azure-deployments/resource-groups/index.md#DeployusinganAzureResourceGroupTemplate-AccessingARMtemplateoutputparameters) and use those output parameters to run any of the Cmdlets above.
