---
layout: src/layouts/Default.astro
pubDate: 2026-10-13
modDate: 2026-10-22
title: Environment status
sidebarLabel: Environment status
navOrder: 12
icon: fa-solid fa-heart-pulse
description: See the health, sync status, last deployment, and feature flags for a project in one environment.
subject: environment status, live status, Kubernetes, feature flags, deployments, environments
type: concept
audience: [devops-eng, platform-eng]
image:
imageAlt:
---

Use the Environment status page to check how one project is doing in one environment. To compare all your environments at once, use the [project dashboard](/docs/projects/project-dashboard) instead.

## Environment Status tab

The Environment status page is a view of one project in one environment. It brings together the latest deployment, the health of what's running, and the feature flags in that environment, so you can get a summary of an environment in one place.

:::figure
![The Environment Status tab for Production, with 4 status tiles above the Recent timeline and the Feature flags panel](/docs/img/projects/environment-status/environment-status-overview.png)
:::

## Status tiles

The **Environment Status** tab shows up to 4 status tiles. **App health** and **Sync status** only appear when Octopus has Kubernetes live status for the environment.

| Tile                | Shows                                                                                                                                                         |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **App health**      | The combined health of the Kubernetes objects Octopus deployed to the environment.                                                                            |
| **Sync status**     | Whether the objects in your cluster still match what Octopus last deployed, or for Argo CD applications, whether they match the application's Git repository. |
| **Last deployment** | The most recent deployment to the environment, its release version, and how it finished.                                                                      |
| **Feature flags**   | How many of the project's [feature flags](/docs/feature-flags) are rolled out in the environment.                                                             |

## Recent timeline

The **Recent timeline** lists the latest deployments and feature flag changes in the environment. When the environment's status changes, it's the quickest way to see what changed just before.

It shows the 5 most recent events, and you can narrow it with the activity filter. Each deployment has a menu of actions, such as redeploying it or viewing its task log.

**View full timeline** opens the environment's full timeline, which also includes its live status if available.

## Feature flags

The **Feature flags** panel lists the project's [feature flags](/docs/feature-flags) and how far each one has rolled out in the environment.

Each flag shows its rollout phases in this environment and its tags, and you can search the list by name. If any flags have multiple rollout phases, the panel splits them between **Rolling out** and **Complete**.

## Kubernetes Live Status

The **Kubernetes Live Status** tab shows the live state of each Kubernetes object Octopus tracks in the environment. It lets you check the health of your application, and whether it has drifted from what you deployed, without leaving Octopus.

The tab only appears when Octopus has live status for the environment, from a Kubernetes monitor or from Argo CD.

The **Live Objects** table lists each object with its health and sync status. You can open a drawer for any object to see its events, logs, and manifests. The statuses are described in [Kubernetes Live Object Status](/docs/kubernetes/live-object-status#application-health-status).

:::figure
![The Kubernetes Live Status tab for Production, listing each object's kind, namespace, sync status, and health status](/docs/img/projects/environment-status/environment-status-kubernetes-live-status.png)
:::

## Version notes

- The Environment status page is available from Octopus Server 2026.4.

## Related links

- [Project dashboard](/docs/projects/project-dashboard)
- [Kubernetes Live Object Status](/docs/kubernetes/live-object-status)
- [Managing orphaned objects](/docs/kubernetes/live-object-status/orphaned-objects)
- [Feature flags](/docs/feature-flags)
- [Environments](/docs/infrastructure/environments)
