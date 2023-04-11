---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Configuring Microsoft DFS with Octopus Server
description: Guidelines and recommendations for configuring Microsoft DFS as the shared file system for Octopus Deploy.
navOrder: 120
hideInThisSection: true
---

Microsoft DFS is a [distributed file system](https://en.wikipedia.org/wiki/Clustered_file_system#Distributed_file_systems), which is important to consider when configuring Octopus Deploy with a DFS file share. Octopus Server makes specific assumptions about the performance and consistency of the file system when accessing log files, performing log retention, storing deployment packages and other deployment artifacts, and temporary storage when communicating with Tentacles.

:::warning
**DFS in the standard configuration (i.e., accessed through a DFS Namespace Root) is _not_ suitable for use as a shared file store with Octopus Deploy.**

Operating Octopus Deploy with the non-recommended DFS configuration will likely result in intermittent and potentially significant issues.
:::

Below are recommendations and more details on:

- [Configuring DFS with a Single Octopus Server](#Configuring-Octopus-with-a-Single-Octopus-Server)
- [Configuring DFS with a Multi-Node Octopus Server cluster (Octopus HA)](#Configuring-DFS-with-a-Multi-Node-Octopus-Server-cluster-(Octopus-HA))
- [DFS for Redundancy (Disaster Recover)](#DFS-for-Redundancy-(Disaster-Recover))

## Configuring DFS with a Single Octopus Server

For a single-node Octopus Server using DFS for file storage, the node must be **configured to use a specific DFS Replica and not the DFS Namespace Root**. Despite no contention between nodes in the single-node configuration, there is still the DFS location transparency, which will cause unpredictable behavior when the node is directed to a different replica.

In the diagram, the single node is configured to use the replica `\\SVR_ONE\public` as the DFS file share and not the namespace root (`\\Contoso\public`). 

![A single Octopus Deploy node with DFS shared storage](images/single-node-od-with-dfs.png "width=500")

## Configuring DFS with a Multi-Node Octopus Server cluster (Octopus HA)

For a multi-node Octopus cluster using DFS for file storage, it is imperative that **_all_ nodes in the cluster are configured to use the same DFS Replica and not the DFS Namespace Root**. Both using the namespace root or using different replicas for different Octopus nodes will cause unpredictable behavior.

In the diagram below each node in the cluster is configured to use the same replica (`\\SVR_ONE\public`) as the DFS file share and not the namespace root (`\\Contoso\public`). 

![A multi-node (HA) Octopus Cluster with DFS shared storage](images/multi-node-od-with-dfs.png "width=500")

## DFS for Redundancy (Disaster Recovery)

DFS can still be used for redundancy and disaster recovery, as usual.

If the replica that Octopus is configured to use becomes unavailable, simply changing the configuration to another replica in the DFS Namespace with the same target folders is sufficient to restore service.

Octopus does not need to be restarted in this scenario. Customers can either do this manually or can automate it.

In the simplified diagram below, when an outage at DFS Replica `\\SVR_ONE\Public` occurs, by re-configuring each Octopus node to use a different replica (ensuring all nodes are re-configured to the same replica), customers can still take advantage of the redundancy within DFS.

![Using DFS for redundancy with Octopus Deploy](images/dfs-for-redundancy.png "width=500")
