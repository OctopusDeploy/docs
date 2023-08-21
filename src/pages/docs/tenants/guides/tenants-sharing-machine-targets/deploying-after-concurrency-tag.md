---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Deploying after the concurrency tag is changed
description: Shows the impact of setting the concurrency tag on deployments to the same target
navOrder: 10
hideInThisSectionHeader: true
---

## Deploying Before the Concurrency Tag is Changed

If we deploy a release to all tenants at the same time now, we see that three tasks are running while the others are queued. That is one task per hosting group. While the other tasks are queued, tasks from other projects are able to run. Before making the change to the concurrency tag, all of these tasks would run concurrently and potentially block tasks from other projects from running.

:::figure
![](/docs/tenants/guides/tenants-sharing-machine-targets/images/all-groups-sequential-in-progress.png "width=500")
:::

Once the deployments are complete, we can see that each of the deployments took about 45 seconds. That's an improvement from the 2-3 minutes that we saw before. But since these are running sequentially, the total time from the first deployment starting to the last deployment finishing is about 4 minutes. We can't guarantee that this approach will lead to a shorter total deployment time, though we would expect that result as the number of tenants, steps, and hosting groups grow.

What this approach does give us is a consistent deployment time for all tasks, an efficient use of task cap that allows other projects' tasks to run at the same time, and a scalable approach that can support many hosting groups.

For example, since this setup only uses 3 of our active tasks, we can add many hosting groups before we reach our task cap. Until we have reached the task cap, we can expect that many groups of 5 tenants would still take about 4 minutes to complete. The default concurrent approach would saturate the task cap and eventually take longer than the sequential approach.

:::figure
![](/docs/tenants/guides/tenants-sharing-machine-targets/images/all-groups-sequential-complete.png "width=500")
:::

If we look at the deployment to Group 1 - Tenant E, we see that it no longer had to wait for other tasks, and each of the steps finish quickly. This is important if you need to minimize the times between certain steps running.

:::figure
![](/docs/tenants/guides/tenants-sharing-machine-targets/images/deployment-details-sequential.png "width=500")
:::

<span><a class="button btn-secondary" href="/docs/tenants/guides/tenants-sharing-machine-targets/setting-the-concurrency-tag">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="button btn-success" href="/docs/tenants/guides/tenants-sharing-machine-targets/summary">Next</a></span>