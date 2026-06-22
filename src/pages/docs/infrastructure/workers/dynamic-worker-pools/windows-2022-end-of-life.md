---
layout: src/layouts/Default.astro
pubDate: 2026-07-14
modDate: 2026-07-14
title: Windows 2022 End-of-life
description: Describing the deprecation process of Windows 2022 Dynamic Workers.
navOrder: 50
hideInThisSection: true
hideInThisSectionHeader: true
---

Our Windows Server 2022 Dynamic Workers are being upgraded to use Windows Server 2025, this may result in breaking changes for users of community steps or custom scripts.

## What is changing?

Due to Windows Server 2022 reaching the end of standard support on 13 October 2026, we are upgrading our dynamic workers to use Windows Server 2025.

## Who will be impacted?

Users of Octopus Cloud using Windows Dynamic Workers (`Windows (default)` and `Windows Server Core 2022` images) and running custom scripts or community steps may be impacted as there are **breaking changes between Windows 2022 and Windows 2025**. Should any additional components be identified as having breaking changes we will endeavour to inform you via email and Octopus community Slack.


**Note:** All Octopus Deploy steps will work under Windows 2025 but some community and custom steps may be impacted.

## What do I need to do?

To mitigate the risk in this process we will be releasing Windows 2025 Dynamic Workers before the deprecation date so users can test against the new workers prior to deprecation. Please see the timeline below for the details.

If you are running custom scripts, using community steps, or using execution containers on Windows workers, we recommend following the [migration guide](#migration-guide) below to test your deployments on Windows 2025 Dynamic Workers.

## Alternate (recommended) course of action

Unless you have a specific need for a Windows Dynamic Worker we recommend considering a change to an Ubuntu 24.04 based Dynamic Worker as Ubuntu 24.04 Dynamic Workers are more performant.

Built in steps work on both Ubuntu and Windows Dynamic Workers with the exception of Windows specific steps. Community steps and custom step templates would also need testing.

## Timeline

### Octopus preparation

| Date          | Details                                                            |
|---------------|:-------------------------------------------------------------------|
| Jun&nbsp;2026 | Octopus will produce and test a Windows 2025 Dynamic Worker image. |

### Customer action required

| Date                  | Details                                                                                                                                                                                                                                                                                                                                       |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 14&nbsp;Jul&nbsp;2026 | Windows 2025 Dynamic Worker will be made available for customers. Customers should test their impacted deployments and runbooks on a Windows 2025 Dynamic Worker with the aim of completing testing by the 14th of August 2026.                                                                                                               |
| 8&nbsp;Sep&nbsp;2026  | Octopus will update the `Windows (default)` image to resolve to Windows Server Core 2025. If customers experience failed deployments or runbooks, they can select the `Windows Server Core 2022` worker image until the 13th of October 2026 while they resolve any issues.                                                                   |
| 13&nbsp;Oct&nbsp;2026 | Windows 2022 Dynamic Workers will no longer be available on Octopus Cloud.                                                                                                                                                                                                                                                                    |

## Migration Guide

For each Space on your Cloud instance, find the Windows Dynamic Worker Pool. The Worker Pool name is usually either `Hosted Windows` or `Default Worker Pool`. Make a note of the Worker Pool name.
   :::figure
   ![Windows Worker Pool](/docs/img/infrastructure/workers/dynamic-worker-pools/images/windows-2022-eol-windows-pool.png)
   :::
For each deployment step, check whether it runs on the Windows Dynamic Worker Pool you noted in Step 1.
   :::figure
   ![Worker Pool Selection](/docs/img/infrastructure/workers/dynamic-worker-pools/images/windows-2022-eol-step-worker-pool.png)
   :::
Create a temporary Dynamic Worker Pool targeting the `Windows Server Core 2025` image.
   :::figure
   ![Worker Pool Selection](/docs/img/infrastructure/workers/dynamic-worker-pools/images/windows-2022-eol-windows-2025-pool.png)
   :::
Open the deployment process for your project as well as any Runbooks. Make note of any steps using execution containers as these will need additional updates.

For each step that runs on a Windows Dynamic Worker Pool

- Change its Worker Pool to the new Windows 2025 Worker Pool you created following the steps above.
- If the step runs in an execution container, change the container image to the Windows 2025 image that corresponds to your current Windows 2022 image. If your image is [multi-platform](https://docs.docker.com/build/building/multi-platform/), it's still prudent to check that the image still works as expected under Windows 2025.
- Your step should look something like this:

:::figure
![Worker Pool Selection](/docs/img/infrastructure/workers/dynamic-worker-pools/images/windows-2022-eol-step-container-image.png)
:::

Test your deployment by deploying a new Release of your project (Snapshot for a Runbook)

### Optional cleanup after 13 October 2026

To avoid having two Worker Pools that both yield the same Workers, you can restore the steps back to using the original Windows Dynamic Worker Pool:

1. For each step that you migrated, change the Worker Pool back to the original Windows Dynamic Worker Pool, which should be now running Windows 2025 Dynamic Workers.
1. Once no steps are using the temporary Windows 2025 Worker Pool, you can delete the temporary Worker Pool.

## FAQ

### Why the deadline of 13 October 2026?

Windows 2022 exits Mainstream support and will not receive feature updates, and non-security fixes. Consequently, Octopus will not provide an unsupported Dynamic Worker image.

### What are the breaking changes between Windows 2022 and Windows 2025 releases?

It is not possible to give a complete and definitive answer as this depends on your use cases. Therefore, please refer to the following documents:

- [Comparison of Standard, Datacenter, and Datacenter: Azure Edition editions of Windows Server 2025](https://learn.microsoft.com/en-us/windows-server/get-started/editions-comparison?pivots=windows-server-2025)
- [What's new in Windows Server 2022](https://learn.microsoft.com/en-us/windows-server/get-started/whats-new-in-windows-server-2022)
- [What's new in Windows Server 2025](https://learn.microsoft.com/en-us/windows-server/get-started/whats-new-windows-server-2025)
- [Features removed or no longer developed starting with Windows Server 2025](https://learn.microsoft.com/en-us/windows-server/get-started/removed-deprecated-features-windows-server-2025)

### What if I experience a breaking change but I can't remediate it in time?

There is the option to provision your own worker with Windows Server 2022 and selecting its worker pool for your deployment processes that experience the breaking change.

### How does this affect Execution Containers?

[Windows Server 2025 supports running containers based on Windows Server 2022](https://learn.microsoft.com/en-us/virtualization/windowscontainers/deploy-containers/version-compatibility?tabs=windows-server-2025%2Cwindows-11#windows-server-host-os-compatibility). While Microsoft provides compatibility for Windows Server 2022 based containers to run, the base operating system is still reaching its end of support on 13th of October, 2026 and so we recommend upgrading when possible. Please follow the [migration guide](#migration-guide) to make the transition as smooth as possible.

### Are the Ubuntu Dynamic Workers affected in any way?

The Ubuntu Dynamic Workers are also being upgraded to Ubuntu 24.04 on the same timeline.
