---
layout: src/layouts/Default.astro
pubDate: 2026-05-03
modDate: 2026-05-04
title: Rollout control actions
description: Pause, promote, and roll back Argo Rollouts directly from the Octopus UI.
navOrder: 10
---

Octopus lets you control Argo Rollouts from the Rollout Details Drawer. Open the drawer by clicking the **⋮** menu next to a rollout resource on the Live Status dashboard and selecting **Details**. Control actions are gated by Octopus RBAC permissions.

:::figure
![The Rollout Details Drawer showing step-by-step progress, canary weight, AnalysisRun results, and control actions](/docs/img/kubernetes/argo-rollouts/rollout-details-drawer.png)
:::

:::div{.hint}
Octopus does not create, edit, or delete Rollout definitions. Rollout specs continue to be managed via Git or Helm charts.
:::

## Available actions

The actions available depend on the current state of the rollout.

| Action | Description | Available when |
| :--- | :--- | :--- |
| **Details** | Opens the Rollout Details Drawer | Always |
| **Pause** | Halts progression at the current step | Rollout is in progress |
| **Promote** | Advances the rollout to the next step | Rollout is paused at a step |
| **Promote Full** | Skips all remaining steps and promotes to 100% immediately | Rollout is paused at a step |
| **Restart** | Restarts the pods in the rollout | Rollout is in progress or paused |
| **Retry** | Retries a failed rollout from the current step | Rollout is degraded |
| **Abort** | Aborts the rollout and scales down the canary or preview ReplicaSet | Rollout is in progress or paused |
| **Rollback** | Reverts to the previous stable ReplicaSet | Any state |

## Pause

Pausing a rollout halts progression at the current step. No additional traffic weight changes or analysis steps are executed while the rollout is paused.

The rollout moves to a **Paused** state. The current canary weight or blue-green preview state is held until you promote, resume, abort, or roll back.

## Promote

Promotes the rollout to the next step in the rollout spec. Use this when a rollout is paused at a step waiting for manual approval before continuing.

For canary rollouts, promoting advances to the next weight step or analysis step. For blue-green rollouts, promoting switches traffic from the preview to the active ReplicaSet.

## Promote Full

Skips all remaining steps and immediately promotes the rollout to 100%. For canary deployments this means the canary ReplicaSet receives 100% of traffic. For blue-green deployments this completes the switch immediately.

:::div{.warning}
Promote Full bypasses any remaining analysis steps. Use with caution in production environments.
:::

## Restart

Triggers a rolling restart of the pods in the rollout's current ReplicaSet. This is equivalent to `kubectl rollout restart` and is useful for picking up configuration changes (such as updated ConfigMaps or Secrets) without changing the rollout's traffic split.

## Retry

Available when a rollout is in a **Degraded** state. Retries the rollout from the current failed step without reverting traffic.

## Abort

Aborts an in-progress or paused rollout. Argo Rollouts scales down the canary or preview ReplicaSet and restores 100% of traffic to the stable ReplicaSet. The rollout moves to a **Degraded** state.

## Rollback

Reverts to the previous stable ReplicaSet. Available in any state, including after a completed rollout.

:::div{.warning}
Rollback is not the same as re-deploying a previous release. To re-deploy an earlier version, create a new release in Octopus with the desired package version.
:::

## Permissions

Control actions are gated by Octopus permissions. Users with read-only access can view rollout state but cannot perform any actions.

| Action | Required permission |
| :--- | :--- |
| View rollout status and details | Project `View` |
| Pause, Promote, Promote Full, Restart, Retry, Abort, Rollback | Project `DeploymentCreate` |

When [tenanted deployments](/docs/tenants) are in use, rollout control actions are scoped to the tenant.

## Audit log

All control actions performed through the Octopus UI are recorded in the [Octopus audit log](/docs/security/users-and-teams/auditing). Each entry includes the user, the rollout target, and the timestamp.

## Learn more

- [Argo Rollouts overview](/docs/kubernetes/argo-rollouts)
- [Live Object Status](/docs/kubernetes/live-object-status)
- [Auditing](/docs/security/users-and-teams/auditing)
