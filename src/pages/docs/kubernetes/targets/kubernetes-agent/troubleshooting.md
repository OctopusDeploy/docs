---
layout: src/layouts/Default.astro
pubDate: 2024-05-08
modDate: 2024-09-17
title: Troubleshooting
description: How to troubleshoot common Kubernetes Agent issues
navOrder: 40
---

This page will help you diagnose and solve issues with the Kubernetes agent.

## Installation Issues

### Helm command fails with `context deadline exceeded`

The generated helm commands use the [`--atomic`](https://helm.sh/docs/helm/helm_upgrade/#options) flag, which automatically rollbacks the changes if it fails to execute within a specified timeout (default 5 min).

If the helm command fails, then it may print an error message containing context deadline exceeded
This indicates that the timeout was exceeded and the Kubernetes resources did not correctly start.

To help diagnose these issues, the `kubectl` commands [`describe`](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_describe/) and [`logs`](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/) can be used _while the helm command is executing_ to help debug any issues.

#### NFS CSI driver install command

```
kubectl describe pods -l app.kubernetes.io/name=csi-driver-nfs -n kube-system
```

#### Agent install command

```
# To get pod information
kubectl describe pods -l app.kubernetes.io/name=octopus-agent -n [NAMESPACE]
# To get pod logs
kubectl logs -l app.kubernetes.io/name=octopus-agent -n [NAMESPACE]
```
_Replace `[NAMESPACE]` with the namespace in the agent installation command_

If the Agent install command fails with a timeout error, it could be that:

- There is an error in the connection information provided
- The bearer token or API Key has expired or has been revoked
- The agent is unable to connect to Octopus Server due to a networking issue
- (if using the NFS storage solution) The NFS CSI driver has not been installed
- (if using a custom Storage Class) the Storage Class name doesn't match

## Script Execution Issues

### `Unexpected Script Pod log line number, expected: expected-line-no, actual: actual-line-no` 

This error indicates that the logs from the script pods are incomplete or malformed. 

When scripts are executed, any outputs or logs are stored in the script pod's container logs. The Tentacle pod then reads from the container logs to feed back to Octopus Server.

There's a limit to the size of logs kept before they are [rotated](https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation) out. If a particular log line is rotated before Octopus Server reads it, then it means log lines are missing - hence we fail the deployment prevent unexpected changes from being hidden.

### `The Script Pod 'octopus-script-xyz' could not be found`

This error indicates that the script pods were deleted unexpectedly - typically being evicted/terminated by Kubernetes.

If you are using the default NFS storage however, then the script pod would be deleted if the NFS server pod is restarted. Some possible causes are:

- being evicted due to exceeding its storage quota
- being moved or restarted as part of routine cluster operation

## Health Checks and Upgrades

### `error looking up service account octopus-agent-XXX/octopus-agent-auto-upgrader: serviceaccount \"octopus-agent-auto-upgrader\" not found`

This error occurs when certain versions of Octopus Server attempt to run a health check using a Kubernetes service account that was added in a later version of the Kubernetes agent.

In version `2024.3.11946` onwards and all `2024.4` versions, Octopus Server uses the `octopus-agent-auto-upgrader` service account to perform health checks and upgrades. However, this service account was added in `1.16.0` and `2.2.0` of the Kubernetes agent Helm chart.

This means, that if you version of Octopus Server is trying to use that service account, but the installed agent is on version before the version it was added, you will receive an error like

```
Operation returned an invalid status code 'Forbidden', response body {"kind":"Status","apiVersion":"v1","metadata":{},"status":"Failure","message":"pods \"octopus-script-kqssiima8u6u2oz8zvwgvw\" is forbidden: error looking up service account octopus-agent-XXX/octopus-agent-auto-upgrader: serviceaccount \"octopus-agent-auto-upgrader\" not found","reason":"Forbidden","details":{"name":"octopus-script-kqssiima8u6u2oz8zvwgvw","kind":"pods"},"code":403}
```

To fix this issue, the agent will need to manually upgraded to a version greater than `1.16.0` and `2.2.0`. Once this has been done, then health checks and automatic upgrades will work again.

To manually upgrade, run the command below that matches the major version range of your installed agent/worker. This can be found by going to the **Connectivity** page on the **Deployment Target** or **Worker** details page and noting the **Current Version**. You should also note the **Helm Release Name** and **Namespace**, which are used in the command.

#### V1

```bash
helm upgrade --atomic --namespace [NAMESPACE] --version "1.*.*" [HELM-RELEASE-NAME] oci://registry-1.docker.io/octopusdeploy/kubernetes-agent
```

### V2

```bash
helm upgrade --atomic --namespace [NAMESPACE] --version "2.*.*" [HELM-RELEASE-NAME] oci://registry-1.docker.io/octopusdeploy/kubernetes-agent
```

Executing this command in a terminal connected to the Kubernetes cluster will result in the agent/worker being upgraded to the latest version as well as re-enabling health checks and automatic upgrades.