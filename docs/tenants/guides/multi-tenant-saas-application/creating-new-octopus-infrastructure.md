---
title: Creating new infrastructure
description: Create infrastructure for each tenant used as part of a multi-tenant SaaS setup in Octopus Deploy.
position: 60
hideInThisSectionHeader: true
---

In this section, we need to add and associate our infrastructure to our tenants. Some customers have a staging environment, and some have only a production environment, so we will only need to add a deployment target for environments to the tenants.

To add a new Azure Web Target, go to **{{Infrastrucure, Deployment Targets Templates, ADD DEPLOYMENT TARGET}}**

![](images/creating-new-deployment-target.png "width=500")

Next, go to **{{Azure, Azure Web App, ADD}}**

Add a Display Name, Environment and Target Role.

![](images/adding-new-deployment-target-details-1.png "width=500")

If you're adding an Azure Web App, fill in the Azure subscription, Azure Web App and optionaly Azure Web App Slot and Worker Pool.

Next, associate the deployment target with a tenant.

![](images/adding-new-deployment-target-details-tenant.png "width=500")

Do this for the rest of your deployment targets and tenants.

In the next step, we'll create the [deployment process](/docs/tenants/guides/multi-tenant-saas-application/creating-project-deployment-process.md) needed for this scenario.

<span><a class="btn btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application/creating-project-template-variables">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/tenants/guides/multi-tenant-saas-application/creating-project-deployment-process">Next</a></span>