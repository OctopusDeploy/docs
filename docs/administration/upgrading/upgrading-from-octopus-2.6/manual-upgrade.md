---
title: Manual upgrade
position: 1
---


You can upgrade between Octopus 2.6 and 3.x by downloading the latest [MSI's for both Octopus and Tentacle](https://octopusdeploy.com/download), and installing them manually. If you're working with a large number of Tentacles, see the section on [upgrading larger installations](/docs/home/administration/upgrading/upgrading-from-octopus-2.6.md).

## Summary

1. Backup your Octopus 2.6 database and master key
2. Install Octopus 3.x on your Octopus Server
3. Migrate your data from 2.6 to 3.x
4. Install Tentacle 3.x on your deployment targets
 1. For Octopus 3.0.1: Reinstall the Tentacle Service
5. Verify the connectivity between the 3.x Octopus Server and the 3.x Tentacles
6. **[Optional]** Clean up your Octopus Home folder, follow the instructions on this [page](http://docs.octopusdeploy.com/display/OD/Server+configuration+and+File+storage#ServerconfigurationandFilestorage-CleanUp)


## Step by step


To perform an in-place upgrade, follow these steps:

:::problem
There is a current issue where it is not importing your license key. Please back this up first from Configuration -> License
:::

### 1. Back up your Octopus 2.6 database and master key


See the [Backup and restore](http://docs.octopusdeploy.com/display/OD2/Backup+and+restore)[ page for instructions on backing up your database.](http://docs.octopusdeploy.com/display/OD2/Backup+and+restore)


See the [Security and encryption](http://docs.octopusdeploy.com/display/OD2/Security+and+encryption) page for instructions on backing up your master key.

### 2. Install Octopus 3.x on your Octopus Server

:::success
**Upgrade to the latest version**
When upgrading to Octopus 3.x please use the latest version available. We have been constantly improving the 2.6 to 3.x data migration process whilst adding new features and fixing bugs.
:::


See the [Installing Octopus 3.x](/docs/home/installation/installing-octopus.md) page for instructions on installing a new Octopus 3.x instance.


After installing the MSI, you will be presented with an upgrade page.


![](/docs/images/3048132/3278008.png)


Click "Get started..." and set up your database connection. You may need to grant permission to the NT AUTHORITY\SYSTEM account at this stage.


![](/docs/images/3048132/3278007.png)


Click Next, and then Install to install the Octopus 3.x server over the 2.6 instance.


![](/docs/images/3048132/3278006.png)

### 3. Restore the Octopus 2.6 database using the migration tool


After upgrading, the Octopus Manager will prompt to import your Octopus 2.6 database. Click the "Import data..." button and follow the prompts to import your 2.6 data.


![](/docs/images/3048132/3278005.png)


See the [Migrating data from Octopus 2.6 to 3.x](/docs/home/administration/upgrading/upgrading-from-octopus-2.6/migrating-data-from-octopus-2.6-to-3.x.md) page for more detailed instructions on importing your Octopus 2.6 database backup into Octopus 3.x.

:::hint
**Migration taking a long time?**
By default we migrate everything from your backup including historical data. You can use the `maxage=` argument when executing the migrator to limit the number of days to keep. For example: `maxage=90` will keep 90 days of historical data ignoring anything older.


To see the command syntax click the **Show script** link in the wizard
:::

:::hint
**Using the built-in Octopus NuGet repository?**
If you use the built-in [Octopus NuGet repository](http://docs.octopusdeploy.com/display/OD/Package+repositories) you will need to move the files from your 2.6 server to your 3.x server. They are not part of the backup.
In a standard 2.6 install the files can be found under `C:\Octopus\OctopusServer\Repository\Packages`
You will need to transfer them to the new server to `C:\Octopus\Packages`Once the files have been copied, you will need to restart the Octopus Server service to re-index the files - The index runs in the background, so if you have a lot of packages it could take a while (5-20 mins) to show in the UI or be usable for deployments.
:::

### 4. Install the Tentacle 3.x MSI


At this point, the machines should appear in your Environments page inside Octopus 3.x, but a health check will fail - the communication protocol Octopus 3.x uses isn't compatible with Tentacle 2.6.


On each machine that ran Tentacle 2.6, connect to the machine, and install the Tentacle 3.x MSI.

#### 4.a For Octopus 3.0.1: Reinstall the Tentacle Service


*We discovered an issue with the Tentacle Installer for Octopus 3.0.1 where the Tentacle windows service would still be pointing to the 2.x binaries from a previous 2.x automatic Tentacle upgrade. This has been fixed and is scheduled for Octopus 3.0.2.*


Click the Reinstall button to ensure the Tentacle windows service is pointing to the correct version of Tentacle.exe.


![](/docs/images/3048134/3278285.png)

:::hint
**Modified the Tentacle windows service?**
Reinstall will uninstall and reinstall the Tentacle windows service. If you're running Tentacle under a non-default set of credentials or you have configured non-default recovery options you will need to reinstate that configuration after the Reinstall is complete.
:::

### 5. Verify connectivity between the 3.x server and 3.x Tentacles


Log in to your new Octopus 3.x server and run health checks on all of your environments. If the upgrade completed successfully, they should succeed.


![](/docs/images/3048132/3278009.png)


If one or more health checks do not succeed after a few attempts, see the Troubleshooting section to identify possible issues.
