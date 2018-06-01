---
title: Migrating Data from Octopus 2.6 to 3.x
description: Information on how to migrate your data to Octopus 3.x from Octopus 2.6.
position: 3
---

When upgrading from Octopus 2.6 to 3.x you can migrate your data. There are some points worth noting about the data migration process:

- The data migration tool has been designed to perform a **one-time** migration from Octopus 2.6 to Octopus 3.x for each backup file
    * Re-running the data migration will overwrite matching data. See [Importing](/docs/administration/data-migration.md) in the Data Migration page for more details on how data is imported.
    * Data is matched on name. Names are unique in Octopus. This is to allow multiple backups to be run from multiple Octopus Server instances to combine into one 3.x instance
    So you can run multiple backup files into a 3.x instance but if it matches names it will use the currently running backup as the source of truth
- The built-in Octopus NuGet package repository is not migrated automatically - see [below](/docs/administration/upgrading/upgrading-from-octopus-2.6/migrating-data-from-octopus-2.6-to-3.x.md) for more details
- You can optionally limit the days of historical data to migrate - see [below](/docs/administration/upgrading/upgrading-from-octopus-2.6/migrating-data-from-octopus-2.6-to-3.x.md) for more details

:::hint
** The migrator can take a long time **
Please see our [tips for minimizing the migration duration](minimize-migration-time.md).
:::

## Importing your 2.6 Backup into 3.x {#MigratingdatafromOctopus2.6to3.x-Importingyour2.6Backupinto3.x}

To import your 2.6 Raven data into a 3.x installation (generally this is run after a side-by-side upgrade) you need to select import from the Octopus Manager.

![](/docs/images/3048787/3964992.png "width=500")

This will open up the importer. From here you select that you want to import from a 2.6 backup file.

![](/docs/images/3048787/3964993.png "width=500")

You need to select your most recent 2.6 Backup file, and provide the Master key associated with the backup you are importing. The next step lets you perform a preview of your import.

![](/docs/images/3048787/3964994.png "width=500")

When you deselect ***Preview only***, your import will run against the database. This cannot be reversed. The backup is treated as the truth, so any changes that have been made to the database (if this is not your first import) will be overwritten with the backup.

![](/docs/images/3048787/3964995.png "width=500")

If you need to use any of the options below to manage the data being imported you need to use the Show Script feature to run the migration via console.

![](/docs/images/3048787/3964996.png "width=500")

### Migrating the built-in Octopus NuGet package repository {#MigratingdatafromOctopus2.6to3.x-PackageRepositoryMigratingthebuilt-inOctopusNuGetpackagerepository}

If you use the built-in [Octopus NuGet repository](/docs/packaging-applications/package-repositories/index.md) you will need to move the files from your 2.6 server to your 3.x server. The package files are not included as part of the backup.
In a standard 2.6 install the files can be found under `C:\Octopus\OctopusServer\Repository\Packages`
You will need to transfer them to the new server to `C:\Octopus\Packages`Once the files have been copied, you will need to restart the Octopus Server service to re-index the files - The index runs in the background, so if you have a lot of packages it could take a while (5-20 mins) to show in the UI or be usable for deployments.

### Migrating historical data {#MigratingdatafromOctopus2.6to3.x-MaxAgeMigratinghistoricaldata}

By default we migrate everything from your backup including all historical data. You can use the `maxage=` argument when executing the migrator to limit the number of days to keep. For example: `maxage=90` will keep 90 days of historical data ignoring anything older.

The migration process can optionally be executed via command line as described below

**Usage**

```powershell
Octopus.Migrator.exe migrate [<options>]
```

Where`[<options>]`is any of:

**configure options**

```powershell
    --instance			Name of the instance to use
    --file=VALUE  	     	Octopus 2.6 (.octobak) file
    --master-key=VALUE   	Master key used to decrypt the file
    --dry-run			[Optional] Do not commit changes, just print what would have happened
    --maxage			[Optional] Ignore historical data older than x days
    --nologs			[Optional] Only import data, but do not convert and import the raw server log entries
    --onlylogs			[Optional] No data imported, only import the raw server log entries for existing migrated data.
    --nooverwrite		[Optional] The data that exists in the 3.x database will be treated as truth and not overwritten 					by the backup file, only new data will be inserted
```

To see the command syntax click the **Show script** link in the wizard.

In 3.x the server task logs are stored on the file system. In 2.6 they were stored in the database, so a large amount of time and memory is needed during the 2.6 - 3.x migration. If you have a lot of history this can take time. You can use combinations of our options with the migrator to find the quickest migration path or get up and running faster and convert the past history logs at more convenient time when your Octopus Server may not be in use.

Note that `--nologs` and `--onlylogs` are mutually exclusive. You can use combinations of `--maxage` and `--nologs` and `--nooverwrite`. `--onlylogs` will not import any data, so will only convert logs that match the data that was previously imported.
