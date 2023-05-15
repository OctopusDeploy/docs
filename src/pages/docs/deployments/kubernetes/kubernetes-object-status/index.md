---
layout: src/layouts/Default.astro
pubDate: 2023-05-15
modDate: 2023-05-15
title: Kubernetes Object Status  
description: Kubernetes Object Status guide.
navOrder: 5
---

Octopus can leverage information from a Kubernetes cluster to make step execution status more informative. With this feature enabled, Octopus will compare deployed resources' status with the desired state (applied configuration). The step will only be completed if the actual state meets the desired state. In other cases, the step will fail.

Octopus will also show a snapshot (from the moment of deployment) of deployed object status on a deployment screen — the `KUBERNETES OBJECT STATUS` tab.

![A screenshot of the Kubernetes Object Status tab](/docs/deployments/kubernetes/object-status/status-check-page.png "width=500")

## Where it is available

Kubernetes Object status is available for these steps.

* Deploy raw Kubernetes YAML
* Deploy Kubernetes containers (except for the Blue/Green deployment strategy)
* Deploy Kubernetes config map resource
* Deploy Kubernetes secret resource
* Deploy Kubernetes ingress resource
* Deploy Kubernetes service resource

Object status is disabled for all steps added before the feature was introduced and enabled by default in all the new steps added later.

## How to configure

Use the `Kubernetes Object Status Check` section on the step configuration page.

![A screenshot of the Kubernetes Object Status configuration section](/docs/deployments/kubernetes/object-status/kubernetes-object-status-check-configuration.png "width=500")

Use the first option to enable the feature (`Check that Kubernetes objects are running successfully`). Choosing `Don't do any verification checks` will disable the feature.

One can configure two extra parameters. Both parameters are determined in seconds.

* **Step execution timeout** refers to the maximum time a deployment step can run before termination.
This setting is intended to prevent a step from running indefinitely or causing delays in the overall deployment process. If one disables the parameter (checkbox), you allow the step to run indefinitely.

* **Status stabilization timeout** refers to the time that a Kubernetes object needs to be in a stable state before the step can be marked as successful. As the status of an object may change multiple times as Kubernetes attempts to reconcile the desired state with the actual state of the object, Octopus can monitor the cluster for some time after the configuration application to ensure that the desired state is achieved. If one sets this parameter to `0`, Octopus will not allow extra waiting time and completes the step execution as soon as all the resources enter the desired state for the first time.

A user needs to create and deploy a new release after one saves the new configuration to see the changes.

## How it works

When a deployment to a Kubernetes cluster is created, Octopus identifies the objects to create or update during this deployment. It then checks the status of these objects continuously throughout the deployment process. Apart from the objects that are defined directly in the project, Octopus also grabs the status of any children objects of them. For example, ReplicaSets and Pods that belong to a Deployment are included along with the Deployment itself, despite they are not defined directly.

When all objects are in a "Successful" state, or any of them are in a "Failed" state, Octopus will continue to check the status for a short period for stabilization (i.e. stabilization timeout). If the deployment status stays the same during this timeout period, the deployment will complete with that status, otherwise the stabilization period is reset and Octopus continues to check the status of objects.

When the execution timeout has been set, the deployment will stop at the end of this period regardless of the stabilization timeout. If not all objects have been deployed successfully, the deployment fails. This prevents the deployment from running indefinitely due to the inability to stabilize.

Octopus consumes and consolidates the objects information from the cluster to prevent customers from getting seemingly successful deployments which actually do not work. It does so by capturing some common failure scenarios such as the "ImagePullBackOff" or "CrashLoopBackOff" states for Pods, and mark the them as failing immediately. The deployment will fail if such errors are persistent during the stabilization timeout period. This helps the user to identify the problem as early as possible.

## How to use

Octopus will change the meaning of step execution status after enabling Kubernetes Object Status; no additional actions are required. One can interpret the new step status as that Octopus ensured the desired configuration was achieved on the target cluster and was stable for a given number of seconds (Status stabilization timeout value).

Users can also observe live updates from the cluster on the Kubernetes Object Status tab (Deployment page).

![A screenshot of the Kubernetes Object Status tab](/docs/deployments/kubernetes/object-status/object-status-tab.png "width=500")

Octopus displays recourse status in a respected table for each deployed resource. The table is live during the step execution (till the end of the stabilization period). After that, the table will not get any updates and will remain a snapshot for future reference.

If there are multiple steps in deploying Kubernetes resources, each step will have a separate section on the tab.

## Useful links

* [Find more details in the blog post](https://octopus.com/blog/live-updates-kubernetes-objects-deployments)
