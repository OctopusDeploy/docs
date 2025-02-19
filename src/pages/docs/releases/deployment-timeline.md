---
layout: src/layouts/Default.astro
pubDate: 2024-10-28
modDate: 2024-10-28
title: Deployment Timeline
description: View and interact with the Deployment Timeline
navOrder: 132
---

The Deployment Timeline provides visual representation of all deployments made to an [Environment](/docs/infrastructure/environments) for a [Project](/docs/projects) within a [Tenant](/docs/tenants). In additional to providing an easy to understand view of deployment data, the Deployment Timeline allows easy access to perform common workflows, such as deploying the last successful/stable deployment into your environment.

It can be access by clicking the **Timeline** button within the deployment details page.

:::figure
![The Deployment Timeline button](/docs/releases/timeline/timeline-button.png)
:::

A drawer opens showing all deployments for the current Environment, Project and Tenant you are viewing, sorted by when the deployment was created.

:::figure
![The deployment Timeline with overflow menu for last successful deployment](/docs/releases/timeline/timeline.png)
:::

For releases that have not been deleted, either manually or via [Retention policies](/docs/administration/retention-policies), an overflow menu provides actions that can be triggered:

1. **Redeploy...** - Redeploys the release
2. **Deploy to...** - Allows deployment of the release into another environment
3. **Delete deployment...** - Deletes the deployment
4. **View task log** - Redirects to the Task log of the deployment

For deleted releases, no action can be taken and the deployment details are shown for informational purposes only.
