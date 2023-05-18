---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Creating tenant tags
description: Create tenant tags as part of a multi-tenant region setup in Octopus Deploy.
navOrder: 10
hideInThisSectionHeader: true
---

The Car Rental company utilizes Azure to host the application for the different stores in their chain.  In addition, each store plays a different role in the development lifecycle by participating in different upgrade rings. To designate which tenant is in which region and upgrade ring, we define [Tenant Tag Sets](/docs/tenants/tenant-tags).

## Creating Tenant Tag Sets

Tenant Tag Sets are stored in the Library of Octopus Deploy.  To create Tenant Tag Sets, navigate to **Library ➜ Tenant Tag Sets** and click **ADD TAG SET**.

:::figure
![](/docs/tenants/guides/multi-tenant-region/images/tenant-tagset-create.png "width=500")
:::

Give the **Tag Set** a name, an optional description, and create some Tags.  For the Car Rental application, we need to create an Azure Region Tag Set with the different Azure Regions as the Tags.

:::figure
![](/docs/tenants/guides/multi-tenant-region/images/tenant-tag-create.png "width=500")
:::

We also need to define the different upgrade rings that the stores participate in.  Tags can be assigned different colors as a quick visual indicator as to which tag has been assigned.  In the below image, we can see that Alpha is red, Beta is blue, and Stable is green

:::figure
![](/docs/tenants/guides/multi-tenant-region/images/tenant-tag-release-ring.png "width=500")
:::

<span><a class="button btn-secondary" href="/docs/tenants/guides/multi-tenant-region/creating-new-tenants">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="button btn-success" href="/docs/tenants/guides/multi-tenant-region/manage-tenant-and-tenant-tags">Next</a></span>