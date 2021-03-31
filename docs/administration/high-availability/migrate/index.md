---
title: Migrating to Highly-Available Octopus
description: How to migrate from a stand alone Octopus server to High availability
position: 30
---

You may already have an existing Octopus Server, that you wish to make highly available. The process for doing this is the same as the process detailed in [Configuring High-Availability for Octopus Deploy](/docs/administration/high-availability/configure/index.md) , except your existing server will be the "first node" in the cluster.

1. Provision the shared storage folder.
2. Move the SQL Server Database, if necessary.
3. Use the `Octopus.Server.exe path` commands above to tell Octopus to use the shared storage folder.
4. Move the existing task logs, packages and artifacts from the existing Octopus Server node into the shared storage folders.
5. Add the additional nodes and load balancer as required.
