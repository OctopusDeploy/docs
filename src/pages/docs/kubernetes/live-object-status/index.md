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
The Kubernetes Live Object Status feature is in early access, it is rolling out in Octopus Cloud now. This feature is coming to self-hosted customers in H2 2025.
:::

Kubernetes Live Object Status shows the live status of your Kubernetes objects after they have been deployed. This allows you to monitor and safely troubleshoot your Kubernetes application directly from within Octopus Deploy.

:::figure
![Live status page](/docs/kubernetes/live-object-status/live-status-page.png)
:::

## Where it is available

Using Kubernetes Live Object Status requires the following:

- An Octopus Cloud instance
- A [Kubernetes Agent](/docs/kubernetes/targets/kubernetes-agent) target
- A project with a deployment process containing Kubernetes steps
  - The kubectl script step is currently unsupported

## How to use Live Status

Once you have the Kubernetes Monitor enabled on your [Kubernetes Agent](/docs/kubernetes/targets/kubernetes-agent), simply toggle the switch on the dashboard to show live status in place of the deployment status.

:::figure
![A screenshot of the Space dashboard showing live status](/docs/kubernetes/live-object-status/space-dashboard-live-status.png)
:::

Octopus display individual status at an object level as well as summarized status for an Application.

:::figure
![Live status page](/docs/kubernetes/live-object-status/live-status-page.png)
:::

### Application status

| Label       |                  Status Icon                   | Description                                                                 |
| :---------- | :--------------------------------------------: | :-------------------------------------------------------------------------- |
| Progressing |    <i class="fa-solid fa-circle-notch blue"></i>    | Objects in your application are currently in a progressing state            |
| Healthy     |       <i class="fa-solid fa-heart green"></i>        | The objects in your cluster match what was specified in the last deployment |
| Unknown     |      <i class="fa-solid fa-question grey"></i>      | We’re having trouble getting live status updates for this application       |
| Degraded    |    <i class="fa-solid fa-heart-crack red"></i>     | Your objects experienced errors after the deployment completed              |
| Out of Sync |      <i class="fa-solid fa-arrow-up orange"></i>      | The objects on your cluster no longer match what you last deployed          |
| Missing     |       <i class="fa-solid fa-ghost grey"></i>        | Objects in your application are currently in a missing state                |
| Unavailable | <i class="fa-solid fa-circle-exclamation red"></i> | Application live status is unavailable because your last deployment failed  |
| Waiting     |     <i class="fa-solid fa-hourglass blue"></i>      | Application live status will be available once the deployment completes     |

### Object status

| Label       |               Status Icon                | Description                                                                                |
| :---------- | :--------------------------------------: | :----------------------------------------------------------------------------------------- |
| Progressing | <i class="fa-solid fa-circle-notch blue"></i> | Object is attempting to reach the desired state                                            |
| Healthy     |    <i class="fa-solid fa-heart green"></i>     | Object is in sync and reporting that it is running as expected                             |
| Unknown     |   <i class="fa-solid fa-question grey"></i>   | We don't have up-to-date information about the live status of this object                  |
| Degraded    | <i class="fa-solid fa-heart-crack red"></i>  | Object has run into a problem, check the logs or events to find out more                   |
| Out of Sync |   <i class="fa-solid fa-arrow-up orange"></i>   | Object manifest is not the same as what was applied                                        |
| Missing     |    <i class="fa-solid fa-ghost grey"></i>     | Object is missing from the cluster                                                         |
| In Sync     |    <i class="fa-solid fa-check green"></i>     | Object manifest matches what was applied, but does not report any additional health status |
| Suspended   |    <i class="fa-solid fa-pause grey"></i>     | Job is not currently running                                                               |

Take a look at our [troubleshooting guide](./troubleshooting/index.md) for details on why you may see some object statuses

## How it works

The Kubernetes Agent has a new component called the Kubernetes Monitor which also runs inside the Kubernetes cluster. Read more about the [Kubernetes Monitor](/docs/kubernetes/targets/kubernetes-agent/kubernetes-monitor) here.

During a deployment, Octopus will capture any applied Kubernetes manifests and send them to the monitor. The monitor uses these manifests to track the deployed objects in the cluster, keeping track of their synchronization and health.

## User permissions

Viewing the data returned from the Kubernetes monitor from within Octopus requires `DeploymentView` permissions.

This data includes the resource and application status, as well as pod logs and events for objects being monitored. This may be a change in security posture that your team should carefully consider.

## Secrets

### Octopus sensitive variables

As always, we treat secret data as carefully as we possibly can.

Practically, this means that we redact any detected Octopus sensitive variables from:

- Manifests
- Logs
- Events

If we do not have all the required information to adequately redact something coming back from a Kubernetes cluster, we will opt to prevent the user from seeing this all together.

With that said, we highly recommend:

1. Containing all sensitive information to Kubernetes secrets so they can be redacted at the source
2. Never logging sensitive values in containers
  
The flexibility that Octopus variables provide mean that sensitive variables can turn up in unexpected ways and so our redaction can only be best effort.

### Kubernetes secrets

The well defined structure of Kubernetes secrets allow us to confidently redact secret data.

To ensure that we never exfiltrate secret data that Octopus is not privy to, the Kubernetes monitor salts and hashes the secret data using sha256. By hashing secrets Octopus can tell you when something changed in your secret, but Octopus will never know what the secrets are unless you have populated them using Octopus sensitive variables.

Please be aware that outputting Kubernetes secrets into pod logs may result in them being sent un-redacted if they are not sourced from Octopus sensitive variables originally.

## Known issues and limitations

### Excluded steps

The desired object list is compiled from objects that were applied during the last deployment. If steps are excluded during a deployment, then live status will not be shown for objects that were applied in those steps.

Please avoid skipping steps that deploy Kubernetes objects.

### Script steps are not supported

Objects modified by script steps directly are not monitored. Support for script steps is planned for a future release.

### Runbooks are not supported

Objects modified by Runbooks are not monitored. Please deploy the objects via a Deployment if you want them to be monitored.