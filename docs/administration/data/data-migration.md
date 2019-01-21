---
title: Data Migration
description: Octopus comes with a data migrator which can help in certain scenarios like moving projects from one Octopus Server to another, and exporting your configuration for auditing in a source control repository.
position: 900
---

Octopus comes with a data migrator which can help in certain scenarios like moving projects from one Octopus Server to another, and exporting your configuration for auditing in a source control repository.

!toc

## Suitable scenarios

- Copying projects and their dependencies from one Octopus Server to another as a one-time operation, or periodically in a single direction where there is a single source of truth.
  - This can be useful when you have [isolated Octopus Servers](/docs/deployment-patterns/isolated-octopus-deploy-servers.md)
- Splitting a single Octopus Server across multiple separate Octopus Servers by moving projects and their dependencies around.
- Consolidating multiple Octopus Servers into a single Octopus Server by moving projects and their dependencies around.
- Advanced auditing of your Octopus configuration using source control.

:::hint
In all scenarios, both the source and target Octopus Servers must be running the same version.
:::

## Unsuitable scenarios

The data migration tools are not suitable for every imaginable scenario. In these cases there are better tools for the job:

1. To migrate data from older versions of Octopus see [upgrading old versions of Octopus](/docs/administration/upgrading/legacy/index.md).
1. For general disaster recovery learn about [backup and restore for your Octopus Server](/docs/administration/data/backup-and-restore.md).
1. To move your Octopus database to another database server see [moving your database](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-database.md).
1. To move your Octopus Server and database to another server see [moving your Octopus Server and database](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-database-and-server.md).
1. To move your entire Octopus Server from a self-hosted installation to Octopus Cloud, contact our [support team](https://octopus.com/support) for help.

## Tips

1. Data migration is an advanced topic and you should take time to understand the tools, what they can do, and what they are not suitable for.
1. You cannot migrate data between different versions of Octopus Server - they must be exactly the same version to ensure the integrity of the data.
1. The data migration tools are optimized for one-time operations, or for flowing data in a single direction where there is a single source of truth.
1. The data migration tools generally overwrite data in the target server without merging.
1. Data is matched by **name** instead of ID.
1. There are no built in conflict resolution tools.
1. You can commit the exported files to source control and track changes over time.
1. Treat data migration as an **offline** operation. You want to avoid exporting changing data, or importing over the top of changing data.
1. Perform a backup before importing data.
1. All changes from importing data are batched into a single SQL transaction. The entire import will succeed or roll back as a batch.

## The Basics

### Exporting {#Datamigration-ExportingExporting}

:::hint
It's a good idea to make sure your Octopus Server isn't changing data while exporting. Learn about making your Octopus Server read-only using [maintenance mode](/docs/administration/managing-infrastructure/maintenance-mode.md).
:::

You can export data using the Export Wizard built into the Octopus Server Manager, or using the command-line interface `Octopus.Migrator.exe`. You can export your entire Octopus Server configuration, or certain projects and their dependencies. The wizard is a good way to get started, but the full feature set is only available using the command-line interface.

![](/docs/images/3048141/3278071.png "width=500")

We have tried to make the exported file structure predictable and easy to navigate.

![](/docs/images/3048141/3278073.png "width=500")

### Importing {#Datamigration-ImportingImporting}

:::hint
It's a good idea to [perform a backup](/docs/administration/data/backup-and-restore.md) before attempting an import.
:::

You can import data using the Import Wizard built into the Octopus Server Manager, or using the command-line interface `Octopus.Migrator.exe import`. Similarly to exporting data, the wizard is a good way to get started, but the full feature set is only available using the command-line interface.

![](/docs/images/3048141/3278070.png "width=500")

You'll get a chance to preview the changes first, and you can tell the tool to either:

- Overwrite documents if they already exist in the destination (e.g., if a project with the same name already exists, overwrite it).
- Skip documents if they already exist in the destination (e.g., if a project with the same name already exists, do nothing).

Learn about [how conflicts are handled](#Datamigration-Mergegranularity).

All changes are batched into a single SQL transaction; if any problems are discovered during the import, the transaction will be rolled back and nothing will be imported.

## FAQ

### What is exported? {#what-is-exported}

You can choose whether to export your entire Octopus Server configuration using the `Octopus.Migrator.exe export` command. Alternatively you can export a set of projects and their dependencies using the `Octopus.Migrator.exe partial-export` command. The best way to see what is exported is to try it out and look at the resulting files.

### How do you handle sensitive values?

Sensitive values are always encrypted at rest.

When you export data you will be asked to provide a password, and your secrets will be decrypted using the source server's master key, then re-encrypted into the exported files using the password you provided as the key.

Now when you import data you will be asked to provide the same password so your secrets can be decrypted from the files and imported into the target server to be re-encypted using its master key.

### Can I track my Octopus configuration using source control?

Yes, though it is an advanced scenario you will need to take care of yourself. We are looking into other methods for defining your deployment processes as code.

In the meantime this process can be used for advanced auditing of your Octopus configuration:

1. Export your data to a known location.
1. Commit those files to source control.
1. Set up a scheduled task to do the same thing periodically making sure to use the same encryption password each time.

We've tried to make the JSON as friendly and predictable as possible so that if you commit multiple exports, the only differences that will appear are actual changes that have been made, and comparing the changes will be obvious.

### How do you match existing data?

The import process matches on **names** instead of IDs. If an exported project has the same name as a project in the target server, they are considered as the same project.

### How are conflicts handled? {#Datamigration-Mergegranularity}

In general, the data being imported is treated as the source of truth, and will wholly overwrite any matching documents.

For example, when importing a project which already exists in the destination server, all deployment steps that belong to the project in the destination server are overwritten, including any new deployment steps that may have been added.

![](/docs/images/3048141/3278323.png)

There is no out-of-the-box way to "merge" deployment steps, or other more granular changes when importing.

![](/docs/images/3048141/3278324.png)

There are certain cases where we can automatically merge data together, like variable sets where you have certain values which only make sense in the target server, or teams where certain users only make sense in the target server.

### Can I manually resolve conflicts?

There is no tooling to help you resolve conflicts in a more granular way. The data migration tooling is optimized for data flowing in a single direction where there is one source of truth.

### Why do the exported files contain ID's?

We use the ID's so we can map references between documents into the correct references for the target server. We actually use the names to determine if something already exists. This means you can export from multiple Octopus Servers, combine them together, and then import to a single Octopus Server.

### Is there a command-line interface? {#Datamigration-Commandline}

Yes! Most of the features are only available via command-line so it is the most common way to perform data migration. Use `Octopus.Migrator.exe help` to see the full list of commands available. To see an example of the command syntax, you can use the Wizard in the Octopus Server Manager and click the **Show script** link.

![](/docs/images/3048141/3278069.png "width=500")
