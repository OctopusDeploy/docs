---
layout: src/layouts/Default.astro
pubDate: 2024-04-22
modDate: 2024-04-22
title: Kubernetes Agent
description: How to configure a Kubernetes Agent as a deployment target in Octopus
navOrder: 10
---
Kubernetes Agent targets are a mechanism for executing [Kubernetes steps](/docs/deployments/kubernetes) for inside the target Kubernetes cluster.

The Kubernetes Agent is installed into the target cluster using a [`helm`](https://helm.sh/) command. Once installed, the agent registers itself with Octopus Server and then can be used for deployments