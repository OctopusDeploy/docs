---
title: Designing Octopus HA on AWS
description: Information on configuring Octopus High Availability for Microsoft Azure.
position: 30
---

This section will walk through all the components Octopus requires for a HA installtion and the reccomoned services in AWS that can be used to host the components.

An Octopus: HA configuration requires four main components:

- **A load balancer**
  This will direct user traffic bound for the Octopus web interface between the different Octopus Server nodes.
- **Octopus Server nodes**
  These run the Octopus Server windows service. They serve user traffic and orchestrate deployments.
- **A database**
  Most data used by the Octopus Server nodes is stored in this database.
- **Shared storage**
  Some larger files - like [NuGet packages](/docs/packaging-applications/package-repositories/index.md), artifacts, and deployment task logs - aren't suitable to be stored in the database, and so must be stored in a shared folder available to all nodes.

  

## Setting up AWS for Octopus: High Availability 

The next sections talks about all the services that you can use in AWS to support Octopus HA.

### Compute

To install Octopus nodes you will need at least to machines running Windows Server 2016 +. There’s only one choice when building virtual machines in AWS, and that’s [EC2 Instances](https://aws.amazon.com/ec2/instance-types/). There are a number of different instance types to choose from. When selecting the size of the instance, We generally find sticking with the General purpose size is the best option. Choosing the rights specs for the instance depends on how many nodes you plan to use.


### Database

Octopus uses MSSQL Database to store environments, projects, variables, releases, and deployment history.

If you don't have a SQL cluster in AWS then AWS provides a fully managed and highly available sql database as a service called [Amazon RDS for SQL Server](https://aws.amazon.com/rds/sqlserver/).

Choosing a SQL eddtion and size is dependent on your organisation and Octopus usage. The great thing about using AWS RDS is that you can start small and scales on demmand as your Octopus usage grows. You check out our SQL requirments and compatiablity [here](https://octopus.com/docs/installation/requirements#sql-server-database)

From the Octopus perspective, how the database is made highly available is really up to you; to Octopus, it's just a connection string. We are not experts on SQL Server high availability, so if you have an on-site DBA team, we recommend using them. There are many [options for high availability with SQL Server](https://msdn.microsoft.com/en-us/library/ms190202.aspx), and [Brent Ozar also has a fantastic set of resources on SQL Server Failover Clustering](http://www.brentozar.com/sql/sql-server-failover-cluster/) if you are looking for an introduction and practical guide to setting it up.


### Shared storage

You will need shared storage that all Octopus nodes can access as Octopus stores a number of files 1 that are not suitable for the database.

To build a highly available Octopus server install, you’re going to need some durable Windows file storage, and in the past, AWS didn’t offer any cloud services that accommodated this. Your first option would be to spin up some more EC2 instances and build your own DFS(Distributed File System) 1.

AWS recently introduced Amazon FSx, It’s a native Windows file system built on Windows Server. It includes full support for the SMB protocol, Windows NTFS, and Microsoft Active Directory (AD) integration and is an ideal choice for connecting to your EC2 instances hosting Octopus to house all your Octopus packages and log files.

If you choose to go with AWS FSx then taking a look at there starter guide 2 is a good place to start and will help you connect your Octopus Server nodes to the storage.


### Load Balancing in AWS

To distibute traffic to the Octopus web portal on multiple nodes then you will need to use a HTTP loadbalancer.AWS provides a solution to distribute HTTP/HTTPS traffic to EC2 instances, Elastic Load Balancing is a highly available, secure, and elastic load balancer. There are three implementations of ELB;

* Application load balancer
* Network Load Balancer
* Classic load balancer.

If you are not using [polling tentacles](https://octopus.com/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication#polling-tentacles) then we recommomd using the application load balancer however polling tentecales don't work so well and instead it's best to use the NetWork Load Balancer. To setup the network load balancer for Octopus HA and poolling tentacles take a look at this [knowleodge base article](https://help.octopus.com/t/how-can-i-configure-my-polling-tentacles-to-hit-my-octopus-deploy-high-availability-instance-to-sitting-behind-an-aws-load-balancer/24890). 