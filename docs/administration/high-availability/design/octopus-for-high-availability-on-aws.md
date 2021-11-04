---
title: Designing Octopus HA in AWS
description: Information on configuring Octopus High Availability hosted in AWS.
position: 30
---

This section walks through the different options and considerations for the components required to set up Octopus High Availability in [AWS](https://aws.amazon.com/).

## Setting up AWS for Octopus: High Availability 

For the sake of simplicity, this guide assumes that all of the servers used for your Octopus High Availability instance are hosted in AWS and are running Windows Server.

**Some assembly required**
A single server Octopus installation is straightforward; Octopus High Availability is designed for mission-critical enterprise scenarios and depends heavily on infrastructure and Windows components. At a minimum:

- You should be familiar with SQL Server failover clustering, [AWS RDS](https://aws.amazon.com/rds/sqlserver/), or have DBAs available to create and manage the database.
- You should be familiar with SANs, [AWS FSx](https://aws.amazon.com/fsx/), or other approaches to sharing storage between servers.
- You should be familiar with load balancing for applications.

:::hint
**IaaS vs PaaS:**
If you are planning on using [IaaS](https://en.wikipedia.org/wiki/Infrastructure_as_a_service) exclusively in AWS and don't intend to use their PaaS offerings (such as AWS RDS), then the [On-Premises](/docs/administration/high-availability/design/octopus-for-high-availability-on-premises.md) guide might be a better approach for you as management of your virtual machines, Domain Controllers, SQL Database Servers, and load balancers will be your responsibility.
:::

### Compute

To install Octopus nodes you need at least two machines running Windows Server 2016+. There’s only one choice when building virtual machines in AWS, and that’s [EC2 Instances](https://aws.amazon.com/ec2/instance-types/). There are a number of different instance types to choose from. When selecting the size of the instance, we generally find sticking with the General purpose size is the best option.  
!include <high-availability-compute-recommendations>

!include <octopus-instance-mixed-os-warning>

### Database

Each Octopus Server node stores project, environment, and deployment-related data in a shared Microsoft SQL Server Database. Since this database is shared, it's important that the database server is also highly available. 

If you don't have a SQL cluster in AWS then AWS provides a fully managed and highly available SQL database as a service called [Amazon RDS for SQL Server](https://aws.amazon.com/rds/sqlserver/).

Choosing a SQL edition is an important decision, and will depend on your organization requirements and Octopus usage. 

:::hint
It's not possible to change the edition of a SQL Server RDS instance by modifying it without taking a snapshot and restoring that to a new instance. 
:::

For a highly available SQL Server in AWS RDS, we recommend SQL Server Standard or higher.

Once you've settled on an edition, the great thing about using AWS RDS is that you can start small and scale the size of your instance on demand as your Octopus usage grows. AWS provide a [list of the instance sizes](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SQLServer.html#SQLServer.Concepts.General.InstanceClasses) for each SQL Server edition and versions.

!include <high-availability-database-recommendations>
- [Amazon RDS for SQL Server](https://aws.amazon.com/rds/sqlserver/)

!include <high-availability-db-logshipping-mirroring-note>

### Shared storage

!include <high-availability-shared-storage-overview>

AWS recently introduced `Amazon FSx`, It’s a native Windows file system built on Windows Server. It includes full support for the SMB protocol, Windows NTFS, and Microsoft Active Directory (AD) integration. This makes it an ideal choice for connecting to your EC2 instances hosting Octopus to store all your Octopus packages and log files.

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