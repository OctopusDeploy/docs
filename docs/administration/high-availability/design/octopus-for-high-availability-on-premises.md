---
title: Designing Octopus HA on-Premises
description: Information on configuring Octopus High Availability including database and shared storage set up.
position: 10
---

This section will walk through the different options and considerations for setting up Octopus High Availability. This document will deal with the high-level concepts of Octopus High-Availability for an on-Premises install of Octopus Deploy.

:::warning
If you are setting Octopus up in a private cloud please see the following guides:

- [Azure](/docs/administration/high-availability/design/octopus-for-high-availability-on-azure.md)
- [AWS](/docs/administration/high-availability/design/octopus-for-high-availability-on-aws.md)
:::

## Setting up Octopus: High availability

This section will walk you through the different options and considerations for setting up Octopus: HA. For the sake of simplicity, the guide assumes that all of the servers are on-premises and are part of an Active Directory domain, as this is the most common configuration. Octopus: HA can work without the servers being part of an AD domain, but you'll need to vary the instructions accordingly.

:::hint
**Some assembly required**
While a single server Octopus installation is easy, Octopus: High Availability is designed for mission critical enterprise scenarios, and depends heavily on infrastructure and Windows components. At a minimum:

- You should be familiar with SQL Server failover clustering, or have DBAs available to create and manage the database
- You should be familiar with SANs or other approaches to sharing storage between servers
- You should be familiar with load balancing for applications
  :::

### Database

Each Octopus Server node stores project, environment and deployment-related data in a shared Microsoft SQL Server Database. Since this database is shared, it's important that the database server is also highly available.

From the Octopus perspective, how the database is made highly available is really up to you; to Octopus, it's just a connection string. We are not experts on SQL Server high availability, so if you have an on-site DBA team, we recommend using them. There are many [options for high availability with SQL Server](https://msdn.microsoft.com/en-us/library/ms190202.aspx), and [Brent Ozar also has a fantastic set of resources on SQL Server Failover Clustering](http://www.brentozar.com/sql/sql-server-failover-cluster/) if you are looking for an introduction and practical guide to setting it up.

Octopus: HA works with:

- [SQL Server Failover Clusters](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server)
- [SQL Server AlwaysOn Availability Groups](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server)

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

The simplest way to provide shared storage, assuming the Octopus Server nodes are part of the same Active Directory domain, is by creating a file share that each of the Octopus Server nodes can access. Of course, this assumes that the underlying directory is reliable, such as in a RAID array.

A better alternative is [Microsoft DFS](https://en.wikipedia.org/wiki/Distributed_File_System_(Microsoft)), or a SAN.

### Load balancer

When you configured the first Octopus Server node, as well as each of the subsequent nodes, you would have configured the HTTP endpoint that the Octopus web interface is available on. The final step is to configure a load balancer, so that user traffic is directed between each of the Octopus Server nodes.

Octopus can work with any load balancer technology, including hardware and software load balancers.

If you don't have a hardware load balancer available, an easy option is the [Application Request Routing module for IIS](http://www.iis.net/downloads/microsoft/application-request-routing). You can also use Apache or NGINX as a reverse load-balancing proxy.

![](images/create-server-farm.png "width=500")
