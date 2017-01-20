---
title: Azure PowerShell scripts
position: 1
---


:::success
You can use all of the features we provide for [custom scripts](/docs/home/deploying-applications/custom-scripts.md), like [using variables](/docs/home/deploying-applications/custom-scripts.md), [passing parameters](/docs/home/deploying-applications/custom-scripts.md), publishing [output variables](/docs/home/deploying-applications/custom-scripts.md) and [collecting artifacts](/docs/home/deploying-applications/custom-scripts.md).
:::


You can manage your Azure subscription using the Azure PowerShell SDK for the Resource Management (RM) or Service Management (SM) API as part of your deployment process.


![](/docs/images/5671696/5865912.png)


These scripts are executed on the Octopus Server and will be pre-authenticated using the selected Azure Account. For information about adding a step to the deployment process, see the [add step](http://docs.octopusdeploy.com/display/OD/Add+step) section.

:::hint
Refer to [this guide](/docs/home/guides/azure-deployments/creating-an-azure-account.md) for more details, and the impact of choosing the right kind of Azure Account on the Azure SDK that will be available.
:::

## Example


This example uses the Service Management API to create a new Staging slot as part of the [blue/green deployment sample for Azure Web Apps](/docs/home/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app/using-deployment-slots-with-azure-web-apps.md).

```powershell
#Remove the staging slot if it exists
Remove-AzureWebsite -Name #{WebSite} -Slot Staging -Force
 
#Create the staging slot
New-AzureWebsite -Name #{WebSite} -Slot Staging
```





![](/docs/images/5669045/5865518.png)

## Bring your own Azure SDK


We bundle a version of the Azure SDKs with Octopus Server so you can start deploying to Azure very quickly. In certain situations you may want (or need) to use a different version of the Azure SDK. Refer to [this guide](/docs/home/guides/azure-deployments/running-azure-powershell/configuring-the-version-of-the-azure-powershell-modules.md) for more details.
