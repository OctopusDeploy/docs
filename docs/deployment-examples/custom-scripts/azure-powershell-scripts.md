---
title: Azure PowerShell Scripts
description: Azure PowerShell scripts allow you to manage your Azure subscription using the Azure PowerShell SDK for the Resource Management (RM) or Service Management (SM) API as part of your deployment process.
position: 80
---

You can use all of the features we provide for [custom scripts](/docs/deployment-examples/custom-scripts/index.md), like [using variables](/docs/deployment-examples/custom-scripts/using-variables-in-scripts.md), [passing parameters](/docs/deployment-examples/custom-scripts/passing-parameters-to-scripts.md), publishing [output variables](/docs/deployment-examples/custom-scripts/output-variables.md) and [collecting artifacts](/docs/deployment-examples/custom-scripts/index.md#Customscripts-Collectingartifacts).

You can manage your Azure subscription using the Azure PowerShell SDK for the Resource Management (RM) or Service Management (SM) API as part of your deployment process.

![](/docs/images/5671696/5865912.png "width=170")

These scripts are executed on the Octopus Server and will be pre-authenticated using the selected Azure Account. For information about adding a step to the deployment process, see the [add step](/docs/deployment-process/steps/index.md) section.

:::hint
Refer to [this guide](/docs/infrastructure/deployment-targets/azure/index.md) for more details, and the impact of choosing the right kind of Azure Account on the Azure SDK that will be available.
:::

## Example {#AzurePowerShellscripts-Example}

This example uses the Service Management API to create a new Staging slot as part of the [blue/green deployment sample for Azure Web Apps](/docs/deployment-examples/azure-deployments/deploying-a-package-to-an-azure-web-app/using-deployment-slots-with-azure-web-apps.md).

```powershell
#Remove the staging slot if it exists
Remove-AzureWebsite -Name #{WebSite} -Slot Staging -Force

#Create the staging slot
New-AzureWebsite -Name #{WebSite} -Slot Staging
```

![](/docs/images/5669045/5865518.png)

## Bring Your Own Azure SDK {#AzurePowerShellscripts-BringyourownAzureSDK}

We bundle a version of the Azure SDKs with Octopus Server so you can start deploying to Azure very quickly. In certain situations you may want (or need) to use a different version of the Azure SDK. Refer to [this guide](/docs/deployment-examples/azure-deployments/running-azure-powershell/configuring-the-version-of-the-azure-powershell-modules.md) for more details.
