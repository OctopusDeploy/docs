---
layout: src/layouts/Default.astro
pubDate: 2026-05-03
modDate: 2026-05-03
title: Argo Rollouts in Octopus
navTitle: Overview
navSection: Argo Rollouts
description: Monitor and control Argo Rollouts progressive delivery strategies directly within the Octopus UI.
navOrder: 35
hideInThisSectionHeader: true
---

Octopus provides native visualization and control for [Argo Rollouts](https://argoproj.github.io/rollouts/), letting you monitor progressive delivery strategies and perform key operational actions—pause, promote, rollback, and more—without leaving the Octopus UI.

Argo Rollouts is a Kubernetes controller that enables blue-green and canary deployment strategies with fine-grained traffic control, automated analysis, and instant rollback. It is a CNCF Graduated project.

:::div{.hint}
Octopus supports **visualization and control** of Argo Rollouts. Rollout definitions continue to be authored and managed via Git or Helm charts—the standard GitOps workflow.
:::

## Supported deployment paths

Argo Rollouts support is available for both Octopus Kubernetes deployment paths:

| Deployment path | Supported |
|:---|:---:|
| [Kubernetes Agent](/docs/kubernetes/targets/kubernetes-agent) (without Argo CD) | ✓ |
| [Argo CD Gateway](/docs/argo-cd) | ✓ |

Deployments that do not deploy Rollout resources are unaffected—rollout UI elements are hidden automatically.

## Prerequisites

- Argo Rollouts CRDs and controller installed in your target cluster(s)
- A connected Kubernetes Agent or Argo CD Gateway deployment target in Octopus
- At least one Argo `Rollout` resource deployed to a cluster that Octopus manages

## Deployment behavior

When a deployment includes a Rollout resource, Octopus waits for the rollout to complete before marking the deployment step as successful. This means the deployment task remains in progress while the rollout progresses through its steps, including any canary weight increments and AnalysisRuns.

## Project Dashboard rollout status

Rollout status is shown on the Project Dashboard only while a deployment is in progress. Once a deployment completes, rollout information is no longer highlighted in the dashboard view.

During a deployment, each environment column displays live rollout-aware status indicators using rollout-specific states:

:::figure
![The Live Status dashboard showing an active canary rollout with traffic split and action menu](/docs/img/kubernetes/argo-rollouts/rollout-active-canary.png)
:::

| State | Meaning |
|:---|:---|
| Healthy | All rollouts are complete and stable |
| In Progress | A rollout is actively progressing through steps |
| Paused | A rollout is paused, awaiting manual promotion or analysis |
| Degraded | A rollout has failed or an AnalysisRun did not pass |
| Unknown | Rollout state cannot be determined |

A summary row shows the count of active rollouts per environment. Click any status indicator to open the rollout popover.

## Rollouts popover

Clicking a rollout status indicator opens a popover with an at-a-glance summary of the rollout without leaving the dashboard:

- **Strategy**: canary or blue-green
- **Current status** and step progression
- **Canary weight** (canary strategy) or active/preview state (blue-green strategy)
- **Validation results** from any AnalysisRuns

Click **View details** in the popover to open the full Rollout Details Drawer.

:::figure
![The rollout popover showing strategy, status, step progression, and canary weight](/docs/img/kubernetes/argo-rollouts/rollout-popover.png)
:::

## Rollout Details Drawer

The Rollout Details Drawer provides full visibility into a single rollout. It slides in over the dashboard without navigating away from your current context.

The drawer shows:

- **Step-by-step progress**: each rollout step with its current status
- **Canary weight** percentages or blue-green switch state
- **AnalysisRun results**: pass/fail status per analysis metric, including inputs and titles for reused analysis templates
- **ReplicaSet details**: active and preview/canary ReplicaSets with pod counts and health
- **Control actions**: Pause, Resume, and Rollback buttons (visible based on your Octopus permissions)

See [Rollout control actions](/docs/kubernetes/argo-rollouts/control-actions) for details on all available actions.

:::figure
![The Rollout Details Drawer showing step-by-step progress, canary weight, AnalysisRun results, and control actions](/docs/img/kubernetes/argo-rollouts/rollout-details-drawer.png)
:::

## Task Log integration

Rollout progress is reflected in the Releases **Task Log** as expandable items alongside other deployment steps. This lets you correlate rollout events with the rest of your deployment in chronological order.

Each rollout item in the task log shows:

- The rollout step name and status
- Timing information
- Expandable detail with log output and AnalysisRun results for that step

This is useful during incidents, where you need to correlate rollout progress against the timestamp of an anomaly detected in your monitoring tools.

## RBAC

Rollout status is visible to any user with read access to the project and environment.

Control actions (pause, resume, rollback) require the appropriate Octopus permissions. Users without control permissions see a read-only view of rollout state. All control actions are recorded in the Octopus audit log.

See [Rollout control actions](/docs/kubernetes/argo-rollouts/control-actions) for the full permissions reference.

## Learn more

- [Rollout control actions](/docs/kubernetes/argo-rollouts/control-actions)
- [Live Object Status](/docs/kubernetes/live-object-status)
- [Argo CD deployments with Octopus](/docs/argo-cd)
- [Kubernetes Agent](/docs/kubernetes/targets/kubernetes-agent)
