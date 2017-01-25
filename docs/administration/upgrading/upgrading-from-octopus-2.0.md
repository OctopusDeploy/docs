---
title: Upgrading from Octopus 2.0
position: 1
---

:::problem
You will not be able to upgrade from Octopus 2.x to Octopus 3.0 directly. If you are running a version of Octopus prior to 2.6, use this guide to upgrade from 2.x to 2.6, then follow the [guide to upgrade from 2.6 to 3.0](/docs/administration/upgrading/upgrading-from-octopus-2.6/index.md).
:::

Upgrading Octopus 2.0 involves two major steps.

- **Upgrading the Octopus Server**
- **Upgrading Tentacles**

Additional information on troubleshooting upgrades is below.

## Upgrading the Octopus server {#UpgradingfromOctopus2.0-UpgradingtheOctopusserver}

To upgrade the Octopus Deploy server, you will need to follow these steps:

1. Ensure you have a recent [database backup](/docs/administration/backup-and-restore.md) that you can restore in case anything goes wrong
2. Download the latest [Octopus Deploy MSI installer](http://octopusdeploy.com/downloads)
3. Run the installer and follow the prompts

:::problem
**Changing installation paths**
If you change the Octopus Server installation path (e.g. *C:\Program Files\Octopus Deploy\Server*) between upgrades, you will need to reconfigure the Windows service after the installer completes. In the Octopus Server Manager, choose the "Reinstall" button to the right of the service status.
:::

When the installer finishes, Octopus Manager will appear. Make sure the Octopus service is running by clicking **Start**.

![](/docs/images/3048129/3277991.png "width=500")

## Upgrading Tentacles {#UpgradingfromOctopus2.0-UpgradingTentacles}

After upgrading the Octopus server, browse to the **Environments** tab in the Octopus web portal. You may need to press the "Check health" button to refresh the status of your Tentacles. If any of the Tentacle agents need to be updated, a message will appear:

![](/docs/images/3048129/3277990.png "width=500")

Click on the **Upgrade machines** button to have Octopus send the new Tentacle package to all of the machines.

## Troubleshooting {#UpgradingfromOctopus2.0-Troubleshooting}

When Octopus 2.0 was first released, the MSI was set as a "per user" install. This means that if Joe installed Octopus, Mary would not see the start menu entries.

For Octopus 2.1, we fixed the MSI and made it a "per machine" installation. However, this created one problem: when you install a new version of Octopus, we normally uninstall the old version. But a "per machine" installation cannot automatically uninstall a "per user" MSI.

Instead, we added a check in 2.1.3 that checks if a per-user installation already exists, and if so, blocks installation. The error message reads:

> A previous version of Octopus Deploy 2.0 is currently installed. This version cannot be automatically upgraded. You will need to uninstall this version before upgrading. Please view this page for details: [http://g.octopushq.com/UninstallFirst](http://g.octopushq.com/UninstallFirst)

![](/docs/images/3048131/3278002.png "width=500")

### Uninstalling Octopus 2.0 {#UpgradingfromOctopus2.0-UninstallingOctopus2.0}

:::success
**Your data is safe**
Uninstalling the old Octopus MSI only removes the program files from disk and stops the Windows Service; your configuration files and the Octopus database will not be touched. When you install the new version, it will continue to work.

When upgrading from one version of Octopus to another we actually perform an uninstall of the old version and then install the new version; the only difference in this case is that due to limitations in Windows Installer/WiX, we can't easily locate the per-user installation.
:::

You can uninstall the old version of the Octopus Deploy MSI installer and install the new version by locating the entry in **Programs and Features**in the Windows Control Panel:

![](/docs/images/3048131/3278003.png "width=500")

After you have uninstalled the old version of Octopus, you can install the new version.

### If you are still getting this error {#UpgradingfromOctopus2.0-Ifyouarestillgettingthiserror}

After uninstalling the old version of Octopus and restarting, if you still receive this error, please navigate to the following registry keys:

```
HKEY_LOCAL_MACHINE\Software\Octopus\OctopusServerHKEY_LOCAL_MACHINE\Software\Octopus\Tentacle
```

And delete the `InstallLocation` value.

Depending on whether you are running the 32-bit registry editor or had previously installed 32-bit versions of Octopus on a 64-bit machine, you should also check:

```
HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Octopus\OctopusServerHKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Octopus\Tentacle
```
