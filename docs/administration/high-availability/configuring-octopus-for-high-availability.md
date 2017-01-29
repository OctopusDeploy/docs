---
title: Configuring Octopus for High Availability
---

This section will walk through the different options and considerations for setting up Octopus: HA.

- Setting up Octopus: High Availability
- Database
- Shared Storage
- Octopus Server nodes
- Configuring the first node
  - Configuring the second and additional nodes
- Load Balancer
- Migrating a Single Server to a High Availability setup
- Configuring High Availability Polling Tentacles

## Setting up Octopus: High Availability {#ConfiguringOctopusforHighAvailability-SettingupOctopus:HighAvailability}

This section will walk you through the different options and considerations for setting up Octopus: HA. For the sake of simplicity, the guide assumes that all of the servers are on-premises and are part of an Active Directory domain, as this is the most common configuration. Octopus: HA can work without the servers being part of an AD domain, but you'll need to vary the instructions accordingly.

:::hint
**Some assembly required**
While a single server Octopus installation is easy, Octopus: High Availability is designed for mission critical enterprise scenarios, and depends heavily on infrastructure and Windows components. At a minimum:

- You should be familiar with SQL Server failover clustering, or have DBAs available to create and manage the database
- You should be familiar with SANs or other approaches to sharing storage between servers
- You should be familiar with load balancing for applications
  :::

### Database {#ConfiguringOctopusforHighAvailability-Database}

Each Octopus Server node stores project, environment and deployment-related data in a shared Microsoft SQL Server database. Since this database is shared, it's important that the database server is also highly available.

From the Octopus perspective, how the database is made highly available is really up to you; to Octopus, it's just a connection string. We are not experts on SQL Server high availability, so if you have an on-site DBA team, we recommend using them. There are many [options for high availability with SQL Server](https://msdn.microsoft.com/en-us/library/ms190202.aspx), and [Brent Ozar also has a fantastic set of resources on SQL Server Failover Clustering](http://www.brentozar.com/sql/sql-server-failover-cluster/) if you are looking for an introduction and practical guide to setting it up.

Octopus: HA works with:

- SQL Server Failover Clustering (recommended)
- SQL Server AlwaysOn Availability Groups

Octopus: HA has not been tested with Log Shipping or Database Mirroring, and does not support SQL Server replication.

See also: [SQL Server Database requirements](/docs/installation/installing-octopus/sql-server-database-requirements.md), which explains the editions and versions of SQL Server that Octopus supports, and explains the requirements for how the database must be configured.

Since each of the Octopus Server nodes will need access to the database, we recommend creating a special user account in Active Directory with **db\_owner** permission on the Octopus database, and using that account as the service account when configuring Octopus.

### Shared Storage {#ConfiguringOctopusforHighAvailability-SharedStorage}

Octopus stores a number of files that are not suitable to store in the database. These include:

- NuGet packages used by the [built-in NuGet repository inside Octopus](/docs/packaging-applications/package-repositories/index.md). These packages can often be very large.
- [Artifacts](/docs/deploying-applications/artifacts.md) collected during a deployment. Teams using Octopus sometimes use this feature to collect large log files and other files from machines during a deployment.
- Task logs, which are text files that store all of the log output from deployments and other tasks.

As with the database, from the Octopus perspective, you'll simply tell the Octopus servers where to store them as a file path - Octopus doesn't really care what technology you use to present the shared storage. Each of these three types of data can be stored in a different place.

The simplest way to provide shared storage, assuming the Octopus server nodes are part of the same Active Directory domain, is by creating a file share that each of the Octopus Server nodes can access. Of course, this assumes that the underlying directory is reliable, such as in a RAID array.

