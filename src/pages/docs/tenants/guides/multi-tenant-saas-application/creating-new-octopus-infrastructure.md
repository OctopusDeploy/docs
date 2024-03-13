---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Creating new infrastructure
description: Create infrastructure for each tenant used as part of a multi-tenant SaaS setup in Octopus Deploy.
navOrder: 60
hideInThisSectionHeader: true
---

In this section, we need to add our infrastructure and associate it with our tenants. All external customers have a production environment, with some having the optional staging environment.   We only need to add a deployment target for each environment our tenant (customer) deploys to. Since our application is hosted on Azure Web Apps, we need to add an [Azure Web App deployment target](/docs/infrastructure/deployment-targets/azure/web-app-targets).

To add a new Azure Web Target, go to **Infrastructure ➜ Deployment Targets** and click **ADD DEPLOYMENT TARGET**.

:::figure
![](/docs/tenants/guides/multi-tenant-saas-application/images/creating-new-deployment-target.png)
:::

Next, go to **Azure ➜ Azure Web App** and click **ADD**. Then, add a **Display Name**, **Environment** and **Target Role**.

:::figure
![](/docs/tenants/guides/multi-tenant-saas-application/images/adding-new-deployment-target-details-1.png)
:::

Choose the Azure **Account**, **Azure Web App** and *optionally* **Azure Web App Slot** and **Worker Pool**.

Lastly associate the deployment target with a tenant.

:::figure
![](/docs/tenants/guides/multi-tenant-saas-application/images/adding-deployment-target-details-tenant.png)
:::

Repeat these steps for the rest of your deployment targets and tenants.

In the next step, we'll create the [deployment process](/docs/tenants/guides/multi-tenant-saas-application/creating-project-deployment-process) needed for this scenario.

<span><a class="button btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application/creating-project-template-variables">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="button btn-success" href="/docs/tenants/guides/multi-tenant-saas-application/creating-project-deployment-process">Next</a></span>