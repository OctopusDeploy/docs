---
layout: src/layouts/Default.astro
pubDate: 2024-04-22
modDate: 2024-04-22
title: Kubernetes agent
navTitle: Overview
navSection: Kubernetes agent
description: How to configure a Kubernetes agent as a deployment target in Octopus
navOrder: 10
---
Kubernetes agent targets are a mechanism for executing [Kubernetes steps](/docs/deployments/kubernetes) for inside the target Kubernetes cluster.

The Kubernetes agent is installed into the target cluster using a [`helm`](https://helm.sh/) command. Once installed, the agent registers itself with Octopus Server and then can be used for deployments