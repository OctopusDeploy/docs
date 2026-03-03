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
Outwardly this is an identical capability to that available for [Kubernetes based projects](/docs/kubernetes/live-object-status).
However when used with Argo CD, neither the [Kubernetes agent](/docs/kubernetes/targets/kubernetes-agent) nor the [Kubernetes monitor](/docs/kubernetes/targets/kubernetes-agent/kubernetes-monitor) are required.
:::

## Where it is available
Using Argo CD Live Objet Status requires the following:
* Octopus Deploy 2025.4+
* A registered [Argo CD Instance](/docs/argo-cd/instances/)
* [Annotations](/docs/argo-cd/annotations) on your Argo CD Applications, mapping them onto Octopus Deploy projects
* A deployment process containing an Argo CD step (either [Update Argo CD Image Tags](/docs/argo-cd/steps/update-application-image-tags) or [Update Argo CD Application Manifests](/docs/argo-cd/steps/update-application-manifests))

## How to use Live Status
Once the prerequisites have been fulfilled, simply toggle the switch on the  dashboard to show live status in place of deployment status.

:::figure
![Octopus Argo CD Live Status Dashboard](/docs/img/argo-cd/argo-cd-live-status-dashboard.png)
:::

Octopus populates the Live Status Table with content taken directly from Argo.

:::figure
![Octopus Argo CD Live Status Objects](/docs/img/argo-cd/argo-cd-live-status-objects.png)
:::

### Project Live Status

The project status is a roll-up of the status of all objects, in line with the following table:

| Label       |                    Status Icon                     | Description                                                                                                               |
| :---------- | :------------------------------------------------: |:--------------------------------------------------------------------------------------------------------------------------|
| Progressing |   <i class="fa-solid fa-circle-notch blue"></i>    | One or more objects of the mapped application are in a progressing state                                                  |
| Healthy     |      <i class="fa-solid fa-heart green"></i>       | The objects in the cluster match that specified in the applications' source git repositories, and are executing correctly |
| Unknown     |     <i class="fa-solid fa-question grey"></i>      | We’re having trouble getting live status updates for this application                                                     |
| Degraded    |    <i class="fa-solid fa-heart-crack red"></i>     | Your objects experienced errors after the deployment completed                                                            |
| Out of Sync |    <i class="fa-solid fa-arrow-up orange"></i>     | Argo CD has detected differences between the application's git repository, and the manifest in the cluster.               |
| Missing     |       <i class="fa-solid fa-ghost grey"></i>       | One or more desired objects are missing from the cluster                                                                  |
| Unavailable | <i class="fa-solid fa-circle-exclamation red"></i> | Application live status is unavailable because your last deployment failed                                                |
| Waiting     |     <i class="fa-solid fa-hourglass blue"></i>     | Application live status will be available once the deployment completes                                                   |

### Object status

| Label       |                  Status Icon                  | Description                                                                                                 |
| :---------- | :-------------------------------------------: |:------------------------------------------------------------------------------------------------------------|
| Progressing | <i class="fa-solid fa-circle-notch blue"></i> | Object is attempting to reach the desired state                                                             |
| Healthy     |    <i class="fa-solid fa-heart green"></i>    | Object is in sync and reporting that it is running as expected                                              |
| Unknown     |   <i class="fa-solid fa-question grey"></i>   | We don't have information about the live status of this object                                              |
| Degraded    |  <i class="fa-solid fa-heart-crack red"></i>  | Object has run into a problem, check the logs or events to find out more                                    |
| Out of Sync |  <i class="fa-solid fa-arrow-up orange"></i>  | Object manifest in the cluster is different from that specified in the Argo CD application's git repository |
| Missing     |    <i class="fa-solid fa-ghost grey"></i>     | Object is missing from the cluster                                                                          |
| In Sync     |    <i class="fa-solid fa-check green"></i>    | Object manifest matches what was applied, but does not report any additional health status                  |
| Suspended   |    <i class="fa-solid fa-pause grey"></i>     | Job is not currently running                                                                                |


### Detailed object information
Selecting an object or application name in the table will open a drawer containing detailed information.

The drawer contains up-to-date information regarding the selected object:
* Summary
* Events
* Logs
* Kubernetes yaml manifest

For Argo CD, all of these data fields are fetched on demand from your Argo instance. We do not currently support tailing logs.

#### Manifest Diffs
Octopus presents manifest diffs in the _opposite order_ to that shown in Argo.

In Argo, the left panel shows the live manifest in the cluster, and the right-panel shows the manifest that will be deployed when the application/resource is synced.

In Octopus, the left panel indicates "what was most recently written to the git repository", while the right shows the live manifest.


|         | Left                                                         | Right                                                             |
|---------|--------------------------------------------------------------|-------------------------------------------------------------------|
| Octopus | Manifest written to git repository as part of last release   | The live manifest in the cluster      |
| Argo CD | The live manifest in the cluster | The manifest in the git repository, which will be applied on sync |

As an example, In the following images, the date of deployment was updated in a configmap by an Octopus deployment.

:::figure
![ArgoCD Diff View](/docs/img/argo-cd/argo-cd-diff.png)
:::

The same change, in Octopus will appear - note how the changes appear in opposite columns.

:::figure
![Octopus Diff View](/docs/img/argo-cd/octopus-argo-cd-diff.png)
:::