---
title: High Availability
description: Octopus High Availability (HA) enables you to run multiple Octopus Servers, distributing load and tasks between them.
position: 10
---

Octopus: High Availability (HA) enables you to run multiple Octopus Servers, distributing load and tasks between them. We designed it for enterprises that need to deploy around the clock and rely on the Octopus Server being available.

![](images/3278420.png)

An Octopus: HA configuration requires four main components:

- **A load balancer**
  This will direct user traffic bound for the Octopus web interface between the different Octopus Server nodes.
- **Octopus Server nodes**
  These run the Octopus Server windows service. They serve user traffic and orchestrate deployments.
- **A database**
  Most data used by the Octopus Server nodes is stored in this database.
- **Shared storage**
  Some larger files - like [NuGet packages](/docs/packaging-applications/package-repositories/index.md), artifacts, and deployment task logs - aren't suitable to be stored in the database, and so must be stored in a shared folder available to all nodes.

## Setting up Octopus: High Availability {#HighAvailability-SettingupOctopus:HighAvailability}

This section will walk you through the different options and considerations for setting up Octopus: HA. For the sake of simplicity, the guide assumes that all of the servers are on-premises and are part of an Active Directory domain, as this is the most common configuration. Octopus: HA can work without the servers being part of an AD domain, but you'll need to vary the instructions accordingly.

Learn more: [Configuring Octopus for High Availability](/docs/administration/high-availability/configuring-octopus-for-high-availability.md)

## Control and Manage nodes {#HighAvailability-Controllingandmanagingnodes}

One great benefit of Octopus: HA is the ability to update and restart one or more nodes, while still allowing the rest of the Octopus Deploy cluster to keep serving requests and performing deployments.

Learn more: [Managing High Availability nodes](/docs/administration/high-availability/managing-high-availability-nodes.md).
