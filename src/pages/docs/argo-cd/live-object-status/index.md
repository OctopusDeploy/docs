---
layout: src/layouts/Default.astro
pubDate: 2025-03-28
modDate: 2025-05-16
navSection: Live Object Status
title: Argo CD Live Object Status
navTitle: Live Object Status
description: Argo CD Live Object Status guide.
navOrder: 45
hideInThisSectionHeader: true
---
Argo Live Object Status shows the live status of the Kubernetes resources deployed by the Argo CD Applications mapped
to the project.
This allows you to monitor and safely troubleshoot Argo CD controlled deployments from within Octopus Deploy

:::div{.info}
Outwardly this is an identical capability to that available for [Kubernetes based projects](/docs/kubernet/live-object-status/index.md).
However when used with Argo CD, the [Kubernetes monitor](/docs/kubernetes/targets/kubernetes-agent/kubernetes-monitor) is *not* required.
:::

## Where it is available
Using Argo CD Live Objet Status requires the following:
* Octopus Deploy 2025.4+
* An Argo CD Instance deployment target (and associated gateway)
* [Annotations](/docs/argo-cd/annotations/index.md) on your Argo CD Applications, mapping them onto Octopus Deploy projects
* A deployment process containing an Argo CD step (either [Image Tag update](/docs/argo-cd/steps/update-application-image-tag) or [Update Application Manifests](/docs/argo-cd/steps/update-application-manifests)

## How to use Live Status
Once the prerequisites have been fulfilled, simply toggle the switch on the  dashboard to show live status in place of deployment status.

:::figure
![Octopus Argo CD Live Status Dashboard](/docs/img/argo-cd/argo-cd-live-status-dashboard.png)
:::

Octopus displays individual status at both the object and application level, along with a rolled-up summary at the Argo Instance.

Each kubernetes object created directly by the Argo CD Application will indicate its name, kind, namespace, sync and health status.
Derived kubernetes objects (eg Pods created as part of a deployment) don't have a sync-status, so will present a blank field.

:::figure
![Octopus Argo CD Live Status Objects](/docs/img/argo-cd/argo-cd-live-status-objects.png)
:::

### Application status

| Label       |                    Status Icon                     | Description                                                                 |
| :---------- | :------------------------------------------------: | :-------------------------------------------------------------------------- |
| Progressing |   <i class="fa-solid fa-circle-notch blue"></i>    | Objects in your application are currently in a progressing state            |
| Healthy     |      <i class="fa-solid fa-heart green"></i>       | The objects in your cluster match what was specified in the last deployment |
| Unknown     |     <i class="fa-solid fa-question grey"></i>      | We’re having trouble getting live status updates for this application       |
| Degraded    |    <i class="fa-solid fa-heart-crack red"></i>     | Your objects experienced errors after the deployment completed              |
| Out of Sync |    <i class="fa-solid fa-arrow-up orange"></i>     | The objects on your cluster no longer match what you last deployed          |
| Missing     |       <i class="fa-solid fa-ghost grey"></i>       | Objects in your application are currently in a missing state                |
| Unavailable | <i class="fa-solid fa-circle-exclamation red"></i> | Application live status is unavailable because your last deployment failed  |
| Waiting     |     <i class="fa-solid fa-hourglass blue"></i>     | Application live status will be available once the deployment completes     |

### Object status

| Label       |                  Status Icon                  | Description                                                                                |
| :---------- | :-------------------------------------------: | :----------------------------------------------------------------------------------------- |
| Progressing | <i class="fa-solid fa-circle-notch blue"></i> | Object is attempting to reach the desired state                                            |
| Healthy     |    <i class="fa-solid fa-heart green"></i>    | Object is in sync and reporting that it is running as expected                             |
| Unknown     |   <i class="fa-solid fa-question grey"></i>   | We don't have up-to-date information about the live status of this object                  |
| Degraded    |  <i class="fa-solid fa-heart-crack red"></i>  | Object has run into a problem, check the logs or events to find out more                   |
| Out of Sync |  <i class="fa-solid fa-arrow-up orange"></i>  | Object manifest is not the same as what was applied                                        |
| Missing     |    <i class="fa-solid fa-ghost grey"></i>     | Object is missing from the cluster                                                         |
| In Sync     |    <i class="fa-solid fa-check green"></i>    | Object manifest matches what was applied, but does not report any additional health status |
| Suspended   |    <i class="fa-solid fa-pause grey"></i>     | Job is not currently running                                                               |



### Detailed object information
Selecting an object's (or application's) name in the table will open a drawer containing detailed information.

The drawer contains up-to-date information regarding the selected object:
* Summary
* Events
* Logs
* Kubernetes yaml manifest

For Argo CD, all of these data fields are fetched on demand from your Argo instance. We do not currently support tailing logs.

#### Manifest Diffs
Octopus treats manifest diffs in the _opposite direction_ to that shown in Argo.

In Octopus, the left panel indicates "what was previously written to the applications git repository", while the right shows

Whereas, in argo, the left panel