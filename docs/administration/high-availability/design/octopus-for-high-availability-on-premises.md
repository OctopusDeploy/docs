---
title: Designing Octopus HA On-Premises
description: Information on configuring Octopus High Availability including database and shared storage set up for on-premises servers.
position: 10
---

This section walks through the different options and considerations for the components required when setting up Octopus High Availability for an on-premises install of Octopus Deploy.

## Setting up Octopus: High availability

For the sake of simplicity, the guide assumes that all of the servers are on-premises and are part of an Active Directory domain, as this is the most common configuration. Octopus High Availability can work without the servers being part of an AD domain, but you'll need to vary the instructions accordingly.

**Some assembly required**
While a single server Octopus installation is easy, Octopus High Availability is designed for mission critical enterprise scenarios and depends heavily on infrastructure and Windows components. At a minimum:

- You should be familiar with SQL Server failover clustering, or have DBAs available to create and manage the database.
- You should be familiar with SANs or other approaches to sharing storage between servers.
- You should be familiar with load balancing for applications.

### Compute

When running Octopus Deploy Windows Server, the underlying OS  can be installed on a bare-metal machine or on a virtual machine (VM) hosted by any popular type-1 hypervisor.  Type-2 hypervisors can work for demos and POCs, but because they are typically installed on desktop operating systems, aren't recommended.

!include <ha-compute-general-recommendations>

!include <octopus-instance-mixed-os-warning>

### Database

Each Octopus Server node stores project, environment and deployment-related data in a shared Microsoft SQL Server Database. Since this database is shared, it's important that the database server is also highly available.

!include <high-availability-database-recommendations>

!include <high-availability-db-logshipping-mirroring-note>

Since each of the Octopus Server nodes will need access to the database, we recommend creating a special user account in Active Directory with **db\_owner** permission on the Octopus database and using that account as the service account when configuring Octopus.

### Shared storage

Octopus stores a number of files that are not suitable to store in the database. These include:

- Packages used by the [built-in repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md). These packages can often be very large in size.
- [Artifacts](docs/projects/deployment-process/artifacts.md) collected during a deployment. Teams using Octopus sometimes use this feature to collect large log files and other files from machines during a deployment.
- Task logs, which are text files that store all of the log output from deployments and other tasks.

As with the database, from the Octopus perspective, you'll simply tell the Octopus Servers where to store them as a file path within your operating system. Octopus doesn't really care what technology you use to present the shared storage, it could be a mapped network drive, or a UNC path to a file share. Each of these three types of data can be stored in a different place.

Whichever way you provide the shared storage, there are a few considerations to keep in mind:

- To Octopus, it needs to appear as a mapped network drive (e.g., `D:\`) or a UNC path to a file share (e.g., `\\server\path`).
- The service account that Octopus runs as needs **full control** over the directory.
- Drives are mapped per-user, so you should map the drive using the same service account that Octopus is running under.

The simplest way to provide shared storage, assuming the Octopus Server nodes are part of the same Active Directory domain, is by creating a file share that each of the Octopus Server nodes can access. Of course, this assumes that the underlying directory is reliable, such as in a RAID array.

A better alternative is [Microsoft DFS](https://en.wikipedia.org/wiki/Distributed_File_System_(Microsoft)) or a SAN.

### Load balancer

When you configured the first Octopus Server node, as well as each of the subsequent nodes, you configured the HTTP endpoint that the Octopus web interface is available on. The final step is to configure a load balancer so that user traffic is directed between each of the Octopus Server nodes.

Octopus can work with any load balancer technology, including hardware and software load balancers.

!include <load-balancer-endpoint-info>

#### Software load balancers

If you don't have a hardware load balancer available, an easy option is the [Application Request Routing module for IIS](http://www.iis.net/downloads/microsoft/application-request-routing). You can also use Apache or NGINX as a reverse load-balancing proxy. 

![](images/create-server-farm.png "width=500")

For more information on setting up a reverse proxy with Octopus Deploy we have the following guides:
- [Using NGINX as a reverse proxy with Octopus](/docs/security/exposing-octopus/use-nginx-as-reverse-proxy.md)
- [Using IIS as a reverse proxy with Octopus](/docs/security/exposing-octopus/use-iis-as-reverse-proxy.md)

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