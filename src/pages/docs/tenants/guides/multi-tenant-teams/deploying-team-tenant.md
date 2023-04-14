---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Deploying to a team tenant
description: This part of the guide demonstrates deploying to a team tenant
navOrder: 50
hideInThisSectionHeader: true
---

Scoping the Teams to their respecitive tenants give Teams Avengers and Radical the autonomy of deploying Octo Pet Shop without interfering with each other.

## Scoped team dashboard
With Team Avengers scoped to their respective tenant, the dashboard for the developer will only show thier tenant and environment they have access to.  Since the tenant of `OctoPetShop-Team-Avengers` is scoped specifically to Development, Development is all the team sees

![](/docs/tenants/guides/multi-tenant-teams/images/team-avengers-dashboard.png "width=500")

## Scoped team creating a release

Developers for Team Avengers have the ability to create a release, but only deploy to their own tenant.  When deploying to Development, the OctoPetShop-Team-Avengers tenant is automatically selected.

![](/docs/tenants/guides/multi-tenant-teams/images/team-avengers-deploy.png "width=500")

Depending on how you scope your team for Environment, because the `OctoPetShop-Team-Avengers` tenant is only scoped for Development, attempting to deploy to test will result in a missing resource and the **DEPLOY** button disabled.

![](/docs/tenants/guides/multi-tenant-teams/images/team-avengers-deploy-to-test.png "width=500")

<span><a class="btn btn-secondary" href="/docs/tenants/guides/multi-tenant-teams/assign-team-userrole-to-tenant">Previous</a></span>