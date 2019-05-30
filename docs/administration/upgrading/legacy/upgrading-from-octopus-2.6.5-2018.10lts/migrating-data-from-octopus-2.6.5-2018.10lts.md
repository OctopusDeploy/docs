---
title: Migrating Data from Octopus 2.6.5 to 2018.10 LTS
description: Information on how to migrate your data from Octopus 2.6.5 to 2018.10 LTS.
position: 3
---

When upgrading from **Octopus 2.6** to **Octopus 2018.10 LTS** you can migrate your data. There are some points worth noting about the data migration process:

- The data migration tool has been designed to perform a **one-time** migration from **Octopus 2.6** to **Octopus 2018.10 LTS** for each backup file.
    * Re-running the data migration will overwrite matching data. See [Importing](/docs/administration/data/data-migration.md) in the Data Migration page for more details on how data is imported.
    * Data is matched on name. Names are unique in Octopus. This is to allow multiple backups to be run from multiple Octopus Server instances to combine into one **Octopus 2018.10 LTS** instance.
    So you can run multiple backup files into an **Octopus 2018.10 LTS** instance but if it matches names it will use the currently running backup as the source of truth.
- The built-in Octopus NuGet package repository is not migrated automatically - see [below](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/migrating-data-from-octopus-2.6.5-2018.10lts.md) for more details.
- You can optionally limit the days of historical data to migrate - see [below](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/migrating-data-from-octopus-2.6.5-2018.10lts.md) for more details.

:::hint
**The migrator can take a long time**
Please see our [tips for minimizing the migration duration](minimize-migration-time.md).
:::

## Importing Your 2.6 Backup Into 2018.10 LTS {#MigratingdatafromOctopus2.6to3.x-Importingyour2.6Backupinto3.x}

To import your 2.6 Raven data into a 2018.10 LTS installation (generally this is run after a side-by-side upgrade) you need to select import from the Octopus Manager.

![](/docs/images/3048787/3964992.png)

This will open up the importer. From here you select that you want to import from a 2.6 backup file.

![](/docs/images/3048787/3964993.png)

You need to select your most recent 2.6 Backup file, and provide the Master key associated with the backup you are importing. The next step lets you perform a preview of your import.

![](/docs/images/3048787/3964994.png)

When you deselect ***Preview only***, your import will run against the database. This cannot be reversed. The backup is treated as the truth, so any changes that have been made to the database (if this is not your first import) will be overwritten with the backup.

![](/docs/images/3048787/3964995.png)

If you need to use any of the options below to manage the data being imported you need to use the Show Script feature to run the migration via console.

![](/docs/images/3048787/3964996.png)

### Migrating the Built-in Octopus NuGet Package Repository {#MigratingdatafromOctopus2.6to3.x-PackageRepositoryMigratingthebuilt-inOctopusNuGetpackagerepository}

If you use the built-in [Octopus NuGet repository](/docs/packaging-applications/package-repositories/index.md) you will need to move the files from your 2.6 server to your 2018.10 LTS server. The package files are not included as part of the backup.
In a standard **Octopus 2.6** install the files can be found under `C:\Octopus\OctopusServer\Repository\Packages`
You will need to transfer them to the new server to `C:\Octopus\Packages` Once the files have been copied, you will need to restart the Octopus Server service to re-index the files - The index runs in the background, so if you have a lot of packages it could take a while (5-20 mins) to show in the UI or be usable for deployments.

### Migrating Historical Data {#MigratingdatafromOctopus2.6to3.x-MaxAgeMigratinghistoricaldata}

By default we migrate everything from your backup including all historical data. Learn about [minimizing migration time](minimize-migration-time.md).