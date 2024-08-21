---
layout: src/layouts/Default.astro
pubDate: 2024-08-22
modDate: 2024-08-22
title: Scaling Behaviour
description: How the worker scales
navOrder: 30
---

The Kubernetes worker is responsible for executing work-packages received from an OctopusServer.

The work-package comprises:
* Binary packages (optional)
* Configuration data
* Execution script (user-defined operations which uses the config and packages supplied)

The worker writes the received data to the shared file system (by default NFS), then spawns a Kubernetes pod to execute
the supplied script. We creatively refer to these execution-pods as "script pods".

For each work-package, a new script-pod is created - each operation executes in its own script-pod.

## Kubernetes Horizontal Scaling
### Default
In a Kubernetes cluster, a pod creation request includes the resources (cpu/memory) the pod requires.
If sufficient resources are  not available, the pod is created in the "Pending" state.
When  required resources are available, the pod is started.

Resources become available through 2 methods:
1. Pod termination, returning the allocated resources to the cluster
2. More nodes are added to the cluster

Kubernetes decides when to start a pod based on resource _requests_, not usage.
Meaning, if a Pod uses more resources than it requested, other pods may be starved of resources.

When using the inbuilt horizontal-scaler it is important that a pod's requested resources roughly match expected usage. 

## How a Kubernetes worker requests resources
A script-pod requests a default of 2.5% of a CPU core and 100 megabytes of memory (`.Values.scriptPods.resources.requests`).

As such, a kubernetes cluster will (attempt to) provision a new node when **40** script-pods are running simultaneously.
For most cases this will result in a usable system, but it is dependent on the work being performed, and the capabilities
of the nodes.

If the cluster hosting your workers exhibits high CPU load, increasing the script-pod's requested resources may result
in better performance.

### Advanced Options
Kubernetes supports [Kubernetes event-Drive Autoscaling](https://keda.sh/) which allows Kubernetes nodes to be added/remove
according to user-defined rules (eg cpu usage, rather than request).

This may be an appropriate solution for complex deployment systems.