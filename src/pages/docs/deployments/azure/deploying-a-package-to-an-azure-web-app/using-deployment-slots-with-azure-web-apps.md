---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Using Deployment Slots with Azure Web Apps
description: Deploying Slots provide a nice way to implement Blue-Green deployments for Azure Web Apps.
---

[Deployment Slots](https://azure.microsoft.com/en-us/documentation/articles/web-sites-staged-publishing/) provide a nice way to implement [Blue-Green deployments](http://martinfowler.com/bliki/BlueGreenDeployment.html) for Azure Web Apps.

This provides many benefits, including:

- Reduced down-time when deploying.
- When deploying packages with a large number of files, deployment times can be significantly reduced due to not having to compare with existing files (this assumes you are deploying to a clean slot).
- Roll-back can be achieved by simply swapping the slots back.

:::div{.warning}
Deployment Slots are only available to Azure Web Apps running in Standard or Premium [App Service plans](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/)
:::

## Walk-Through {#UsingDeploymentSlotswithAzureWebApps-Walk-Through}

Here we will give an example of how to setup a Blue-Green deployment for an Azure Web App using Deployment Slots.
The scripts below assume you have a variable named 'WebSite' that contains the name of your Azure Web Site and 'ResourceGroup' that contains the Azure Resource Group Name.

### Step 1: Create an Azure Web App Deployment Target

Follow the steps for [Azure Web App targets](/docs/infrastructure/deployment-targets/azure/web-app-targets).

### Step 2: Create Staging Slot {#UsingDeploymentSlotswithAzureWebApps-Step1-CreateStagingSlot}

Create a [Run an Azure PowerShell Script](/docs/deployments/azure/running-azure-powershell) step.

:::figure
![](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app/azure-powershell-script-step.png "width=500")
:::

Your script should be:

**Azure Service Management**

```powershell
#Remove the staging slot if it exists
Remove-AzureWebsite -Name #{WebSite} -Slot Staging -Force

#Create the staging slot
New-AzureWebsite -Name #{WebSite} -Slot Staging
```

**Azure Resource Manager**

```powershell
#Remove the staging slot if it exists
Remove-AzureRMWebAppSlot -Name #{WebSite} -Slot Staging -ResourceGroupName #{ResourceGroup} -Force -ErrorAction Continue

#Create the staging slot
New-AzureRMWebAppSlot -Name #{WebSite} -Slot Staging -ResourceGroupName #{ResourceGroup}
```

:::div{.hint}
The first line of the script removes the Staging Slot to ensure we are deploying to a clean slot. This can significantly reduce the time taken for deployments with large numbers of files as it avoids having to calculate the set of files which have changed by comparing timestamps or checksums. For deployments with a smaller number of files, this may well not be any quicker.
:::

So your step should look like:

:::figure
![](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app/azure-remove-staging-slot-script.png "width=500")
:::

### Step 3: Deploy Your Package {#UsingDeploymentSlotswithAzureWebApps-Step2-DeployyourPackage}

The next step is to deploy your package to the Staging slot.  We do this by creating a [Deploy an Azure Web App](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app) step.

:::figure
![](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app/deploy-azure-web-app-step.png "width=500")
:::

![](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app/azure-web-app-selector-with-slot.png "width=500")

You can enter the name of deployment slot in the **Deployment Slot** field, or to use a variable for the Slot name, click the "Bind" button, and enter

```
#{WebAppSlotName}
```

As shown below:

:::figure
![](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app/azure-web-app-slot-binding.png "width=500")
:::

:::div{.info}

You can choose to specify the slot directly on the deployment target, or directly on the step (if you wish to deploy to multiple different slots on the same Web App Service, for example), however, the slot on the target will take priority.
:::

### Step 4: Swap the Staging and Production Slots {#UsingDeploymentSlotswithAzureWebApps-Step3-SwaptheStagingandProductionSlots}

The final step is to create another Azure PowerShell step to swap the Staging and Production slots.

Use the PowerShell:

**Azure Service Management**

```powershell
# Swap the staging slot into production
Switch-AzureWebsiteSlot -Name #{WebSite} -Slot1 Staging -Slot2 Production -Force
```

**Azure Resource Management**

```powershell
# Swap the staging slot into production
Switch-AzureRmWebAppSlot -ResourceGroupName #{ResourceGroup} -Name #{Website} -SourceSlotName Staging -DestinationSlotName Production
```

So your step will appear as:

:::figure
![](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app/azure-web-app-swap-slots-script.png "width=500")
:::

At this point you should have a working Blue-Green deployment process for your Azure Web App.

:::figure
![](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app/azure-web-app-with-slots-process.png "width=500")
:::

## Learn more

- Generate an Octopus guide for [Azure and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Azure%20websites).

