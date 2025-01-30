---
layout: src/layouts/Default.astro
pubDate: 2024-08-22
modDate: 2024-08-22
title: Scaling Behavior
description: How the worker scales
navOrder: 40
---
We have developed Kubernetes worker as a scalable solution for running your deployment tasks efficiently. The Worker is designed to make the most of your infrastructure resources, minimizing usage when deployments are not active while allowing you to run many deployments simultaneously.

To achieve this, the worker creates temporary pods for each new deployment task. When there are no deployment tasks running, the Kubernetes worker will shrink to just a couple of pods, consuming minimal resources on your cluster. Any released resources can then be utilized by other applications on the cluster.

If you don't have other applications that can make use of the released resources, you can take an additional step towards scalability by configuring the Kubernetes cluster to scale together with the worker, adding and removing nodes as needed.

This article will provide a detailed explanation of how to configure Kubernetes autoscaling with Kubernetes worker.

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

Resource requests limits can be defined manually via the `.Values.scriptPods.resources` value, its content follows existing
[Kubernetes structures](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).

### Advanced Options
Kubernetes supports [Kubernetes Event Driven Autoscaling](https://keda.sh/) which allows Kubernetes nodes to be added/remove
according to user-defined rules (eg cpu usage, rather than request).

This may be an appropriate solution for complex deployment systems.