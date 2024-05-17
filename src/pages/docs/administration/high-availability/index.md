---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-10-04
title: High Availability
description: Octopus High Availability (HA) enables you to run multiple Octopus Server nodes, distributing load and tasks between them.
hideInThisSection: true
navOrder: 10
---
import OctopusInstanceMixedOSWarning from 'src/shared-content/administration/octopus-instance-mixed-os-warning.include.md';

Octopus: High Availability (HA) enables you to run multiple Octopus Server nodes, distributing load and tasks between them. We designed it for enterprises that need to deploy around the clock and rely on the Octopus Server being available.

:::figure
![High availability diagram](/docs/administration/high-availability/images/high-availability.svg)
:::

An Octopus High Availability configuration requires four main components:

- **A load balancer**
  This will direct user traffic bound for the Octopus web interface between the different Octopus Server nodes.
- **Octopus Server nodes**
  These run the Octopus Server service. They serve user traffic and orchestrate deployments.
- **A database**
  Most data used by the Octopus Server nodes is stored in this database.
- **Shared storage**
  Some larger files - like [packages](/docs/packaging-applications/package-repositories), artifacts, and deployment task logs - aren't suitable to be stored in the database, and so must be stored in a shared folder available to all nodes.

## How High Availablity Works

High Availability (HA) distributes load between multiple nodes.  There are two kinds of load an Octopus Server node encounters:

1. Tasks (Deployments, runbook runs, health checks, package re-indexing, system integrity checks, etc.)
2. User Interface via the Web UI and REST API (Users, build server integrations, deployment target registrations, etc.)

Tasks are placed onto a first-in-first-out (FIFO) queue.  By default, each Octopus Deploy node is configured to process five (5) tasks concurrently, which [can be updated in the UI](/docs/support/increase-the-octopus-server-task-cap).  That is known as the task cap.  Once the task cap is reached, the remaining tasks in the queue will wait until one of the other tasks is finished.  

Each Octopus Server node has a separate task cap.  High Availability allows you to scale the task cap horizontally.  If you have two (2) Octopus Server nodes each with a task cap of 10, you can process 20 concurrent tasks.  Each node will pull items from the task queue and process them.  

Learn more about [how High Availability processes tasks in the queue](/docs/administration/high-availability/how-high-availability-works) section.

## High Availability Limits

Octopus Deploy's High Availability functionality provides many benefits, but it has limits.  

1. All Octopus Server nodes must run the same version of Octopus Deploy.  Upgrading to a newer version of Octopus Deploy will require an outage as you upgrade all nodes.
1. You cannot specify the node a deployment or runbook run to execute on.  Octopus Deploy uses a FIFO queue, nodes will pick up any pending tasks.
1. If a deployment or runbook run fails, it fails.  Octopus Deploy will not automatically attempt to re-run that failed deployment or runbook run on a different node.  In our experience, changing nodes rarely has been the solution to a failed deployment or runbook run.
1. All the Octopus Server nodes must connect to the same database.  
1. Octopus Server nodes have no concept of a "read-only" connection to a database.  All online nodes perform write operations to the database.  Even if it is not processing tasks.
1. Octopus Server nodes are sensitive to latency to SQL Server and the file storage.  The Octopus Server nodes, SQL Server, and file storage should all be located in the same data center or cloud region.  The latency between availability zones within the same cloud region is acceptable.  Latency between cloud regions or data centers is not.

Generally, these limits are encountered when our users attempt to use Octopus Deploy's High Availability functionality for disaster recovery in a hot/hot configuration.  A hot/hot configuration between two or more data centers or cloud regions is not supported nor recommended.  Please see our white paper on recommendations for [high availability and disaster recovery](https://octopus.com/whitepapers/best-practice-for-self-hosted-octopus-deploy-ha-dr).

## Licensing

Each Octopus Deploy SQL Server database is a unique **Instance**.  Nodes are the Octopus Server service that connects to the database.  High Availability occurs when two or more nodes connect to the same Octopus Deploy database.  An HA Cluster refers to all components, the load balancer, nodes, database, and shared storage.

For self-hosted customers, High Availability is available for the following license types:

- Professional: limited to 2 nodes
- Enterprise: unlimited nodes

The node limit is included in the license key in the NodeLimit node.

```xml
<NodeLimit>Unlimited</NodeLimit>
```

If you do not have that node in your license key then you are limited to a single node.  If you recently purchased a license key and it is missing that node then reach out to [sales@octopus.com](mailto:sales@octopus.com).

## Implementing High Availability

Please see our [implementation guide](/docs/best-practices/self-hosted/high-availability) for step by step instructions on how to install and implement high availability.