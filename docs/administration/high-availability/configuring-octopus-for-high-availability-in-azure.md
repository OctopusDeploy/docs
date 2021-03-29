---
title: Configuring Octopus High Availability for Azure
description: Information on configuring Octopus High Availability for Microsoft Azure.
position: 20
---

This section will walk through the different options and considerations for setting up Highly-available Octopus in Microsoft Azure.

This document assumes you've read

## Setting up Octopus: High availability

### Database

Each Octopus Server node stores project, environment and deployment-related data in a shared Microsoft SQL Server Database. Since this database is shared, it's important that the database server is also highly available.

From the Octopus perspective, how the database is made highly available is really up to you; to Octopus, it's just a connection string. We are not experts on SQL Server high availability, so if you have an on-site DBA team, we recommend using them. There are many [options for high availability with SQL Server](https://msdn.microsoft.com/en-us/library/ms190202.aspx), and [Brent Ozar also has a fantastic set of resources on SQL Server Failover Clustering](http://www.brentozar.com/sql/sql-server-failover-cluster/) if you are looking for an introduction and practical guide to setting it up.

Octopus: HA works with:

- [SQL Server Failover Clusters](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server)
- [SQL Server AlwaysOn Availability Groups](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server)
- [Azure SQL Database](https://azure.microsoft.com/services/sql-database/)
- [Amazon Relational Database Services (RDS)](https://aws.amazon.com/rds/)

Octopus: HA has not been tested with Log Shipping or Database Mirroring, and does not support SQL Server replication. [More information](/docs/administration/data/octopus-database/index.md#highavailability)

See also: [SQL Server Database](/docs/installation/sql-server-database.md), which explains the editions and versions of SQL Server that Octopus supports, and explains the requirements for how the database must be configured.

Since each of the Octopus Server nodes will need access to the database, we recommend creating a special user account in Active Directory with **db\_owner** permission on the Octopus database, and using that account as the service account when configuring Octopus.

### Shared storage

Octopus stores a number of files that are not suitable to store in the database. These include:

- NuGet packages used by the [built-in NuGet repository inside Octopus](/docs/packaging-applications/package-repositories/index.md). These packages can often be very large.
- [Artifacts](docs/projects/deployment-process/artifacts.md) collected during a deployment. Teams using Octopus sometimes use this feature to collect large log files and other files from machines during a deployment.
- Task logs, which are text files that store all of the log output from deployments and other tasks.

As with the database, from the Octopus perspective, you'll simply tell the Octopus Servers where to store them as a file path within your operating system. Octopus doesn't really care what technology you use to present the shared storage, it could be a mapped network drive, or a UNC path to a file share. Each of these three types of data can be stored in a different place.

Whichever way you provide the shared storage, a few considerations to keep in mind:

- To Octopus, it needs to appear as a mapped network drive (e.g., `D:\`) or a UNC path to a file share (e.g., `\\server\path`)
- The service account that Octopus runs as needs **full control** over the directory
- Drives are mapped per-user, so you should map the drive using the same service account that Octopus is running under

If your Octopus Server is running in Microsoft Azure, you can use [Azure File Storage](https://docs.microsoft.com/en-us/azure/storage/files/storage-files-introduction) - it just presents a file share over SMB 3.0.

#### Shared storage in Microsoft Azure

Once you have [created your File Share](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share) you can [mount the drive](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-windows) for use by Octopus. Remember, drives are mounted per user. Make sure to map a persistent network drive for the user account the Octopus Server is running under.

### Octopus server nodes

### Load Balancing in Azure