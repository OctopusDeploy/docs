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
The Kubernetes Live Object Status feature is in early access, it is rolling out in Octopus Cloud now. This feature will be made available to self-hosted customers in H2 2025.
:::

Kubernetes Live Object Status shows the live status of your Kubernetes resources after they have been deployed. This allows you to monitor and safely troubleshoot your Kubernetes application without needing to leave Octopus or learn another tool.

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

### Upgrading an existing Kubernetes agent

Coming soon, we will have a one click upgrade from within Octopus Deploy.

For the moment, existing Kubernetes agents can be upgraded in place by filling in the following Helm command and running it against the Kubernetes cluster your current Kubernetes agent is installed

```bash
TODO
```

## How to use

Once you have the Kubernetes Monitor enabled on your [Kubernetes Agent](docs/kubernetes/targets/kubernetes-agent), simply toggle the switch on the dashboard to show live status in place of the deployment status.

:::figure
![A screenshot of the Space dashboard showing live status](/docs/deployments/kubernetes/live-object-status/space-dashboard-live-status.png)
:::

Octopus display individual status at a resource level as well as summarized status for an Application.

### Resource status

| Label                       | Status Icon                              |
|:----------------------------|:----------------------------------------:|
| Progressing                 | <i class="fa-solid fa-circle-notch"></i> |
| Healthy                     | <i class="fa-solid fa-heart"></i>        |
| Unknown                     | <i class="fa-solid fa-question"></i>     |
| Degraded                    | <i class="fa-solid fa-heart-crack"></i>  |
| Out of Sync                 | <i class="fa-solid fa-arrow-up"></i>     |
| Missing                     | <i class="fa-solid fa-ghost"></i>        |
| In Sync                     | <i class="fa-solid fa-check"></i>        |
| Suspended                   | <i class="fa-solid fa-pause"></i>        |

### Application status

| Label                       | Status Icon                              |
|:----------------------------|:----------------------------------------:|
| Progressing                 | <i class="fa-solid fa-circle-notch"></i> |
| Healthy                     | <i class="fa-solid fa-heart"></i>        |
| Unknown                     | <i class="fa-solid fa-question"></i>     |
| Degraded                    | <i class="fa-solid fa-heart-crack"></i>  |
| Out of Sync                 | <i class="fa-solid fa-arrow-up"></i>     |
| Missing                     | <i class="fa-solid fa-ghost"></i>        |
| Unavailable                 | <i class="fa-solid fa-circle-exclamation"></i>|
| Waiting                     | <i class="fa-solid fa-hourglass"></i>    |
| Stale                       | <i class="fa-solid fa-bolt"></i>   |


## How it works

The Kubernetes Agent has a new component called the Kubernetes Monitor which also runs inside the Kubernetes cluster. Read more about the [Kubernetes Monitor](docs/kubernetes/targets/kubernetes-agent/kubernetes-monitor) here.

During a deployment, Octopus will capture any applied Kubernetes YAML and send it to the monitor. The monitor uses this list to track the deployed resources in the cluster.

## Known issues and limitations

### Skipped steps

The desired resource list is compiled from resources that were applied during the last deployment. If steps are skipped during a deployment, then live status will not be shown for resources that were applied in those steps.

Please avoid skipping steps that deploy Kubernetes resources.

### Script steps

Resources modified by script steps directly are not monitored. Support for script steps will be added in a future release. 

### Runbooks not supported

Resources modified by Runbooks are not monitored. Please deploy the resources via a Deployment if you want them to be monitored.

## Useful links

* [Find more details in the blog post](https://octopus.com/blog/kubernetes-live-object-status)
