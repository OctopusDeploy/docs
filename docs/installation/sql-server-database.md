---
title: SQL Server Database
description: Information about using SQL Server database with Octopus Deploy.
position: 2
---

Octopus Deploy stores projects, environments, and deployment history in a Microsoft SQL Server database.

!include <sql>

## Using SQL Server Express {#SQLServerDatabaseRequirements-UsingSQLServerExpress}

The easiest and cheapest way to get started is with [SQL Server Express](http://downloadsqlserverexpress.com/) and install the Octopus Deploy Server and SQL Server Express side-by-side on your server. This is a great way to test Octopus for a proof of concept. Depending on your needs, you might decide to use SQL Server Express, or upgrade to another supported edition.

## Creating the Database

The Octopus [installation](/docs/installation/index.md) wizard can create the database for you (our preferred method), during the installation; however, you can also point Octopus to an existing database. Octopus works with both local and remote database servers, but it is worth considering the [performance implications](/docs/administration/performance.md) before making a decision.

If you are using a hosted database service you will need to [create your own database](#create-your-own) and provide Octopus with the connection details.

## Create Your Own Database {#create-your-own}

If you don't want Octopus to automatically create the database for you as part of the installation process, please note the following:

1. The database must not be shared with any other application.
1. The default schema must be **dbo**.
1. The database must use a **case-insensitive collation** (a collation with a name containing "\_CI\_").
1. If you are using **Integrated Authentication** to connect to your database:
    - The user account installing Octopus must be a member of the **db\_owner** role for that database.
    - The account the Octopus Deploy windows server process runs under (by default, the `Local System` account) must be a member of the **db\_owner** role for that database.
1. If you are using **SQL Authentication** to connect to your database, the SQL user account defined in your connection string must be a member of the **db\_owner** role for that database.

## Changing the Database Collation

Learn more about [changing the database collation](/docs/administration/octopus-database/changing-the-collation-of-the-octopus-database.md) after the initial Octopus installation.

## Using SQL Server AlwaysOn

Octopus will work with [any of the supported highly available SQL Server implementations](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server).

Make sure the Octopus Server is connecting to the listener which will route database requests to the active SQL Server node and allow for automatic fail over. Learn about [connecting to listeners and handling fail over](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/listeners-client-connectivity-application-failover).

A typical connection string for using a SQL Server AlwaysOn availability group looks like this:

```plain
Server=tcp:AGListener,1433;Database=Octopus;IntegratedSecurity=SSPI;MultiSubnetFailover=True
```

## Database Administration and Maintenance

For more information about maintaining your Octopus database, please read our [database administrators guide](/docs/administration/octopus-database/index.md).
