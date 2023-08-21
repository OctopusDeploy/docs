---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Assign tags to targets
description: Assign hosting tags to targets to map tenants to those targets.
navOrder: 10
hideInThisSectionHeader: true
---

## Mapping Tenants to Infrastructure with Tags

In the Infrastructure section, we can see three tentacle targets in the Production environment used to host these tenants. Each target is currently hosting five tenants. By associating a Hosting Group tag to each target, the tenants with those tags are automatically associated to the targets. This makes adding or removing a tenant from a target very easy.

:::figure
![](/docs/tenants/guides/tenants-sharing-machine-targets/images/target-list.png "width=500")
:::

Edit a target and choose the appropriate tag in the `Associated Tenants` section to associate all tenants with that tag to the target.

:::figure
![](/docs/tenants/guides/tenants-sharing-machine-targets/images/target-details.png "width=500")
:::

<span><a class="button btn-secondary" href="/docs/tenants/guides/tenants-sharing-machine-targets/assign-tags-to-tenants">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="button btn-success" href="/docs/tenants/guides/tenants-sharing-machine-targets/deploying-before-concurrency-tag">Next</a></span>