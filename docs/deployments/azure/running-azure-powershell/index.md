---
title: Running Azure PowerShell
description: Octopus supports executing PowerShell against Azure and will automatically import the Azure PowerShell modules.
hideInThisSectionHeader: true
---

:::warning
Using the Azure tools bundled with Octopus Deploy is not recommended. You can continue to use both the bundled cmdlets and CLI. However, it is recommended to configure Octopus Deploy to use your own [version of the Azure PowerShell cmdlets](configuring-the-version-of-the-azure-powershell-modules.md) and [version of the Azure CLI](configuring-the-version-of-the-azure-cli.md).

The Azure Resource Manager Powershell modules (AzureRM) that are included have been replaced by Azure Powershell Modules (Az). See [Introducing the Azure Az PowerShell module](https://docs.microsoft.com/en-us/powershell/azure/new-azureps-module-az) for further information about migrating from AzureRM to Az.
:::

When executing PowerShell against Azure, Octopus Deploy will automatically import the [Azure Resource Manager (AzureRM) PowerShell](https://docs.microsoft.com/powershell/azure/azurerm/overview) and the [Azure PowerShell modules](https://docs.microsoft.com/powershell/azure/overview) if they are present on the worker. The Azure PowerShell modules require the [Azure CLI](https://docs.microsoft.com/cli/azure/) version 2.0 or above to be installed on the worker. Finally, it will authenticate with Azure using the configured [Azure Account](/docs/infrastructure/deployment-targets/azure/index.md).

This applies to:

- 'Run an Azure Script' steps.
- Scripts packaged or configured with [Deploying a package to an Azure Cloud Service](/docs/deployments/azure/cloud-services/index.md) or [Azure Web App](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app/index.md) steps.

**Choosing the right Azure account type**
Azure supports two authentication methods, each of which provides access to a different set of Azure APIs:

- To use the Azure Service Management (ASM) API, use an [Azure Management Certificate Account](/docs/infrastructure/deployment-targets/azure/index.md#azure-management-certificate).
- To use the Azure Resource Management (ARM) API, use an [Azure Service Principal Account](/docs/infrastructure/deployment-targets/azure/index.md#azure-service-principal).
  - The ARM PowerShell cmdlets are prefixed with `AzureRM`, like `Get-AzureRMWebApp`.
  - The Az PowerShell cmdlets are prefixed with `Az`, like `Get-AzWebApp`.

Learn more about [configuring the right Azure Account](/docs/infrastructure/deployment-targets/azure/index.md).

## Run an Azure PowerShell script step {#RunningAzurePowerShell-RunanAzurePowerShellScriptStep}

Octopus Deploy provides a *Run an Azure PowerShell Script* step type, for executing PowerShell in the context of an Azure Subscription. For information about adding a step to the deployment process, see the [add step](/docs/projects/steps/index.md) section.

![](5865912.png "width=170")

![](azure-new-powershell-script-step.png "width=500")

### Staying up to date

Octopus Deploy ships with a version of the Azure RM PowerShell Modules and Azure CLI, so you can deploy applications as soon as you install Octopus Deploy. Microsoft Azure is changing very quickly, introducing more application services and commands frequently. In addition the AzureRM Powershell modules only work on Windows workers. 

You can use the bundled cmdlets or/and CLI if they cover everything you need; however, this is **not recommended**. Instead, consider configuring Octopus Deploy to use your own [version of the Azure PowerShell cmdlets](configuring-the-version-of-the-azure-powershell-modules.md) and/or [version of the Azure CLI](configuring-the-version-of-the-azure-cli.md).

## Learn more

- Generate an Octopus guide for [Azure and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Azure%20websites).
