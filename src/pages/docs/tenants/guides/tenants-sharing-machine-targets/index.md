---
layout: src/layouts/Default.astro
pubDate: 2023-08-21
modDate: 2023-08-21
title: Tenants sharing machine targets
description: A guide showing you how to handle tenanted deployments to shared machine infrastructure.
navOrder: 10
hideInThisSectionHeader: true
---

This guide introduces a pattern for deploying the same application per tenant to the same machine target, either a Tentacle or SSH connection. A common issue with this pattern is that the [Deployment Mutex](https://octopus.com/docs/administration/managing-infrastructure/run-multiple-processes-on-a-target-simultaneously) can cause deployment tasks to spend a lot of time checking and waiting for the mutex to be released. This can lead to an inefficient use of the task queue, especially as the number of tenants sharing the target grows.

In this guide, we will use a [tenant tag set](https://octopus.com/docs/tenants/tenant-tags) to represent the hosting groups and connect the tenants to the shared infrastructure. The tag set will also be used to set the `Octopus.Task.ConcurrencyTag` system variable to limit the number of tasks that can be processed concurrently per hosting group. We're essentially building a rolling deployment over our tenants.

<span><a class="button btn-success" href="/docs/tenants/guides/tenants-sharing-machine-targets/creating-the-tenant-tag-set">Get Started</a></span>

## Guide contents

The following sections make up the guide:

- [Creating the tenant tag set](/docs/tenants/guides/tenants-sharing-machine-targets/creating-the-tenant-tag-set)
- [Assign tags to tenants](/docs/tenants/guides/tenants-sharing-machine-targets/assign-tags-to-tenants)
- [Assign tags to targets](/docs/tenants/guides/tenants-sharing-machine-targets/assign-tags-to-targets)
- [Deploying before setting the concurrency tag](/docs/tenants/guides/tenants-sharing-machine-targets/deploying-before-concurrency-tag)
- [Setting the concurrency tag](/docs/tenants/guides/tenants-sharing-machine-targets/setting-the-concurrency-tag)
- [Deploying after setting the concurrency tag](/docs/tenants/guides/tenants-sharing-machine-targets/deploying-after-concurrency-tag)
- [Summary](/docs/tenants/guides/tenants-sharing-machine-targets/summary)