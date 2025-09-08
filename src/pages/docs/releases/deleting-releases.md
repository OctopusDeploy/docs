---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-28
title: Deleting releases
description: Deleting releases from your projects
icon: fa-solid fa-delete-left
navOrder: 18
---

Sometimes you may want to delete releases of your project. Maybe they're defective and you don't want them possibly deployed, or you just want to clean up old releases. This page outlines the methods to permanently delete these releases in Octopus.

Deleting individual releases can be done by entering the release page and selecting the `Delete` option in the ... overflow menu.

:::figure
![Delete release from release page](/docs/img/releases/images/delete-release-from-release-page.png)
:::

You can also delete a batch of releases by specifying a release version range in the Octopus CLI. An example can be found in our [Octopus CLI documentation](/docs/octopus-rest-api/octopus-cli/delete-releases).

Consider automating data clean up by configuring [retention policies](/docs/administration/retention-policies).
