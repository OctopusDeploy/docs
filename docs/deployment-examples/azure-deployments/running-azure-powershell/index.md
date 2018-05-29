---
title: Running Azure PowerShell
description: Octopus supports executing PowerShell against Azure and will automatically import the Azure PowerShell modules.
---

When executing PowerShell against Azure, Octopus Deploy will automatically import the [Azure PowerShell modules](https://github.com/Azure/azure-powershell) and authenticate with Azure using the configured [Azure Account](/docs/infrastructure/azure/creating-an-azure-account/index.md).

This applies to:

- 'Run an Azure PowerShell Script' steps
- Scripts packaged or configured with [Deploying a package to an Azure Cloud Service](/docs/deployment-examples/azure-deployments/deploying-a-package-to-an-azure-cloud-service/index.md) or [Azure Web App](/docs/deployment-examples/azure-deployments/deploying-a-package-to-an-azure-web-app/index.md) steps

:::success
**Choosing the right Azure Account type**
Azure supports two authentication methods, each of which provides access to a different set of Azure APIs:

- To use the Azure Service Management (ASM) API, use an [Azure Management Certificate Account](/docs/infrastructure/azure/creating-an-azure-account/creating-an-azure-management-certificate-account.md).
- To use the Azure Resource Management (ARM) API, use an [Azure Service Principal Account](/docs/infrastructure/azure/creating-an-azure-account/creating-an-azure-service-principal-account.md). (The ARM PowerShell cmdlets are prefixed with `AzureRM`, like `Get-AzureRMWebApp`)

Learn more about [configuring the right Azure Account](/docs/infrastructure/azure/creating-an-azure-account/index.md).
:::

## Run an Azure PowerShell Script Step {#RunningAzurePowerShell-RunanAzurePowerShellScriptStep}

Octopus Deploy provides a *Run an Azure PowerShell Script* step type, for executing PowerShell in the context of an Azure Subscription. For information about adding a step to the deployment process, see the [add step](/docs/deployment-process/steps/index.md) section.

![](/docs/images/5671696/5865912.png "width=170")

![](azure-new-powershell-script-step.png "width=500")

:::success
**Bring your own Azure PowerShell cmdlets**
Octopus Deploy ships with a version of the Azure PowerShell cmdlets so you can deploy applications as soon as you install Octopus Deploy. Microsoft Azure is changing very quickly, introducing more application services and PowerShell cmdlets frequently. You can use the built-in cmdlets if they cover everything you need, or you can [configure Octopus Deploy to use your own custom version of the Azure PowerShell cmdlets](/docs/deployment-examples/azure-deployments/running-azure-powershell/configuring-the-version-of-the-azure-powershell-modules.md).
:::