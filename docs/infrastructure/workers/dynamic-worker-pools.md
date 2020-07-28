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

::: info
Octopus Cloud defines the use of the worker as **finished** when it has been idle for an hour (60 minutes). If your cloud instance does another deployment or runbook run within an hour, the same worker will be re-used.  No matter what, Octopus Cloud will destroy the worker after 72 hours (3 days).  These settings can be adjusted for your instance.  Reach out to [support@octopus.com](mailto:support@octopus.com) to request any adjustments.
:::

### Isolated

Each worker is provisioned so that they provide your task a sandbox that is completely isolated from our other customers.

::: info
Customers cannot add new workers nor make changes to the configuration of the workers. The workers are provisioned using our own service, meaning you don't need to configure anything for them to work in your environment.
:::

### Types of Dynamic Worker

Each dynamic worker pool can specify the worker image used. As of July 2020, `WindowsDefault` is the default, which is Windows Server Core 2016. `Windows2019` (Windows Server Core 2019) worker images are rolling out. Once the rollout is complete, Windows Server Core 2016 will be marked as deprecated.

Editing a dynamic worker pool allows you to modify the image used.

When an image is marked as deprecated, you will start to see warnings in the Octopus UI, and in the deployment log. After a suitable deprecation period, deployments will start to fail if they target an image that has hit end-of-life.

### Batteries included

#### WindowsDefault (Windows Server Core 2016)

Each `WindowsDefault` worker is provisioned with a baseline of tools including, but not limited to:

- Octopus Client (latest)
- .NET Framework 3.5
- .NET Framework 4.7.2
- Chocolatey (latest)
- Nuget CLI (latest)
- AWS IAM Authenticator (0.5.1)
- Helm (2.9.1)
- Python (3.7.4)
- Pip (20.1.1)
- Microsoft Service Fabric SDK (3.0.480)
- Microsoft Service Fabric (6.1.480.9494)
- Kubectl (1.16.10)

#### Windows2019 (Windows Server Core 2019)

Each `Windows2019` worker is provisioned with a baseline of tools including, but not limited to:

- Octopus Client (latest)
- .NET Framework 3.5
- .NET Framework 4.8
- Chocolatey (latest)
- Nuget CLI (latest)
- AWS IAM Authenticator (0.5.1)
- Helm (2.9.1)
- Python (3.7.4)
- Pip (20.1.1)
- Microsoft Service Fabric SDK (3.0.480)
- Microsoft Service Fabric (6.1.480.9494)
- Kubectl (1.16.10)
- Docker (19.03.5)

Windows2019 workers are capable of running [execution worker containers](https://octopus.com/blog/execution-containers).

::: hint
The versions and tools used above are subject to change, this list is intended to represent the general configuration at the time of writing.

Some of the tool installations are locked to a specific version, where others may be running the latest version.
:::

## KubeCtl

:::hint
The version of `kubectl` can be overridden by setting the variable `Octopus.Action.Kubernetes.CustomKubectlExecutable` to the following value `c:\tools\kubectl\version\kubectl.exe`
where version is one of the following:

- `1.11.1`
- `1.11.3`
- `1.12.1`
- `1.13.12`
- `1.14.9`
- `1.15.6`
- `1.16.10`
- `1.17.5`
- `1.18.0`
  :::

## Learn more

- [Worker blog posts](https://octopus.com/blog/tag/workers)
