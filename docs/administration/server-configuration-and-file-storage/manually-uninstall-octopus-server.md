---
title: Manually uninstall Octopus Server
description: Information on how to manually uninstall the Octopus Server.
position: 1
---

When you uninstall the Octopus Server MSI, it automatically removes the application files from the installation folder, but that's it. This page describes how to manually clean up Octopus Server in part, or completely remove it from your server.

## Why would I want to clean up in the first place? {#ManuallyuninstallOctopusServer-WhywouldIwanttocleanupinthefirstplace?}

:::problem
In some of these scenarios you should make sure you have a recent backup of the **Octopus Home Directory** and your **Master Key** before continuing. Learn about [backup and restore](/docs/administration/backup-and-restore.md) and [backing up your Master Key](/docs/administration/security-and-encryption.md). If you want to completely remove this instance of Octopus Server and don't care about the configuration or data, you won't need to worry about having a backup or rollback strategy.
:::

Here are a few reasons why you may want to completely remove Octopus Server from your computer:

1. You are moving Octopus Server to another server and want to clean up after the move is completed. Learn about how to move the Octopus Server to another server or VM.
2. You want to completely clean up an old version of Octopus Server after installing a newer version on another server.
3. You installed a trial of Octopus Server and want to completely uninstall the trial instance from your computer now that you've finished your trial.
4. You practiced an upgrade or new installation of Octopus Server and have finished with that instance of Octopus Server.

:::success
**Just upgraded from Octopus Deploy 2.6 and want to clean up?**
If you have just completed an in-place upgrade from Octopus Server 2.6 to 3.x there will be several folders and files left over that aren't used by newer versions of Octopus. We didn't remove these files in case you needed to roll back. Learn about [cleaning up after upgrading from Octopus 2.6](/docs/administration/server-configuration-and-file-storage/index.md).
:::

## What does the Octopus Server MSI actually do? {#ManuallyuninstallOctopusServer-WhatdoestheOctopusServerMSIactuallydo?}

The MSI will stop the Octopus Server windows service and remove the application files which are normally stored in your `%ProgramFiles%` folder. The MSI will leave all of the configuration required to run Octopus just like before you run the uninstaller. The installer behaves this way because the makes it easier for you to upgrade the application files for Octopus Server knowing your configuration and data are preserved.

## Manually removing all traces of Octopus Server {#ManuallyuninstallOctopusServer-ManuallyremovingalltracesofOctopusServer}

:::hint
**What are all these files anyhow?**
Learn about [Octopus Server configuration and file storage](/docs/administration/server-configuration-and-file-storage/index.md).
:::

These steps will remove all traces of Octopus Server from your computer:

1. Before uninstalling the MSI, use the Octopus Server Manager to delete the Octopus Server instance from the computer.
    * This will stop and uninstall the Octopus Server windows service.
2. Now uninstall the MSI.
    * This will remove the application files.
3. Find and delete the Octopus Home folder. By default this is in **`%SYSTEMDRIVE%\Octopus`**.
4. Find and delete the Octopus registry entries from **`HKLM\SOFTWARE\Octopus`**.
5. Find and delete any Octopus folders from:
    * **`%ProgramData%\Octopus`** - could be used for log files when a Home Directory cannot be discovered
    * **`%LocalAppData%\Octopus`** - could be used for log files when a Home Directory cannot be discovered
6. Find and delete any Octopus certificates from the following certificate stores:
    * **`Local Computer\Octopus`**
    * **`Current User\Octopus`** - do this for any user accounts that have been used as the account for the Octopus Server windows service
