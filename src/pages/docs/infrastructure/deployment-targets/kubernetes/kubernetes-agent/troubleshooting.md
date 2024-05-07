---
layout: src/layouts/Default.astro
pubDate: 2024-05-08
modDate: 2024-05-08
title: Troubleshooting
description: How to troubleshoot common Kubernetes Agent issues
navOrder: 10
---

This page will help you diagnose and solve issues with the Kubernetes Agent.

## Common errors:

### Helm command fails with context deadline exceeded

The generated helm commands use the [`--atomic`](https://helm.sh/docs/helm/helm_upgrade/#options) flag, which automatically rollbacks the changes if it fails to execute within a specified timeout (default 5 min).

If the helm command fails, then it may print an error message containing context deadline exceeded
This indicates that the timeout was exceeded and the Kubernetes resources did not correctly start.

To help diagnose these issues, the `kubectl` command [`describe`](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_describe/) can be used _while the helm command is executing_ to help debug any issues.

#### NFS install command

```
kubectl describe pods -l app.kubernetes.io/name=csi-driver-nfs -n kube-system
```

#### Agent install command

```
kubectl describe pods -l app.kubernetes.io/name=octopus-agent -n [NAMESPACE]
```
_Replace `[NAMESPACE]` with the namespace in the agent installation command_

### `Unexpected Script Pod log line number, expected: expected-line-no, actual: actual-line-no` 

This error implies that the logs from the Script Pods are incomplete or malformed. 

When scripts are executed, any outputs or logs are stored in the Script Pod's container logs. The Tentacle Pod then reads from the container logs to feed back to Octopus Server.

There's a limit to the size of logs kept before they are [rotated](https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation) out. If a particular line is rotated before Octopus Server reads it, then it means log lines are missing - hence we fail the deployment prevent unexpected changes from being hidden.

### `The Script Pod 'octopus-script-xyz' could not be found`

This error implies that the Script Pods were deleted unexpectedly - typically being evicted/terminated by Kubernetes.

If you are using the default NFS storage however, then the Script Pod would be deleted if the NFS Server Pod is restarted. Some possible causes are:

- being evicted due to exceeding its storage quota
- being moved or retarted as part of routine operation
