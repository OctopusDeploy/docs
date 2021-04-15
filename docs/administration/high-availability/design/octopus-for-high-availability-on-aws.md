---
title: Designing Octopus HA on AWS
description: Information on configuring Octopus High Availability hosted in AWS.
position: 30
---

This section will walk through the different options and considerations for the components required when setting up Octopus High Availability in [AWS](https://aws.amazon.com/).

:::hint
If you are setting up Octopus High Availability on Azure or on-premises please see the following guides:
- [Azure](/docs/administration/high-availability/design/octopus-for-high-availability-on-azure.md)
- [On-Premises](/docs/administration/high-availability/design/octopus-for-high-availability-on-premises.md)
:::

## Setting up AWS for Octopus: High Availability 

For the sake of simplicity, this guide assumes that all of the servers used for your Octopus High Availability instance are hosted in AWS.

:::warning
If you are choosing [IaaS](https://en.wikipedia.org/wiki/Infrastructure_as_a_service) on AWS then the [On-Premises](/docs/administration/high-availability/design/octopus-for-high-availability-on-premises.md) guide might be a better approach for you as you may have your Domain Controllers, SQL Database Server and load balancers in the cloud.
:::

### Compute

To install Octopus nodes you will need at least to machines running Windows Server 2016 +. There’s only one choice when building virtual machines in AWS, and that’s [EC2 Instances](https://aws.amazon.com/ec2/instance-types/). There are a number of different instance types to choose from. When selecting the size of the instance, We generally find sticking with the General purpose size is the best option. Choosing the rights specs for the instance depends on how many nodes you plan to use.

### Database

Each Octopus Server node stores project, environment and deployment-related data in a shared Microsoft SQL Server Database. Since this database is shared, it's important that the database server is also highly available. 

If you don't have a SQL cluster in AWS then AWS provides a fully managed and highly available sql database as a service called [Amazon RDS for SQL Server](https://aws.amazon.com/rds/sqlserver/).

Choosing a SQL edition and size is dependent on your organization and Octopus usage. The great thing about using AWS RDS is that you can start small and scale on demand as your Octopus usage grows. For further information see our [SQL Server Database](/docs/installation/sql-server-database.md) page, which explains the editions and versions of SQL Server that Octopus supports and explains the requirements for how the database must be configured.

From the Octopus perspective, how the database is made highly available is really up to you; to Octopus, it's just a connection string. We are not experts on SQL Server high availability, so if you have an on-site DBA team, we recommend using them. There are many [options for high availability with SQL Server](https://msdn.microsoft.com/en-us/library/ms190202.aspx), and [Brent Ozar also has a fantastic set of resources on SQL Server Failover Clustering](http://www.brentozar.com/sql/sql-server-failover-cluster/) if you are looking for an introduction and practical guide to setting it up.

### Shared storage

You will need shared storage that all Octopus nodes can access as Octopus stores a number of files 1 that are not suitable for the database.

To build a highly available Octopus server install, you’re going to need some durable Windows file storage, and in the past, AWS didn’t offer any cloud services that accommodated this. Your first option would be to spin up some more EC2 instances and build your own DFS(Distributed File System).

AWS recently introduced `Amazon FSx`, It’s a native Windows file system built on Windows Server. It includes full support for the SMB protocol, Windows NTFS, and Microsoft Active Directory (AD) integration and is an ideal choice for connecting to your EC2 instances hosting Octopus to house all your Octopus packages and log files.

If you choose to go with Amazon FSx then taking a look at [the starter guide](https://docs.aws.amazon.com/fsx/latest/WindowsGuide/getting-started.html) is a good place to start and will help you connect your Octopus Server nodes to the FSx storage.


### Load Balancing in AWS

To distibute traffic to the Octopus web portal on multiple nodes then you will need to use a HTTP loadbalancer. AWS provides a solution to distribute HTTP/HTTPS traffic to EC2 instances, Elastic Load Balancing is a highly available, secure, and elastic load balancer. There are three implementations of ELB;

* [Application Load Lalancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)
* [Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html)
* [Classic Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/introduction.html)

If you are using [Listening Tentacles](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#polling-tentacles) then we recommend using the Application Load Balancer.

However, [Polling Tentacles](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#listening-tentacles-recommended) don't work so well with the Application Load Balancer, so instead we recommend using the Network Load Balancer. To setup a Network Load Balancer for Octopus High Availability with Polling Tentacles take a look at this [knowledge base article](https://help.octopus.com/t/how-can-i-configure-my-polling-tentacles-to-hit-my-octopus-deploy-high-availability-instance-to-sitting-behind-an-aws-load-balancer/24890). 