---
title: Configuring HA
description: Step-by-step guided setup for Octopus High-availability
position: 50
---

### Octopus server nodes

With the shared storage and database provisioned, you can now set up each of the Octopus Server nodes. An Octopus: HA configuration requires at least two nodes, and has been tested with up to four nodes.

:::hint
**Not a Windows cluster**
While multiple Octopus Server nodes form a logical "cluster" of servers, Octopus nodes do not require Windows Server Failover Clustering. They should be standalone servers.
:::

#### Configure the first node

On the first Octopus Server node, [download the Octopus Server MSI](https://octopus.com/downloads), and walk through the setup wizard. Use the Getting Started wizard to configure the first Octopus node:

![](images/get-started.png "width=500")

The Octopus home directory is local to each specific node, and *should not be shared* between nodes. This is usually at `C:\Octopus`.

![](images/wizard-home.png "width=500")

Since each node will use shared storage, ensure you use a custom service account that has permission to access the shared database:

![](images/wizard-service-account.png "width=500")

Configure the shared SQL database:

![](images/wizard-database.png "width=500")

Follow the rest of the setup guide, and install the first node.

![](images/wizard-installation.png "width=500")

Once the Octopus Server has been configured, from Octopus Manager, copy the Master Key - you will need this to set up the additional nodes.

![](images/master-key.png "width=500")

Finally, you need to tell Octopus to store artifacts, task logs and packages in the shared storage that you provisioned, that way each Octopus node can see the same files. To do this, you'll need to use the command line:

**Configure shared storage**

There are two options for configuring shared storage: setting the root shared storage directory, or setting each directory individually.

:::warning 
The first option was added in 2020.2.15. If using an earlier version then you will need to use the second option and set each folder path individually.
:::

Set the root shared storage directory when all of the shared directories will reside under the same root. Each shared directory will reside in a sub-directory under the directory that you specify:

```powershell
Octopus.Server.exe path --clusterShared \\OctoShared\OctopusData
```

Setting the root shared storage directory is the recommend approach because any future shared paths will automatically appear in this directory without being explicity configured. The other option is to set each directory individually:

```powershell
Octopus.Server.exe path --artifacts \\Octoshared\OctopusData\Artifacts
Octopus.Server.exe path --taskLogs \\Octoshared\OctopusData\TaskLogs
Octopus.Server.exe path --nugetRepository \\Octoshared\OctopusData\Packages
Octopus.Server.exe path --telemetry \\Octoshared\OctopusData\Telemetry
```

(Note that all paths are not required to be in the same file share(s))

No matter which option you choose, the configuration is stored in the database, so you only have to perform this once - other nodes will read it from the database.

#### Configure the second and additional nodes {#ConfiguringOctopusforHighAvailability-Configuringthesecondandadditionalnodes}

Once the first node has been created and started, you can add the additional nodes. Again, install the Octopus Server MSI, but instead of using the Getting Started wizard, use the link to add this server as a node for the cluster:

![](images/add-to-ha-cluster.png "width=500")

Connect to the same shared SQL database:

![](images/wizard-same-database.png "width=500")

On the Cluster details page, enter the Master Key from the original node:

![](images/wizard-cluster-details.png "width=500")

Complete the setup wizard. You'll now have a second node in the cluster!