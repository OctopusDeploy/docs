---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-10-05
title: Dynamic Worker pools
description: Dynamic Worker pools are used in our cloud product to dynamically create and assign workers to running tasks.  This page describes how dynamic worker pools work.
navOrder: 50
---

Dynamic Worker Pools are a special type of [worker pool](/docs/infrastructure/workers/worker-pools/) used by Octopus Cloud.  They use [workers](/docs/infrastructure/workers) provided by Octopus, and they don't require users to configure any infrastructure.  

## On demand

Dynamic workers are created on demand and leased to an Octopus Cloud instance for a limited time before being destroyed.  

:::div{.info}
Octopus Cloud will automatically destroy dynamic workers as soon as one of these conditions is met:

- The worker has been idle for 60 minutes.
- The worker has existed for 72 hours (3 days).

Please reach out to [support@octopus.com](mailto:support@octopus.com) if you need these values to be adjusted for your instance.
:::

## Isolated

Each worker is provisioned exclusively to a specific customer, and is completely isolated from other customers.

## Dynamic Worker Images

Each dynamic worker pool can specify the worker image used. Ubuntu Linux 22.04 is the default. Windows Server Core 2019 (end-of-life, see [below](#windows-server-core-2019)) and 2022 worker images are also available.

Editing a dynamic worker pool allows you to modify the image used. 

The available worker images list specific operating system versions (e.g., `Ubuntu Linux 22.04`) but also generic "default" options such as `Ubuntu (default)`. Choosing the default option means that your worker will get the latest stable worker image released. This is a good option to choose if you're running a basic script that doesn't have any dependencies on specific tool or operating system versions.

If you're writing a script that relies on a specific version of tooling (e.g., helm), then we recommend choosing a specific worker image, instead of the "default" options, to prevent worker image upgrades from impacting your deployments.

|Type | Pros | Cons |
|-----|------|------|
| Default (eg `Ubuntu (default)`) | Automatically uses the latest image. Deployments will continue to work even when a worker image is marked as deprecated or decommissioned.| The versions of dependencies (e.g., helm) are not fixed. Deployments that rely on specific versions of dependencies or operating system specific features may break during upgrades. |
| Specific (e.g., `Ubuntu Linux 22.04`) | The version of the operating system and dependencies are fixed and can be relied upon. | When a worker image is marked as deprecated, warnings will start to appear in your deployment logs. When a worker image is decommissioned, you will need to take action to update your worker pool or deployments will fail. |

## Deprecation

When an image is marked as deprecated, you will see warnings in the Octopus UI, and in the deployment log. After a suitable deprecation period, deployments will start to fail if they target an image that has hit end-of-life.

When you start getting warnings in your deployments and/or see deprecation warnings in the Octopus portal, please plan to modify your worker pool to use a different image and test your scripts on the new image.

If your Worker Pool is set to use the Operating System default, for example, `Ubuntu (default)`, the default will be swapped over to a new Operating System version by Octopus Deploy. Your deployments and runbooks will automatically use the new version.

You should validate that your deployments and runbooks work with the new version prior to the cutover date. The new image will be made available prior to the cutover date and we will notify you of the cutover date to give you time to undertaking any required testing.

### Modifying the worker pool 

If the Worker Pool has been configured to specifically use a deprecated worker type, you will need to update the Worker Image on the Worker Pool.

The Worker Pool with a deprecated Worker Type will show a `Deprecated` label next to the worker pool, available by navigating to **Infrastructure ➜ Worker Pools**:
![Worker Pool list with deprecated worker](/docs/infrastructure/workers/images/deprecated-worker-pool-overview.png)

The Worker Type can be modified by editing the Worker Pool and changing the Worker Type to a different option, such as `Windows (default)` or a specific operating system version.

## Available Dynamic Worker Images 

Worker images are rebuilt on a regular basis, so that the operating system is up to date with the latest security patches.

### Ubuntu 22.04

This is the default for the Ubuntu operating system, referenced as `Ubuntu (default)`.

Each `Ubuntu Server 22.04` worker is provisioned with a baseline of tools including (but not limited to):

- .NET 6
- Docker (latest)
- Powershell Core (latest)
- Python 3 (latest)
- GCloud CLI (367.0.0)

:::div{.hint}
Ubuntu workers are designed to use [execution worker containers](https://octopus.com/blog/execution-containers) for tooling such as `kubectl` and `helm`. This makes it much easier to choose the appropriate runtime environment with the tools you need for your use case.
:::

### Ubuntu 18.04

:::div{.warning}
Ubuntu 18.04 images are no longer available as of 3 April 2023. Please refer to [Ubuntu 18.04 End-of-life](/docs/infrastructure/workers/dynamic-worker-pools/ubuntu-1804-end-of-life) for further details.
:::

### Windows Server Core 2019

:::div{.warning}
Windows 2019 images will be removed on 9 January 2024. Please refer to [Windows 2019 end-of-life](/docs/infrastructure/workers/dynamic-worker-pools/windows-2019-end-of-life) for further details.
:::

Each `Windows Server Core 2019` worker is provisioned with a baseline of tools including (but not limited to):

- .NET Core (2.1, 3.1)
- .NET Framework 3.5
- .NET Framework 4.8
- AWS IAM Authenticator (0.5.3)
- Chocolatey (latest)
- Docker (latest)
- Helm (2.9.1)
- Kubectl (multiple versions)
- Microsoft Service Fabric (6.1.480.9494)
- Microsoft Service Fabric SDK (3.0.480)
- Nuget CLI (latest)
- Octopus Client (latest)
- Pip (latest)
- Powershell Core (latest)
- Python (3.7.4)
- GCloud CLI (339.0.0)

Windows 2019 workers are capable of running [execution worker containers](/docs/projects/steps/execution-containers-for-workers). 

:::div{.hint}
We recommend execution containers as the preferred option for steps requiring external tools. This allows you to control which version of the tools will be used as your scripts will rely on a specific version that they are compatible with to function correctly.
:::

### Windows Server Core 2022
:::div{.hint}
Windows 2022 is currently the `Windows (default)` image. If you are having issues with your deployments using Windows 2022, you can revert your Dynamic Worker pool(s) to use Windows 2019. However, note that this is only a temporary workaround as Windows 2019 images will be removed on 9 January 2024. Please refer to [Windows 2019 end-of-life](/docs/infrastructure/workers/dynamic-worker-pools/windows-2019-end-of-life) for further details.
:::

Each `Windows Server Core 2022` worker is provisioned with a baseline of tools including (but not limited to):

- .NET Core (2.1, 3.1)
- .NET Framework 3.5
- .NET Framework 4.8
- AWS IAM Authenticator (0.5.3)
- Chocolatey (latest)
- Docker (latest)
- Helm (2.9.1)
- Kubectl (multiple versions)
- Microsoft Service Fabric (6.1.480.9494)
- Microsoft Service Fabric SDK (3.0.480)
- Nuget CLI (latest)
- Octopus Client (latest)
- Pip (latest)
- Powershell Core (latest)
- Python (3.7.4)
- GCloud CLI (339.0.0)

Windows 2022 workers are capable of running [execution worker containers](/docs/projects/steps/execution-containers-for-workers). 

:::div{.hint}
We recommend execution containers as the preferred option for steps requiring external tools. This allows you to control which version of the tools will be used as your scripts will rely on a specific version that they are compatible with to function correctly.
:::

## kubectl on Windows Images

Windows dynamic worker images come with many versions of `kubectl` available.

A specific version can be used by [specifying a custom kubectl location](/docs/deployments/kubernetes/kubectl) of `c:\tools\kubectl\{{version}}\kubectl.exe`, where `{{version}}` is one of the following: 

- `1.11.1`
- `1.11.3`
- `1.12.1`
- `1.13.12`
- `1.14.9`
- `1.15.6`
- `1.16.10`
- `1.17.5`
- `1.18.0`
- `1.19.9`
- `1.20.5`
- `1.21.9`
- `1.22.6`

## Installing Software On Dynamic Workers

Octopus does not recommend installing additional software on Dynamic Workers. 

By default, every dynamic worker is destroyed after it has been allocated for over 72 hours. In addition Octopus cannot guarantee that the dynamic worker leased to run one step will be the same worker leased to other executing steps in a deployment or runbook run. 

For deployments and runbook runs that require additional software dependencies on a Dynamic worker, our recommendation is to leverage [execution containers for workers](/docs/projects/steps/execution-containers-for-workers).  Octopus provides execution containers with a baseline of tools (`octopusdeploy/worker-tools`) pre-installed. These tools won't include every possible software combination you might need. If you require a specific set of software and tooling we recommend [building your own custom docker images for use with execution containers](/docs/projects/steps/execution-containers-for-workers/#custom-docker-images).

:::div{.hint}
**Octopus worker-tools are cached on Dynamic Workers**  
The `octopusdeploy/worker-tools` images provided for the execution containers feature cache the five latest Ubuntu and two latest Windows [Worker Tool](/docs/infrastructure/workers/worker-tools-versioning-and-caching) images on a Dynamic Worker when it's created. This makes them an excellent choice over installing additional software on a Dynamic Worker.

:::

If you choose to install additional software on a dynamic worker, you are responsible for:

- Ensuring that software is installed at the start of each deployment or runbook run.
- Writing the necessary scripts to download and install that software.
- Verifying the latest version of the software works with the latest security patches of the host OS.
- Handling any issues that arise if a different dynamic worker is leased to different steps in your deployment or runbook run.

## Learn more

- [Worker blog posts](https://octopus.com/blog/tag/workers)
- [Worker Tools, versioning and caching](/docs/infrastructure/workers/worker-tools-versioning-and-caching)
