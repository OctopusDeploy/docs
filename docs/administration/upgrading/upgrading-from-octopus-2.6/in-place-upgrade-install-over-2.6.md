---
title: In place upgrade (install over 2.6)
description: Information on how to do an inplace upgrade to Octopus 3.x from Octopus 2.6.
position: 0
---

You can perform an in place upgrade of 3.x from 2.6, but you need to upgrade your Tentacles first.

Due to the new communication method, you won't be able to communicate with your upgraded Tentacles until you upgrade your server. However, if you upgrade your server before all Tentacles are correctly updated, you will have to upgrade them manually, or roll your server back to 2.6 and try again.

## Summary {#Inplaceupgrade(installover2.6)-Summary}

1. Backup your Octopus 2.6 database and master key
2. Use Hydra to automatically upgrade your Tentacles
3. Verify the upgrade has worked
4. Install Octopus 3.x on your Octopus Server
5. Migrate your data from 2.6 to 3.x
6. Verify the connectivity between the 3.x Octopus Server and the 3.x Tentacles
7. **[Optional]** Clean up your Octopus Home folder, follow the instructions on this [page](/docs/administration/server-configuration-and-file-storage\index.md#ServerconfigurationandFilestorage-CleanUp)

## Step by step {#Inplaceupgrade(installover2.6)-Stepbystep}

To perform an in-place upgrade, follow these steps carefully:

:::problem
There is a current issue where it is not importing your license key. Please back this up first from {{Configuration,License}}.
:::

### 1. Back up your Octopus 2.6 database and master key {#Inplaceupgrade(installover2.6)-1.BackupyourOctopus2.6databaseandmasterkey}

See the [Backup and restore](/docs/administration/upgrading/upgrading-from-octopus-2.6/backup-2.6.md)[ page for instructions on backing up your database.](/docs/administration/upgrading/upgrading-from-octopus-2.6/backup-2.6.md)

### 2. Use Hydra to automatically upgrade your Tentacles {#Inplaceupgrade(installover2.6)-2.UseHydratoautomaticallyupgradeyourTentacles}

:::problem
This is the point of no return. When your Tentacles are upgraded to 3.x your 2.6 server will not be able to communicate with them
:::

Hydra is a tool we've built that will help you update your Tentacles to the latest version. It is particularly useful migrating from 2.6 to 3.x as the communication methods have changed. Hydra is in two parts. A package that contains the latest Tentacle MSI installers, and a step template that does the upgrade to your environments. To account for issues with communicating with a Tentacle that has been 'cut off' from its Octopus Server, the Hydra process connects to the Tentacle and creates a scheduled task on the Tentacle Machine. If it is able to schedule the task it considers that install a success. The task runs one minute later.

The task itself does the following:
1. Find Tentacle services
2. Stop all Tentacles (if they’re running)
3. Run MSI
4. Update configs for any polling Tentacles
5. Starts any Tentacles that were running when we started

With just one Tentacle service this should be a very quick process, but we cannot estimate how long it make take with many Tentacle services running on the one machine.

:::problem
The scheduled task is set to run as SYSTEM to ensure the MSI installation will succeed. If your Tentacles are running with restricted permissions, they may not be able to create this scheduled task. The only option is to upgrade your Tentacles manually.
:::

:::problem
Hydra performs a Reinstall of each Tentacle. As part of the reinstall, the Service Account is reset to Local System. If you need your Tentacles to run under a different account, you will have to make the change after the upgrade completes (after you've re-established a connection from 3.x).

You can do this manually, or using the following script:

```powershell
Tentacle.exe service --instance "Tentacle" --reconfigure --username=DOMAIN\ACCOUNT --password=accountpassword --start --console
```
:::

To use Hydra, follow these steps:

1. Download the latest Hydra NuGet package from [https://octopus.com/downloads](https://octopus.com/downloads)[
](https://s3-eu-west-1.amazonaws.com/octopus-downloads/hydra/OctopusDeploy.Hydra.3.0.10.268.nupkg)
2. Use the Upload Package feature of the library to upload the OctopusDeploy.Hydra package to the built-in NuGet repository on your Octopus 2.6 server.  
![](/docs/images/3048135/3278019.png "width=500")
3. Import the [Hydra script template](http://library.octopusdeploy.com/step-templates/d4fb1945-f0a8-4de4-9045-8441e14057fa/actiontemplate-hydra-update-octopus-tentacle) from the Community Library.  
![](/docs/images/3048135/3278018.png "width=500")
4. Create a [new project](/docs/key-concepts/projects/index.md) with a single "Update Octopus Tentacle" step from the step template
    * Ensure you choose or create a [Lifecycle ](/docs/key-concepts/lifecycles.md)that allows you to deploy to all Tentacles.
    * Ensure you set the Update Octopus Tentacle step to run for all appropriate Tentacles.
    * If you are using any polling Tentacles and your 3.x server will have a new address or polling port, you'll need to add the new Octopus 3.x server address (including the polling port) in the Server Mapping field. If the URL and port will stay the same, there's no need to set this value.  
    It is very important you get this value correct. An incorrect value will result in a polling Tentacle that can't be contacted by either a 2.6 or 3.x server.
    If all of your polling Tentacles on the one server need to be pointed to the new location you need only put`https://octopus2.contoso.com:10934/` and it will update the old location with this new one.
    If you have more than one polling Tentacle and each points to a different Octopus Server (this should be very rare) then the syntax is: `https://oldserver:oldport=>https://newserver:newport,https://oldserver2:oldport2/=>https://newserver2:newport2`  
    Where each pair is separated by commas. This will match the first case and replace it => with the second case.  
    Click the ![](/docs/images/3048132/3278017.png) help button for more detailed instructions.  
    ![](/docs/images/3048132/3278014.png "width=500")   
    ![](/docs/images/3048132/3278015.png "width=500")   
5. Create a release and deploy. The deployment should succeed, and one minute later the Tentacles will be upgraded.
    ![](/docs/images/3048132/3278010.png "width=500")

:::hint
We strongly recommend testing a deployment against a small subset of "canary" machines. The best way to do this is to create a new "canary" machine role and assign it to a few machines. Set the Update Octopus Tentacle step to only run against this "canary" role.
Once you're confident the upgrade works as expected, you can deploy to all remaining machines.
:::

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

See the [Installing Octopus 3.x](/docs/installation/installing-octopus/index.md) page for instructions on installing a new Octopus 3.x instance.

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
