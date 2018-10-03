---
title: Kubernetes
description: Octopus Deploy provides support for deploying Kubernetes resources.
position: 100
---

Octopus provides integrated support for deploying Kubernetes resources such as Deployments, Services, and Ingress, as well as running scripts against a Kubernetes cluster.

:::warning
Kubernetes steps in Octopus are of alpha level quality and have been made available for testing and feedback purposes only. They **must not** be used for production deployments, or enabled on production Octopus instances. The information provided here is subject to change at any point, and existing Kubernetes steps will most likely need to be deleted and recreated with Octopus upgrades.
:::

:::success
To make use of the Kubernetes steps, the Octopus server or workers that will run the steps need to have the `kubectl` executable installed. Linux workers also need to have the `jq`, `xargs` and `base64` applications installed.
:::

To use the Kubernetes steps, you must enable the feature in the `Configuration > Features` section.

![](kubernetes-feature.png "width=500")
