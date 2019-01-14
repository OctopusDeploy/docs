---
title: Kubernetes
description: Octopus Deploy provides support for deploying Kubernetes resources.
position: 100
---

Octopus provides integrated support for deploying Kubernetes resources such as Deployments, Services, and Ingress, as well as running scripts against a Kubernetes cluster.

:::success
To make use of the Kubernetes steps, the Octopus server or workers that will run the steps need to have the `kubectl` executable installed. Linux workers also need to have the `jq`, `xargs` and `base64` applications installed.
:::
