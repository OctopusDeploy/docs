---
layout: src/layouts/Default.astro
pubDate: 2026-03-16
modDate: 2026-03-16
title: Installing the Alpha preview of project templates
subtitle: Guide for installing a preview version of Octopus Server with project templates
icon: fa-solid fa-layer-group
navTitle: Installation guide
navSection: Project Templates
description: Installation guide for self-hosted Octopus Server customers who want to access the project templates Alpha
navOrder: 172
---

:::div{.warning}
Project templates are in Alpha. The feature is incomplete and standard SLAs do not apply. Don't use it for production workloads. It is available to Enterprise customers on Cloud. Self-hosted customers can access it as an early preview via Octopus 2026.2. We're actively developing this feature and would love your feedback.
:::

## License requirements

Project templates require an Octopus Enterprise license with the project templates entitlement. Please contact <sales@octopus.com> to confirm your license includes access before proceeding.

## How to install Octopus Server 2026.2

Project templates are available to Cloud customers without any additional setup. Self-hosted customers can access project templates as an early preview by installing Octopus Server 2026.2.

:::div{.warning}
You should only install a preview version of Octopus Server if you are comfortable adopting a feature before it's fully complete. Any issues or bugs you encounter will not be fixed immediately. Please contact <sales@octopus.com> with any queries about whether this approach is right for you.
:::

1. Download Octopus Server 2026.2.

   - If you are running Octopus on Windows, you can download the [server release](https://g.octopushq.com/OctopusServer).
   - If you are running Octopus on Linux, you can pull the [Docker image](https://g.octopushq.com/OctopusServerDockerHub).

1. After downloading, upgrade your Octopus instance using the [upgrading guide](/docs/administration/upgrading).

1. You should now see the Platform Hub icon in your instance. Navigate to **Platform Hub** and select **Project Templates** to get started.

:::div{.hint}
Users must have **PlatformHubEdit** and **PlatformHubView** permissions to access Platform Hub. These permissions can only be assigned to system teams. By default, system administrators and system managers have both permissions enabled.
:::
