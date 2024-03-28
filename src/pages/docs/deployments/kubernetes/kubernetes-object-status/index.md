---
layout: src/layouts/Default.astro
pubDate: 2023-05-15
modDate: 2023-05-15
title: Kubernetes Object Status  
description: Kubernetes Object Status guide.
navOrder: 5
---

:::div{.hint}
The Kubernetes Object Status feature was added in Octopus **2023.2**.
:::

Octopus can leverage information from a Kubernetes cluster to make step execution status more informative. With this feature enabled, Octopus will compare deployed resources' status with the desired state (applied configuration). The step will only be completed if the actual state meets the desired state. In other cases, the step will fail.

Octopus will also show a snapshot (from the moment of deployment) of deployed object status on a deployment screen — the `KUBERNETES OBJECT STATUS` tab.

:::figure
![A screenshot of the Kubernetes Object Status tab](/docs/deployments/kubernetes/object-status/status-check-page.png)
:::

## Where it is available

Kubernetes Object status is available for these steps.

* Deploy Kubernetes YAML
* Deploy with Kustomize
* Configure and apply Kubernetes resources (except for the Blue/Green deployment strategy)
* Configure and apply a Kubernetes ConfigMap
* Configure and apply a Kubernetes Secret
* Configure and apply a Kubernetes Ingress
* Configure and apply a Kubernetes Service

Object status is disabled for all steps added before the feature was introduced and enabled by default in all the new steps added later.

## How to configure

Use the `Kubernetes Object Status Check` section on the step configuration page.

:::figure
![A screenshot of the Kubernetes Object Status configuration section](/docs/deployments/kubernetes/object-status/kubernetes-object-status-check-configuration.png)
:::

Use the first option to enable the feature (`Check that Kubernetes objects are running successfully`). Choosing `Don't do any verification checks` will disable the feature.

One can configure two extra parameters.

* **Step timeout** refers to the maximum time a deployment step can run before termination (determined in seconds).
This setting is intended to prevent a step from running indefinitely or causing delays in the overall deployment process. If one disables the parameter (checkbox), you allow the step to run indefinitely.

* **Wait for Jobs to complete during deployment** determines if Octopus should wait for the successful completion of the jobs deployed at this step. If unchecked, Octopus considers a step execution successful once Jobs are created without waiting for their execution.

A user needs to create and deploy a new release after one saves the new configuration to see the changes.

## How it works

When a deployment to a Kubernetes cluster is created, Octopus identifies the objects to create or update during this deployment. It then checks the status of these objects continuously throughout the deployment process. Apart from the objects that are defined directly in the project, Octopus also grabs the status of any children objects of them. For example, ReplicaSets and Pods that belong to a Deployment are included along with the Deployment itself, despite they are not defined directly.

The step will succeed as soon as Kubernetes achieves the desired state.

When the step timeout has been set, the step will fail if Kubernetes doesn't achieve the desired state within the timeout.

The only exception to this rule is for a stand-alone pod (without a ReplicaSet about it) or a job. The step will fail early if these resources achieve an unrecoverable state.

:::figure
![A K8s object status diagram](/docs/deployments/kubernetes/object-status/K8s-object-status-logics.jpg)
:::

## How to use

Octopus will change the meaning of step execution status after enabling Kubernetes Object Status; no additional actions are required. One can interpret the new step status as that Octopus ensured the desired configuration was achieved on the target cluster and was stable for a given number of seconds (Status stabilization timeout value).

Users can also observe live updates from the cluster on the Kubernetes Object Status tab (Deployment page).

:::figure
![A screenshot of the Kubernetes Object Status tab](/docs/deployments/kubernetes/object-status/object-status-tab.png)
:::

Octopus displays resource status in a respected table for each deployed resource. The table is live during the step execution (till the end of the stabilization period). After that, the table will not get any updates and will remain a snapshot for future reference.

At a given point in time, an object can have one of four statuses:

| Label                       | Status Icon                              |
|:----------------------------|:----------------------------------------:|
| In progress                 | <i class="fa-solid fa-spinner"></i>      |
| Success                     | <i class="fa-solid fa-circle-check"></i> |
| Error                       | <i class="fa-solid fa-circle-xmark"></i> |
| Timed out while in progress | <i class="fa-solid fa-clock"></i>        |

If there are multiple steps in deploying Kubernetes resources, each step will have a separate section on the tab.

## Useful links

* [Find more details in the blog post](https://octopus.com/blog/live-updates-kubernetes-objects-deployments)
