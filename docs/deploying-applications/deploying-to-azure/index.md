---
title: Deploying to Azure
description: Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Azure.
position: 28
---

Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Azure.

## What kind of applications can I deploy to Azure? {#DeployingtoAzure-WhatkindofapplicationscanIdeploytoAzure?}

The short answer is: anything and everything! As long as you can script the deployment, Octopus can automate your deployments into a Microsoft Azure Data Center.

We provide built-in first-class support for the most common application services in Microsoft Azure. For everything else we provide a special step for running PowerShell scripts against Azure.

:::hint
**Where do Azure Steps execute?**
All Azure Steps are executed on the Octopus Server, so no Targets/Tentacles are needed for them. If you would like the ability to delegate Azure deployments to a Tentacle, there is a [UserVoice suggestion where you can vote and have your say on this kind of feature](https://octopusdeploy.uservoice.com/forums/170787-general/suggestions/6316906-support-run-on-any-tentacle-model-for-deployment).
:::

### Azure Resource Groups {#DeployingtoAzure-AzureResourceGroups}

Octopus Deploy provides first-class support for managing [Resource Groups](/docs/guides/azure-deployments/resource-groups/index.md) in Microsoft Azure, including support for Resource Group Templates and their parameters, even using secrets from Azure Key Vault. Follow our guide on [deploying applications using Azure Resource Group Templates](/docs/guides/azure-deployments/resource-groups/index.md).

### Azure Web Apps {#DeployingtoAzure-AzureWebApps}

Octopus Deploy provides first-class support for deploying [web applications](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app/index.md) and [web jobs](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app/deploying-web-jobs.md) to the Azure App Service, including the ability to use [deployment slots](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app/using-deployment-slots-with-azure-web-apps.md). Follow our guide on [deploying Azure Web Apps](/docs/guides/azure-deployments/web-apps/index.md) .

### Azure Cloud Services {#DeployingtoAzure-AzureCloudServices}

Octopus Deploy provides first-class support for deploying cloud services into Microsoft Azure including the ability to use [deployment slots and VIP swaps](/docs/guides/azure-deployments/cloud-services/vip-swap.md). Follow our guide on [deploying Azure Cloud Services](/docs/guides/azure-deployments/cloud-services/index.md).

### Azure PowerShell Scripts {#DeployingtoAzure-AzurePowerShellScripts}

Octopus Deploy provides a convenient step for [executing PowerShell scripts using the Azure cmdlets](/docs/deploying-applications/custom-scripts/azure-powershell-scripts.md), pre-authenticated with Azure using either a [Service Principal Account](/docs/infrastructure/azure/creating-an-azure-account/creating-an-azure-service-principal-account.md) or [Management Certificate Account](/docs/infrastructure/azure/creating-an-azure-account/creating-an-azure-management-certificate-account.md). You can use these scripts to provision Azure services that are required for your applications, or to deploy an application that doesn't have built-in steps in Octopus Deploy. Follow our guide on [running Azure PowerShell scripts](/docs/guides/azure-deployments/running-azure-powershell/index.md).

:::success
**Bring your own Azure PowerShell cmdlets**
Octopus Deploy ships with a version of the Azure PowerShell cmdlets so you can deploy applications as soon as you install Octopus Deploy. Microsoft Azure is changing very quickly, introducing more application services and PowerShell cmdlets frequently. You can use the built-in cmdlets if they cover everything you need, or you can [configure Octopus Deploy to use your own custom version of the Azure PowerShell cmdlets](/docs/guides/azure-deployments/running-azure-powershell/configuring-the-version-of-the-azure-powershell-modules.md).
:::

## Deploying to Azure via a firewall {#DeployingtoAzure-DeployingtoAzureviaafirewall}

If you need to add firewall exclusions to a whitelist:

- Figure out which Azure Data Centers you will be targeting
- Figure out which Azure services you will be targeting in those Data Centers
- Configure a whitelist from the Octopus Server (where the deployments are performed) to the appropriate IP Address Ranges

Download the latest list of IP Address Ranges from the [Microsoft Download Center](https://www.microsoft.com/download/details.aspx?id=41653) (updated weekly).
