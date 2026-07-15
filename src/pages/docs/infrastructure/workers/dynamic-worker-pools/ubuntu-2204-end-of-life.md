---
layout: src/layouts/Default.astro
pubDate: 2026-06-18
modDate: 2026-06-18
title: Ubuntu 22.04 End-of-life
description: Describing the deprecation process of Ubuntu 22.04 Dynamic Workers.
navOrder: 50
hideInThisSection: true
hideInThisSectionHeader: true
---

Our Ubuntu Dynamic Workers are being upgraded to use Ubuntu 24.04. This may result in breaking changes for users of community steps or custom scripts.

## What is changing?

Ubuntu 22.04 is approaching the end of its standard support, so we're upgrading our dynamic workers to use Ubuntu 24.04.

## Who will be impacted?

Users of Octopus Cloud using Ubuntu Dynamic Workers and running custom scripts or community steps may be impacted, as there are breaking changes between Ubuntu 22.04 and Ubuntu 24.04.

If you only use built-in Octopus Deploy steps, you don't need to do anything. All built-in steps work on Ubuntu 24.04. Some community steps and custom scripts may be affected.

## What do I need to do?

You'll need to test any impacted custom scripts on Ubuntu 24.04 and update them to make sure your deployment process isn't affected by the breaking changes.

To reduce the risk during this process, we're making the Ubuntu 24.04 Dynamic Worker available before the deprecation date so you can test against the new worker before you migrate. See the timeline below for the details.

If you are running custom scripts, using community steps, or using execution containers on Ubuntu workers, we recommend following the [migration guide](#migration-guide) below to test your deployments on Ubuntu 24.04 Dynamic Workers.

## Timeline

### Octopus preparation

| Date          | Details                                                             |
|---------------|:--------------------------------------------------------------------|
| Jun&nbsp;2026 | Octopus will produce and test an Ubuntu 24.04 Dynamic Worker image. |

### Customer action required

| Date                  | Details                                                                                                                                                                                                                                                       |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 14&nbsp;Jul&nbsp;2026 | Ubuntu 24.04 Dynamic Worker will be made available for customers. Customers should test their impacted deployments and runbooks on an Ubuntu 24.04 worker with the aim of completing testing by September 08, 2026.                                           |
| 8&nbsp;Sep&nbsp;2026  | Octopus will switch over the default "Hosted Ubuntu" worker pool to use the Ubuntu 24.04 worker. If customers experience failed deployments or runbooks, they can select the Ubuntu 22.04 worker until October 13, 2026 while they resolve any issues.        |
| 13&nbsp;Oct&nbsp;2026 | Ubuntu 22.04 Dynamic Workers will no longer be available on Octopus Cloud.                                                                                                                                                                                    |

## Migration Guide

For each Space on your Cloud instance, find the Ubuntu Dynamic Worker Pool. The Worker Pool name is usually either `Hosted Ubuntu` or `Default Worker Pool`. Make a note of the Worker Pool name.

:::figure
![Ubuntu Worker Pool](/docs/img/infrastructure/workers/dynamic-worker-pools/images/ubuntu-2204-eol-ubuntu-pool.png)
:::

For each deployment step, check whether it runs on the Ubuntu Dynamic Worker Pool you noted above.

:::figure
![Worker Pool Selection](/docs/img/infrastructure/workers/dynamic-worker-pools/images/ubuntu-2204-eol-step-worker-pool.png)
:::

Create a temporary Dynamic Worker Pool targeting the `Ubuntu 24.04` image.

:::figure
![Ubuntu 24.04 Worker Pool](/docs/img/infrastructure/workers/dynamic-worker-pools/images/ubuntu-2204-eol-ubuntu-2404-pool.png)
:::

Open the deployment process for your project as well as any Runbooks. Make note of any steps using execution containers as these will need additional updates.

For each step that runs on an Ubuntu Dynamic Worker Pool:

- Change its Worker Pool to the new Ubuntu 24.04 Worker Pool you created following the steps above.
- If the step runs in an execution container using the `ubuntu.22.04` Worker Tools image, change the container image to `ubuntu.24.04`. Ubuntu 22.04 Docker images can still run on Ubuntu 24.04 Dynamic Workers, but the `ubuntu.22.04` Worker Tools image will no longer be supported, so we recommend moving to `ubuntu.24.04`.
- Your step should look something like this:

  :::figure
  ![Step with Ubuntu 24.04 container image](/docs/img/infrastructure/workers/dynamic-worker-pools/images/ubuntu-2204-eol-step-container-image.png)
  :::

Test your deployment by deploying a new Release of your project (Snapshot for a Runbook).

### Optional cleanup after 13 October 2026

To avoid having two Worker Pools that both yield the same Workers, you can restore the steps back to using the original Ubuntu Dynamic Worker Pool:

1. For each step that you migrated, change the Worker Pool back to the original Ubuntu Dynamic Worker Pool, which should be now running Ubuntu 24.04 Dynamic Workers.
1. Once no steps are using the temporary Ubuntu 24.04 Worker Pool, you can delete the temporary Worker Pool.

## FAQ

### Why the deadline of 13 October 2026?

We're bringing the deadline forward so you can start using the new Ubuntu 24.04 Dynamic Worker image sooner, rather than waiting until Ubuntu 22.04 reaches the end of its LTS support in May 2027. This date also aligns with our Windows Dynamic Worker upgrade, so customers running both don't have to plan around two separate migrations.

### What are the breaking changes between Ubuntu releases?

It's not possible to give a complete and definitive answer, as this depends on your use cases. Please refer to the following documents:

- [Ubuntu 22.04 release notes](https://documentation.ubuntu.com/release-notes/22.04/)
- [Ubuntu 24.04 release notes](https://discourse.ubuntu.com/t/ubuntu-24-04-lts-noble-numbat-release-notes/39890)

### What if I experience a breaking change but I can't remediate it in time?

You can provision your own worker with Ubuntu 22.04 and select its worker pool for the deployment process that experiences the breaking change.

### Are the Windows Dynamic Workers affected in any way?

The Windows Dynamic Workers are also being updated. A separate notification covers the details of that change.

### How does this affect execution containers?

Ubuntu 22.04 Docker images, along with [Worker Tools](/docs/infrastructure/workers/worker-tools-versioning-and-caching), can still run on Ubuntu 24.04 Dynamic Workers. We'll no longer provide support for the `ubuntu.22.04` Worker Tools image, so we recommend moving to the new `ubuntu.24.04` image.
