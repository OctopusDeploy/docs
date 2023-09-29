---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Deploying to a team tenant
description: This part of the guide demonstrates deploying to a team tenant
navOrder: 50
hideInThisSectionHeader: true
---

Scoping the Teams to their respective tenants give Teams Avengers and Radical the autonomy of deploying Octo Pet Shop without interfering with each other.

## Scoped team dashboard
With Team Avengers scoped to their respective tenant, the dashboard for the developer will only show their tenant and environment they have access to.  Since the tenant of `OctoPetShop-Team-Avengers` is scoped specifically to Development, Development is all the team sees

:::figure
![](/docs/tenants/guides/multi-tenant-teams/images/team-avengers-dashboard.png)
:::

## Scoped team creating a release

Developers for Team Avengers have the ability to create a release, but only deploy to their own tenant.  When deploying to Development, the OctoPetShop-Team-Avengers tenant is automatically selected.

:::figure
![](/docs/tenants/guides/multi-tenant-teams/images/team-avengers-deploy.png)
:::

Depending on how you scope your team for Environment, because the `OctoPetShop-Team-Avengers` tenant is only scoped for Development, attempting to deploy to test will result in a missing resource and the **DEPLOY** button disabled.

:::figure
![](/docs/tenants/guides/multi-tenant-teams/images/team-avengers-deploy-to-test.png)
:::

<span><a class="button btn-secondary" href="/docs/tenants/guides/multi-tenant-teams/assign-team-userrole-to-tenant">Previous</a></span>