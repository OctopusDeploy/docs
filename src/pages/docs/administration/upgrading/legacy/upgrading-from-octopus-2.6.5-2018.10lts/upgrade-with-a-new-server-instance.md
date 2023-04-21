---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Upgrade with a new server instance
description: Information on how to upgrade from Octopus 2.6.5 to a new Octopus instance.
navOrder: 2
---

This is the recommended way of performing an upgrade for larger installations. It gives you the opportunity to verify that your Tentacles have been successfully upgraded, and allows you to more easily roll back if you have any issues.

Be sure to read the [Upgrading from Octopus 2.6.5 to 2018.10 LTS](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts) documentation page. You must have a working **Octopus 2.6.5** installation for the data migration.

## Step by Step {#Upgradewithanew3.0serverinstance-Stepbystep}

To upgrade to a modern version of Octopus Server, follow these steps:

### 1. Back up your Octopus 2.6.5 database and Master Key {#Upgradewithanew3.0serverinstance-1.BackupyourOctopus2.6databaseandmasterkey}

See the [Backup and restore](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/backup-2.6) page for instructions on backing up your database.

### 2. Install Octopus 2018.10 LTS on a new virtual or physical server {#Upgradewithanew3.0serverinstance-2.InstallOctopus3.xonanewvirtualorphysicalserver}

:::div{.success}
**Upgrade to the latest version**
When upgrading to **Octopus 2018.10 LTS** please use the latest version available. We have been constantly improving the **Octopus 2.6.5** to **Octopus 2018.10 LTS** data migration process whilst adding new features and fixing bugs.
:::

See the [Installing Octopus 2018.10 LTS](/docs/installation) page for instructions on installing a new **Octopus 2018.10 LTS** instance.

### 3. Migrate your data from 2.6.5 to 2018.10 LTS {#Upgradewithanew3.0serverinstance-3.Migrateyourdatafrom2.6to3.x}

See the [Migrating data from Octopus 2.6.5 to 2018.10 LTS](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/migrating-data-from-octopus-2.6.5-2018.10lts) page for instructions on importing your **Octopus 2.6.5** database backup into **Octopus 2018.10 LTS**.

:::div{.hint}
**Migration taking a long time?**
By default we migrate everything from your backup including historical data. You can use the `maxage=` argument when executing the migrator to limit the number of days to keep. For example: `maxage=90` will keep 90 days of historical data ignoring anything older.

To see the command syntax click the **Show script** link in the wizard
:::

:::div{.hint}
**Using the built-in Octopus NuGet repository?**
If you use the built-in [Octopus NuGet repository](/docs/packaging-applications/package-repositories) you will need to move the files from your **Octopus 2.6.5** server to your **Octopus 2018.10 LTS** server. They are not part of the backup.
In a standard **Octopus 2.6.5** install the files can be found under `C:\Octopus\OctopusServer\Repository\Packages`
You will need to transfer them to the new server to `C:\Octopus\Packages`. Once the files have been copied, go to {{Library>Packages>Package Indexing}} and click the `RE-INDEX NOW` button. This process runs in the background, so if you have a lot of packages it could take a while (5-20 mins) to show in the UI or be usable for deployments.
:::

### 4. Use Hydra to automatically upgrade your Tentacles {#Upgradewithanew3.0serverinstance-4.UseHydratoautomaticallyupgradeyourTentacles}

!include <using-hydra>

### 5. Verify connectivity between the 2018.10 LTS server and your Tentacles {#Upgradewithanew3.0serverinstance-5.Verifyconnectivitybetweenthe3.xserverand3.xTentacles}

When the Hydra task runs on a Tentacle machine, it should no longer be able to communicate with the **Octopus 2.6.5** server. You can verify this by navigating to the Environments page and clicking **Check Health**.

![](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/images/3278012.png "width=500")

After successfully updating your Tentacles, you should see this check fail from your **Octopus 2.6.5** server.

![](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/images/3278011.png "width=500")

Performing the Check Health on your **Octopus 2018.10 LTS** server should now succeed.

![](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/images/3278009.png "width=500")

:::div{.hint}
If you have multiple Tentacles running on the same server, an update to one will result in an update to **all** of them. This is because there is only one copy of the Tentacle binaries, even with multiple instances configured.
:::

### 6. Decommission your Octopus 2.6.5 Server {#Upgradewithanew3.0serverinstance-6.DecommissionyourOctopus2.6server}

Once you are confident your Tentacles have all been updated and work correctly, you can decommission your **Octopus 2.6.5** Server.
