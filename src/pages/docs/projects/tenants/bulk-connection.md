---
layout: src/layouts/Default.astro
pubDate: 2023-09-01
modDate: 2023-09-01
title: Bulk connection
description: The bulk tenant connection feature allows you to connect thousands of tenants to a project in a single operation.
navOrder: 10
---

:::div{.hint}
The Project bulk tenant connection feature was added in Octopus Deploy **2023.3**
:::

Using the bulk tenant connection feature, you can connect tens, hundreds or thousands of tenants to a project in a single operation.

1. From the project's main page, select **Tenants**.
2. Click **CONNECT TENANTS**
3. Choose the tenants you want to connect to your project, by clicking any tenant in the left-hand panel of the wizard. Click the **-** button of a tenant in the right-hand panel to deselect that tenant.
4. Once you have selected the tenants you want to connect, click **NEXT**.
5. Choose the [environments](/docs/infrastructure/environments) you want the selected tenants to be connected to. You can select just one or two from the drop-down menu, or click **Assign all available environments** to select all available environments.
6. A preview of the selected tenants and environments is shown in the Connection preview panel. Once you are happy with the selected tenants and environments they will be connected to, click **CONNECT <N> TENANTS**
7. Octopus will start connecting your selected tenants to the project in the background. You can navigate away from the page and Octopus will continue the operation until it's done.

:::div{.hint}
If some of your tenants should be connected to a different subset of environments, you can perform a bulk connection for each unique set of environments. For example, if majority of your tenants should be connected to the `Production` environment, but a small number of tenants should be connected to both `Test` and `Production`, you would perform two bulk connection operations.
:::

### Filtering during tenant selection
:::figure
![](/docs/projects/tenants/bulk-connection-filters.png)
:::
You can use the Name and Tenant Tag filters to find a specific tenant or set of tenants to connect to your project. Tenant Tag filters can be accessed by clicking **Expand Filters**.

When filters are active, clicking **SELECT ALL <N> RESULTS** will add all tenants that match your filters to your selection. You can perform multiple rounds of filtering and selecting to select the exact set of Tenants you want to connect to the project.

### During the connection operation
:::figure
![](/docs/projects/tenants/bulk-connection-in-progress.png)
:::

A status indicator will show the progress of the operation, and the tenant list will be updated as tenants are connected. You can navigate away from the page at any time, and the operation will continue. All users with permission to view the project will be able to see the progress of the connection.

Only one bulk connection may be performed per project. If there's a connection operation already in progress, **CONNECT TENANTS** will be disabled until it finishes.

### After the connection operation
:::figure
![](/docs/projects/tenants/bulk-connection-completed.png)
:::

The results of the most recent connection operation for a project will be shown for 24 hours after the operation completes.