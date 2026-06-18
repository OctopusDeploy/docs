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

Ubuntu 22.04 is approaching the end of its standard support, so we're upgrading our dynamic workers to use Ubuntu 24.04. As part of this upgrade, we've also updated some of the tools bundled in the image, including the .NET versions available on the worker.

## Who will be impacted?

Users of Octopus Cloud using Ubuntu Dynamic Workers and running custom scripts or community steps may be impacted, as there are breaking changes between Ubuntu 22.04 and Ubuntu 24.04, and between the .NET releases.

If you only use built-in Octopus Deploy steps, you don't need to do anything. All built-in steps work on Ubuntu 24.04. Some community steps and custom scripts may be affected.

## What do I need to do?

You'll need to test any impacted custom scripts on Ubuntu 24.04 and update them to make sure your deployment process isn't affected by the breaking changes.

To reduce the risk during this process, we're making the Ubuntu 24.04 Dynamic Worker available before the deprecation date so you can test against the new worker before you migrate. See the timeline below for the details.

## Timeline

### Octopus preparation

| Date          | Details                                                             |
|---------------|:--------------------------------------------------------------------|
| Jun&nbsp;2026 | Octopus will produce and test an Ubuntu 24.04 Dynamic Worker image. |

### Customer action required

| Date                  | Details                                                                                                                                                                                                                                                       |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 14&nbsp;Jul&nbsp;2026 | Ubuntu 24.04 Dynamic Worker will be made available for customers. Customers should test their impacted deployments and runbooks on an Ubuntu 24.04 worker with the aim of completing testing by 14 August 2026.                                               |
| 8&nbsp;Sep&nbsp;2026  | Octopus will switch over the default "Hosted Ubuntu" worker pool to use the Ubuntu 24.04 worker. If customers experience failed deployments or runbooks, they can select the Ubuntu 22.04 worker until 13 October 2026 while they resolve any issues.         |
| 13&nbsp;Oct&nbsp;2026 | Ubuntu 22.04 Dynamic Workers will no longer be available on Octopus Cloud.                                                                                                                                                                                    |

## FAQ

### Why the deadline of 13 October 2026?

We're bringing the deadline forward so you can start using the new Ubuntu 24.04 Dynamic Worker image sooner, rather than waiting until Ubuntu 22.04 reaches the end of its LTS support in May 2027. This date also aligns with our Windows Dynamic Worker upgrade, so customers running both don't have to plan around two separate migrations.

### What are the breaking changes between Ubuntu releases?

It's not possible to give a complete and definitive answer, as this depends on your use cases. Please refer to the following documents:

- [Ubuntu 22.04 release notes](https://documentation.ubuntu.com/release-notes/22.04/)
- [Ubuntu 24.04 release notes](https://discourse.ubuntu.com/t/ubuntu-24-04-lts-noble-numbat-release-notes/39890)

### What are the breaking changes between the .NET releases?

It's not possible to give a complete and definitive answer, as this depends on your use cases. Please refer to the following release notes:

- [.NET 7 breaking changes](https://learn.microsoft.com/en-us/dotnet/core/compatibility/7.0)
- [.NET 8 breaking changes](https://learn.microsoft.com/en-us/dotnet/core/compatibility/8.0)
- [.NET 9 breaking changes](https://learn.microsoft.com/en-us/dotnet/core/compatibility/9.0)
- [.NET 10 breaking changes](https://learn.microsoft.com/en-us/dotnet/core/compatibility/10)
- [.NET release types](https://learn.microsoft.com/en-us/dotnet/core/releases-and-support)

### What if I experience a breaking change but I can't remediate it in time?

You can provision your own worker with Ubuntu 22.04 and select its worker pool for the deployment process that experiences the breaking change.

### Are the Windows Dynamic Workers affected in any way?

The Windows Dynamic Workers are also being updated. A separate notification covers the details of that change.

### How does this affect execution containers?

Ubuntu 22.04 Docker images, along with [Worker Tools](/docs/infrastructure/workers/worker-tools-versioning-and-caching), can still run on Ubuntu 24.04 Dynamic Workers. We'll no longer provide support for the `ubuntu.22.04` Worker Tools image, so we recommend moving to the new `ubuntu.24.04` image.
