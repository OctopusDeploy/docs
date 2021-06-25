---
title: Creating Azure tenant infrastructure
description: Create tenant infrastructure in Azure as part of a multi-tenant SaaS setup in Octopus Deploy.
position: 50
hideInThisSectionHeader: true
---

One of the most convenient aspects of Platform as a Service (PaaS) is the ability to spin up and tear down resources quickly.  This ability can be used for a number of different reasons: feature branching, testing, cost savings, etc... 

You can use runbooks in Octopus to spin up resources in Azure.

To provision an Azure App Service, there are a couple of things that need to be in place:
- Resource group
- App Service Plan

:::hint
We recommend grouping the resources for testing a feature branch into their own Azure Resource Group.  Doing this makes it easier to make sure you destroy all the resources you created by simply deleting the resource group itself.
:::

## Create variables



## Create the runbook

:::hint
A quick way to create the App Service Plan is go use the Azure Portal UI to begin the creation process, and export the App Plan as an Azure Resource Manager (ARM) template and use that as a basis to start from.
:::

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
2. Give the runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a **Run an Azure script** step.
5. Create an Azure Resource Group using the following code:


<span><a class="btn btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application/creating-new-tenants">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/tenants/guides/multi-tenant-saas-application/creating-tenant-tags">Next</a></span>