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

For each work-package, a new script-pod is created. When large number of parallel operations exist, the cluster will have
an equal number of script-pods.

## Kubernetes Horizontal Scaling
### Default
In a Kubernetes cluster, when a pod is created, the pod creation request includes the resources (cpu/memory) the pod requires.
If sufficient resources are unavailable, the pod will be created in the "Pending" state, and will only start running
once the required resources become available.

Resources become available through 2 methods:
1. Pod termination, and thus returns used resources to the cluster
2. New nodes are added to the cluster

Kubernetes decides when to start a pod based on resource _requests_, not literal usage.
Meaning, if a Pod uses more resources than it requested - other pods may get starved.

When using the inbuilt horizontal-scaler it is important that a pod's requested resources roughly match expected usage. 

## How a Kubernetes worker requests resources
A script-pod requests a default of 2.5% of a CPU core and 100 megabytes of memory (`.Values.scriptPods.resources.requests`).

As such, a kubernetes cluster will (attempt to) provision a new node when **40** script-pods are running simultaneously.
For most cases this will result in a usable system, but it is dependent on the work being performed.

These values can be modified at installation time by editing the provided command line.
Otherwise, they can be updated at any time via a Helm upgrade command.

### Advanced Options
Kubernetes supports [Kubernetes event-Drive Autoscaling](https://keda.sh/) which allows a kubernetes nodes to be added/remove
based off user-defined rules (eg cpu usage, rather than request).

This may be an appropriate solution for complex deployment systems.