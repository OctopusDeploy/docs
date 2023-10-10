---
layout: src/layouts/Default.astro
pubDate: 2023-10-01
modDate: 2023-10-01
title: Windows 2019 End-of-life
description: Describing the deprecation process of Windows 2019 Dynamic Workers.
navOrder: 50
hideInThisSection: true
hideInThisSectionHeader: true
---

Our Windows Server 2019 Dynamic Workers are being upgraded to use Windows Server 2022, this may result in breaking changes for users of community steps and/or custom scripts.


## What is changing?

Due to the deprecation of Ubuntu 18.04, we are upgrading our dynamic workers to use Ubuntu 22.04.  This change has also required upgrades of:
* gcloud CLI from 339.0.0 to 367.0.0; and
* .NET Core 2.1/3.1 to .NET 6.


## Who will be impacted?

Users of Octopus Cloud utilizing Ubuntu workers and running custom scripts or community steps may be impacted as there are breaking changes between Ubuntu 18.04 and Ubuntu 22.04, and breaking changes between .NET Core 2.1/3.1 and .NET 6.

Cloud customers impacted by the GCloud CLI update will be those with a deployment process which:

* Has a `Run gcloud in a Script` step, which runs on the `Hosted Ubuntu` Worker Pool, which does not use an `execution container`, and the script contains calls to `gcloud`; **OR**
* Has a `Run a Script` step, which runs on the `Hosted Ubuntu` Worker Pool, and the script contains calls to `gcloud`.

### What do I need to do?

Any impacted custom scripts will need to be updated to use Ubuntu 22.04 and tested to ensure your deployment process has not been impacted by the breaking changes. To mitigate the risk in this process we will be releasing the updated dynamic worker before the deprecation date so users can test against the new workers prior to migration.  Please see the timeline below for the details.

**Note:** All Octopus Deploy steps will work under Ubuntu 22.04 but some community steps may be impacted.

## Timeline

**Update 7 February 2023**

The `Ubuntu 22.04` image can be found within the configuration of a worker pool:

:::figure
![Ubuntu 22.04 in worker image list](/docs/infrastructure/workers/dynamic-worker-pools/images/ubuntu-2204-worker-image-list.png)
:::

**Octopus preparation**

| Date          |   Details                                                     |
|---------------|:--------------------------------------------------------------|
| Q4&nbsp;2022  | Octopus will produce and test an Ubuntu 22.04 worker image    |
| Jan&nbsp;2023 | Internal testing of existing tooling to confirm compatibility |


**Customer action required**

| Date                  | Details                                                                                                                                                                                                                                                                                                         |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1&nbsp;Feb&nbsp;2023  | Ubuntu 22.04 dynamic worker will be made available for customers.<br><ul><li>Customers should test their impacted deployments and runbooks on an Ubuntu 22.04 worker with the aim of completing testing by the 15th of March 2023</ul>                                                                          |
| 15&nbsp;Mar&nbsp;2023 | Octopus will switch over the default "Hosted Ubuntu" worker pool to use the Ubuntu 22.04 worker.<br><ul><li>If customers experience failed deployments or runbooks, they will be able to select the Ubuntu 18.04 worker until 3 April 2023 while they resolve any issues with running on an Ubuntu 22.04 worker |
| 3&nbsp;Apr&nbsp;2023  | Ubuntu 18.04 dynamic workers will no longer be available on Octopus Cloud.                                                                                                                                                                                                                                      |


## FAQ

### Why the deadline of 3 April 2023?
Ubuntu 18.04 exits LTS support and will not be patched including any security vulnerability. Consequently, Octopus will not provide an unsupported Dynamic worker image.

### What are the breaking changes between Ubuntu releases?
It is not possible to give a complete and definitive answer as this depends on your use cases. Therefore, please refer to the following release notes:
* [18.04 to 20.04 release notes](https://wiki.ubuntu.com/FocalFossa/ReleaseNotes)
* [20.04 to 22.04 release notes](https://discourse.ubuntu.com/t/jammy-jellyfish-release-notes/24668)

### What are the breaking changes between the .NET releases?
It is not possible to give a complete and definitive answer as this depends on your use cases. Therefore please refer to the following release notes:
* [.NET Core 3.1 release notes](https://github.com/dotnet/core/tree/main/release-notes/3.1)
* [.NET 5 release notes](https://github.com/dotnet/core/tree/main/release-notes/5.0)
* [.NET 6 release notes](https://github.com/dotnet/core/tree/main/release-notes/6.0)
* [.NET release types](https://learn.microsoft.com/en-us/dotnet/core/releases-and-support)

### What if I experience a breaking change but I can't remediate it in time?
There is the option to provision your own worker with Ubuntu 18.04 and selecting its worker pool for your deployment process that experience the breaking change.

### Why is GCloud CLI part of this notification?
Ubuntu 22.04 requires a later version of GCloud CLI. We have selected the earliest version on GCloud CLI that is compatible with Ubuntu 22.04 to minimize the number of breaking changes we expose our customers to.  Customers can use the [GCloud 367.0.0 Release Notes](https://cloud.google.com/sdk/docs/release-notes#36700_2021-12-14) to assess whether their GCloud script steps are impacted by the breaking changes between GCloud versions 339.0.0 and 367.0.0.

### Are the Windows dynamic workers affected in any way?
This change does not impact the Windows dynamic workers.

### How does this affect Execution Containers?
Although Ubuntu 18.04 docker images, along with [Worker Tools](/docs/infrastructure/workers/worker-tools-versioning-and-caching), can still operate on Ubuntu 22.04 dynamic workers, we will no longer provide support for the ubuntu.18.04 Worker Tools. Instead, we have introduced a new [ubuntu.22.04](https://hub.docker.com/r/octopusdeploy/worker-tools/tags?page=1&name=22.04) image, which is recommended moving forward.






## Migration guide for projects using execution containers

### Check if you need to apply the migration
First check if you are using Windows execution containers running on Dynamic Workers. If you don’t, then you can skip this migration process.

1. For each Space on your Cloud instance, find the Windows Dynamic Worker Pool. The Worker Pool name is usually either “Hosted Windows” or “Default Worker Pool”. Make a note of the Worker Pool name
   :::figure
   ![Windows Worker Pool](/docs/infrastructure/workers/dynamic-worker-pools/images/windows-2022-eol-windows-pool.png)
   :::
2. Open the deployment process for your project as well as any Runbooks. Any steps using execution containers will display a `Runs in a container` chip
   :::figure
   ![Deployment Process](/docs/infrastructure/workers/dynamic-worker-pools/images/windows-2022-eol-deployment-process.png)
   :::
3. For each step using execution containers, check whether it runs on the Windows Dynamic Worker Pool you noted in Step 1.  If you find at least one step that matches this criteria, then you will need to apply the migration steps listed below
   :::figure
   ![Worker Pool Selection](/docs/infrastructure/workers/dynamic-worker-pools/images/windows-2022-eol-step-worker-pool.png)
   :::

### Migration steps
1. Create a temporary Windows 2022 Dynamic Worker Pool
