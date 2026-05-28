---
layout: src/layouts/Default.astro
pubDate: 2026-03-16
modDate: 2026-05-28
title: Installing the Public Preview of project templates
subtitle: Guide for installing the Public Preview of Octopus Server with project templates
icon: fa-solid fa-layer-group
navTitle: Installation guide
navSection: Project Templates
description: Installation guide for self-hosted Octopus Server customers who want to access the project templates Public Preview
navOrder: 172
---

:::div{.warning}
Project templates are in Public Preview. The feature is still evolving and standard SLAs don't apply. We don't recommend it for production workloads yet. It's available to Enterprise customers on Cloud and to self-hosted customers running Octopus 2026.2. We'd love your feedback as we work towards general availability.
:::

## License requirements

Project templates require an Octopus Enterprise license with the project templates entitlement. Contact <sales@octopus.com> to confirm your license includes access before proceeding.

## How to install Octopus Server 2026.2

Project templates are available to Cloud customers without any additional setup. Self-hosted customers can access project templates as a Public Preview by installing the latest Octopus Server 2026.2.

:::div{.warning}
You should only install a preview version of Octopus Server if you are comfortable adopting a feature before it's fully complete. Any issues or bugs you encounter with preview features may take longer to fix than normal. For other features, we provide the same level of support as for LTS versions. Contact <sales@octopus.com> with any questions about whether this approach is right for you.
:::

1. Download Octopus Server 2026.2 from [octopus.com/downloads](https://octopus.com/downloads).

1. After downloading, upgrade your Octopus instance using the [upgrading guide](/docs/administration/upgrading).

1. Navigate to **Platform Hub** and select **Project Templates** to get started.

:::div{.hint}
Users must have **PlatformHubEdit** and **PlatformHubView** permissions to access Platform Hub. These permissions can only be assigned to system teams. By default, system administrators and system managers have both permissions enabled.
:::
