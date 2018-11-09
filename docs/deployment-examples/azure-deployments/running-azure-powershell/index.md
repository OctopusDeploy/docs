---
title: Running Azure PowerShell
description: Octopus supports executing PowerShell against Azure and will automatically import the Azure PowerShell modules.
---

When executing PowerShell against Azure, Octopus Deploy will automatically import the [Azure PowerShell modules](https://docs.microsoft.com/powershell/azure/overview) and [Azure PowerShell CLI](https://docs.microsoft.com/cli/azure/), and finally will also authenticate with Azure using the configured [Azure Account](/docs/infrastructure/deployment-targets/azure/index.md).

This applies to:

- 'Run an Azure PowerShell Script' steps.
- Scripts packaged or configured with [Deploying a package to an Azure Cloud Service](/docs/deployment-examples/azure-deployments/deploying-a-package-to-an-azure-cloud-service/index.md) or [Azure Web App](/docs/deployment-examples/azure-deployments/deploying-a-package-to-an-azure-web-app/index.md) steps.

**Choosing the right Azure Account type**
Azure supports two authentication methods, each of which provides access to a different set of Azure APIs:

- To use the Azure Service Management (ASM) API, use an [Azure Management Certificate Account](/docs/infrastructure/deployment-targets/azure/index.md#azure-management-certificate).
- To use the Azure Resource Management (ARM) API, use an [Azure Service Principal Account](/docs/infrastructure/deployment-targets/azure/index.md#azure-service-principal). (The ARM PowerShell cmdlets are prefixed with `AzureRM`, like `Get-AzureRMWebApp`).

Learn more about [configuring the right Azure Account](/docs/infrastructure/deployment-targets/azure/index.md).

## Run an Azure PowerShell Script Step {#RunningAzurePowerShell-RunanAzurePowerShellScriptStep}

Octopus Deploy provides a *Run an Azure PowerShell Script* step type, for executing PowerShell in the context of an Azure Subscription. For information about adding a step to the deployment process, see the [add step](/docs/deployment-process/steps/index.md) section.

![](/docs/images/5671696/5865912.png "width=170")

![](azure-new-powershell-script-step.png "width=500")

### Staying Up to Date

Octopus Deploy ships with a version of the Azure PowerShell Modules and Azure PowerShell CLI so you can deploy applications as soon as you install Octopus Deploy. Microsoft Azure is changing very quickly, introducing more application services and PowerShell commands frequently. You can use the built-in cmdlets or/and CLI if they cover everything you need, or you can configure Octopus Deploy to use your own [custom version of the Azure PowerShell cmdlets](configuring-the-version-of-the-azure-powershell-modules.md) and/or [custom version of the Azure PowerShell CLI](configuring-the-version-of-the-azure-powershell-cli.md).
