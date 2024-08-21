---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-14
title: Auto Scaling
navOrder: 60
---

Workers are only utilized during the execution of a Deployment Process - which means they need to be able to handle high
workloads intermittently but remain idle otherwise.

Workers installed on virtual or physical machines will require minimal resources during quiet times, meaning the machine 
is under-utilized for a significant portion of its life.

This issue goes away when using the Kubernetes Worker - a worker which can be installed in a Kubernetes cluster and makes
use of the cluster's ability to add/remove hardware resources as workloads fluctuate.

Auto-scaling benefits aside, the Kubernetes Worker _is_ a standard Octopus worker:
* It must be included in 1 or more worker pools
* Supports deployments to any deployment target
* Will be kept up to date via machine health checks & updates
* Can execute operations in custom containers (as defined on the deployment step)

## Default Behavior
The web portal's [installation process](/docs/infrastructure/workers#installing-a-kubernetes-agent-as-a-worker) installs a worker which will work for 90% of all workloads.

When the Kubernetes Worker executes a deployment step, it executes the operation within a [worker-tools](https://hub.docker.com/r/octopusdeploy/worker-tools) container,
meaning sufficient tooling is available for most deployment activities.

If custom-steps require specific tooling, you are able to set the desired container on the deployment step - the Kubernetes
Agent honours this setting as per other worker types.

## Customizations
The behavior of the Kubernetes Worker can be modified through [Helm chart](https://github.com/OctopusDeploy/helm-charts/tree/main/charts/kubernetes-agent) `values`.

These values can be set at initial installation (by editing the Octopus Server supplied command line), or at any time via a Helm upgrade.

Of note:

| Value | Purpose                                                                   |
| --- |---------------------------------------------------------------------------|
| scriptPods.worker.image | Specifies the docker container image to be used when running an operation |
| scriptPods.resources.requests | Specifies the average cpu/memory usage required to execute an operation |

If you are experiencing difficulties with your Kubernetes Cluster's autoscaling, modifying `scriptPods.resources.requests.*`
may provide a solution.

If this value is too low (i.e. lower than your actual CPU usage) - the cluster will not enable new nodes when required.
If this value is too large (i.e. higher than actual usage) - the cluster will scale too early, and may leave your script
pods pending for longer than necessary.

## Permissions
The Kubernetes Worker is limited to modifying its local namespace, ensuring it is unable to pollute the cluster at large.

The Kubernetes Worker is permitted unfettered access to its local namespace, ensuring it is able to update itself, and
create new pods for each requested operation.

## Limitations
Being securely hosted inside a kubernetes cluster comes with some limitations - the primary of which is the lack of `Docker`.
Which means certain operations which are typically valid, will not be possible.
Specifically:
* Creating an execution container, [inline on a deployment step](../../projects/steps/execution-containers-for-workers#inline-execution-containers)
* Fetching docker images (when used as secondary packages)
* Arbitrary scripts which use docker


## Getting Started
You can get started with the Kubernetes Worker by installing it into a local "playground" Kubernetes cluster.

We recommend setting a cluster in your local environment using either:
* [Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fmacos%2Farm64%2Fstable%2Fbinary+download))
* [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/)

From there, you follow the Kubernetes Agent install workflow to enable scalable workers! 