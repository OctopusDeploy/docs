---
layout: src/layouts/Default.astro
pubDate: 2025-03-28
modDate: 2025-03-28
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

Kubernetes Live Object status is available for Kubernetes steps, except the kubectl script step, deployed to [Kubernetes Agent](docs/kubernetes/targets/kubernetes-agent) targets.

## Installation

The [Kubernetes Agent](docs/kubernetes/targets/kubernetes-agent) has a new component called the Kubernetes Monitor that is currently enabled for new installations. 

:::figure
![A screenshot of the Agent install script with the Kubernetes Monitor enabled](/docs/deployments/kubernetes/live-object-status/agent-install-script.png)
:::

You can use the health check page after installation to see the status of the Kubernetes Monitor for the corresponding Agent.

:::figure
![Health check showing status of the Kubernetes Monitor](/docs/deployments/kubernetes/live-object-status/kubernetes-agent-health-check.png)
:::

## How to use

Once you have the Kubernetes Monitor enabled on your [Kubernetes Agent](docs/kubernetes/targets/kubernetes-agent), simply toggle the switch on the dashboard to show live status in place of the deployment status.

:::figure
![A screenshot of the Space dashboard showing live status](/docs/deployments/kubernetes/live-object-status/space-dashboard-live-status.png)
:::

Octopus display individual status at a resource level as well as summarized status for an Application.

Resource status (TODO)
| Label                       | Status Icon                              |
|:----------------------------|:----------------------------------------:|
| TODO                        | <i class="fa-solid fa-spinner"></i>      |
| Success                     | <i class="fa-solid fa-circle-check"></i> |
| Error                       | <i class="fa-solid fa-circle-xmark"></i> |
| Timed out while in progress | <i class="fa-solid fa-clock"></i>        |

Application status (TODO)
| Label                       | Status Icon                              |
|:----------------------------|:----------------------------------------:|
| TODO                        | <i class="fa-solid fa-spinner"></i>      |
| Success                     | <i class="fa-solid fa-circle-check"></i> |
| Error                       | <i class="fa-solid fa-circle-xmark"></i> |
| Timed out while in progress | <i class="fa-solid fa-clock"></i>        |


## How it works

The Kubernetes Agent has a new component called the Kubernetes Monitor which also runs inside the Kubernetes cluster. The Kubernetes Monitor communicates with Octopus Server over gRPC on a new port (8443) to send back live status.

During a deployment, Octopus will capture any applied Kubernetes YAML and send it to the monitor. The monitor uses this list to track the deployed resources in the cluster.

## Known issues and limitations

### Skipped steps
The desired resource list is compiled from resources that were applied during the last deployment. If steps are skipped during a deployment, then live status will not be shown for resources that were applied in those steps.

Please avoid skipping steps that deploy Kubernetes resources.

## Useful links

* [Find more details in the blog post](https://octopus.com/blog/kubernetes-live-object-status)
