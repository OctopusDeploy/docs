---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Creating new tenant tags
description: Create tenant tags as part of a multi-tenant SaaS setup in Octopus Deploy.
navOrder: 30
hideInThisSectionHeader: true
---

Customers who use Vet Clinic can choose to apply custom branding to the application. To designate which tenant (customer) has custom branding applied we define [Tenant Tag Sets](/docs/tenants/tenant-tags). For this scenario, we need a single tenant tag set for the custom branding.

To create Tenant Tags Sets navigate to **{{Library, Tenant Tag Sets, ADD TAG SET}}**.

![](/docs/tenants/guides/multi-tenant-saas-application/images/add-new-tenant-tag.png "width=500")

Give the **Tag Set** a name, an optional description, and create some Tags.  For the Vet Clinic application, we need to create a Custom Features Tag Set with a tag called **Branding**

![](/docs/tenants/guides/multi-tenant-saas-application/images/creating-new-tenant-tag.png "width=500")

In the next step, we'll [create the tenants](/docs/tenants/guides/multi-tenant-saas-application/creating-new-tenants) needed for this scenario.

<span><a class="btn btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application/creating-new-project">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/tenants/guides/multi-tenant-saas-application/creating-new-tenants">Next</a></span>