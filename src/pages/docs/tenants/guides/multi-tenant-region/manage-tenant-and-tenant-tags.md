---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Manage Tenants and Tag sets
description: Manage tenants and tag sets as part of a multi-tenant region setup in Octopus Deploy.
navOrder: 30
hideInThisSectionHeader: true
---
Each store in the Car Rental chain is named after the city or location they are in.  To ensure that the application is deployed to the correct location with the correct features, we must associate each tenant with the correct tags.

## Managing Tenant Tag Sets for Tenants
To manage the Tag Sets associated with a Tenant, navigate to Tenants, then select the Tenant to manage.  Click on **MANAGE TAGS** to edit which tags are associated to a Tenant

:::figure
![](/docs/tenants/guides/multi-tenant-region/images/tenant-manage-tags.png)
:::

The De Moines location for Car Rental company deploys to the `Central US` Azure region and participates in all Release Rings.  This tenant will be assigned the `Central US` Azure Region tag as well as `Alpha`, `Beta`, and `Stable` Release Rings tags.

:::figure
![](/docs/tenants/guides/multi-tenant-region/images/demoines-tags.png)
:::

Norfolk will be assigned the Azure Region of `East US` with `Beta` and `Stable` Release Rings.  LAX will be assigned the `West US` Azure Region tag with only the `Stable` Release Ring.

:::figure
![](/docs/tenants/guides/multi-tenant-region/images/car-rental-tenants.png)
:::

<span><a class="button btn-secondary" href="/docs/tenants/guides/multi-tenant-region/creating-tenant-tags">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="button btn-success" href="/docs/tenants/guides/multi-tenant-region/assigning-tenants-to-infrastructure">Next</a></span>