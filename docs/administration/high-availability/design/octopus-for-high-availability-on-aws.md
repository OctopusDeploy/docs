---
title: Designing Octopus HA on AWS
description: Information on configuring Octopus High Availability hosted in AWS.
position: 30
---

This section walks through the different options and considerations for the components required to set up Octopus High Availability in [AWS](https://aws.amazon.com/).

:::hint
If you are setting up Octopus High Availability on Azure or on-premises please see the following guides:
- [Azure](/docs/administration/high-availability/design/octopus-for-high-availability-on-azure.md)
- [On-Premises](/docs/administration/high-availability/design/octopus-for-high-availability-on-premises.md)
:::

## Setting up AWS for Octopus: High Availability 

For the sake of simplicity, this guide assumes that all of the servers used for your Octopus High Availability instance are hosted in AWS.

:::warning
If you are choosing [IaaS](https://en.wikipedia.org/wiki/Infrastructure_as_a_service) on AWS then the [On-Premises](/docs/administration/high-availability/design/octopus-for-high-availability-on-premises.md) guide might be a better approach for you as you may have your Domain Controllers, SQL Database Server, and load balancers in the cloud.
:::

### Compute

To install Octopus nodes you need at least two machines running Windows Server 2016+. There’s only one choice when building virtual machines in AWS, and that’s [EC2 Instances](https://aws.amazon.com/ec2/instance-types/). There are a number of different instance types to choose from. When selecting the size of the instance, we generally find sticking with the General purpose size is the best option.  We recommend starting with either 2 cores / 4 GB of RAM or 4 cores / 8 GB of RAM and limiting the task cap to 20 for each node.  In our experience, it is much better to have 4 smaller VMs, each with 4 cores / 8 GB of RAM than 2 large VMs, each with 8 cores / 16 GB of RAM.  With 2 servers, if one of them were to go down, you'd lose 50% of your capacity.  With 4 servers, if one of them were to go down, you'd lose 25% of your capacity.  The difference in cost between the 4 smaller VMs and 2 large VMs is minimal.

:::warning
Due to how Octopus stores the paths to various BLOB data (task logs, artifacts, packages, etc.), you cannot run both Windows, and Octopus Linux containers in the same Octopus Deploy instance.  It has to be either all Windows or all containers.
:::

### Database

Each Octopus Server node stores project, environment, and deployment-related data in a shared Microsoft SQL Server Database. Since this database is shared, it's important that the database server is also highly available. 

If you don't have a SQL cluster in AWS then AWS provides a fully managed and highly available SQL database as a service called [Amazon RDS for SQL Server](https://aws.amazon.com/rds/sqlserver/).

Choosing a SQL edition is an important decision, and will depend on your organization requirements and Octopus usage. 

:::hint
It's not possible to change the edition of a SQL Server RDS instance by modifying it without taking a snapshot and restoring that to a new instance. 
:::

For a highly available SQL Server in AWS RDS, we recommend SQL Server Standard or higher.

Once you've settled on an edition, the great thing about using AWS RDS is that you can start small and scale the size of your instance on demand as your Octopus usage grows. AWS provide a [list of the instance sizes](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SQLServer.html#SQLServer.Concepts.General.InstanceClasses) for each SQL Server edition and versions.

For further information see our [SQL Server Database](/docs/installation/sql-server-database.md) page, which explains the editions and versions of SQL Server that Octopus supports and explains the requirements for how the database must be configured.

From the Octopus perspective, how the database is made highly available is really up to you; to Octopus, it's just a connection string. We are not experts on SQL Server high availability, so if you have an on-site DBA team, we recommend using them. There are many [options for high availability with SQL Server](https://msdn.microsoft.com/en-us/library/ms190202.aspx), and [Brent Ozar also has a fantastic set of resources on SQL Server Failover Clustering](http://www.brentozar.com/sql/sql-server-failover-cluster/) if you are looking for an introduction and practical guide to setting it up.

### Shared storage

You will need shared storage that all Octopus nodes can access as Octopus stores a number of files that are not suitable for the database.

To build a highly available Octopus server install, you need some durable Windows file storage.

AWS recently introduced `Amazon FSx`, It’s a native Windows file system built on Windows Server. It includes full support for the SMB protocol, Windows NTFS, and Microsoft Active Directory (AD) integration, and is an ideal choice for connecting to your EC2 instances hosting Octopus to store all your Octopus packages and log files.

If you choose to go with Amazon FSx there are some resources that will help you get started:
- AWS have a [starter guide](https://docs.aws.amazon.com/fsx/latest/WindowsGuide/getting-started.html) which explains how to configure Amazon FSx and connect it up to an EC2 machine.
- AWS have a [hands-on lab](https://aws.amazon.com/blogs/storage/how-to-replicate-amazon-fsx-file-server-data-across-aws-regions/) on using DataSync to support multi-region FSx data across AWS regions. This could be useful when considering disaster recovery options for Octopus High Availability.
- We have an [AWS FSx High Availability blog post](https://octopus.com/blog/aws-fsx-ha) which is a step-by-step guide to connecting Amazon FSx to your Octopus High Availability Server nodes on Windows.

### Load Balancing in AWS

To distribute traffic to the Octopus web portal on multiple nodes, you need to use a HTTP load balancer. AWS provides a solution to distribute HTTP/HTTPS traffic to EC2 instances, Elastic Load Balancing is a highly available, secure, and elastic load balancer. There are three implementations of ELB;

* [Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)
* [Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html)
* [Classic Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/introduction.html)

If you are using [Listening Tentacles](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#listening-tentacles-recommended), we recommend using the Application Load Balancer.

However, [Polling Tentacles](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#polling-tentacles) don't work well with the Application Load Balancer, so instead, we recommend using the Network Load Balancer. To setup a Network Load Balancer for Octopus High Availability with Polling Tentacles take a look at this [knowledge base article](https://help.octopus.com/t/how-can-i-configure-my-polling-tentacles-to-hit-my-octopus-deploy-high-availability-instance-to-sitting-behind-an-aws-load-balancer/24890). 

!include <load-balancer-endpoint-info>

## Polling Tentacles with HA

!include <polling-tentacles-and-ha>

### Connecting Polling Tentacles

!include <polling-tentacles-and-ha-connecting>

#### Using a unique address

!include <polling-tentacles-connection-same-port>

#### Using a unique port

!include <polling-tentacles-connection-different-ports>

### Registering Polling Tentacles

!include <polling-tentacles-and-ha-registering>