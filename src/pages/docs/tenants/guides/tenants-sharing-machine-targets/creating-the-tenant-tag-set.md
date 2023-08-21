---
layout: src/layouts/Default.astro
pubDate: 2023-08-21
modDate: 2023-08-21
title: Creating the tenant tag set
description: Create tenant tags as part of a shared machine target setup in Octopus Deploy.
navOrder: 20
hideInThisSectionHeader: true
---

In this scenario, each tenant's application is hosted on one of three groups of infrastructure. We will define a [tenant tag sets](/docs/tenants/tenant-tags) to represent each group. The tag set can be used to easily map tenants to the correct infrastructure.

## Creating Tenant Tag Sets

Tenant Tag Sets are stored in the Library of Octopus Deploy.  To create Tenant Tag Sets, navigate to **Library ➜ Tenant Tag Sets** and click **ADD TAG SET**.

Give the **Tag Set** a name, an optional description, and create some tags.  In this scenario, we are creating a tag set named Hosting Group, with tags Hosting Group 1, Hosting Group 2, and Hosting Group 3. These groups could also represent different regions where the infrastructure is hosted.

:::figure
![](/docs/tenants/guides/tenants-sharing-machine-targets/images/tag-set.png "width=500")
:::

<span><a class="button btn-secondary" href="/docs/tenants/guides/tenants-sharing-machine-targets">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="button btn-success" href="/docs/tenants/guides/tenants-sharing-machine-targets/assign-tags-to-tenants">Next</a></span>