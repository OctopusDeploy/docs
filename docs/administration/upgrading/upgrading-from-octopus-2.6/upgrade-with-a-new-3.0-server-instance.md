---
title: Upgrade With a New 3.0 Server Instance
description: Information on how to upgrade from Octopus 2.6 to a new Octopus 3.0 instance.
position: 2
---

This is the recommended way of performing an upgrade for larger installations. It gives you the opportunity to verify that your Tentacles have been successfully upgraded, and allows you to more easily roll back if you have any issues.

Be sure to read the [Upgrading from Octopus 2.6](/docs/administration/upgrading/upgrading-from-octopus-2.6/index.md) documentation page. You must have a working **Octopus 2.6** installation for the data migration.

## Summary {#Upgradewithanew3.0serverinstance-Summary}

!toc

## Step by Step {#Upgradewithanew3.0serverinstance-Stepbystep}

To upgrade with a new **Octopus 3.x** server, follow these steps:

### 1. Back Up Your Octopus 2.6 Database and Master Key {#Upgradewithanew3.0serverinstance-1.BackupyourOctopus2.6databaseandmasterkey}

See the [Backup and restore](/docs/administration/upgrading/upgrading-from-octopus-2.6/backup-2.6.md) page for instructions on backing up your database.

### 2. Install Octopus 3.x On a New Virtual or Physical Server {#Upgradewithanew3.0serverinstance-2.InstallOctopus3.xonanewvirtualorphysicalserver}

:::success
**Upgrade to the latest version**
When upgrading to **Octopus 3.x** please use the latest version available. We have been constantly improving the **Octopus 2.6** to **Octopus 3.x** data migration process whilst adding new features and fixing bugs.
:::

See the [Installing Octopus 3.x](/docs/installation/index.md) page for instructions on installing a new **Octopus 3.x** instance.

### 3. Migrate Your Data From 2.6 to 3.x {#Upgradewithanew3.0serverinstance-3.Migrateyourdatafrom2.6to3.x}

See the [Migrating data from Octopus 2.6 to 3.x](/docs/administration/upgrading/upgrading-from-octopus-2.6/migrating-data-from-octopus-2.6-to-3.x.md) page for instructions on importing your **Octopus 2.6** database backup into **Octopus 3.x**.

:::hint
**Migration taking a long time?**
By default we migrate everything from your backup including historical data. You can use the `maxage=` argument when executing the migrator to limit the number of days to keep. For example: `maxage=90` will keep 90 days of historical data ignoring anything older.

To see the command syntax click the **Show script** link in the wizard
:::

:::hint
**Using the built-in Octopus NuGet repository?**
If you use the built-in [Octopus NuGet repository](/docs/packaging-applications/package-repositories/index.md) you will need to move the files from your **Octopus 2.6** server to your **Octopus 3.x** server. They are not part of the backup.
In a standard **Octopus 2.6** install the files can be found under `C:\Octopus\OctopusServer\Repository\Packages`
You will need to transfer them to the new server to `C:\Octopus\Packages`Once the files have been copied, you will need to restart the Octopus Server service to re-index the files - The index runs in the background, so if you have a lot of packages it could take a while (5-20 mins) to show in the UI or be usable for deployments.
:::

### 4. Use Hydra to Automatically Upgrade Your Tentacles {#Upgradewithanew3.0serverinstance-4.UseHydratoautomaticallyupgradeyourTentacles}

!include <using-hydra>

### 5. Verify Connectivity Between the 3.x Server and 3.x Tentacles {#Upgradewithanew3.0serverinstance-5.Verifyconnectivitybetweenthe3.xserverand3.xTentacles}

When the Hydra task runs on a Tentacle machine, it should no longer be able to communicate with the **Octopus 2.6** server. You can verify this by navigating to the Environments page and clicking **Check Health**.

![](/docs/images/3048132/3278012.png "width=500")

After successfully updating your Tentacles, you should see this check fail from your **Octopus 2.6** server.

![](/docs/images/3048132/3278011.png "width=500")

Performing the Check Health on your **Octopus 3.x** server should now succeed.

![](/docs/images/3048132/3278009.png "width=500")

:::hint
If you have multiple Tentacles running on the same server, an update to one will result in an update to **all** of them. This is because there is only one copy of the Tentacle binaries, even with multiple instances configured.
:::

### 6. Decommission Your Octopus 2.6 Server {#Upgradewithanew3.0serverinstance-6.DecommissionyourOctopus2.6server}

Once you are confident your Tentacles have all been updated and work correctly, you can decommission your **Octopus 2.6** Server.
