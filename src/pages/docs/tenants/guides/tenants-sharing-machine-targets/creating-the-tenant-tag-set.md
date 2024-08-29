---
layout: src/layouts/Default.astro
pubDate: 2023-08-21
modDate: 2024-08-29
title: Creating the tenant tag set
icon: fa-solid fa-users-rectangle
description: Create tenant tags as part of a shared machine target setup in Octopus Deploy.
navOrder: 20
hideInThisSectionHeader: true
---

In this scenario, each tenant's application is hosted on one of three groups of infrastructure. We will define a [tenant tag set](/docs/tenants/tenant-tags) to represent each group. The tag set can be used to easily map tenants to the correct infrastructure.

To create a tenant tag set, navigate to **Deploy ➜ Tenant Tag Sets ➜ Add Tag Set**.

For this example we'll use the tag set name **Hosting Group** with 3 tags **Hosting Group 1**, **Hosting Group 2**, and **Hosting Group 3**.

<span><a class="button btn-secondary" href="/docs/tenants/guides/tenants-sharing-machine-targets">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="button btn-success" href="/docs/tenants/guides/tenants-sharing-machine-targets/assign-tags-to-tenants">Next</a></span>