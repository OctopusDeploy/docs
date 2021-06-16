---
title: Running Azure PowerShell
description: Octopus supports executing PowerShell against Azure and will automatically import the Azure PowerShell modules.
hideInThisSectionHeader: true
---

Octopus Deploy can help you run scripts on targets within Microsoft Azure.

These scripts typically rely on tools being available on the target worker.

We recommend that you provision your own tools on your worker - this way you can control what version of the tools are provisioned, and ensure their compatibility with the scripts you are trying to execute.

:::warning
Using the Azure tools bundled with Octopus Deploy is not recommended. Octopus bundles versions of the Azure Resource Manager Powershell modules (AzureRM) and Azure CLI. These were originally provided as convenience mechanisms for users wanting to run scripts against Azure targets. The versions bundled are now out of date, and we will not be updating them further.

From **Octopus 2021.2**, a warning will also appear in the deployment logs if the Azure tools bundled with Octopus Deploy are used in a step.

We recommend you configure Octopus Deploy to use your own [version of the Azure PowerShell cmdlets](configuring-the-version-of-the-azure-powershell-modules.md) and [version of the Azure CLI](configuring-the-version-of-the-azure-cli.md).
:::

When executing PowerShell against Azure, Octopus Deploy will automatically use your configured Azure account details to authenticate you into the [AzureRM PowerShell modules](https://docs.microsoft.com/powershell/azure/azurerm/overview), the [Azure PowerShell modules](https://docs.microsoft.com/powershell/azure/overview), and [Azure CLI tools](https://docs.microsoft.com/cli/azure/), if they exist on the worker executing the script.

This applies to:

- 'Run an Azure Script' steps.
- Scripts packaged or configured with [Deploying a package to an Azure Cloud Service](/docs/deployments/azure/cloud-services/index.md) or [Azure Web App](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app/index.md) steps.

This functionality requires the Azure CLI version 2.0 or above to be installed on the worker.

**Choosing the right Azure account type**

Azure supports two authentication methods, each of which provides access to a different set of Azure APIs:

- To use the Azure Service Management (ASM) API, use an [Azure Management Certificate Account](/docs/infrastructure/accounts/azure/index.md#azure-management-certificate).
- To use the Azure Resource Management (ARM) API, use an [Azure Service Principal Account](/docs/infrastructure/accounts/azure/index.md#azure-service-principal).
  - The ARM PowerShell cmdlets are prefixed with `AzureRM`, like `Get-AzureRMWebApp`.
  - The Az PowerShell cmdlets are prefixed with `Az`, like `Get-AzWebApp`.

Learn more about [configuring the right Azure Account](/docs/infrastructure/accounts/azure/index.md).

## Dynamic Worker Pools

Octopus Cloud uses a special type of worker pool called a [Dynamic Worker Pool](/docs/infrastructure/workers/dynamic-worker-pools.md). Octopus provides these, and you cannot easily install custom versions of the Azure tools on them. To use your own version of the Azure CLI or Azure Powershell cmdlets when using Dynamic Worker Pools, please do the following:

- Configure your step to use a Dynamic Worker pool that supports [execution containers](/docs/projects/steps/execution-containers-for-workers/index.md). You may need to create a new worker pool using one of the images that support execution containers.
- Configure your step to run in an execution container, selecting a docker image that contains the versions of the Azure CLI or Azure Powershell cmdlets that you would like to use. For more information about selecting an image to use, see the [Which Docker images can I use?](/docs/projects/steps/execution-containers-for-workers/index.md#which-image) section.

## Run an Azure PowerShell script step {#RunningAzurePowerShell-RunanAzurePowerShellScriptStep}

Octopus Deploy provides a *Run an Azure PowerShell Script* step type, for executing PowerShell in the context of an Azure Subscription. For information about adding a step to the deployment process, see the [add step](/docs/projects/steps/index.md) section.

![](5865912.png "width=170")

![](azure-new-powershell-script-step.png "width=500")

## Learn more

- Generate an Octopus guide for [Azure and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Azure%20websites).
