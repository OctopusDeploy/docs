---
layout: src/layouts/Default.astro
pubDate: 2023-09-13
modDate: 2023-09-13
title: Bulk deployment creation
description: Octopus Deploy can use bulk deployment creation when deploying to multiple environments or tenants
navOrder: 160
---

:::div{.hint}
Bulk deployment creation will be available from Octopus Deploy **2023.4**
:::

When deploying a release to multiple environments or tenants through the Octopus Portal, the bulk deployment creation feature will immediately take you to a new server task which will create a deployment for each environment or tenant you are deploying to.

In the bulk deployment creation server task, you can see the progress of deployments being created and any errors during creation.

:::figure
![](/docs/deployments/bulk-deployment-creation.png)
:::

You can also navigate away from the server task and it will continue creating deployments in the background.

If you need to return to a bulk deployment creation server task, you can go to the **Tasks** page and filter down to **Bulk deployment creation** task types.

# Retrying deployment creation failures
If a deployment to an environment or tenant fails to create, you can **Re-run** the bulk deployment creation server task. This will create a new server task that reattempts creating deployments for the environments or tenants that failed.

:::figure
![](/docs/deployments/bulk-deployment-creation-retry.png)
:::

# Permissions
To create, view or re-run a bulk deployment creation server task, your permissions will need to be scoped to at least all the environments and tenants that a bulk deployment creation server task is creating deployments for.

For example, imagine a bulk deployment creation server task that creates deployments in the 
* Car Rental project 
* To the Development environment 
* For tenants Norfolk and Des Moines

You'll only be able to perform operations against this server task if your permissions are scoped to *at least* the Car Rental project, the Development environment and Norfolk and Des Moines tenants.

There is one exception to the above. You only need sufficient project scoping on your permissions to view a bulk deployment server task on the **Tasks** page.

# Retention
Bulk deployment creation server tasks older than 90 days become eligible for retention and will automatically be removed by Octopus Server.