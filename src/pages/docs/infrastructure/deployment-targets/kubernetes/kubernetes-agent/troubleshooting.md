---
layout: src/layouts/Default.astro
pubDate: 2024-05-08
modDate: 2024-05-30
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

## Frequently Asked Questions {#FAQ}

### Can the agent work with Octopus running in an HA Cluster setup?
Yes! See the [Kubernetes agent HA Cluster Support](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/ha-cluster-support) page.


### Can a proxy be specified when setting up the Kubernetes agent? 
Yes! Proxy servers for the polling connection that takes place between the agent and Octopus Server. These can be supplied for setup via the `.pollingProxy.*`  helm values.

Define the polling proxy server through the `agent.pollingProxy.host`, `agent.pollingProxy.port`, `agent.pollingProxy.username` and `agent.pollingProxy.password` values via the [octopusdeploy/kubernetes-agent](https://hub.docker.com/r/octopusdeploy/kubernetes-agent) helm chart.

### When trying to install the Kubernetes Agent on an existing cluster, I get an 401: Unauthorized response.

Check where and how the particular command being executed is running, and if the expected auth context is set up. For example: are you logged in to Docker Hub locally if that's where you're doing the setup from.

### Do I need to have the NFS CSI Driver?
Not for all configurations. It depends, the installation wizard will guide you.

If you are using `azurefile` then you don't need the NFS CSI driver. 

If you're using a new/clean AKS instance then you will need to install the NFS CSI Driver, as that AKS instance will not have the NFS CSI driver installed.

### I have unexpected behavior with the polling endpoints in a HA configuration.
This could be a variety of issues. First check that different PORTS and/or URLs are used for each node. 

Check what was supplied to `agent.serverCommsAddresses` as they must be unique for [each Octopus node being registered against](https://octopus.com/docs/administration/high-availability/maintain/polling-tentacles-with-ha#connecting-polling-tentacles).

If that doesn't help, please [get in touch](https://octopus.com/support).

### I'm having strange behavior relating to ingress in a HA configuration.
Carefully look and see that there is a `serverCommsAddress` property for backwards compatibility, and a `serverCommsAddresses` the latter supporting an array input, mistyping these can happen. This has presented itself as a variety of errors depending on the broader configuration, e.g. you may see "it failed to allocate the public ip" if using load balancers.

### The Script Pod seems to hang during a deployment
The times this has been brought up it's been specific to the deployment process being executed. Run subsets of your process to narrow down the cause, or [get in touch](https://octopus.com/support) with info on how we can reproduce what you're seeing.
