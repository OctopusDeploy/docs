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
Users of Octopus Cloud utilising Windows Dynamic Workers (`Windows (default)` and `Windows Server Core 2019` images) and running custom scripts or community steps may be impacted as there are **breaking changes between Windows 2019 and Windows 2022**. Should any additional components be identified as having breaking changes we will endeavour to inform you via email and Octopus community Slack.

Steps running execution containers on Windows Dynamic Workers may also be impacted as Windows containers can generally only run when the container base image OS version matches the host OS version. This means the Windows 2019 container image you are currently using will likely fail to run on a Windows 2022 Dynamic Worker.

**Note:** All Octopus Deploy steps will work under Windows 2022 but some community and custom steps may be impacted.

## What do I need to do?
To mitigate the risk in this process we will be releasing Windows 2022 Dynamic Workers before the deprecation date so users can test against the new workers prior to deprecation.  Please see the timeline below for the details.

If you are running custom scripts, using community steps, and/or using execution containers on Windows workers, we recommend following the [migration guide](#migration-guide) below to test your deployments on Windows 2022 Dynamic Workers.

## Alternate (recommended) course of action
Unless you have a specific need for a Windows Dynamic Worker we recommend considering a change to an Ubuntu 22.04 based Dynamic Worker. Ubuntu 22.04 Dynamic Workers are more performant. Other than Windows specific steps there are equivalent Ubuntu 22.04 built in steps. Community steps and custom step templates would need testing.

## Timeline

**Octopus preparation**

| Date          | Details                                                            |
|---------------|:-------------------------------------------------------------------|
| Oct&nbsp;2023  | Octopus will produce and test a Windows 2022 Dynamic Worker image. |


**Customer action required**

| Date                  | Details                                                                                                                                                                                                                                                                                                                                       |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 30&nbsp;Oct&nbsp;2023 | Windows 2022 Dynamic Worker will be made available for customers.<br><ul><li>Customers should test their impacted deployments and runbooks on a Windows 2022 Dynamic Worker with the aim of completing testing by the 4th of December 2023</ul>                                                                                               |
| 4&nbsp;Dec&nbsp;2023 | Octopus will update the `Windows (default)` image to resolve to Windows Server Core 2022.<br><ul><li>If customers experience failed deployments or runbooks, they will be able to select the `Windows Server Core 2019` worker image until the 9th of January 2024 while they resolve any issues with running on a Windows 2022 Dynamic Worker |
| 9&nbsp;Jan&nbsp;2024  | Windows 2019 Dynamic Workers will no longer be available on Octopus Cloud.                                                                                                                                                                                                                                                                    |


## Migration Guide
1. For each Space on your Cloud instance, find the Windows Dynamic Worker Pool. The Worker Pool name is usually either `Hosted Windows` or `Default Worker Pool`. Make a note of the Worker Pool name.
   :::figure
   ![Windows Worker Pool](/docs/infrastructure/workers/dynamic-worker-pools/images/windows-2019-eol-windows-pool.png)
   :::
1. For each deployment step, check whether it runs on the Windows Dynamic Worker Pool you noted in Step 1.
   :::figure
   ![Worker Pool Selection](/docs/infrastructure/workers/dynamic-worker-pools/images/windows-2019-eol-step-worker-pool.png)
   :::
1. Create a temporary Dynamic Worker Pool targeting the `Windows Server Core 2022` image.
   :::figure
   ![Worker Pool Selection](/docs/infrastructure/workers/dynamic-worker-pools/images/windows-2019-eol-windows-2022-pool.png)
   :::
1. Open the deployment process for your project as well as any Runbooks. Make note of any steps using execution containers (these will display a `Runs in a container` chip) as these will need additional updates.
   :::figure
   ![Deployment Process](/docs/infrastructure/workers/dynamic-worker-pools/images/windows-2019-eol-deployment-process.png)
   :::
1. For each step that runs on a Windows Dynamic Worker Pool
   - Change its Worker Pool to the new Windows 2022 Worker Pool you created in Step 3.
   - If the step runs in an execution container, change the container image to the Windows 2022 image that corresponds to your current Windows 2019 image. If your image is [multi-platform](https://docs.docker.com/build/building/multi-platform/), it's still prudent to check that the image still works as expected under Windows 2022.
   - Your step should look something like this:
      :::figure
      ![Worker Pool Selection](/docs/infrastructure/workers/dynamic-worker-pools/images/windows-2019-eol-step-container-image.png)
      :::
1. Test your deployment by deploying a new Release of your project (Snapshot for a Runbook)

### Optional cleanup after 9 January 2024
To avoid having two Worker Pools that both yield the same Workers, you can restore the steps back to using the original Windows Dynamic Worker Pool:
1. For each step that you migrated, change the Worker Pool back to the original Windows Dynamic Worker Pool, which should be now running Windows 2022 Dynamic Workers.
1. Once no steps are using the temporary Windows 2022 Worker Pool, you can delete the temporary Worker Pool.


## FAQ

### Why the deadline of 9 January 2024?
Windows 2019 exits LTSC support and will not be patched including any security vulnerability. Consequently, Octopus will not provide an unsupported Dynamic Worker image.

### What are the breaking changes between Windows 2019 and Windows 2022 releases?
It is not possible to give a complete and definitive answer as this depends on your use cases. Therefore, please refer to the following documents:
- [Comparison of Standard, Datacenter, and Datacenter: Azure Edition editions of Windows Server 2022](https://learn.microsoft.com/en-us/windows-server/get-started/editions-comparison-windows-server-2022?tabs=full-comparison)
- [What's new in Windows Server 2019](https://learn.microsoft.com/en-us/windows-server/get-started/whats-new-in-windows-server-2019)
- [What's new in Windows Server 2022](https://learn.microsoft.com/en-us/windows-server/get-started/whats-new-in-windows-server-2022)
- [Features removed or no longer developed starting with Windows Server 2022](https://learn.microsoft.com/en-us/windows-server/get-started/removed-deprecated-features-windows-server-2022)

### What if I experience a breaking change but I can’t remediate it in time?
There is the option to provision your own worker with Windows Server 2019 and selecting its worker pool for your deployment processes that experience the breaking change.

### How does this affect Execution Containers?
Windows containers can generally only run when the container base image OS version matches the host OS version. Please follow the [migration guide](#migration-guide) to make the transition as smooth as possible.

### Are the Ubuntu 22.04 Dynamic Workers affected in any way?
This change does not impact the Ubuntu 22.04 Dynamic Workers.


