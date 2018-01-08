---
title: In place upgrade (install over 2.6)
description: Information on how to do an inplace upgrade to Octopus 3.x from Octopus 2.6.
position: 0
---

You can perform an in place upgrade of 3.x from 2.6, but you need to upgrade your Tentacles first.

Due to the new communication method, you won't be able to communicate with your upgraded Tentacles until you upgrade your server. However, if you upgrade your server before all Tentacles are correctly updated, you will have to upgrade them manually, or roll your server back to 2.6 and try again.

## Summary {#Inplaceupgrade(installover2.6)-Summary}

!toc

## Step by step {#Inplaceupgrade(installover2.6)-Stepbystep}

To perform an in-place upgrade, follow these steps carefully:

:::problem
There is a current issue where it is not importing your license key. Please back this up first from {{Configuration,License}}.
:::

### 1. Back up your Octopus 2.6 database and master key {#Inplaceupgrade(installover2.6)-1.BackupyourOctopus2.6databaseandmasterkey}

See the [Backup and restore](/docs/administration/upgrading/upgrading-from-octopus-2.6/backup-2.6.md)[ page for instructions on backing up your database.](/docs/administration/upgrading/upgrading-from-octopus-2.6/backup-2.6.md)

### 2. Use Hydra to automatically upgrade your Tentacles {#Inplaceupgrade(installover2.6)-2.UseHydratoautomaticallyupgradeyourTentacles}

!include <using-hydra>

### 3. Verify the upgrade has worked {#Inplaceupgrade(installover2.6)-3.Verifytheupgradehasworked}

When the Hydra task runs on a Tentacle machine, it should no longer be able to communicate with the Octopus 2.6 server. You can verify this by navigating to the Environments page and clicking **Check Health**.

![](/docs/images/3048132/3278012.png "width=500")

After successfully updating your Tentacles, you should see this check fail from your 2.6 server.

![](/docs/images/3048132/3278011.png "width=500")

We recommend connecting to some of your Tentacle machines and examining the Octopus Tentacle binaries to ensure they have been upgraded. You should also ensure the service is running (even though it will not be able to communicate with the server).

:::hint
If you have multiple Tentacles running on the same server, an update to one will result in an update to **all** of them. This is because there is only one copy of the Tentacle binaries, even with multiple instances configured.
:::

### 4. Install Octopus 3.x on your Octopus Server {#Inplaceupgrade(installover2.6)-4.InstallOctopus3.xonyourOctopusServer}

:::success
**Upgrade to the latest version**
When upgrading to Octopus 3.x please use the latest version available. We have been constantly improving the 2.6 to 3.x data migration process whilst adding new features and fixing bugs.
:::

See the [Installing Octopus 3.x](/docs/installation/index.md) page for instructions on installing a new Octopus 3.x instance.

After installing the MSI, you will be presented with an upgrade page.

![](/docs/images/3048132/3278008.png "width=500")

Click "Get started..." and set up your database connection. You may need to grant permission to the NT AUTHORITY\SYSTEM account at this stage.

![](/docs/images/3048132/3278007.png "width=500")

Click Next, and then Install to install the Octopus 3.x server over the 2.6 instance.

![](/docs/images/3048132/3278006.png "width=500")

### 5. Restore the Octopus 2.6 database using the migration tool {#Inplaceupgrade(installover2.6)-5.RestoretheOctopus2.6databaseusingthemigrationtool}

After upgrading, the Octopus Manager will prompt to import your Octopus 2.6 database. Click the "Import data..." button and follow the prompts to import your 2.6 data.

![](/docs/images/3048132/3278005.png "width=500")

See the [Migrating data from Octopus 2.6 to 3.x](/docs/administration/upgrading/upgrading-from-octopus-2.6/migrating-data-from-octopus-2.6-to-3.x.md) page for more detailed instructions on importing your Octopus 2.6 database backup into Octopus 3.x.

:::hint
**Migration taking a long time?**
By default we migrate everything from your backup including historical data. You can use the `maxage=` argument when executing the migrator to limit the number of days to keep. For example: `maxage=90` will keep 90 days of historical data ignoring anything older.

To see the command syntax click the **Show script** link in the wizard
:::

:::hint
**Using the built-in Octopus NuGet repository?**
If you use the built-in [Octopus NuGet repository](/docs/packaging-applications/package-repositories/index.md) you will need to move the files from your 2.6 server to your 3.x server. They are not part of the backup.
In a standard 2.6 install the files can be found under `C:\Octopus\OctopusServer\Repository\Packages`
You will need to transfer them to the new server to `C:\Octopus\Packages`Once the files have been copied, you will need to restart the Octopus Server service to re-index the files - The index runs in the background, so if you have a lot of packages it could take a while (5-20 mins) to show in the UI or be usable for deployments.
:::

### 6. Verify connectivity between the 3.x server and 3.x Tentacles {#Inplaceupgrade(installover2.6)-6.Verifyconnectivitybetweenthe3.xserverand3.xTentacles}

Log in to your new Octopus 3.x server and run health checks on all of your environments. If the upgrade completed successfully, they should succeed.

![](/docs/images/3048132/3278009.png "width=500")

If one or more health checks do not succeed after a few attempts, see the Troubleshooting section to identify possible issues.

### Optionally clean up your Octopus Home folder

We leave some files used by Octopus 2.6 in place so you can roll back if necessary. After the upgrade is complete these files will never be used again and can be safely deleted.

You can follow the instructions on this [page](/docs/administration/server-configuration-and-file-storage\index.md#ServerconfigurationandFilestorage-CleanUp) to clean up files left over from your Octopus 2.6 to 3.x upgrade. 