---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: kubectl  
description: The kubectl utility is required by Octopus Deploy Kubernetes integration.  
navOrder: 100
---

The [kubectl command-line tool](https://kubernetes.io/docs/reference/kubectl/overview/) is required by Octopus Deploy's Kubernetes features.

kubectl is not bundled with Octopus, and must be pre-installed on the [worker](/docs/infrastructure/workers/index.md) or Octopus Server which will execute steps and health checks against a [Kubernetes target](/docs/infrastructure/deployment-targets/kubernetes-target/index.md). Alternatively, [execution containers](/docs/projects/steps/execution-containers-for-workers/) may be used. 

By default, Octopus assumes `kubectl` is available in the PATH environment variable. A specific location for `kubectl` can be supplied by setting a `Octopus.Action.Kubernetes.CustomKubectlExecutable` variable in the Octopus project (an example value is `c:\tools\kubectl\version\kubectl.exe`). 
