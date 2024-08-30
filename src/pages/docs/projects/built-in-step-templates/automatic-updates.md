---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-26
title: Automatic step template updates
icon: fa-solid fa-arrows-rotate
description: How automatic updates of built-in steps using the new step package format work
navOrder: 40
---

Built-in step templates that use the new "step package" format can be updated automatically to the latest versions without updating Octopus Server. Octopus will check for updates to the built-in step templates every hour and automatically download them from the publicly available feed located at steps-feed.octopus.com.

Optionally, the automatic version updates of built-in steps can be turned off by navigating to **Configuration ➜ Features** and turning off the **Step Template Updates** feature.

:::figure
![](/docs/projects/built-in-step-templates/images/automatic-updates-configuration.png)
:::

## Notes

* Existing deployment processes and runbooks will be automatically updated to use the latest **minor version** of the built-in step templates, without any user-intervention. This enables rapid deployment of security and patch fixes in a backward compatible manner.
* **Major version** upgrades of steps within existing deployment processes and runbooks will require manual intervention, as the steps will not be backward compatible and likely require additional input.

:::figure
![](/docs/projects/built-in-step-templates/images/step-migration-v2.png)
:::

* Only steps that are compatible with the current Octopus Server version will be automatically downloaded and updated.
* Only the steps built with the new "step package" format are updated using the described mechanism. Existing steps will still require Octopus to be updated to receive new versions.

## Older versions

Automatic step template updates are available from Octopus **2022.1**.