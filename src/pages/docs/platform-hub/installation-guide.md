---
layout: src/layouts/Default.astro
pubDate: 2025-09-30
modDate: 2025-10-08
title: Installing the Public Preview of Platform Hub
subtitle: Guide for installing a Public Preview version of Octopus server
icon: fa-solid fa-layer-group
navTitle: Installation Guide
navSection: Public Preview Installation Guide
description: Public Preview Installation Guide for Octopus server customers
navOrder: 33
---

## How to install a Public Preview version of Octopus server

Self-hosted customers can install a Public Preview version of Octopus Server containing Process Templates and Policies.

:::div{.warning}
You should only install a Public Preview version of Octopus server if you are comfortable adopting a feature before it’s fully complete. Any issues or bugs you encounter will **not** be fixed immediately. Please contact <sales@octopus.com> with any queries about whether this approach is right for you.
:::
1. You can download the Public Preview version of Octopus server via a direct link or by pulling a Docker image.
- If you are running Octopus on Windows, you can download this [server release](https://g.octopushq.com/platform-hub-preview-download).
- If you are running Octopus on Linux, you can download this [Docker image](https://g.octopushq.com/platform-hub-preview-dockerhub-download).

2. After downloading, you can upgrade your Octopus instance with our [upgrading guide](/docs/administration/upgrading).
3. You should now see the Platform Hub icon in your instance.
:::div{.hint}
Users must have **PlatformHubEdit** and **PlatformHubView** permissions enabled to access Platform Hub. These permissions can only be assigned to system teams. By default, system administrators and system managers will have **PlatformHubEdit** and **PlatformHubView** permissions enabled.
:::
