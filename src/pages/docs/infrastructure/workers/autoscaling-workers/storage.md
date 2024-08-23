---
layout: src/layouts/Default.astro
pubDate: 2024-08-22
modDate: 2024-08-22
title: Storage
description: How to configure storage for a Kubernetes worker
navOrder: 10
---

The Kubernetes worker requires a common filesystem to share packages with its spawned operation pods. This filesystem
stores binary packages received from the Octopus Server, which are used by the operation being executed.

The Kubernetes worker's storage setup and constraints are identical to the [Kubernetes Agent storage](docs/kubernetes/targets/kubernetes-agent/storage.md).