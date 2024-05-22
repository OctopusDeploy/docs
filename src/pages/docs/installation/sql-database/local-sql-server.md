---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-05-22
title: Local SQL Server
description: Guidelines and recommendations for configuring Octopus Deploy to use a local SQL Server.
navOrder: 10
hideInThisSection: true
---

import HighAvailabilityDatabaseLogShippingMirroringNote from 'src/shared-content/administration/high-availability-db-logshipping-mirroring-note.include.md';

Each Octopus Server node stores project, environment and deployment-related data in a Microsoft SQL Server Database. While it is possible to have Octopus Deploy connect to SQL Server Express running on the same host, it is not something we recommend.  If you plan to host the SQL Database on a local SQL Server, we recommend using a SQL Server that is managed by DBAs.

## Creating the database

The Octopus [installation](/docs/installation/) wizard can create the database for you (our recommended method), during the installation; however, you can also point Octopus to an existing database. Octopus works with both local and remote database servers, but it is worth considering the [performance implications](/docs/administration/managing-infrastructure/performance) before making a decision.

If you are using a hosted database service you will need to [create your own database](#create-your-own) and provide Octopus with the connection details.

## Create your own database \{#create-your-own}

If you don't want Octopus to automatically create the database for you as part of the installation process, please note the following:

1. The database must not be shared with any other application.
1. The default schema must be **dbo**.
1. The database must use a **case-insensitive collation** (a collation with a name containing "\_CI\_").
1. If you are using **Integrated Authentication** to connect to your database:
    - The user account installing Octopus must be a member of the **db\_owner** role for that database.
    - The account the Octopus Deploy windows server process runs under (by default, the `Local System` account) must be a member of the **db\_owner** role for that database.
1. If you are using **SQL Authentication** to connect to your database, the SQL user account defined in your connection string must be a member of the **db\_owner** role for that database.

## Changing the database collation

Learn more about [changing the database collation](/docs/administration/data/octopus-database/changing-the-collation-of-the-octopus-database) after the initial Octopus installation.

## Database administration and maintenance

For more information about maintaining your Octopus database, please read our [database administrators guide](/docs/administration/data/octopus-database).

## High Availability

The database is a critical component of Octopus Deploy.  If the database is lost or destroyed all your configuration will be lost with it.  We highly recommend leveraging a combination of backups and SQL Server's high availability functionality.  

How the database is made highly available is really up to you; to Octopus, it's just a connection string. We are not experts on SQL Server high availability, so if you have an on-site DBA team, we recommend using them. There are many [options for high availability with SQL Server](https://msdn.microsoft.com/en-us/library/ms190202.aspx), and [Brent Ozar also has a fantastic set of resources on SQL Server Failover Clustering](http://www.brentozar.com/sql/sql-server-failover-cluster/) if you are looking for an introduction and practical guide to setting it up.

Octopus High Availability works with:

- [SQL Server Failover Clusters](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server)
- [SQL Server AlwaysOn Availability Groups](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server)

Make sure the Octopus Server is connecting to the listener which will route database requests to the active SQL Server node and allow for automatic fail over. Learn about [connecting to listeners and handling fail over](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/listeners-client-connectivity-application-failover).

A typical connection string for using a SQL Server AlwaysOn availability group looks like this:

```
Server=tcp:AGListener,1433;Database=Octopus;IntegratedSecurity=SSPI;MultiSubnetFailover=True
```

<HighAvailabilityDatabaseLogShippingMirroringNote />

Since each of the Octopus Server nodes will need access to the database, we recommend creating a special user account in Active Directory with **db\_owner** permission on the Octopus database and using that account as the service account when configuring Octopus.

## Disaster Recovery

lorem ipsum