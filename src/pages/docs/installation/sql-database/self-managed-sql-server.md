---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-05-22
title: Self-Managed SQL Server
description: Guidelines and recommendations for configuring Octopus Deploy to use a self-managed SQL Server.
navOrder: 10
hideInThisSection: true
---

Each Octopus Server node stores project, environment and deployment-related data in a Microsoft SQL Server Database. While it is possible to have Octopus Deploy connect to SQL Server Express running on the same host, it is not something we recommend.  If you plan to host the SQL Database on a self-managed SQL Server, we recommend using a SQL Server that is managed by DBAs.

:::div{.hint}
This document applies to any self-managed SQL Server, regardless of where it is hosted, be it on physical machines in a self-managed data center or on virtual machines in a cloud provider.  
:::

## Creating the database

The Octopus [installation](/docs/installation/) wizard can create the database for you (our recommended method), during the installation; however, you can also point Octopus to an existing database. Octopus works with both local and remote database servers, but it is worth considering the [performance implications](/docs/administration/managing-infrastructure/performance) before making a decision.

If you are using a hosted database service you will need to [create your own database](#create-your-own) and provide Octopus with the connection details.

## Create your own database \{#create-your-own}

If you don't want Octopus to automatically create the database for you as part of the installation process, please note the following:

1. You must not share the database with any other application.
1. The default schema must be **dbo**.
1. The database must use a **case-insensitive collation** (a collation with a name containing "\_CI\_").
1. If you are using **Integrated Authentication** to connect to your database:
   - The user account installing Octopus must be a member of the **db\_owner** role for that database.
   - The account the Octopus Deploy windows server process runs under (by default, the `Local System` account) must be a member of the **db\_owner** role for that database.
2. If you are using **SQL Authentication** to connect to your database, the SQL user account defined in your connection string must be a member of the **db\_owner** role for that database.

## Changing the database collation

Learn more about [changing the database collation](/docs/administration/data/octopus-database/changing-the-collation-of-the-octopus-database) after the initial Octopus installation.

## Database administration and maintenance

For more information about maintaining your Octopus database, please read our [database administrators guide](/docs/administration/data/octopus-database).

## High Availability

The database is a critical component of Octopus Deploy.  If the database is lost or destroyed all your configuration will be lost with it.  We highly recommend leveraging a combination of backups and SQL Server's high availability functionality.  

How the database is made highly available is really up to you; to Octopus, it's just a connection string. We are not experts on SQL Server high availability, so if you have an on-site DBA team, we recommend using them. There are many [options for high availability with SQL Server](https://msdn.microsoft.com/en-us/library/ms190202.aspx), and [Brent Ozar also has a fantastic set of resources on SQL Server Failover Clustering](http://www.brentozar.com/sql/sql-server-failover-cluster/) if you are looking for an introduction and practical guide to setting it up.

Octopus High Availability works with:

- [SQL Server Failover Clusters](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server)
- [SQL Server Always-On Availability Groups](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server)

Make sure the Octopus Server is connecting to the listener which will route database requests to the active SQL Server node and allow for automatic failover. Learn about [connecting to listeners and handling failover](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/listeners-client-connectivity-application-failover).

A typical connection string for using a SQL Server AlwaysOn availability group looks like this:

```
Server=tcp:AGListener,1433;Database=Octopus;IntegratedSecurity=SSPI;MultiSubnetFailover=True
```

Since each of the Octopus Server nodes will need access to the database, we recommend creating a special user account in Active Directory with **db\_owner** permission on the Octopus database and using that account as the service account when configuring Octopus.

:::div{.warning}
Octopus High Availability does not support Database Mirroring. [More information](/docs/administration/data/octopus-database/#highavailability)
:::

## Disaster Recovery

With Octopus Deploy's [High Availability](/docs/administration/high-availability) functionality, you connect multiple nodes to the same database and file storage.  Octopus Server makes specific assumptions about the latency performance of the database.  If you combine that functionality with SQL Server Always-On Availability groups, it seems like a perfect use case for hot/hot.  However, due to latency concerns for both the database and file system, [we recommend leveraging a hot/cold configuration](https://octopus.com/whitepapers/best-practice-for-self-hosted-octopus-deploy-ha-dr) for the nodes.  

The database can be configured in either a hot/cold or hot/warm configuration.

### Hot/cold

For hot/cold, you are limited to a single option, [Database Backups](https://learn.microsoft.com/en-us/sql/relational-databases/backup-restore/backup-overview-sql-server).  After the backup is complete, copy it to the secondary data center.  

:::div{.warning}
When a disaster occurs, any data modified since the last backup will be lost.  If you doing a backup every 15 minutes, that means you can lose up to 15 minutes of work.
:::

When a disaster occurs, you create the Octopus Deploy database from the most recent backup.  Depending on the size of the database this can be accomplished as quickly as a few minutes.  However, you'll encounter challenges when you fail back to the primary data center, as you'll need to take a backup of the database in the secondary data center and overwrite what is in the primary data center.  Failure to do so will result in a [split-brain scenario](https://en.wikipedia.org/wiki/Split-brain_(computing)).

### Hot/warm

You have a couple of options for a hot/warm configuration with SQL Server.

- [Transaction Log Shipping](https://learn.microsoft.com/en-us/sql/database-engine/log-shipping/about-log-shipping-sql-server)
- Always On High Availability Node [configured for asynchronous-commit](https://learn.microsoft.com/en-us/sql/database-engine/availability-groups/windows/availability-modes-always-on-availability-groups?view=sql-server-ver16#AsyncCommitAvMode).

:::div{.warning}
When a disaster occurs, any data not synchronized will be lost.  Depending on the connection speed, this could be up to a couple of minutes.
:::

Fundamentally, both options are the same.  They asynchronously transfer database transactions to a secondary data center.  When a disaster occurs, you perform the necessary steps as detailed by Microsoft to make the secondary database the primary.  

There are pros and cons to either approach.  And there might be additional licensing costs or limits.  Our recommendation is to consult your DBA on which option they prefer.  

