---
layout: src/layouts/Default.astro
pubDate: 2024-04-29
modDate: 2024-07-31
title: Storage
description: How to configure storage for a Kubernetes worker
navOrder: 30
---

The Kubernetes Worker requires a common filesystem to share packages with its spawned operation pods. This filesystem is
stores binary packages received from the Octopus Server, and are used by the operation being executed.

The Kubernetes Worker's storage setup and constraints are identical to the [Kubernetes Agent storage](docs/kubernetes/targets/kubernetes-agent/storage.md).