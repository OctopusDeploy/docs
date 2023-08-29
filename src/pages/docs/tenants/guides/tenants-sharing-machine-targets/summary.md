---
layout: src/layouts/Default.astro
pubDate: 2023-08-21
modDate: 2023-08-21
title: Summary and FAQ
description: Shows the impact of setting the concurrency tag on deployments to the same target
navOrder: 80
hideInThisSectionHeader: true
---

When deploying multiple tenants to same machine-based targets, we may see longer than expected deployment times due to the deployment mutex. While bypassing the mutex is possible, it is often not the best solution, especially for deployments that will be updating or using the same resources on a machine.

By updating the `Octopus.Task.ConcurrencyTag` variable, we can run tenanted deployments to shared machines sequentially. This process provides a more consistent deployment duration per task, efficient use of task cap, and a potentially shorter deployment duration overall.

The exact results you see from using this approach will depend on many factors specific to your environment. It is highly recommended to test this approach in a non-production environment before applying to your production deployments.

If you have any questions about this scenario, please reach out to <support@octopus.com>

## FAQ

**Will the queued tasks block tasks from other projects?**

No, Octopus will continue to run other tasks as long as the number of tasks is lower than the task cap.

**Is OctopusBypassDeploymentMutex a viable option?**

It is highly dependent on what is being deployed and how. This is a risk of failure if any of the task access shared resources. Using the concurrency tag is the safer option.

**Can I deploy my app to all tenants within a single task?**

No, each tenant requires a separate task per deployment. If you always deploy to all tenants in a hosting group concurrently, it is worth considering another way of modeling your tenants. You can contact <support@octopus.com> for advice on how to model your scenario.

<span><a class="button btn-success" href="/docs/tenants/guides/tenants-sharing-machine-targets/deploying-after-concurrency-tag">Previous</a></span>