A better alternative is [Microsoft DFS](https://en.wikipedia.org/wiki/Distributed_File_System_(Microsoft)), or a SAN.

Whichever way you provide the shared storage, a few considerations to keep in mind:

- To Octopus, it needs to appear as a local drive (e.g., D:\...) or a file share (\\server\path)
- The service account that Octopus runs as needs full control over the directory

### Octopus Server nodes {#ConfiguringOctopusforHighAvailability-OctopusServernodes}

With the shared storage and database provisioned, you can now set up each of the Octopus server nodes. An Octopus: HA configuration requires at least two nodes, and has been tested with up to four nodes.

:::hint
**Not a Windows cluster**
While multiple Octopus Server nodes form a logical "cluster" of servers, Octopus nodes do not require Windows Server Failover Clustering. They should be standalone servers.
:::

#### Configuring the first node {#ConfiguringOctopusforHighAvailability-Configuringthefirstnode}

On the first Octopus Server node, [download the Octopus Server MSI](https://octopus.com/downloads), and walk through the setup wizard. Use the Getting Started wizard to configure the first Octopus node:

![](/docs/images/3048862/3278424.png "width=500")

The Octopus home directory is local to each specific node, and *should not be shared* between nodes. This is usually at `C:\Octopus`.

![](/docs/images/3048862/3278425.png "width=500")

Since each node will use shared storage, ensure you use a custom service account that has permission to access the shared database:

![](/docs/images/3048862/3278427.png "width=500")

Configure the shared SQL database:

![](/docs/images/3048862/3278428.png "width=500")

Follow the rest of the setup guide, and install the first node.

![](/docs/images/3048862/3278429.png "width=500")

Once the Octopus server has been configured, from Octopus Manager, copy the master key - you will need this to set up the additional nodes.

![](/docs/images/3048862/3278430.png "width=500")

Finally, you need to tell Octopus to store artifacts, task logs and packages in the shared storage that you provisioned, that way each Octopus node can see the same files. To do this, you'll need to use the command line:

**Configure shared storage**

```powershell
Octopus.Server.exe path --artifacts \\Octoshared\OctopusData\Artifacts
Octopus.Server.exe path --taskLogs \\Octoshared\OctopusData\TaskLogs
Octopus.Server.exe path --nugetRepository \\Octoshared\OctopusData\Packages
```

(Note that all three paths are not required to be in the same file share(s))

This configuration is stored in the database, so you only have to perform this once - other nodes will read it from the database.

#### Configuring the second and additional nodes {#ConfiguringOctopusforHighAvailability-Configuringthesecondandadditionalnodes}

Once the first node has been created and started, you can add the additional nodes. Again, install the Octopus Server MSI, but instead of using the Getting Started wizard, use the link to add this server as a node for the cluster:

![](/docs/images/3048862/3278431.png "width=500")

Connect to the same shared SQL database:

![](/docs/images/3048862/3278432.png "width=500")

On the Cluster details page, enter the master key from the original node:

![](/docs/images/3048862/3278433.png "width=500")

Complete the setup wizard. You'll now have a second node in the cluster!

### Load Balancer {#ConfiguringOctopusforHighAvailability-LoadBalancer}

When you configured the first Octopus server node, as well as each of the subsequent nodes, you would have configured the HTTP endpoint that the Octopus web interface is available on. The final step is to configure a load balancer, so that user traffic is directed between each of the Octopus server nodes.

Octopus can work with any load balancer technology, including hardware and software load balancers.

If you don't have a hardware load balancer available, an easy option is the [Application Request Routing module for IIS](http://www.iis.net/downloads/microsoft/application-request-routing). You can also use Apache or Nginx as a reverse load-balancing proxy.

![](/docs/images/3048862/3278434.png "width=500")

## Migrating a Single Server to a High Availability setup {#ConfiguringOctopusforHighAvailability-MigratingaSingleServertoaHighAvailabilitysetup}

You may already have an existing Octopus Deploy server, that you wish to make highly available. The process for doing this is the same as the process above, except your existing server will be the "first node" in the cluster.

1. Provision the shared storage folder
2. Move the SQL Server database, if necessary
3. Use the `Octopus.Server.exe path` commands above to tell Octopus to use the shared storage folder
4. Move the existing task logs, packages and artifacts from the existing Octopus server node into the shared storage folders
5. Add the additional nodes and load balancer as required

## Configuring High Availability Polling Tentacles {#ConfiguringOctopusforHighAvailability-ConfiguringHighAvailabilityPollingTentacles}

Listening Tentacles require no special configuration for High Availability.  Polling Tentacles, however, poll a server at regular intervals to check if there are any tasks waiting for the Tentacle to perform. In a High Availability scenario Polling Tentacles must poll all of the Octopus Servers in your configuration. You could poll a load balancer but there is a risk, depending on your load balancer configuration, that the Tentacle will not poll all servers in a timely manner.  You could also configure the Tentacle to poll each server by registering it with one of your Octopus Servers and then adding each Octopus Server to the Tentacle.config file (this is interpreted as a JSON array of servers):

**Tentacle.config**

```xml
<set key="Tentacle.Communication.TrustedOctopusServers">
[
  {"Thumbprint":"77751F90F9EEDCEE0C0CD84F7A3CC726AD123FA6","CommunicationStyle":2,"Address":"https://10.0.255.160:10943","Squid":null,"SubscriptionId":"poll://g3662re9njtelsyfhm7t/"},
  {"Thumbprint":"77751F90F9EEDCEE0C0CD84F7A3CC726AD123FA6","CommunicationStyle":2,"Address":"https://10.0.255.161:10943","Squid":null,"SubscriptionId":"poll://g3662re9njtelsyfhm7t/"},
  {"Thumbprint":"77751F90F9EEDCEE0C0CD84F7A3CC726AD123FA6","CommunicationStyle":2,"Address":"https://10.0.255.162:10943","Squid":null,"SubscriptionId":"poll://g3662re9njtelsyfhm7t/"}
]
</set>
```

Notice there is an address entry for each Octopus Server in the High Availability configuration.
