---
title: Deleting Releases
description: Deleting releases from your projects
position: 18
---

Sometimes you may want to delete releases of your project. Maybe they're defective and you don't want them possibly deployed, or you just want to clean up old releases. This page outlines the methods to permanently delete these releases in Octopus.

## Deleting Releases

Deleting individual releases can be done by entering the release page and selecting the `Edit` option in the overflow menu.

![Edit release](edit-release.png "width=500")

In the edit release page, click the overflow menu and select `Delete`.

![Delete release](delete-release.png "width=500")

You can also delete a batch of releases by specifying a release version range in Octo.exe. An example can be found in our [Octo.exe documentation](/docs/api-and-integration/octo.exe-command-line/deleting-releases.md).

Consider automating data clean up by configuring [retention policies](/docs/administration/retention-policies/index.md).
