---
title: VIP Swap
position: 3
---


The guide demonstrates how to perform a VIP swap when deploying to Azure Cloud Services.

:::success
**VIP swaps enable Blue/Green Deployments**
VIP swap is a great way for you to implement [Blue-green deployments](/docs/home/patterns/blue-green-deployments.md) using Azure Cloud Services and Octopus Deploy. The typical process is to:

1. Deploy a fully configured application into the "staging" slot in Azure
2. Run manual/automated tests on your "staging" slot
3. Perform a VIP swap, which simply swaps the "staging" and "production" slots over, resulting in your newly deployed application moving into the "production" slot and beginning to accept requests, and your previous production instance being moved down into the "staging" slot, at which point you can:
 1. Delete the "staging" slot to free up resources/costs
 2. Keep the previous version in "staging" in case you want to roll back - which is as easy as performing another VIP swap.
:::

:::hint
When Octopus performs the VIP swap for a Cloud Service it simply calls `Move-AzureDeployment -ServiceName $OctopusAzureServiceName`. You can see the script in our open source [Calamari](https://github.com/OctopusDeploy/Calamari) project [here](https://github.com/OctopusDeploy/Calamari/blob/master/source/Calamari.Azure/Scripts/SwapAzureCloudServiceDeployment.ps1).
:::


In order to complete this guide you should have a Cloud Service project set up in Octopus Deploy that is deploying to the staging or production slot.  Please see [Getting started with Azure Cloud Services](/docs/home/guides/azure-deployments/cloud-services/getting-started-with-azure-cloud-services.md) for more information.

## Environment configuration


The easiest way to configure Octopus for VIP swapping is to map Cloud Service slots to Octopus environments. By default a Cloud Service has a staging and production slot.  In order to map this in Octopus, create Staging and Production environments:


![](/docs/images/3049344/3278529.png)

## Enabling VIP swap


In order to enable VIP swapping, edit the process of your Cloud Service project and toggle the Swap setting to "Swap staging to production if possible":


![](/docs/images/3049344/3278530.png)


With this setting enabled Octopus will attempt to swap the staging and production slots but, in the example above, it is always deploying to the staging slot.  In order to perform a VIP swap we want to first deploy to Staging and then Production.  In order to do this in Octopus, edit the Cloud Service process and replace the Slot setting with a variable that resolves the environment name.  Press the square to the right of the Slot field to enable variable binding and enter #{Octopus.Environment.Name}:


![](/docs/images/3049344/3278531.png)

## Performing a VIP swap


In order to perform a VIP swap you must have a deployment in your Cloud Service production slot. The first time you create a release and deploy it to Staging and then Production it will not VIP swap. On subsequent deployments to Staging and then Production a VIP swap will occur:


![](/docs/images/3049344/3278532.png)

## Automatic VIP swap


A production VIP swap can be automatically performed after a successful staging deployment through the use of lifecycles. A lifecycle should be configured with two phases: Staging and Production.  The Staging phase contains the Staging environment and the Production phase contains the Production environment. The Production environment should be configured with "Deploy automatically to this environment as soon as the release enters this phase.":


![](/docs/images/3049344/3278533.png)


Configure the Cloud Service project to use the newly created lifecycle from the project process tab:


![](/docs/images/3049344/3278534.png)


Now each time a release is deployed to staging it will automatically perform a VIP swap with production.
