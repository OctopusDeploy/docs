---
title: Manually uninstall Tentacle
description: Information on how to manually uninstall the Octopus Tentacle.
---

When you uninstall the Tentacle MSI, it automatically removes the application files from the installation folder, but that's it. This page describes how to manually clean up Tentacle in part, or completely remove it from your server.

## Why would I want to clean up? {#ManuallyuninstallTentacle-WhywouldIwanttocleanupinthefirstplace?}

:::problem
In some of these scenarios you should make sure you have a recent backup of the **Tentacle Home Directory** before continuing. If you want to completely remove this instance of Tentacle and don't care about the configuration, applications or data, you won't need to worry about having a backup or rollback strategy.
:::

Here are a few reasons why you may want to completely remove Tentacle from your computer:

1. You are moving this server's responsibilities to another server and want to clean up Tentacle after the move is completed.
2. You installed a trial of Octopus Server and want to completely uninstall the trial Tentacle instance from your computer now that you've finished your trial.
3. You are having communication problems with this Tentacle and want to try completely uninstalling and reconfiguring the Tentacle as part of the troubleshooting process. This can happen if your Tentacle installation was corrupted somehow.

:::success
**Just upgraded from Octopus 2.6 and want to clean up?**
If you have just completed an in-place upgrade from **Octopus 2.6** to a modern version of Octopus Server there will be several folders and files left over that aren't used by newer versions of Tentacle. We didn't remove these files in case you needed to roll back. Learn about [cleaning up after upgrading from Octopus 2.6](/docs/administration/managing-infrastructure/tentacle-configuration-and-file-storage/index.md).
:::

## What does the Tentacle MSI do? {#ManuallyuninstallTentacle-WhatdoestheTentacleMSIactuallydo?}

The MSI will stop the Tentacle windows service and remove the application files which are normally stored in your `%ProgramFiles%` folder. The MSI will leave all of the configuration required to run Tentacle just like before you run the uninstaller. The installer behaves this way because the makes it easier for you to upgrade the application files for Tentacle knowing your configuration, data, and applications preserved.

## Manually removing Tentacle {#ManuallyuninstallTentacle-ManuallyremovingTentacle}

Since Tentacle is usually installed on the server hosting your deployed applications you may want to remove Tentacle without impacting those applications. Otherwise you may want to remove Tentacle and all of the applications it has deployed. The following sections should give you the information you need to clean Tentacle based on your scenario.

:::hint
**What are all these files anyhow?**
Learn about [Tentacle configuration and file storage](/docs/administration/managing-infrastructure/tentacle-configuration-and-file-storage/index.md).
:::

### Manually removing all traces of Tentacle {#ManuallyuninstallTentacle-ManuallyremovingalltracesofTentacle}

These steps will remove all traces of Octopus Tentacle from your computer:

1. Before uninstalling the MSI, use the Octopus Tentacle Manager to delete the Tentacle instance from the computer.
   - This will stop and uninstall the Tentacle windows service.
2. Now uninstall the MSI.
   - This will remove the application files.
3. Find and delete the Octopus Home folder. By default this is in **`%SYSTEMDRIVE%\Octopus`**.
   :::problem
   This will also remove your deployed applications if you have not configured Tentacle to use a different Application folder. See below for more details.
   :::

4. Find and delete the Octopus Tentacle registry entries from the following locations:

Entire Folder:

    * **`HKLM\SOFTWARE\Octopus\Tentacle`**

Octopus Tentacle Specific Registries - Check in each folder for a key with a DisplayName of **`Octopus Tentacle`** and remove the folder where that key resides:

    * **`HKLM\SOFTWARE\Classes\Installer\Products\<RandomID>`** - Look under InstallProperties for a ProductName of **`Octopus Tentacle`**.
    * **`HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Installer\UserData\S-1-5-18\Products\<RandomID>`** - Look under InstallProperties for a DisplayName of **`Octopus Tentacle`**.
    * **`HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall`**
    * **`HKLM\SYSTEM\CurrentControlSet\Services`**

:::problem
**Take care removing registry entries**
Removing entries from the registry can have serious implications. Please make sure you understand and are comfortable with the potential risks. Remember to always [backup any keys](https://support.microsoft.com/en-us/topic/how-to-back-up-and-restore-the-registry-in-windows-855140ad-e318-2a13-2829-d428a2ab0692) before they are modified. If you have any questions or need assistance, please [contact us](https://octopus.com/support).
:::

5. Find and delete any Octopus folders from:
   - **`%ProgramData%\Octopus`** - used for storing instance configuration and can be used for log files when a Home Directory cannot be discovered
   - **`%LocalAppData%\Octopus`** - could be used for log files when a Home Directory cannot be discovered
6. Find and delete any Octopus certificates from the following certificate stores:
   - **`Local Computer\Octopus`**
   - **`Current User\Octopus`** - do this for any user accounts that have been used as the account for the Tentacle windows service
7. Find and delete any scheduled tasks associated with the Tentacle windows service

### Manually removing Tentacle without affecting the deployed applications {#ManuallyuninstallTentacle-ManuallyremovingTentaclewithoutaffectingthedeployedapplications}

Follow the same steps described above, but instead of deleting the entire Octopus Home folder, you should leave the Application folder alone. Everything else can be removed without causing any disruption.

:::success
You can configure Octopus to use a different root folder for deploying your applications. This is a good idea so you can clearly see which folders are only related to Tentacle, and which folders contain your deployed applications. Learn about [Tentacle configuration and file storage](/docs/administration/managing-infrastructure/tentacle-configuration-and-file-storage/index.md) and [how to move the Tentacle Home and Application folders](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-octopus-home-folder-and-the-tentacle-home-and-application-folders.md).
:::
