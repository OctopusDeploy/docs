---
title: Dynamic Worker pools
description: Dynamic Worker pools are used in our cloud product to dynamically create and assign workers to running tasks.  This page describes how dynamic worker pools work.
position: 50
---

Dynamic Worker Pools are a special type of [worker pool](/docs/infrastructure/workers/worker-pools.md) used by our cloud product to intialize a group of [workers](/docs/infrastructure/workers/index.md), when a task is assigned to a worker, the task will be executed by one of the workers in the pool.

## Characteristics

The Default Worker Pools for our latest cloud instances are configured to use a Dynamic Worker Pool, which means it displays some different characteristics to older cloud instances and our self-hosted product.

### On demand

Workers are created on demand and are assigned to a customer when required. Once you've finished using a worker, the worker is destroyed and not reused.

### Isolated

Each worker is provisioned so that they provide your task a sandbox that is completely isolated from our other customers.

::: info
Customers cannot make changes to the default worker pool, or the configuration of the workers themselves. The workers are provisioned using our own service, meaning you don't need to configure anything for them to work in your environment.
:::

### Batteries included

Each worker is provisioned with a baseline of tools including, but not limited to:

- Octopus Client (latest)
- .NET Frameworks (3.5+)
- .NET Core (latest LTS)
- Chocolatey (latest)
- Nuget CLI (latest)
- AWS IAM Authenticator (0.3.0)
- Helm (2.9.1)
- Python & pip (3.7.4)
- Microsoft Service Fabric SDK (3.0.480)
- Microsoft Service Fabric (6.1.480.9494)
- Kubectl (1.14.9)

:::hint
The version of `kubectl` can be overridden by setting the variable `Octopus.Action.Kubernetes.CustomKubectlExecutable` to the following value `c:\tools\kubectl\version\kubectl.exe`
where version is one of the following:
- `1.11.1`
- `1.11.3`
- `1.12.1`
- `1.13.12`
- `1.14.9`
- `1.15.6`
- `1.16.3`
:::

::: hint
The versions and tools used above are subject to change, this list is intended to represent the general configuration at the time of writing.

Some of the tool installations are locked to a specific version, where others may be running the latest version.
:::

## Learn more

- [Worker blog posts](https://www.octopus.com/blog/tag/workers) 
