---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Designing Octopus HA On-Premises
description: Information on configuring Octopus High Availability including database and shared storage set up for on-premises servers.
navOrder: 10
---

This section walks through the different options and considerations for the components required when setting up Octopus High Availability for an on-premises install of Octopus Deploy.

## Setting up Octopus: High Availability

The guide assumes that all of the servers are on-premises and are part of an Active Directory domain, as this is the most common configuration. Octopus High Availability can work without the servers being part of an AD domain, but you'll need to vary the instructions accordingly.

**Some assembly required**

While a single server Octopus installation is easy, Octopus High Availability is designed for mission critical enterprise scenarios and depends heavily on infrastructure and Microsoft components. At a minimum:

- You should be familiar with SQL Server failover clustering, or have DBAs available to create and manage the database.
- You should be familiar with SANs or other approaches to sharing storage between servers.
- You should be familiar with load balancing for applications.

### Compute

When running Octopus Deploy Windows Server, the underlying OS  can be installed on a bare-metal machine or on a virtual machine (VM) hosted by any popular type-1 hypervisor.  Type-2 hypervisors can work for demos and POCs, but because they are typically installed on desktop operating systems, aren't recommended.

!include <high-availability-compute-recommendations>

!include <octopus-instance-mixed-os-warning>

### Database

Each Octopus Server node stores project, environment and deployment-related data in a shared Microsoft SQL Server Database. Since this database is shared, it's important that the database server is also highly available.

!include <high-availability-database-recommendations>

!include <high-availability-db-logshipping-mirroring-note>

Since each of the Octopus Server nodes will need access to the database, we recommend creating a special user account in Active Directory with **db\_owner** permission on the Octopus database and using that account as the service account when configuring Octopus.

### Shared storage

!include <high-availability-shared-storage-overview>

The simplest way to provide shared storage, assuming the Octopus Server nodes are part of the same Active Directory domain, is by creating a file share that each of the Octopus Server nodes can access. Of course, this assumes that the underlying directory is reliable, such as in a RAID array.

An alternative is [Microsoft DFS](https://en.wikipedia.org/wiki/Distributed_File_System_(Microsoft)). If using Microsoft DFS for the shared storage, it must be [configured specifically for use with Octopus Deploy](/docs/getting-started/best-practices/configuring-microsoft-dfs-with-octopus-server).


### Load balancer

When you configured the first Octopus Server node, as well as each of the subsequent nodes, you configured the HTTP endpoint that the Octopus web interface is available on. The final step is to configure a load balancer so that user traffic is directed between each of the Octopus Server nodes.

Octopus can work with any load balancer technology, including hardware and software load balancers.

!include <load-balancer-endpoint-info>

#### Software load balancers

If you don't have a hardware load balancer available, an easy option is the [Application Request Routing module for IIS](http://www.iis.net/downloads/microsoft/application-request-routing). You can also use Apache or NGINX as a reverse load-balancing proxy. 

![](/docs/administration/high-availability/design/images/create-server-farm.png "width=500")

For more information on setting up a reverse proxy with Octopus Deploy we have the following guides:
- [Using NGINX as a reverse proxy with Octopus](/docs/security/exposing-octopus/use-nginx-as-reverse-proxy)
- [Using IIS as a reverse proxy with Octopus](/docs/security/exposing-octopus/use-iis-as-reverse-proxy)

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