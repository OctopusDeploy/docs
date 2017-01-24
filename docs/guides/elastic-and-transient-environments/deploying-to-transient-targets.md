---
title: Deploying to transient targets
position: 0
---


:::hint
The features discussed in this guide are available in Octopus 3.4 and newer.
:::





Transient deployment targets are targets that are intermittently available for a deployment.  They frequently join and leave the network causing their deployment availability to become unpredictable. They might be:

- auto-scale instances that are provisioned and terminated,
- laptops that are taken home at night,
- client servers that go down for maintenance.



A typical Octopus deployment requires that all deployment targets are available when the deployment starts and will remain available while the deployment is in progress.  Elastic Environments provides mechanisms for deploying to targets that may become unavailable while a deployment is in progress. You can also run a health check during a deployment and, based on those results, opt to add or remove machines from the deployment.

## Deploying to targets that become unavailable during a deployment {#Deployingtotransienttargets-Deployingtotargetsthatbecomeunavailableduringadeployment}


This example uses the OctoFX project that does a deployment to two roles: **RateServer** and **TradingWebServer**. We have decided to auto-scale the machines in the **TradingWebServer** role and want to continue deploying the web site to the available machines, ignoring any machines that are no longer available, perhaps due to being scaled down.

1. Navigate to the OctoFX project process page
2. Select **Change machine connectivity settings**
![](/docs/images/5669265/5865548.png "width=500")
3. Check the box **Skip machines if they become unavailable during a deployment** and select the roles that can be skipped (**TradingWebServer**).  If no roles are selected, then any deployment target may be skipped:
![](/docs/images/5669265/5865551.png "width=500")
4. Create and deploy a release to an environment where deployment targets in the **TradingWebServer** role are unavailable. They will be automatically removed from the deployment:
![](/docs/images/5669265/5865552.png "width=500")


:::success
To ensure that a machine which has been skipped is kept up to date, consider [keeping deployment targets up to date](/docs/guides/elastic-and-transient-environments/keeping-deployment-targets-up-to-date.md).
:::

## Including and excluding targets during a deployment {#Deployingtotransienttargets-Includingandexcludingtargetsduringadeployment}


In this example, OctoFX will deploy to **RateServer** and then run a Health Check step before it deploys to **TradingWebServer,**ensuring that only currently available targets are involved in the deployment.

1. Navigate to the OctoFX project process page
2. Select **Add Step** and then select **Health check**:
![](/docs/images/5669265/5865566.png "width=500")
3. Configure the Health Check step, exclude deployment targets if they are unavailable and include new deployment targets if they are found:
![](/docs/images/5669265/5865567.png "width=500")
4. Save the step
5. Back at the deployment process, re-order the steps so that the **Health Check** step occurs before the **Trading Website** step.  This will ensure that deployment targets in the **TradingWebServer** role are re-evaluated before the trading web site is deployed:
![](/docs/images/5669265/5865598.png "width=500")
6. Deploy OctoFX to an environment that has some deployment targets in the **TradingWebServer** role that are disabled.  While the deployment is in progress (but before the Health Check step), enable the disabled targets and disable the enabled targets. When the Health Check step runs:


- - any enabled targets that were disabled at the start of the deployment will be included in the deployment
 - any disabled targets that were enabled at the start of the deployment will be excluded from the deployment

In this case, the machine **SWeb01** has been found and included in the rest of the deployment:
- ![](/docs/images/5669265/5865569.png "width=500")






Now that deployment targets can be automatically removed from a deployment, it may be useful to [keep them up to date when they become available.](/docs/guides/elastic-and-transient-environments/keeping-deployment-targets-up-to-date.md)
