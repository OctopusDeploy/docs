---
title: How High Availability Works
description: Understanding the inner workings on how high availability works in Octopus Deploy.
hideInThisSection: true
position: 10
---

The High Availability (HA) in Octopus Deploy enables you to run multiple Octopus Server nodes, distributing load between them.  There are two kinds of load an Octopus Server encounters:

- Tasks (Deployments, runbook runs, health checks, package re-indexing, system integreity checks, etc.)
- User Interface via the Web UI and REST API (Users, build server integrations, deployment target registrations, etc.)

## Tasks

Queuing a deployment or triggering a runbook run places that work into a first-in, first-out (FIFO) task queue.  You can view the task queue by navigating to the **TASKS** page on your Octopus Deploy instance.  Deployments and runbook runs are not the only items placed into the task queue.  

Some other examples of tasks include (but not limited to):

- Delete Space
- Export Projects
- Health check
- Import Projects
- Let's Encrypt
- Process recurring scheduled tasks
- Process subscriptions
- Script Console Run
- Sync Community Step templates
- Sync External Security Groups
- Tentacle upgrade
- Update calamari

By default, each Octopus Deploy node is configured to process five (5) tasks concurrently.  That is known as the task cap.  It is possible to [change the task cap on each node](/docs/support/increase-the-octopus-server-task-cap.md).  

While it is possible to increase the task cap on a single node to 50, 75, or even 100, you'll eventually run into underlying host OS and .NET limits.  A server can only open up so many network connections, transport so many files, and run so many concurrent threads.  High Avalability solves that problem by scaling the task cap horizontally.  Each node will pull items from the task queue and process them.  

### How Tasks are distributed between HA nodes

Every 20 seconds each node in the HA cluster will check the task queue for pending tasks.  Octopus will do its best to balance the load between all the nodes to ensure one node doesn't process all the tasks while the other nodes remain unused.  It does that by comparing the current node workload ratio (active tasks on node / node limit) with the prospective cluster workload ratio (active cluster tasks + pending tasks / max cluster tasks).  

A node will not pick up pending tasks tasks when:

- The node is in drain mode (a toggle preventing the node from executing new tasks).
- The number of active tasks is equal to or greater than the task cap.
- The current node workload ratio is greater than the prospective cluster workload ratio.

The last item in that list needs a deeper dive to understand.  A cluster has three nodes, each with a task cap of ten (10) making the HA cluster's total task capacity 30.  There are 12 pending tasks in the queue and 10 active tasks.

For a moment, assume all three nodes check the task queue at the exact same time.  The prospective cluster workload ratio is 73.34% (12 pending tasks + 10 active tasks / 30 task capacity).

- One node is currently processing eight tasks making the current node workload ratio 80% (8/10).  While this node has the capacity to pick up three more tasks it will not because because 80% > 73.34%.
- One node is currently processing three tasks making the current node workload ratio 30% (3/10).  It has the capacity to pick up seven more tasks, but will only pick up five more tasks.  It picks up tasks until it's current node workload ratio is greater than than the prospective cluster workload ratio.
- One node is not processing any tasks.  It will pick up all the remaining seven tasks.

There are a few considerations this example did not take into account.

- Not every node checks the task queue at the exact same time.  The timer is based on the last time node was restarted.  
- 1 to N tasks could be added to the queue during the time between node 1 checking the queue and nodes 2 and 3 checking the queue.
- 1 to N tasks could be completed during the time between node 1 checking the queue and nodes 2 and 3 checking the queue.

### First in, first out queue

The task queue is a first in, first out (FIFO) queue.  The node does not take into account the task type, the expected duration of the task, the environment the task is configured to run on, or any other factors.  Being a FIFO queue, combined with how task distrbution logic can result in what looks like one node processing all deployments while other nodes processing runbook runs or health checks.  When that happens it was just luck.

### Restarting the server during an active deployment

Restarting the Octopus Deploy windows service or the underlying host OS will (eventually) cause any active tasks to fail.  At first, the tasks will look like they are still in process.  Once the node comes back online it will cancel all active tasks.  If the node doesn't come back online within an hour then one of the other nodes will cancel those tasks.

For planned outages, the recommendation is to enable drain mode.  That will tell the node to finish up all active tasks and not pick up any new ones.  That can be by:

1. Going to {{Configuration, Nodes}}.
2. Clicking on the overflow menu (`...`) next to the node you plan on restarting.
3. Selecting **Drain Node**.

Once the outage is finished, repeat the same steps, but select **Disable Drain Node** instead.

Not all outages can be planned.  The underlying hypervisor hosting VM the node is running on could crash.  A data center could go offline.  When that happens you can use this [API Script](docs/octopus-rest-api/examples/bulk-operations/rerun-deployments-and-runbooks-after-node-shutdown.md) to re-run those cancelled deployments and runbook runs.

### Several smaller nodes are better than a few large ones

We recommend several smaller nodes, each with 4 CPUs and 8 GB of RAM, over two or three large nodes, each with 16 CPUs and 64 GB of RAM.  In our testing 4 CPUs and 8 GB of RAM can handle around 20 concurrent tasks.  

Assuming you'd want to be able to process 80 tasks concurrently.  

- If you had two nodes, each with a task cap of 40, an outage on one node would reduce your capacity by 50%.
- If you had four nodes, each with a task cap of 20, an outage on one node would reduce your capacity by 25%.

If you are hosting your virtual machines on a cloud provider, the cost difference between 2 VMs with 8 CPUs / 16 GB of RAM and 4 VMs with 4 CPUs / 8 GB of RAM is minimal.

## User Interface

Octopus Deploy provides two main interfaces for our users.

- Web Portal
- REST API

All other tools, including the CLI, build server plug-ins, etc., are wrappers around the REST API.  All communication to the Web Portal or REST API occurs over standard web server ports, 80 or 443.  Because of that, you will need a load balancer to distribute traffic between the nodes.