---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Prevent release progression
description: Preventing progression lets you block a release of a project from being used in any future deployments.
navOrder: 17
---

Sometimes you may need to block your project from deploying a specific release. This is done by preventing the progression of the release.

Preventing progression can be useful if you need to temporarily block the release, or if you need to fix some variables before proceeding. This also allows you to keep releases without deleting them, so they are still available for auditing purposes.

These basic rules are applied when a release is prevented from progressing:

- If a phase has _no successful_ deployments then _no_ deployments to that phase can take place.
- If a phase has _only failed_ deployments, then _no_ deployments to that phase can take place.
- If a phase has _a successful_ deployment, then deployments to any environment in that phase _can_ take place.
- The first phase can always be deployed to even if the release is blocked before any deployment has taken place.
- Optional phases are treated like any other phase and so the above rules apply, even if the previous phase is complete.
- The above rules apply to each Tenant individually with respect to the relevant phase they have reached.

Essentially, a blocked release is about blocking progression to yet to be deployed phases, not about deploying to phases you have already started deploying to. This allows you to, for example, block deployments to the production phase due to a problem uncovered in UAT-1, while still deploying to UAT-2 for further analysis.

## Block deployment {#BlockingDeployments-BlockDeployment}

You can block a release of a project from being used in any future deployments, no matter which phase the release is currently on. This can be done from the release page of the project you're wishing to block:

:::figure
![](/docs/releases/images/5865856.png "width=500")
:::

Select the option to **Prevent Progression**:

:::figure
![](/docs/releases/images/5865857.png "width=500")
:::

Provide a reason, so your team is aware and on the same page, and hit **Prevent Progression**:

:::figure
![](/docs/releases/images/5865858.png "width=500")
:::

## Resolve and unblock {#BlockingDeployments-ResolveandUnblock}

When you're happy for the deployment process continuing, go back to the release page of the project, and select "**Unblock**":

:::figure
![](/docs/releases/images/5865859.png "width=500")
:::

## Permissions {#BlockingDeployments-Permissions}

There are two permissions required for the act of preventing progression and unblocking your deployments, which you have to assign to the user performing the task:

- **DefectReport**: Allows a user to block a release from progressing to the next lifecycle phase.
- **DefectResolve**: Allows a user to unblock a release so it can progress to the next phase.

:::div{.hint}
**What is a defect?**
When you block a release from being deployed, we actually use the Octopus API to create a "Defect" for that release with the reason you provided for blocking future Deployments from using that release.
:::

## Learn more

- [Managing roles and permissions](/docs/security/users-and-teams/user-roles).

