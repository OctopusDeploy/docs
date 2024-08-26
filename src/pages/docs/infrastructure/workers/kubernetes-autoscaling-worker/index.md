---
layout: src/layouts/Default.astro
pubDate: 2024-08-22
modDate: 2024-08-22
title: Kubernetes Auto-scaling Worker
navOrder: 60
---
The Kubernetes Worker allows worker operations to be executed within a Kubernetes cluster in a scalable manner.
This allows compute resources used during the execution of a Deployment process are released
when the Deployment completes.

The Octopus Web portal provides a wizard which constructs guides you through the creation of a Helm installation command
which installs the Kubernetes Worker in your cluster.

Once installed, the Kubernetes Worker functions as a standard Octopus worker:
* It must be included in 1 or more worker pools
* Supports deployments to any deployment target
* Will be kept up to date via machine health checks & updates
* Can execute operations in custom containers (as defined on the deployment step)

## Default Behavior
The web portal's [installation process](/docs/infrastructure/workers#installing-a-kubernetes-worker) installs a worker which will work for a majority of workloads.

When the Kubernetes worker executes a deployment step, it executes the operation within a [worker-tools](https://hub.docker.com/r/octopusdeploy/worker-tools) container,
meaning sufficient tooling is available for most deployment activities.

If a step requires specific tooling, you are able to set the desired container on the step - the Kubernetes
Worker honours this setting as per other worker types.

## Customizations
The behavior of the Kubernetes Worker can be modified through [Helm chart](https://github.com/OctopusDeploy/helm-charts/tree/main/charts/kubernetes-agent) `Values`.

These values can be set during installation (by editing the Octopus Server supplied command line), or at any time via a Helm upgrade.

Of note:

| Value | Purpose                                                                   |
| --- |---------------------------------------------------------------------------|
| scriptPods.worker.image | Specifies the docker container image to be used when running an operation |
| scriptPods.resources.requests | Specifies the average cpu/memory usage required to execute an operation |

If you are experiencing difficulties with your Kubernetes Cluster's autoscaling, modifying `scriptPods.resources.requests.*`
may provide a solution.

Too low (i.e. lower than your actual CPU usage) and the cluster will not provision new nodes when required.
Too large (i.e. higher than actual usage) then the cluster will scale too early, and may leave your script
pods pending for longer than necessary.

## Permissions
The Kubernetes Worker is limited to modifying its local namespace, preventing it from polluting the cluster at large.

The Kubernetes Worker is permitted unfettered access to its local namespace, ensuring it is able to update itself, and
create new pods for each requested operation.

The Kubernetes Worker allows execution permissions to be overwritten in the same way as the [Kubernetes Agent](/docs/kubernetes/targets/kubernetes-agent/permissions).

## Limitations
Being securely hosted inside a kubernetes cluster comes with some limitations - the primary of which is the lack of `Docker`.
Which means certain operations which are typically valid, may not be possible.
Specifically:
* Creating an [inline execution container](../../projects/steps/execution-containers-for-workers#inline-execution-containers) 
* Fetching docker images (when used as secondary packages)
* Arbitrary scripts which use docker