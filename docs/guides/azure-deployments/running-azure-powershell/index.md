---
title: Running Azure PowerShell

---


When executing PowerShell against Azure, Octopus Deploy will automatically import the [Azure PowerShell modules](https://github.com/Azure/azure-powershell) and authenticate with Azure using the configured [Azure Subscription Account](/docs/guides/azure-deployments/creating-an-azure-account.md).


This applies to:

- 'Run an Azure PowerShell Script' steps
- Scripts packaged or configured with [Deploying a package to an Azure Cloud Service](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-cloud-service.md) or [Azure Web App](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app.md) steps


:::hint
**Azure PowerShell Module version**
For information on viewing and configuration the version of the Azure PowerShell modules used by Octopus, see [this page](/docs/guides/azure-deployments/running-azure-powershell/configuring-the-version-of-the-azure-powershell-modules.md).
:::

:::success
**Choosing the right Azure Account type**
Azure supports two authentication methods, each of which provides access to a different set of Azure APIs:

- To use the Azure Service Management (ASM) API, use an [Azure Management Certificate Account](/docs/guides/azure-deployments/creating-an-azure-account/creating-an-azure-management-certificate-account.md).
- To use the Azure Resource Management (ARM) API, use an [Azure Service Principal Account](/docs/guides/azure-deployments/creating-an-azure-account/creating-an-azure-service-principal-account.md). (The ARM PowerShell cmdlets are prefixed with `AzureRM`, like `Get-AzureRMWebApp`)



Learn more about [configuring the right Azure Account](/docs/guides/azure-deployments/creating-an-azure-account.md).
:::

## Run an Azure PowerShell Script Step


Octopus Deploy provides a *Run an Azure PowerShell Script* step type, for executing PowerShell in the context of an Azure Subscription. For information about adding a step to the deployment process, see the [add step](http://docs.octopusdeploy.com/display/OD/Add+step) section.





![](/docs/images/5671696/5865912.png)








![](/docs/images/3048705/3278370.png)
