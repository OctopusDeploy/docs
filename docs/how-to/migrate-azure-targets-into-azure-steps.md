---
title: Migrate Azure Targets into Azure Steps
position: 24
---


:::hint
Azure Cloud Service and Web App Targets were deprecated in Octopus Deploy 3.1 (though they were still available for use).


Ability to create Azure Targets was removed in Octopus Deploy 3.4.


Deployment using existing Targets is still currently supported, but will be removed in a future release.
:::





The Azure Cloud Service and Web App Deployment Targets introduced in Octopus 3.0 were deprecated in favour of [Cloud Service](/docs/home/guides/azure-deployments/cloud-services/cloud-service-concepts/cloud-service-deployment-step.md) and [Web App](/docs/home/guides/azure-deployments/web-apps/web-app-concepts/web-app-deployment-step.md) Steps.  The reasoning behind that decision is explained in [this pos](https://octopus.com/blog/azure-changes)t.

## Migrating

### Create Azure Step/s


The process of migrating your Azure Targets into Deployment Steps is relatively simple (unfortunately it was unable to be automated).


In your existing Deployment Process, you will have a *Deploy a Package*step, which is the Step responsible for deploying your package to the Azure Target.  This Step should be **replaced** by either a *[Deploy an Azure Cloud](/docs/home/guides/azure-deployments/cloud-services/cloud-service-concepts/cloud-service-deployment-step.md) Service* or *[Deploy an Azure Web App](/docs/home/guides/azure-deployments/web-apps/web-app-concepts/web-app-deployment-step.md)* Step as appropriate.


![](/docs/images/5669687/5865627.png)


You will use the same package as your original step, and the values supplied to the new step should generally be the same as those previously configured in the Target.  For example in the image below you can see that the *Deploy an Azure Web App*step now contains fields such as *Account*, *Web App*, *Physical Path*, etc, that were previously configured on the *Azure Web App* Target.


![](/docs/images/5669687/5865628.png)


The Azure Steps do not require a Deployment Target (you can deploy to an empty Environment).  The target is effectively specified in the Step.  They will ignore any Targets in the Environment being deployed to, with the exception of [Cloud Regions](/docs/home/deployment-targets/cloud-regions.md) (see *Deploying to Multiple Regions* below).

### Remove Azure Targets


Once the new Steps have been created, you can remove the deprecated Azure Deployment Target/s.

## Deploying to Multiple Regions


Using the deprecated Azure Targets, a common pattern was to create multiple Targets to represent different Azure Regions.  Deploying to the Environment would then concurrently deploy the package to all regions.


We introduced [Cloud Region Targets](/docs/home/deployment-targets/cloud-regions.md) to allow the same result to be achieved using the Azure Steps.
