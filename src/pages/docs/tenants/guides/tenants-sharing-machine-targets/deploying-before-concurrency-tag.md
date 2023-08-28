---
layout: src/layouts/Default.astro
pubDate: 2023-08-21
modDate: 2023-08-21
title: Deploying before the concurrency tag is changed
description: Shows the impact of the deployment mutex on concurrent deployments to the same target
navOrder: 50
hideInThisSectionHeader: true
---

If we deploy a release to all tenants at the same time, we see that all tasks are running concurrently. This will depend on your task cap and number of other tasks running at the same time.

:::figure
![](/docs/tenants/guides/tenants-sharing-machine-targets/all-groups-concurrent-in-progress.png "width=500")
:::

Once the deployments are complete, we can see that each of the deployments took 2-3 minutes. Since they were running concurrently, the total time for the deployment was a little over 3 minutes.

:::figure
![](/docs/tenants/guides/tenants-sharing-machine-targets/all-groups-concurrent-complete.png "width=500")
:::

If we look at one of the specific task logs, we can see that each step in the deployment to Group 1 - Tenant E had to wait for one or more other tasks to finish before it could start.

:::figure
![](/docs/tenants/guides/tenants-sharing-machine-targets/deployment-details-concurrent.png "width=500")
:::

The time required to complete a deployment in this scenario will grow based on the number of steps targeting the shared infrastructure and the number of tenants in that group being deployed at once. It can also cause tasks to queue for longer than expected since all of the tasks are running, they are consuming part of the task cap. If you have a task cap of 20, and three infrastructure groups that each host 50 tenants, the tasks for one group can cause the tasks for the other two groups to wait in the queue for quite a while.

To remedy this, we can set the `Octopus.Task.ConcurrencyTag` system variable.

<span><a class="button btn-secondary" href="/docs/tenants/guides/tenants-sharing-machine-targets/assign-tags-to-targets">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="button btn-success" href="/docs/tenants/guides/tenants-sharing-machine-targets/setting-the-concurrency-tag">Next</a></span>