---
layout: src/layouts/Default.astro
pubDate: 2024-04-15
modDate: 2024-04-24
title: Server-Side Apply
description: Deploy Raw YAML to a Kubernetes cluster.
navOrder: 80
---

[Server-Side Apply (SSA)](https://kubernetes.io/docs/reference/using-api/server-side-apply/) is an opt-in Kubernetes mechanism that improves the configuration management of the `kubectl apply` command by tracking field ownership directly on the Kubernetes server.
SSA allows multiple appliers to manage the fields of a single Kubernetes object without accidentally overwriting each other’s intentions.

Octopus supports Server-Side Apply for the following steps:
- Deploy Kubernetes YAML
- Deploy with Kustomize
- Configure and apply Kubernetes resources
- Configure and apply a Kubernetes ConfigMap
- Configure and apply a Kubernetes Service
- Configure and apply a Kubernetes Ingress
- Configure and apply a Kubernetes Secret

You can find the settings under the **Additional Configuration Options** section of the step in the process editor.

:::figure
![Server-Side Apply configuration options](/docs/deployments/kubernetes/server-side-apply/server-side-apply-configuration-options.png)
:::

When using SSA, there is a risk of [conflicts](https://kubernetes.io/docs/reference/using-api/server-side-apply/#conflicts) blocking deployments. These can be dealt with manually or ignored with the `--force-conflicts` flag.
Turn this option off if you need conflict errors to propagate back and prefer to deal with them manually.

Running `kubectl apply` with SSA is the [recommended](https://kubernetes.io/blog/2022/10/20/advanced-server-side-apply/) way to apply your Kubernetes configuration. As such, all new Kubernetes steps you create have it enabled by default.

:::div{.info}
To minimize disruptions to your current workflows, Octopus won't enable SSA for any steps you created before Octopus `2024.2`. You can still use SSA by manually enabling the option for these steps.
:::

