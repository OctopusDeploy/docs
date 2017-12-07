---
title: SQL Server Database Requirements
description: Information on the Microsoft SQL Server database requirements required to support Octopus Deploy.
position: 0
---

Octopus Deploy stores projects, environments, and deployment history in a Microsoft SQL Server database.

!toc

## Supported Versions and Editions {#SQLServerDatabaseRequirements-Supportedversionsandeditions}

Octopus works with a wide range of versions and editions of SQL Server, from a local SQL Server Express instance, all the way to an Enterprise Edition [SQL Server Failover Cluster](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server) or [SQL Server AlwaysOn Availability Group](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server), or even one of the hosted database-as-a-service offerings. The following versions/editions are supported and tested for each release of Octopus Server:

- Supported versions:
    * SQL Server 2008
    * SQL Server 2008 R2
    * SQL Server 2012
    * SQL Server 2014
    * SQL Server 2016
- Supported editions:
    * Express (free)
    * Web
    * Datacenter
    * Standard
    * Enterprise
- Microsoft Azure SQL Database
- AWS RDS SQL Database

:::hint
We automatically test every release of Octopus Server against each of these databases.
:::

### Using SQL Server Express {#SQLServerDatabaseRequirements-UsingSQLServerExpress}

The easiest, and cheapest way to get started is [download SQL Server Express](http://downloadsqlserverexpress.com/) and install Octopus Server and SQL Server Express side-by-side on your machine/server. This is a great way to test Octopus for a proof of concept. Depending on your needs, you might decide to use SQL Server Express, or upgrade to another supported edition.

## Creating the Database

The Octopus installation wizard can create the database for you (our preferred method). Otherwise you can point Octopus to an existing database. Octopus works with both local and remote database servers, but it is worth considering the [performance implications](/docs/administration/performance.md) before making a decision.

:::hint
If you are using a hosted database service you will need to [create your own database](#create-your-own) and provide Octopus with the connection details.
:::

### Let the Octopus Setup Wizard Create the Database

1. Start the Octopus Server setup wizard
    - The user running the wizard must have the privileges on your SQL Server to create databases and grant permissions
1. On the database step, select the SQL Server where you want the database hosted
1. Enter the name that you would like to call this database
    - If you accidentally enter the name of an existing database, the setup process will install Octopus into that pre-existing database!
1. When you click the `Next` button the wizard will create the database with the appropriate configuration and permissions for Octopus Server to run successfully

![](/docs/images/3048120/3278498.png "width=500")

### Create Your Own Database {#create-your-own}

If you need to create the database yourself:

1. The database must not be shared with any other application.
1. The default schema must be **dbo**.
1. The database must use a **case-insensitive collation** (a collation with a name containing "\_CI\_").
1. If you are using **Integrated Authentication** to connect to your database:
    - The user account installing Octopus must be a member of the **db\_owner** role for that database.
    - The account the Octopus Deploy windows server process runs under (by default, the `Local System` account) must be a member of the **db\_owner** role for that database.
1. If you are using **SQL Authentication** to connect to your database:
    - The SQL user account defined in your connection string must be a member of the **db\_owner** role for that database.

:::hint
**Changing the Database Collation**
See [here](/docs/administration/octopus-database/changing-the-collation-of-the-octopus-database.md) for information about changing the database collation after the initial Octopus installation.
:::

## Using SQL Server AlwaysOn

Octopus will work with [any of the supported highly available SQL Server implementations](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server).

Make sure the Octopus Server is connecting to the listener which will route database requests to the active SQL Server node and allow for automatic fail over. Learn about [connecting to listeners and  handling fail over](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/listeners-client-connectivity-application-failover).

A typical connection string for using a SQL Server AlwaysOn availability group looks like this:

```plain
Server=tcp:AGListener,1433;Database=Octopus;IntegratedSecurity=SSPI;MultiSubnetFailover=True
```

## Database Administration and Maintenance

For more information about maintaining your Octopus database please read our [database administrators guide](/docs/administration/octopus-database/index.md).
