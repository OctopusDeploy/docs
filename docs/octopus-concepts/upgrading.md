---
title: Upgrading Self-hosted Octopus
description: As a self-hosted Octopus Deploy user, you need to manually upgrade the server to take advantages of the newest features.
---

When you self-host the Octopus Deploy server, you need to manually upgrade the server to take advantage of features in new releases of Octopus Deploy. If you are an [Octopus Cloud][/docs/octopus-concepts/octopus-cloud.md] customer, we manage the Octopus server for you, ensuring you have early access to all the latest features.

If you are upgrading a version of Octopus Deploy prior to version 3, we have supported upgrade paths that will help you upgrade to a modern version of Octopus Deploy: [Upgrading older versions of Octopus](/docs/administration/upgrading/legacy/index.md).

If you need to upgrade Octopus Deploy server version 3 or above, the upgrade process involves:

1. Schedule a maintenance window
1. Switch the server into maintenance mode
1. [Backup your database and master key](/docs/administration/data/backup-and-restore.md) so that it can be restored in case anything goes wrong.
1. download the version
1. run the installer
1. turn off maintenance mode

## See Also

- [Upgrade a modern version of Octopus to a newer version (3.x onwards)](/docs/administration/upgrading/guide/index.md).
- [Upgrade an older version of Octopus (1.x to 2.6.5) to a modern version (3.x onwards)](/docs/administration/upgrading/legacy/index.md).
- [Backup your database and master key](/docs/administration/data/backup-and-restore.md).
-  [release notes and breaking changes](https://octopus.com/downloads/compare).
