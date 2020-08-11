---
title: Upgrading self-hosted Octopus
description: As a self-hosted Octopus Deploy user, you need to manually upgrade the server to take advantages of the newest features.
position: 200
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/rx4Qp-_S3L0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

When you self-host the Octopus Server, you need to manually upgrade the server to take advantage of features in new releases of Octopus Deploy. 

:::hint
If you are upgrading a version of Octopus Deploy prior to version 3, we have supported upgrade paths that will help you upgrade to a modern version of Octopus Deploy: [Upgrading older versions of Octopus](/docs/administration/upgrading/legacy/index.md).
:::

## Download the Octopus Server

1. Navigate to the [downloads page](https://octopus.com/downloads/) to download the latest version of the Octopus Server.
1. Click **What's new?** to compare your current version of Octopus Server with the version you are about to download and check for any breaking changes.
1. Download the version of Octopus you want to upgrade to. 

## Put your instance into maintenance mode

1. Click **{{Configuration, Maintenance}}**.
1. Click **ENABLE MAINTENANCE MODE**.

Most users will be prevented from making changes while the server is in maintenance mode, but administrator users can still start new tasks.

:::success
Learn more about [maintenance mode](/docs/administration/managing-infrastructure/maintenance-mode.md).
:::

## Backup Octopus

1. Open the Octopus Manager and stop the Windows service.
1. Click **View Master Key** and backup the Master Key. Without the Master Key you won't be able to use the database backup/s.
1. Create a backup of the Octopus Home Directory.
1. Backup the Octopus database.

## Upgrade Octopus

1. To start the upgrade, run the installer you downloaded earlier. 
1. Follow the prompts in the installer and choose the same options you chose in the original installation.
1. The Octopus Manager will launch when the upgrade is complete. Launch the Octopus Web Portal, navigate to **{{Configuration, Maintenance}}**.
1. Click **DISABLE MAINTENANCE MODE**.

You've successfully upgraded your Octopus Deploy Server.

:::success
To learn more about upgrading, see our in depth [upgrading guides)](/docs/administration/upgrading/index.md).
:::

Return to the [getting started guides](/docs/getting-started/getting-started-guides.md).
