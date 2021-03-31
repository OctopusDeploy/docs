---
title: High Availability
description: Octopus High Availability (HA) enables you to run multiple Octopus Servers, distributing load and tasks between them.
hideInThisSection: true
position: 10
---

Octopus: High Availability (HA) enables you to run multiple Octopus Servers, distributing load and tasks between them. We designed it for enterprises that need to deploy around the clock and rely on the Octopus Server being available.

![](images/3278420.png "width=500")

## Octopus High-Availability Components

An Octopus: HA configuration requires four main components:

- **A load balancer**
  This will direct user traffic bound for the Octopus web interface between the different Octopus Server nodes.
- **Octopus Server nodes**
  These run the Octopus Server windows service. They serve user traffic and orchestrate deployments.
- **A database**
  Most data used by the Octopus Server nodes is stored in this database.
- **Shared storage**
  Some larger files - like [NuGet packages](/docs/packaging-applications/package-repositories/index.md), artifacts, and deployment task logs - aren't suitable to be stored in the database, and so must be stored in a shared folder available to all nodes.

## Designing Highly-Available Octopus

This section will walk you through the different options and considerations for setting up Octopus and how you can incorporate each of the components and making them Highly-Available. There are several ways to configure High Availability for Octopus and these change based on where you are hosting them. We have created design guides that will help you select the best solution for you and Octopus Deploy.

- [Configuring Octopus for High Availability On-Premises](/docs/administration/high-availability/design/octopus-for-high-availability-on-premises.md)
- [Configuring Octopus for High Availability in Azure](/docs/administration/high-availability/design/octopus-for-high-availability-on-azure.md)
- [Configuring Octopus for High Availability in AWS](/docs/administration/high-availability/design/octopus-for-high-availability-on-aws.md)

## Configuring Octopus High Availability

When you have selected and provisioned the technologies and approach for Octopus High Availability you can use the guide to configure Octopus High Availability.

- [Configuring High Availability](/docs/administration/high-availability/configure/configuring-ha.md)

## Maintain nodes

One great benefit of Highly Available Octopus is the ability to update and restart one or more nodes, while still allowing the rest of the Octopus Deploy cluster to keep serving requests and performing deployments.

- [Maintaining High Availability nodes](/docs/administration/high-availability/maintain/maintain-high-availability-nodes.md)

## Migrating to High Availability

Most Organizations start with a stand-alone Octopus installation as part of a Proof of Concept. We make it straight-forward to take your existing Octopus installation and make it highly-available.

- [Migrating to High-Availability](/docs/administration/high-availability/migrate/migrating-to-high-availability.md)

## Load Balancing

When setting up your Load Balancer, we have some guides available for you to use.

- [Load Balancers](/docs/administration/high-availability/load-balancing/index.md)

## Troubleshooting

If you're running into issues with your Highly available Octopus Deploy install then please use our Troubleshooting pages.

- [Troubleshooting High Availability](/docs/administration/high-availability/troubleshoot/troubleshooting.md)
