---
title: Data Migration
description: Octopus Manager comes with an import/export wizard to support moving data between Octopus instances.
position: 900
---

Octopus Manager comes with an Import/Export wizard which supports a number of scenarios:

- Exporting data from one server, and importing it into another server
- Splitting data from one Octopus Server into two or more
- Merging data from multiple Octopus Servers into one

*To migrate data from older versions of Octopus see [Upgrading from Octopus 2.6](/docs/administration/upgrading/upgrading-from-octopus-2.6/index.md)*

In all scenarios, both the source Octopus Server and the destination Octopus Server must be running the same version.

:::hint
The Import/Export wizards are designed for moving configuration data between Octopus Servers, or for creating snapshots which can be committed to source control or used for auditing purposes. It's not designed as a general disaster recovery or backup tool; for that, see the section on [backing up your Octopus Server](/docs/administration/backup-and-restore.md).
:::

## Exporting {#Datamigration-ExportingExporting}

The Export wizard can be accessed from Octopus Manager:

![](/docs/images/3048141/3278071.png "width=500")

The wizard exports most Octopus data as JSON files to a directory that you choose.

![](/docs/images/3048141/3278073.png "width=500")

With this export, you can:

- **Commit it to a Git repository or other source control tool**We've tried to make the JSON as friendly and predictable as possible so that if you commit multiple exports, the only differences that will appear are actual changes that have been made, and comparing the changes will be obvious.
- **Transfer it to a new Octopus Server**You can delete files you don't want to import (e.g., if you're transferring one project, just delete everything except the files for that project) and then import it using the Import wizard.

While the JSON files contain ID's, when importing, we actually use the names to determine if something already exists. This means you can export from multiple Octopus Servers, combine them together, and then import to a single Octopus Server.

If you use sensitive variables, these will be encrypted in the JSON using a password (note that sensitive variables are normally stored in SQL encrypted with your master key; the exporter will decrypt them, then encrypt them with this new password).

:::hint
The password you provide during the export is used to encrypt sensitive variables. If you use the same password each time, the exported files will be identical, and shouldn't cause differences to appear when comparing exported versions using diff tools.
:::

## Importing {#Datamigration-ImportingImporting}

The Import wizard can also be found in Octopus Manager:

![](/docs/images/3048141/3278070.png "width=500")

The importer tool can either take an exported directory and the password used to export it, or an [Octopus 2.6 backup file](/docs/administration/data-migration.md#Datamigration-ImportingImporting) (`.octobak`) and the Octopus master key. It will then import the data.

You'll get a chance to preview the changes first, and you can tell the tool to either:

- Overwrite documents if they already exist in the destination (e.g., if a project with the same name already exists, overwrite it)
- Skip documents if they already exist in the destination (e.g., if a project with the same name already exists, do nothing)

The importer wraps all data changes in a SQL transaction; if any problems are discovered during the import, the transaction will be rolled back and nothing will be imported.

:::hint
It's a good idea to [perform a backup](/docs/administration/backup-and-restore.md) before attempting an import.
:::

## Merge granularity {#Datamigration-Mergegranularity}

The Import and Export wizards operate with a high level of granularity. For example, when re-importing a project which already exists in the destination server, all deployment steps that belong to the project in the destination server are overwritten, including any new deployment steps that may have been added.

![](/docs/images/3048141/3278323.png)

There is no out-of-the-box way to "merge" deployment steps, or other more granular changes when importing.

![](/docs/images/3048141/3278324.png)

The only exceptions to this approach are teams and variable sets: for both of these we don't remove team members or variables during the import of the new team or variable set. We do this so that users aren't removed from groups when you import data from another server as that could result in a loss of privilege even for the user doing the import! For variables, we have customers who repeatedly push project changes to another Octopus Server in a more secure network and they needed to be able to keep certain sensitive variables within that secure area.

But, that's the full extent of what is handled by way of merging data from two servers. The Migrator tool does not make any attempt to handle conflicts, it's always "last one wins"; it has no UI for conflict resolution; and most matching is based solely on names without any understanding that "Project A" and "Project A" from two different servers might not be the same project.

If you want to achieve a more fine-grained merge of data from two servers you would need to export the data from both servers, then manually merge the exported JSON text files and then, finally, you can re-import the merged documents.

For these reasons, if you're incorporating the import/export tools as part of your pre-production to production workflow, we recommend you design your workflow around pushing changes in a single direction only.

## Command line {#Datamigration-Commandline}

Both the Import and Export tools can be called from the command line. To see the command syntax, use the **Show script** link in the wizard instead of performing the Import/Export.

![](/docs/images/3048141/3278069.png "width=500")
