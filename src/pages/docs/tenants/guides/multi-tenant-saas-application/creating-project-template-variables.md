---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Creating project template variables
description: Create variables for each tenant used as part of a multi-tenant SaaS setup in Octopus Deploy.
navOrder: 50
hideInThisSectionHeader: true
---

Each customer has their own database for every environment with a unique name. To make this manageable we can create [project template variables](/docs/tenants/tenant-variables/#project-variables) for the database name.

Project templates define variables that are required to be provided by each tenant. You can specify the variable type, just like regular variables. You can also provide a default value which the tenant can overwrite.

To create a Project Template navigate to the **Variables ➜ Project Templates** tab in your tenant connected project and click **ADD TEMPLATE**.

:::figure
![](/docs/tenants/guides/multi-tenant-saas-application/images/creating-new-project-variable-templates.png "width=500")
:::

Next, add a **Variable Name**, **Label**, any **Help text**, and **Control Type**. Lastly, choose an *optional* Default value.

:::figure
![](/docs/tenants/guides/multi-tenant-saas-application/images/add-new-project-variable-template.png "width=500")
:::

Next, we need to provide variable values for each tenant. To do this, navigate to the **Tenants** menu, choose your tenant and click **Variables**.

:::figure
![](/docs/tenants/guides/multi-tenant-saas-application/images/adding-tenant-variables.png "width=500")
:::

Next, fill in the variable value for **Database Name** for each connected environment

:::figure
![](/docs/tenants/guides/multi-tenant-saas-application/images/adding-tenant-variables-database-name.png "width=500")
:::

Repeat these steps for each of your tenants.

The next step will define the [infrastructure](/docs/tenants/guides/multi-tenant-saas-application/creating-new-octopus-infrastructure) required to deploy our application.

<span><a class="button btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application/creating-new-tenants">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="button btn-success" href="/docs/tenants/guides/multi-tenant-saas-application/creating-new-octopus-infrastructure">Next</a></span>