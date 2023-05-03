---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Creating project deployment process
description: Create the project deployment process used as part of a multi-tenant SaaS setup in Octopus Deploy.
navOrder: 70
hideInThisSectionHeader: true
---

In this part of the guide, we'll create our deployment process to deploy our package to our deployment targets.  In this scenario, we have the following steps:

* Send slack message to notify team of deployment
* Create MySQL database
* Migrate Database Changes
* Deploy App to Azure App Service 
* Apply custom branding 
* Send Slack message on succesful deployment
* Send Slack message on failed deployment

![](/docs/tenants/guides/multi-tenant-saas-application/images/creating-new-deployment-process.png "width=500")

The step named **Apply Custom Branding** only needs to run for tenants that have a tenant tag of `Branding` associated with them. 

To configure this, go into your step, under **Conditions**, expand the **Tenants** option and select the `Branding` tag from the `Custom Feature` Tag set.

![](/docs/tenants/guides/multi-tenant-saas-application/images/apply-custom-branding-step.png "width=500")

This will ensure this step only runs for tenants that have the `Branding` tag applied.

The final step in the guide will [create and deploy a release](/docs/tenants/guides/multi-tenant-saas-application/creating-project-release) of our application.

<span><a class="button btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application/creating-new-octopus-infrastructure">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="button btn-success" href="/docs/tenants/guides/multi-tenant-saas-application/creating-project-release">Next</a></span>