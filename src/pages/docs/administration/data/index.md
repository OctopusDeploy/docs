---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-07-15
title: Octopus database
navSection: Data
description: Octopus uses a Microsoft SQL Server Database to store environments, projects, variables, releases, and deployment history.
navOrder: 20
---

Octopus Deploy uses a Microsoft SQL Server database to store environments, projects, variables, releases, and deployment history. Some data is also [stored on the file system](/docs/administration/managing-infrastructure/server-configuration-and-file-storage).

## Install Octopus Server {#installing}

Octopus Server requires access to a SQL Server to store relational data. You can create the database ahead of time or let the installer create it for you. Refer to [SQL Server Database requirements](/docs/installation/sql-server-database) for more information on the SQL Server editions supported by Octopus Deploy and installation instructions.

## Routine maintenance {#maintenance}

You are responsible for the routine maintenance of your Octopus database. Performance problems with your SQL Server will make Octopus run and feel slow and sluggish. You should implement a routine maintenance plan for your Octopus database. Here is a [sure guide](https://oc.to/SQLServerMaintenanceGuide) (free e-book) for maintaining SQL Server. Our [Performance](/docs/administration/managing-infrastructure/performance/#sql-maintenance) section has some general recommendations that may help get you started.

### Database backups {#backups}

You are responsible for taking database backups and testing your disaster recovery plans. Refer to [Backup and restore](/docs/administration/data/backup-and-restore) for more information about backing up Octopus Deploy and recovering from failure.

### High availability databases {#high-availability}

If you are looking for a highly available database solution, we recommend using [Always On Availability Groups](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server?view=sql-server-2017).

Octopus Server does not support running against a SQL database with Database Mirroring or SQL Replication enabled.

## Schema {#schema}

Octopus should be given its own database, which must not be shared with any other applications. Octopus Server maintains its own schema and will create the initial database schema upon installation. It will update the schema when you upgrade Octopus Server.

The System Integrity Check at **Configuration ➜ Diagnostics** will let you know if the database schema has drifted from its intended state.

:::figure
![](/docs/administration/data/run-system-integrity-check.png)
:::

### Modifying the schema {#modifying-the-schema}

Customizing the Octopus database may cause problems when upgrading Octopus Server and make your installation difficult to support. There are certain scenarios where you can modify the schema safely (indexes, statistics), and other scenarios which will cause Octopus Server to fail (tables, views, stored procedures, functions).

### Index recommendations

Each installation of Octopus Deploy will have different data and usage patterns. Some of our customers have huge environments and a few projects, others have many projects deploying to small environments. Some customers may create hundreds of releases each day, while others deploy releases every few days. As a result, the Database Engine Tuning Advisor, or hosted offerings like Azure SQL Database, may suggest performance optimizations like creating additional indexes.

**Feel free to create database indexes that suit your scenario, but please understand the impact of modifying the schema.**

When you upgrade Octopus Server, we make certain assumptions about the database schema, and the presence (or absence) of indexes may cause your upgrade to fail. The upgrade process will warn you if it finds any custom indexes.

If you feel an index would benefit everyone using Octopus, please contact our [support team](https://octopus.com/support) so we can consider making it part of the standard database schema.

:::div{.hint}
**Azure SQL Database automatic index management**
To ensure that you are aware of which indexes exist, we suggest turning off the Azure SQL feature to [automatically apply performance recommendations](https://learn.microsoft.com/en-us/azure/azure-sql/database/database-advisor-implement-performance-recommendations?view=azuresql) and apply the recommendations manually instead.
:::
