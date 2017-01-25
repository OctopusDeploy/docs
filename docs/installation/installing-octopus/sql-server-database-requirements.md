---
title: SQL Server Database Requirements
position: 0
---

Octopus Deploy stores projects, environments, and deployment history and logs in a Microsoft SQL Server database.

## Supported versions and editions {#SQLServerDatabaseRequirements-Supportedversionsandeditions}

Octopus works with most recent versions and editions of SQL Server, from a local SQL Server Express instance, all the way to an Enterprise Edition cluster. Azure SQL databases are also supported. The following requirements apply to the SQL Server database used by Octopus:

- Supported versions: 
  - SQL Server 2008
  - SQL Server 2008 R2
  - SQL Server 2012
  - SQL Server 2014
  - SQL Server 2016
- Supported editions: 
  - Express (free)
  - Web
  - Datacenter
  - Standard
  - Enterprise
- Microsoft Azure SQL Database
- AWS RDS SQL Database

You can point Octopus to an existing database on the local machine or any remote machine, or Octopus can create the database for you.

If you create the database, it must:

- The user installing Octopus (if using Windows authentication) or the user specified in the connection string must be a **db\_owner**
- The account that the Octopus Deploy windows server process runs under (by default, the Local System account) must also have access to the database as a **db\_owner**.
- The default schema must be **dbo**
- The database must not be shared with any other application
- Use a case-insensitive collation (a collation with a name containing "\_CI\_").

:::hint
**Changing the database collation**
See [here](/docs/administration/octopus-database/changing-the-collation-of-the-octopus-database.md) for information about changing the database collation after the initial Octopus installation.
:::

If you don't yet have a database created specifically for Octopus' use, then you can allow the Setup Wizard to create one for you. While setting up your Octopus Server instance, select the correct server on the Database step and enter the name that you would like to call this database. Remember it must not be the name of a database that already exists on the selected SQL Server or the setup process will install into that pre-existing one. When you click the `Next` button, the installer will check for the existence of the database and if it needs to be created, provide a confirmation dialog. It will then be created with the appropriate permissions and configuration as defined above.

![](/docs/images/3048120/3278498.png "width=500")

The Octopus setup wizard will perform most of these activities for you if you accept the prompts.

## Using SQL Server Express {#SQLServerDatabaseRequirements-UsingSQLServerExpress}

[Download SQL Server Express](http://downloadsqlserverexpress.com/)

## Suggested Indexes and Azure SQL Auto Index Creation {#SQLServerDatabaseRequirements-SuggestedIndexesandAzureSQLAutoIndexCreation}

Each installation of Octopus Deploy will likely have different data loads and usage patterns and as a result your DBMS may suggest performance optimizations such as creating new indexes in addition to those created automatically by the Octopus Deploy installation process. While we don't actively discourage users from adding these indexes its important to understand the results of modifying the schema.

Certain assumptions are made about the database schema when an Octopus Deploy Server upgrade is performed, and the presence (or absence) of indexes may cause this process to fail. The System Integrity checks now available via *Configuration > Diagnostics > Server Logs* will let you know if there are any deviations from the expected database schema.

![](/docs/images/3048120/5865723.png "width=500")

To ensure that you are aware of which Indexes exist so that you can drop/recreate them between upgrades, we also suggest disabling the Azure SQL feature to [Automatically apply performance recommendations](https://azure.microsoft.com/en-us/documentation/articles/sql-database-advisor-portal/#enable-automatic-index-management).

If you feel that indexes are needed to improve the performance of you installation, the chances are that it could probably benefit other users too, so we recommend getting in touch with us via [support](https://octopus.com/support) and letting us know what your database is telling you so that we can consider making it part of the standard install.
