---
layout: src/layouts/Default.astro
pubDate: 2025-03-28
modDate: 2025-05-16
navSection: Live Object Status
title: Kubernetes Live Object Status
navTitle: Overview
description: Kubernetes Live Object Status guide.
navOrder: 45
hideInThisSectionHeader: true
---

Kubernetes Live Object Status shows the live status of your Kubernetes objects after they have been deployed. This allows you to monitor and safely troubleshoot your Kubernetes application directly from within Octopus Deploy.

:::figure
![Live status page](/docs/img/kubernetes/live-object-status/live-status-page.png)
:::

## Where it is available

Using Kubernetes Live Object Status requires the following:

- Octopus Deploy 2025.3+
- A [Kubernetes Agent](/docs/kubernetes/targets/kubernetes-agent) target
- A project with a deployment process containing Kubernetes steps

## How to use Live Status

Once you have the Kubernetes monitor enabled on your [Kubernetes Agent](/docs/kubernetes/targets/kubernetes-agent), simply toggle the switch on the dashboard to show live status in place of the deployment status.

:::figure
![A screenshot of the Space dashboard showing live status](/docs/img/kubernetes/live-object-status/live-status-space-dashboard.png)
:::

Octopus display individual status at an object level as well as summarized status for an Application.

:::figure
![Live status page](/docs/img/kubernetes/live-object-status/live-status-page.png)
:::

### Application status

| Label       |                    Status Icon                     | Description                                                                 |
| :---------- | :------------------------------------------------: | :-------------------------------------------------------------------------- |
| Progressing |   <i class="fa-solid fa-circle-notch blue"></i>    | Objects in your application are currently in a progressing state            |
| Healthy     |      <i class="fa-solid fa-heart green"></i>       | The objects in your cluster match what was specified in the last deployment |
| Unknown     |     <i class="fa-solid fa-question grey"></i>      | We're having trouble getting live status updates for this application       |
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

Take a look at our [troubleshooting guide](/docs/kubernetes/live-object-status/troubleshooting) for details on why you may see some object statuses

### Detailed object information

Each object reported back by the Kubernetes monitor can be selected to provide detailed information including events, logs and the manifest currently on the cluster

:::figure
![Object summary](/docs/img/kubernetes/live-object-status/live-status-drawer-summary.png)
:::

#### Events

Events are fetched on demand from the running object. Octopus reads and presents events in similar way to `kubectl`.

:::figure
![Object events](/docs/img/kubernetes/live-object-status/live-status-drawer-events.png)
:::

#### Logs

Logs are fetched on demand from the running object. We do not currently support tailing logs, but it is on the roadmap in the near future.

:::figure
![Object logs](/docs/img/kubernetes/live-object-status/live-status-drawer-logs.png)
:::

#### Manifests

The first manifest shown is the live manifest as reported by the cluster back to Octopus.

When viewing an object that has been applied to your cluster, you are able to view the applied manifest and see any differences between them using the controls at the top of the drawer.

:::figure
![Object manifest](/docs/img/kubernetes/live-object-status/live-status-drawer-manifest.png)
:::

##### Diffs

When the show diff toggle is enabled, we compare the live manifest that we expect to see on the left, with what the cluster is reporting on the right.
Read about [applied manifest diffs](/docs/kubernetes/deployment-verification/applied-manifests/diffs) for more details on how to interpret the diff viewer.

:::figure
![Object manifest diffs](/docs/img/kubernetes/live-object-status/live-status-drawer-manifest-diffs.png)
:::

## How it works

The Kubernetes Agent has a new component called the Kubernetes monitor which also runs inside the Kubernetes cluster. Read more about the [Kubernetes monitor](/docs/kubernetes/targets/kubernetes-agent/kubernetes-monitor) here.

During a deployment, Octopus will capture any applied Kubernetes manifests and send them to the monitor. The monitor uses these manifests to track the deployed objects in the cluster, keeping track of their synchronization and health.

### Script steps

The built in Kubernetes steps will automatically report the applied manifests for deployments, however Octopus needs a bit of help when you're making changes using kubectl script steps.

To notify Octopus which Kubernetes resources you want tracked, we have bash and powershell helper functions available to use. You can choose between passing the manifest as a variable, or passing the file path directly instead.

Only the "Run a kubectl script" step will correctly report manifests, regular "Run a script" steps are not supported.

:::div{.info}
You still need to apply the Kubernetes manifests to your cluster. These functions only notify Octopus that you expect the resources to be created.
:::

Available in Octopus server versions:

- 2025.4.10333+
- 2026.1.4557+

#### Bash

```bash
read -r -d '' manifest << EOM
apiVersion: v1
kind: Namespace
metadata:
  name: "example"
labels:
    name: "example"
EOM

report_kubernetes_manifest "$manifest"
```

```bash
report_kubernetes_manifest_file "$ManifestFilePath"
```

#### Powershell

```pwsh
$manifest = @"
apiVersion: v1
kind: Namespace
metadata:
  name: "example"
labels:
    name: "example"
"@

Report-KubernetesManifest -manifest $manifest
```

```pwsh
Report-KubernetesManifestFile -path $ManifestFilePath
```

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

The well-defined structure of Kubernetes secrets allow us to confidently redact secret data.

To ensure that we never exfiltrate secret data that Octopus is not privy to, the Kubernetes monitor salts and hashes the secret data using sha256. By hashing secrets Octopus can tell you when something changed in your secret, but Octopus will never know what the secrets are unless you have populated them using Octopus sensitive variables.

Please be aware that outputting Kubernetes secrets into pod logs may result in them being sent un-redacted if they are not sourced from Octopus sensitive variables originally.

## Configuration

### Prioritize health status on dashboards

There can be [many reasons](/docs/kubernetes/live-object-status/troubleshooting#why-is-an-object-out-of-sync) that a particular object is marked as out of sync, some of these are not critical to the day to day operations of your application. In these cases, marking the entire application as out of sync on all dashboards may be more alarming than necessary.

To counteract this, there is a project setting that will prioritize health statuses over the sync status of your application. When enabled, the sync status of objects will not be considered when calculating the application status.

This setting defaults to on for all projects, but may change in the future.

## Known issues and limitations

### Excluded steps

The desired object list is compiled from objects that were applied during the last deployment. If steps are excluded during a deployment, then live status will not be shown for objects that were applied in those steps.

Please avoid skipping steps that deploy Kubernetes objects.

### Runbooks are not supported

Objects modified by Runbooks are not monitored. Please deploy the objects via a Deployment if you want them to be monitored.
