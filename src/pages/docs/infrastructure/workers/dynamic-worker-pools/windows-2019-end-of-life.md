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
Due to LTSC Windows Server 2019 ending on 9th January 2024 , we are upgrading our dynamic workers to use Windows Server 2022.  


## Who will be impacted?
Users of Octopus Cloud utilising Windows workers (Windows Default and Windows2019 options). And running custom scripts or community steps may be impacted as there are **breaking changes between Windows 2019 and Windows 2022**. Should any additional components be identified as having breaking changes we will endeavour to inform you via email and Octopus community Slack.


## What do I need to do?
Any impacted custom scripts will need to be updated to use Windows 2022 and tested to ensure your deployment process has not been impacted by the breaking changes. To mitigate the risk in this process we will be releasing the updated dynamic worker before the deprecation date so users can test against the new workers prior to migration.  Please see the timeline below for the details.

**Note:** All Octopus Deploy steps  will work under Windows 2022 but some community and custom steps may be impacted.

## Alternate (recommended) course of action
Unless you have a specific need for a Windows worker we recommend considering a change to an Ubuntu 22.04 based worker. Ubuntu 22.04 workers are more performant. Other than Windows specific steps there are  equivalent Ubuntu 22.04 built in steps. Community steps and custom step templates would need testing.

## Considerations if running execution containers
Windows containers can only run when the container base image OS version matches the host OS version. There are two exceptions being:
- [Hyper-V isolation](https://learn.microsoft.com/en-us/virtualization/windowscontainers/deploy-containers/version-compatibility?tabs=windows-server-2022%2Cwindows-11#hyper-v-isolation-for-containers) - has performance penalties and not supported by Octopus, and 
- [Process isolation](https://learn.microsoft.com/en-us/virtualization/windowscontainers/deploy-containers/version-compatibility?tabs=windows-server-2022%2Cwindows-11#windows-server-host-os-compatibility)  - only supported from Windows 2022 onwards

This means the Windows 2019 container image you are currently using will likely fail to run on a Windows 2022 Dynamic Worker. To make the transition as smooth as possible, we recommend creating a new Windows 2022 Worker Pool and migrating each project’s deployment process one by one. You can find the migration guide below.


## Timeline

**Octopus preparation**

| Date          |   Details                                                     |
|---------------|:--------------------------------------------------------------|
| Oct&nbsp;2023  | Octopus will produce and test a Windows 2022 worker image    |


**Customer action required**

| Date                  | Details                                                                                                                                                                                                                                                                                                         |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 30&nbsp;Oct&nbsp;2023 | Windows 2022 dynamic worker will be made available for customers.<br><ul><li>Customers should test their impacted deployments and runbooks on a Windows 2022 worker with the aim of completing testing by the 4th of December 2023</ul>                                                                       |
| 4&nbsp;Dec&nbsp;2023 | Octopus will switch over the default "Hosted Windows" worker pool to use the Windows 2022 workers.<br><ul><li>If customers experience failed deployments or runbooks, they will be able to select the Windows 2019 worker until the 9th of January 2024 while they resolve any issues with running on a Windows 2022 worker |
| 9&nbsp;Jan&nbsp;2024  | Windows 2019 dynamic workers will no longer be available on Octopus Cloud.                                                                                                                                                                                                                                      |




## Migration guide (for projects using execution containers)

### Check if you need to apply the migration
First check if you are using Windows execution containers running on Dynamic Workers. If you don’t, then you can skip this migration process.

1. For each Space on your Cloud instance, find the Windows Dynamic Worker Pool. The Worker Pool name is usually either “Hosted Windows” or “Default Worker Pool”. Make a note of the Worker Pool name
   :::figure
   ![Windows Worker Pool](/docs/infrastructure/workers/dynamic-worker-pools/images/windows-2022-eol-windows-pool.png)
   :::
1. Open the deployment process for your project as well as any Runbooks. Any steps using execution containers will display a `Runs in a container` chip
   :::figure
   ![Deployment Process](/docs/infrastructure/workers/dynamic-worker-pools/images/windows-2022-eol-deployment-process.png)
   :::
1. For each step using execution containers, check whether it runs on the Windows Dynamic Worker Pool you noted in Step 1.  If you find at least one step that matches this criteria, then please follow the migration steps listed below
   :::figure
   ![Worker Pool Selection](/docs/infrastructure/workers/dynamic-worker-pools/images/windows-2022-eol-step-worker-pool.png)
   :::

### Migration steps
1. Create a temporary Dynamic Worker Pool targeting the `Windows Server Core 2022` image
   :::figure
   ![Worker Pool Selection](/docs/infrastructure/workers/dynamic-worker-pools/images/windows-2022-eol-windows-2022-pool.png)
   :::
1. For each step that runs execution containers on a Windows Dynamic Worker Pool
   - Change its Worker Pool to the new Windows 2022 Pool you created in Step 1
   - Change the container image to the Windows 2022 image that corresponds to your current Windows 2019 image. If your image is [multi-platform](https://docs.docker.com/build/building/multi-platform/), it's still prudent to check that the image still works as expected under Windows 2022
   - Your step should look something like this:
      :::figure
      ![Worker Pool Selection](/docs/infrastructure/workers/dynamic-worker-pools/images/windows-2022-eol-step-container-image.png)
      :::
1. Test your deployment by deploying a new Release of your project (Snapshot for a Runbook)

### Optional cleanup after 9 January 2024
To avoid having two Worker Pools that both yield the same Workers, you can restore the steps back to using the original Windows Dynamic Worker Pool:
1. For each step that you migrated, change the Worker Pool back to the original Windows Dynamic Worker Pool, which should be now running Windows 2022 Workers
1. Once no steps are using the temporary Windows 2022 Worker Pool, you can delete the temporary Worker Pool


## FAQ

### Why the deadline of 9 January 2024?
Windows 2019 exits LTSC support and will not be patched including any security vulnerability. Consequently, Octopus will not provide an unsupported Dynamic worker image.

### What are the breaking changes between Windows 2019 and Windows 2022 releases?
It is not possible to give a complete and definitive answer as this depends on your use cases. Therefore, please refer to the following documents:
- [Comparison of Standard, Datacenter, and Datacenter: Azure Edition editions of Windows Server 2022](https://learn.microsoft.com/en-us/windows-server/get-started/editions-comparison-windows-server-2022?tabs=full-comparison)
- [What's new in Windows Server 2019](https://learn.microsoft.com/en-us/windows-server/get-started/whats-new-in-windows-server-2019)
- [What's new in Windows Server 2022](https://learn.microsoft.com/en-us/windows-server/get-started/whats-new-in-windows-server-2022)
- [Features removed or no longer developed starting with Windows Server 2022](https://learn.microsoft.com/en-us/windows-server/get-started/removed-deprecated-features-windows-server-2022)

### What if I experience a breaking change but I can’t remediate it in time?
There is the option to provision your own worker with Windows server 2019 and selecting its worker pool for your deployment processes that experience the breaking change.

### How does this affect Execution Containers?
Windows containers can generally only run when the container base image OS version matches the host OS version. Please follow the migration guide to make the transition as smooth as possible.

### Are the Ubuntu 22.04 dynamic workers affected in any way?
This change does not impact the Ubuntu 22.04 dynamic workers.


