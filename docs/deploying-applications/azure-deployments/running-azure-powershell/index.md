---
title: Running Azure PowerShell
description: Octopus supports executing PowerShell against Azure and will automatically import the Azure PowerShell modules.
---

When executing PowerShell against Azure, Octopus Deploy will automatically import the [Azure PowerShell modules](https://github.com/Azure/azure-powershell) and authenticate with Azure using the configured [Azure Account](/docs/infrastructure/azure/creating-an-azure-account/index.md).

This applies to:

- 'Run an Azure PowerShell Script' steps
- Scripts packaged or configured with [Deploying a package to an Azure Cloud Service](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-cloud-service/index.md) or [Azure Web App](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app/index.md) steps

:::hint
**Azure PowerShell Module version**
For information on viewing and configuration the version of the Azure PowerShell modules used by Octopus, see [this page](/docs/deploying-applications/azure-deployments/running-azure-powershell/configuring-the-version-of-the-azure-powershell-modules.md).
:::

:::success
**Choosing the right Azure Account type**
Azure supports two authentication methods, each of which provides access to a different set of Azure APIs:

- To use the Azure Service Management (ASM) API, use an [Azure Management Certificate Account](/docs/infrastructure/azure/creating-an-azure-account/creating-an-azure-management-certificate-account.md).
- To use the Azure Resource Management (ARM) API, use an [Azure Service Principal Account](/docs/infrastructure/azure/creating-an-azure-account/creating-an-azure-service-principal-account.md). (The ARM PowerShell cmdlets are prefixed with `AzureRM`, like `Get-AzureRMWebApp`)

Learn more about [configuring the right Azure Account](/docs/infrastructure/azure/creating-an-azure-account/index.md).
:::

## Run an Azure PowerShell Script Step {#RunningAzurePowerShell-RunanAzurePowerShellScriptStep}

Octopus Deploy provides a *Run an Azure PowerShell Script* step type, for executing PowerShell in the context of an Azure Subscription. For information about adding a step to the deployment process, see the [add step](/docs/deploying-applications/deployment-process/steps.md) section.

![](/docs/images/5671696/5865912.png "width=170")

![](azure-new-powershell-script-step.png "width=500")
