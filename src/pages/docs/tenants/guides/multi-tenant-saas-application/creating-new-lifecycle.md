---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Creating a lifecycle
description: Create lifecycle for SAAS application
navOrder: 10
hideInThisSectionHeader: true
---

The first step in this guide is to create a new [lifecycle](/docs/releases/lifecycles) for our project.

To create a new Lifecycle, navigate to **Library ➜ Lifecycles ➜ ADD LIFECYCLE**.

:::figure
![](/docs/tenants/guides/multi-tenant-saas-application/images/add-new-lifecycle.png)
:::


Give the **Lifecycle** a name, an optional description, and four phases. The lifecycle should ensure all releases are deployed to Development, Test, *optionally* to Staging, then lastly into Production. 

![](/docs/tenants/guides/multi-tenant-saas-application/images/creating-lifecycle.png) 

In the next step, we'll [create the project](/docs/tenants/guides/multi-tenant-saas-application/creating-new-tenants) needed for this scenario.

<span><a class="button btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="button btn-success" href="/docs/tenants/guides/multi-tenant-saas-application/creating-new-project">Next</a></span>