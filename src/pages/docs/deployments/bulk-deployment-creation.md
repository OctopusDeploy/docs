---
layout: src/layouts/Default.astro
pubDate: 2023-09-13
modDate: 2023-09-13
title: Bulk deployment creation
description: Octopus Deploy can use bulk deployment creation when deploying to multiple environments or tenants
navOrder: 170
---

:::div{.hint}
Bulk deployment creation will be available from Octopus Deploy **2023.4**
:::

With bulk deployment creation, you will be redirected to a new server task upon deploying a release to multiple environments or tenants through Octopus Portal. There you will find each requested deployment as task summary items, which will display progress and any errors.

:::figure
![](/docs/deployments/bulk-deployment-creation.png)
:::

You can also navigate away from the server task and it will continue creating deployments in the background.

If you need to return to a bulk deployment creation server task, you can navigate to the **Tasks** page and use the task filter to select **Bulk deployment creation** task types.

# Retrying deployment creation failures
To retry failed requested deployments, navigate to the bulk deployment server task with the failed requested deployments and click **Re-run**. This will create a new server task that attempts to recreate only those deployments that failed to create previously.

:::figure
![](/docs/deployments/bulk-deployment-creation-retry.png)
:::

# Permissions
Permissions will need to be scoped to all requested environments and tenants when creating, viewing, or re-running a bulk deployment server task.

For example, imagine a bulk deployment creation server task that creates deployments in the 
* Car Rental project 
* To the Development environment 
* For tenants Norfolk and Des Moines

You will only be allowed to view, retry, cancel or edit the server task if your user has permissions scoped to the Car Rental project, Development environment, and both Norfolk and Des Moines tenants. However, you only need permissions scoped to the project to view the server task on the **Tasks** page.

# Retention
Bulk deployment creation server tasks older than 90 days become eligible for retention and will automatically be removed by Octopus Server.