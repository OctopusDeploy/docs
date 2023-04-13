---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Manual upgrade
description: Information on how to manually upgrade to Octopus 2018.10 LTS from Octopus 2.6.5.
navOrder: 1
---

You can upgrade from **Octopus 2.6.5** to **Octopus 2018.10 LTS** by downloading the latest [MSI's for both Octopus and Tentacle](https://octopus.com/download), and installing them manually. If you're working with a large number of Tentacles, see the section on [upgrading larger installations](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/).

## Summary {#Manualupgrade-Summary}

1. Backup your **Octopus 2.6.5** database and Master Key.
2. Install **Octopus 2018.10 LTS** on your Octopus Server.
3. Migrate your data from **Octopus 2.6.5** to **Octopus 2018.10 LTS**.
4. Install **the latest version of Tentacle** on your deployment targets.
5. Verify the connectivity between the **Octopus 2018.10 LTS** Server and your Tentacles.
6. **[Optional]** Clean up your Octopus Home folder, follow the instructions on this [page](/docs/administration/managing-infrastructure/server-configuration-and-file-storage\#ServerconfigurationandFilestorage-CleanUp).

## Step by step {#Manualupgrade-Stepbystep}

To perform an in-place upgrade, follow these steps:

### 1. Back up Your Octopus 2.6.5 database and Master Key {#Manualupgrade-1.BackupyourOctopus2.6databaseandmasterkey}

See the [Backup and restore](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/backup-2.6/)[ page for instructions on backing up your database.](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/backup-2.6/)

### 2. Install Octopus 2018.10 LTS on your Octopus Server {#Manualupgrade-2.InstallOctopus3.xonyourOctopusServer}

:::success
**Upgrade to the latest version**
When upgrading to **Octopus 2018.10 LTS** please use the latest version available. We have been constantly improving the **Octopus 2.6.5** to **Octopus 2018.10 LTS** data migration process whilst adding new features and fixing bugs.
:::

See the [Installing Octopus 2018.10 LTS](/docs/installation/) page for instructions on installing a new **Octopus 2018.10 LTS** instance.

After installing the MSI, you will be presented with an upgrade page.

![](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/images/3278008.png "width=500")

Click "Get started..." and set up your database connection. You may need to grant permission to the NT AUTHORITY\SYSTEM account at this stage.

![](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/images/3278007.png "width=500")

Click Next, and then Install to install the **Octopus 2018.10 LTS** server over the **Octopus 2.6.5** instance.

![](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/images/3278006.png "width=500")

### 3. Restore the Octopus 2.6.5 database using the Migration Tool {#Manualupgrade-3.RestoretheOctopus2.6databaseusingthemigrationtool}

After upgrading, the Octopus Manager will prompt to import your **Octopus 2.6.5** database. Click the "Import data..." button and follow the prompts to import your **Octopus 2.6.5** data.

![](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/images/3278005.png "width=500")

See the [Migrating data from Octopus 2.6.5 to 2018.10 LTS](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/migrating-data-from-octopus-2.6.5-2018.10lts/) page for more detailed instructions on importing your **Octopus 2.6.5** database backup into **Octopus 2018.10 LTS**.

:::hint
**Migration taking a long time?**
By default we migrate everything from your backup including historical data. You can use the `maxage=` argument when executing the migrator to limit the number of days to keep. For example: `maxage=90` will keep 90 days of historical data ignoring anything older.

To see the command syntax click the **Show script** link in the wizard
:::

:::hint
**Using the built-in Octopus NuGet repository?**
If you use the built-in [Octopus NuGet repository](/docs/packaging-applications/package-repositories/) you will need to move the files from your **Octopus 2.6.5** server to your **Octopus 2018.10 LTS** server. They are not part of the backup.
In a standard **Octopus 2.6.5** install the files can be found under `C:\Octopus\OctopusServer\Repository\Packages`
You will need to transfer them to the new server to `C:\Octopus\Packages`. Once the files have been copied, go to {{Library>Packages>Package Indexing}} and click the `RE-INDEX NOW` button. This process runs in the background, so if you have a lot of packages it could take a while (5-20 mins) to show in the UI or be usable for deployments.
:::

### 4. Install the latest Tentacle MSI {#Manualupgrade-4.InstalltheTentacle3.xMSI}

At this point, the machines should appear in your Environments page inside **Octopus 2018.10 LTS**, but a health check will fail - the communication protocol used by modern Octopus Servers isn't compatible with **Tentacle 2.6**.

On each machine that ran **Tentacle 2.6**, connect to the machine, and install the latest Tentacle MSI.

### 5. Verify connectivity between the 2018.10 LTS server and your Tentacles {#Manualupgrade-5.Verifyconnectivitybetweenthe3.xserverand3.xTentacles}

Log in to your new **Octopus 2018.10 LTS** server and run health checks on all of your environments. If the upgrade completed successfully, they should succeed.

![](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/images/3278009.png "width=500")

If one or more health checks do not succeed after a few attempts, see the Troubleshooting section to identify possible issues.
