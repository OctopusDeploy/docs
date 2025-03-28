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
![Space dashboard showing live status](/docs/kubernetes/live-object-status/space-dashboard-live-status.png)
:::

:::figure
![Live status page](/docs/kubernetes/live-object-status/live-status-page.png)
:::

## Where it is available

Using Kubernetes Live Object Status requires the following:

- A Cloud Octopus Deploy instance
- A [Kubernetes Agent](/docs/kubernetes/targets/kubernetes-agent) target
- A project with a deployment process containing Kubernetes steps
  - The kubectl script step is currently unsupported

## Installation

The [Kubernetes Agent](/docs/kubernetes/targets/kubernetes-agent) has a new component called the [Kubernetes Monitor](/docs/kubernetes/targets/kubbernetes-agent/kubernetes-monitor) that is currently enabled for new installations.

:::figure
![Kubernetes agent install script with the Kubernetes Monitor enabled](/docs/kubernetes/live-object-status/agent-install-script.png)
:::

Once installed, you can confirm the status of the Kubernetes Monitor by looking at the Connectivity j page for the corresponding Kubernetes agent target.

:::figure
![Health check showing status of the Kubernetes Monitor](/docs/kubernetes/live-object-status/kubernetes-agent-health-check.png)
:::

### Upgrading an existing Kubernetes agent

Coming soon, we are working on a one click upgrade process from within Octopus Deploy.

If you can't wait until then, you can upgrade existing Kubernetes agents by running a Helm command on your cluster.

Find the following values and replace them in the Helm command below

|              |                                                 Value                                                  | Example                |
| :----------- | :----------------------------------------------------------------------------------------------------: | :--------------------- |
| INSTANCE_URL |              The URL you access your instance with, without https:// or a trailing slash               | myinstance.octopus.app |
| API_KEY      | An [API key](/docs/octopus-rest-api/how-to-create-an-api-key) for your user, created from your profile | API-MYKEY              |
| SPACE_ID     |              The ID of the space your agent is installed in, find this in any Octopus url              | Spaces-1               |
| AGENT_NAME   |                                    The name of the Kubernetes agent                                    | My Agent               |
| HELM_RELEASE |                   The name of the Helm release used to install the Kubernetes agent                    | myagent                |

```bash
helm upgrade --atomic \
  --namespace octopus-agent-upgrade \
  --reuse-values \
  --version "2.*.*" \
  --set kubernetesMonitor.enabled="true" \
  --set kubernetesMonitor.registration.serverApiUrl="https://$INSTANCE_URL/" \
  --set kubernetesMonitor.monitor.serverGrpcUrl="grpc://$INSTANCE_URL:8443" \
  --set kubernetesMonitor.registration.serverAccessToken="$API_KEY" \
  --set kubernetesMonitor.registration.spaceId="$SPACE_ID" \
  --set kubernetesMonitor.registration.machineName="$AGENT_NAME" \
  $HELM_RELEASE \
  oci://registry-1.docker.io/octopusdeploy/kubernetes-agent
```

## How to use Live Status

Once you have the Kubernetes Monitor enabled on your [Kubernetes Agent](/docs/kubernetes/targets/kubernetes-agent), simply toggle the switch on the dashboard to show live status in place of the deployment status.

:::figure
![A screenshot of the Space dashboard showing live status](/docs/kubernetes/live-object-status/space-dashboard-live-status.png)
:::

Octopus display individual status at an object level as well as summarized status for an Application.

### Application status

| Label       |                  Status Icon                   | Description                                                                 |
| :---------- | :--------------------------------------------: | :-------------------------------------------------------------------------- |
| Progressing |    <i class="fa-solid fa-circle-notch"></i>    | Objects in your application are currently in a progressing state            |
| Healthy     |       <i class="fa-solid fa-heart"></i>        | The objects in your cluster match what was specified in the last deployment |
| Unknown     |      <i class="fa-solid fa-question"></i>      | We’re having trouble getting live status updates for this application       |
| Degraded    |    <i class="fa-solid fa-heart-crack"></i>     | Your objects experienced errors after the deployment completed              |
| Out of Sync |      <i class="fa-solid fa-arrow-up"></i>      | The objects on your cluster no longer match what you last deployed          |
| Missing     |       <i class="fa-solid fa-ghost"></i>        | Objects in your application are currently in a missing state                |
| Unavailable | <i class="fa-solid fa-circle-exclamation"></i> | Application live status is unavailable because your last deployment failed  |
| Waiting     |     <i class="fa-solid fa-hourglass"></i>      | Application live status will be available once the deployment completes     |

### Object status

| Label       |               Status Icon                | Description                                                                                |
| :---------- | :--------------------------------------: | :----------------------------------------------------------------------------------------- |
| Progressing | <i class="fa-solid fa-circle-notch"></i> | Object is attempting to reach the desired state                                            |
| Healthy     |    <i class="fa-solid fa-heart"></i>     | Object is in sync and reporting that it is running as expected                             |
| Unknown     |   <i class="fa-solid fa-question"></i>   | We don't have up-to-date information about the live status of this object                  |
| Degraded    | <i class="fa-solid fa-heart-crack"></i>  | Object has run into a problem, check the logs or events to find out more                   |
| Out of Sync |   <i class="fa-solid fa-arrow-up"></i>   | Object manifest is not the same as what was applied                                        |
| Missing     |    <i class="fa-solid fa-ghost"></i>     | Object is missing from the cluster                                                         |
| In Sync     |    <i class="fa-solid fa-check"></i>     | Object manifest matches what was applied, but does not report any additional health status |
| Suspended   |    <i class="fa-solid fa-pause"></i>     | Job is not currently running                                                               |

Take a look at our [troubleshooting guide](./troubleshooting/index.md) for details on why you may see some object statuses

## How it works

The Kubernetes Agent has a new component called the Kubernetes Monitor which also runs inside the Kubernetes cluster. Read more about the [Kubernetes Monitor](/docs/kubernetes/targets/kubernetes-agent/kubernetes-monitor) here.

During a deployment, Octopus will capture any applied Kubernetes manifests and send them to the monitor. The monitor uses these manifests to track the deployed objects in the cluster, keeping track of their synchronization and health.

## Known issues and limitations

### Skipped steps

The desired object list is compiled from objects that were applied during the last deployment. If steps are skipped during a deployment, then live status will not be shown for objects that were applied in those steps.

Please avoid skipping steps that deploy Kubernetes objects.

### Script steps

Objects modified by script steps directly are not monitored. Support for script steps is planned for a future release. 

### Runbooks not supported

Objects modified by Runbooks are not monitored. Please deploy the objects via a Deployment if you want them to be monitored.