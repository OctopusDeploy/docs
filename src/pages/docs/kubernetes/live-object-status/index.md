---
layout: src/layouts/Default.astro
pubDate: 2024-07-31
modDate: 2024-07-31
navSection: Live Object Status
title: Kubernetes Live Object Status
navTitle: Overview
description: Kubernetes Live Object Status guide.
navOrder: 45
hideInThisSectionHeader: true
---

:::div{.hint}
The Kubernetes Live Object Status feature is in early access, it is rolling out in Octopus Cloud now. This feature will be made available to self-hosted customers in Q3 2025.
:::

Kubernetes Live Object Status shows the live status of your Kubernetes resources after they have been deployed. This allows you to monitor and troubleshoot your Kubernetes application without needing to leave Octopus or learn another tool.

:::figure
![A screenshot of the Space dashboard showing live status](/docs/deployments/kubernetes/live-object-status/space-dashboard-live-status.png)
:::

:::figure
![A screenshot of the live status page](/docs/deployments/kubernetes/live-object-status/live-status-page.png)
:::

## Where it is available

Kubernetes Live Object status is available for Kubernetes steps, except the kubectl script step, deployed to Kubernetes Agent targets.

## Installation

The Kubernetes Agent has a new component called the Kubernetes Monitor that is currently enabled for new installations. 

:::figure
![A screenshot of the Agent install script with the Kubernetes Monitor enabled](/docs/deployments/kubernetes/live-object-status/agent-install-script.png)
:::

You can use the health check page after installation to see the status of the Kubernetes Monitor for the corresponding Agent.

:::figure
![Health check showing status of the Kubernetes Monitor](/docs/deployments/kubernetes/live-object-status/kubernetes-agent-health-check.png)
:::

## How to use

Once you have the Kubernetes Monitor enabled on your Kubernetes Agent, simply toggle the switch on the dashboard to show live status in place of the deployment status.

:::figure
![A screenshot of the Space dashboard showing live status](/docs/deployments/kubernetes/live-object-status/space-dashboard-live-status.png)
:::

Octopus display individual status at a resource level as well as summarized status for an Application.

Resource status
| Label                       | Status Icon                              |
|:----------------------------|:----------------------------------------:|
| In progress                 | <i class="fa-solid fa-spinner"></i>      |
| Success                     | <i class="fa-solid fa-circle-check"></i> |
| Error                       | <i class="fa-solid fa-circle-xmark"></i> |
| Timed out while in progress | <i class="fa-solid fa-clock"></i>        |

Application status
| Label                       | Status Icon                              |
|:----------------------------|:----------------------------------------:|
| In progress                 | <i class="fa-solid fa-spinner"></i>      |
| Success                     | <i class="fa-solid fa-circle-check"></i> |
| Error                       | <i class="fa-solid fa-circle-xmark"></i> |
| Timed out while in progress | <i class="fa-solid fa-clock"></i>        |


## How it works

The Kubernetes Agent has a new component called the Kubernetes Monitor which also runs inside the Kubernetes cluster. The Kubernetes Monitor communicates with Octopus Server over gRPC on a new port (8443) to send back live status.

During a deployment, Octopus will capture any applied Kubernetes YAML and send it to the monitor. The monitor uses this list to track the deployed resources in the cluster.

## How to use

Octopus will change the meaning of step execution status after enabling Kubernetes Object Status; no additional actions are required. One can interpret the new step status as that Octopus ensured the desired configuration was achieved on the target cluster and was stable for a given number of seconds (Status stabilization timeout value).

Users can also observe live updates from the cluster on the Kubernetes Object Status tab (Deployment page).

:::figure
![A screenshot of the Kubernetes Object Status tab](/docs/deployments/kubernetes/object-status/object-status-tab.png)
:::

Octopus displays resource status in a respected table for each deployed resource. The table is live during the step execution (till the end of the stabilization period). After that, the table will not get any updates and will remain a snapshot for future reference.

At a given point in time, an object can have one of four statuses:

| Label                       | Status Icon                              |
|:----------------------------|:----------------------------------------:|
| In progress                 | <i class="fa-solid fa-spinner"></i>      |
| Success                     | <i class="fa-solid fa-circle-check"></i> |
| Error                       | <i class="fa-solid fa-circle-xmark"></i> |
| Timed out while in progress | <i class="fa-solid fa-clock"></i>        |

If there are multiple steps in deploying Kubernetes resources, each step will have a separate section on the tab.

## Known issues and limitations

### Skipped steps
The desired resource list is compiled from resources that were applied during the last deployment. If steps are skipped during a deployment, then live status will not be shown for resources that were applied in those steps.

Please avoid skipping steps that deploy Kubernetes resources.

## Useful links

* [Find more details in the blog post](https://octopus.com/blog/kubernetes-live-object-status)
