---
layout: src/layouts/Default.astro
pubDate: 2025-09-30
modDate: 2025-09-30
title: Installing the Public Preview of Platform Hub
subtitle: How to download the Public Preview version of Platform Hub if you are a server customer
icon: 
navTitle: Installation Guide
navSection: Public Preview Installation Guide
description: Public Preview Installation Guide for Octopus server customers
navOrder: 147
---

## How to install a Public Preview version of Octopus server

:::div{.warning}
You should only install a Public Preview version of Octopus server if you are comfortable with adopting a feature that isn't fully complete. Any issues or bugs you encounter will **not** be fixed immediately. Please reach out to [sales@octopus.com](sales@octopus.com) for any queries on whether this approach is right for you.
:::

1. You can download the Public Preview version of Octopus server via a direct link or pulling a Docker image.

- If you are running Octopus on Windows, you can download this [server release](https://download.octopusdeploy.com/octopus/Octopus.2025.3.9834-x64.msi).
- If you are running Octopus on Linux, you can run the following Docker command

```docker
docker pull octopusdeploy/octopusdeploy:2025.3.9834-PublicPreview
```

2. After downloading, you can upgrade your Octopus instance with our [upgrading guide](/docs/administration/upgrading/index.md).
3. You should now see the Platform Hub icon in your instance.

:::div{.hint}
Users must have **PlatformHubEdit** and **PlatformHubView** permissions enabled to access Platform Hub. These permissions can only be assigned to system teams.

By default, system administrators and space managers will have **PlatformHubEdit** and **PlatformHubView** permissions enabled.
:::
