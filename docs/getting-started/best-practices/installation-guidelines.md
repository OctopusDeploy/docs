---
title: Installation Guidelines
description: Guidelines and recommendations for installing Octopus Deploy on your infrastructure.
position: 10
hideInThisSection: true
---

This page will provide guidelines and recommendations for installing Octopus Deploy on your infrastructure.  If you are using Octopus Cloud, please click the button below to move onto the next section in the guide.

<span><a class="btn btn-success" href="/docs/getting-started/best-practices/spaces-recommendations">Next</a></span>

The compute resources required are correlated to the expected number of concurrent tasks (deployments, runbook runs, etc.) and users.  A team of 10 people doing five deployments a day will not need the same resources as a division of 500 users doing 600 deployments a day.  

Octopus Deploy installation requirements are:
- SQL Server 2016 or higher (AWS RDS SQL Server and Azure SQL are supported)
- Windows Server 2012 R2 or later when hosting on Windows Server
- Linux is supported when using the [Octopus Deploy Docker Docker image](https://octopus.com/blog/introducing-linux-docker-image)

[High avalability](/docs/administration/high-availability/index.md) functionality is included with both Server and Data Center licenses.  

![](/docs/administration/high-availability/images/high-availability.svg)

How high availability works in Octopus Deploy is all tasks (deployments, runbook runs, etc.) are dropped into a queue.  Periodically, each high availability node will check the queue for work.  The node will pick up any pending tasks until it reaches its task cap or it runs out of pending tasks to pick up.  

Here are some items to consider when installing Octopus Deploy:
- Cloud providers (GCP, AWS, Azure) will charge roughly the same for 2 VMs with 2 cores / 4 GB of RAM or 1 VM with 4 cores / 8 GB of RAM.  The difference in cost is typically less than $10 USD per month.
- The ideal number of concurrent tasks is 10-15 for every 2 cores / 4 GB of RAM.
- It is much more performant when the Octopus Deploy service and SQL Server are separated.
- The less latency between SQL Server and Octopus Deploy, the better.
- Configuring high availability mode provides multiple benefits, the most important being removing a single point of failure.  
- It is trivial to add additional high availability nodes after the initial configuration.

## Calculating Concurrent Tasks

When starting, you most likely won't be doing more than ten concurrent tasks.  There might be one or two times when you go over that limit, but those tasks will queue for a few minutes before being processed.  When you see more and more tasks being queued, then time to add capacity.  

Some reference points to consider:
- One customer has ~10,000 deployment targets, 120 projects, and do about 400-500 deployments a day.  Their instance is configured to handle 160 concurrent tasks.
- Another customer has ~1400 deployment targets, 787 projects, and do about 600 deployments a day.  Their instance is configured to handle 100 concurrent tasks.

## Windows Server recommended over Octopus Linux Docker image

Our recommendation is to use Windows Server over the Octopus Linux Docker image unless the following conditions are met:
- You have no plans to use Active Directory authentication and will use Okta, Azure AD, Google Auth, or the built-in username and password.  The current version of the Octopus Linux Docker image doesn't support Active Directory.
- You are okay running at least one [worker](/docs/infrastructure/workers/index.md) to handle tasks typically done by the Octopus Server.  The Octopus Linux Docker image doesn't include PowerShell Core or Python.
- You are familiar with Docker concepts, specifically around debugging containers, volume mounting and networking.
- You are familiar with one of these underlying hosting technologies; Kubernetes, ACS, ECS, AKS, EKS, or Docker Swarm.

:::
Due to how Octopus stores the paths to various BLOB data (task logs, artifacts, packages, etc), you cannot run both Windows and Octopus Linux containers in the same Octopus Deploy instance.  It has to be either all Windows or all containers.
:::

We are confident in the Octopus Linux Docker image's reliability and performance, after all, Octopus Cloud runs on the Octopus Linux Docker image in AKS clusters in Azure.  But to use the Octopus Linux Docker image in Octopus Cloud we made some intentional design decisions and created some custom workflows due to the above limitations.  This includes not offerring Active Directory authentication and requiring Octopus ID instead, disabling the built-in worker and using [dynamic workers](/docs/infrastructure/workers/dynamic-worker-pools.md), and a custom logging file to output the server logs to our [Seq](https://datalust.co/seq) instance so we can debug any issues.

:::hint
Below is the default configuration for Octopus Cloud.  We've found this provides the resources necessary for 10-15 tasks.  Anything more and we have to either increase the Docker image resources or database resources.

- Docker images hosted on AKS clusters with the CPU set to 400m and a limit of 4000m, memory set to 400Mi with the limit set of 4Gi.  
- Azure SQL database with 50 DTUs.
- Azure File Storage hosting all the BLOB data.
:::

We are currently working with our existing customers on what best practices look like to self-host the Octopus Linux container with High Availability configured.  If you'd like further recommendations beyond this document, please reach out to the customer solutions team at advice@octopus.com.

## Small-Medium Scale Configuration

Our recommendation is to configure Octopus Deploy to run in [high availability mode](/docs/administration/high-availability/configure/index.md) from the start, even if you only plan on running one node.  A high availability configuration will involve setting up:

- 1 to 2 Windows servers, each with 2 cores / 4 GB of RAM with the task cap set to 10 for each server.
- SQL Server to host Octopus Deploy database with 2 Cores / 8 GB of RAM or 50-100 DTUs
- Load balancer for web traffic
- 40 GB of File storage (DFS, NAS, SAN, Azure File Storage, AWS FSx, etc.)

![small instance diagram](images/small-instance-diagram.png)

This will give you the capacity to process 10-20 concurrent tasks.  If you need to scale up quickly, double the compute resources, for example, 4 CPUs / 8 GB of RAM, to get to 20-40 concurrent tasks.  We don't recommend going beyond 4 CPUs / 8 GB of RAM and instead recommend scaling horizontally.  

Even with a single node, taking the time to configure a load balancer and the separate file storage will ensure your Octopus Deploy instance is more resilient.  If the server hosting Octopus Deploy were ever to crash or stop responding, recovery time is measured in minutes, not hours.  Adding more than one additional node to your HA cluster will result in zero downtime in the event of crashes or regular restarts to update Windows.  

### Octopus Deploy Windows Server

Octopus Deploy is a Windows service that will run as `Local System` by default.  If possible, run that service using a specific Active Directory or Azure Active Directory account.  Use integrated security instead for the database instead of providing a username and password.  

### Database

For the database, re-use an existing Production-Level SQL Server 2016+ Server, Azure SQL Database, or AWS RDS SQL Server monitored by your DBAs if possible.      

If you need to stand up a new server, the recommendations are
- 10-20 concurrent deployments (small teams, companies, or customers doing POCs/pilots): SQL Server Express with 2 Cores / 8 GB of RAM or Azure SQL with 50-100 DTUs
- 20+ concurrent deployments (medium to enterprise customers): SQL Server Standard or Enterprise with at least 4 cores / 16 GB of RAM or Azure SQL with 200+ DTUs.

If you are going to run SQL Server Standard or Enterprise, configure either a [failover cluster instance](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/windows/always-on-failover-cluster-instances-sql-server?view=sql-server-ver15) or an [availability group](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/prereqs-restrictions-recommendations-always-on-availability?view=sql-server-ver15) to ensure database resiliency.

:::hint
Keep an eye on your database resources as you increase the number of concurrent deployments, runbook runs, and users.    
:::

For high performance, the SQL Server and the servers hosting Octopus Deploy must be in the same data center or region to keep latency between the two to a minimum.

:::hint
Routine SQL Server maintenance should be performed periodically to maintain performance, including rebuilding indexes, regenerating stats, and regular backups.  
:::

### Configure task cap

By default, the number of concurrent tasks for each Octopus Deploy node is 5.  Increase that to 10 using this [guide](/docs/support/increase-the-octopus-server-task-cap.md).  We don't recommend going beyond 20, even if the node has the necessary compute resources.  

As stated earlier, each node will pick up tasks until it reaches its task cap or it runs out of pending tasks to pick up.  If the task cap is set to 20, but the typical number of pending tasks is 10, you will find one node is doing the majority of the work.  Setting the task cap to a lower number and with more nodes will spread the work evenly, resulting in higher performance.

:::hint
Setting the task cap to 0 will mean that node picks up no tasks.  It will only host web requests for the Octopus Deploy UI.
:::

### Load Balancer

The Octopus Deploy UI is a stateless React single page application that leverages a RESTful API for its data.  Any standard load balancer, be it F5, Netscaler, or provided via a cloud provider, will work.  If you need a small load balancer, [NGINX](/docs/security/exposing-octopus/use-nginx-as-reverse-proxy.md) will provide all the functionality you'll need.

The recommendations for load balancers are:

- Start with round-robin or "least busy" mode.  
- SSL offloading for all traffic over port 443 is fine (unless you plan on using polling tentacles over web sockets).
- Use `/api/octopusservernodes/ping` to test service health.

:::hint
Octopus Deploy will return the name of the node in the `Octopus-Node` response header.

We have noticed certain user actions, such as creating a new space or updating permissions, won't update the cache on all nodes and you'll get odd permissions errors.  Typically the cache is updated after a few minutes and those errors go away.  If that happens to you look at the `Octopus-Node` header to determine which node has updated data vs. not updated.  If you see that jumping between nodes is the problem, and you update permissions a lot, we recommend switching over to sticky sessions.
:::

If you plan on having external [polling tentacles](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md) connect to your instance through a load balancer / firewall you will need to configure passthrough ports to each node.  Our [high availability guides](/docs/administration/high-availability/design/index.md) provide steps on how to do this.

### File Storage

Octopus Deploy stores BLOB items such as task logs (generated during deployments), deployment artifacts, packages, project images on a file share instead of in the database.

The kind of file storage will depend on where you are hosting Octopus Deploy.
- On-premise data center: Any SMB-based file storage technology will work.  If running Octopus Deploy as a specific Active Directory account, limit permissions to the file share to that account and system administrators.
- AWS Windows EC2 instance: [Use AWS FSx](/docs/administration/high-availability/design/octopus-for-high-availability-on-aws.md)
- Azure: [Use Azure File storage](/docs/administration/high-availability/design/octopus-for-high-availability-on-azure.md)

### Monitoring

You can use the same `/api/octopusservernodes/ping` to monitor service uptime.  Any monitoring tool that allows you to make http calls to test health will work.  Internally we use the tool [Better Uptime](https://betteruptime.com) to track Octopus Deploy status and alert us when it is down.  

## Large-Scale Configuration

The above recommendation is designed for people working in small to medium-sized companies or people working in large companies getting started with Octopus, perhaps in a POC or a Pilot.  The recommendation below is for a large Octopus Deploy configuration designed to handle thousands of deployments a day.  We don't recommend starting with this unless you plan to onboard dozens of teams quickly.  If you follow the recommendations of the small-medium scale configuration section, it will be easy to scale up to this as all the necessary infrastructure; load balancer, file storage, and SQL Server will be in place.

- 4 Windows servers with 4 Cores / 8 GB of RAM, with each server having the task cap set to 20 (can increase to 30 without increasing compute).
- 2 Windows servers with 4 Cores / 8 GB of RAM, with each server having the task cap set to 0.  These are UI-only nodes.
- SQL Server 2016 Standard or higher (or Azure SQL) running on at least 4 Cores / 16 GB of RAM with either Failover Cluster Instance or Availability Groups configured.
- 200 GB of file storage configured.
- Load balancer to manage traffic to UI-only nodes.

![large scale instance](images/large-instance-diagram.png)

:::hint
The configuration above is a baseline.  We recommend monitoring your resources as you add projects, users and do more deployments.  The more data, the more Octopus UI and database have to process.  Experiment with more increasing compute resources for the SQL Server and the UI nodes.  If you run into any performance concerns, please email support@octopus.com.
:::

This configuration will provide 80 concurrent deployments, with the capacity to quickly increase to 120.  We recommend keeping the task cap at 20 to allow Octopus to split the load across all the nodes more evenly.  The two UI-only nodes will allow users to interact with Octopus Deploy without consuming compute resources needed to orchestrate deployments.

## Adding High Availability Nodes

Once high availability is configured, the steps to add a new Windows server node are:

1. Create a Windows server and mount the file shares.
2. Install Octopus Deploy and point it to an existing database.
3. Configure task cap.
4. (Optional) add the new node into the load balancer (if the node is hosting the Octopus UI).

To add a new Linux Docker image node, the steps are:

1. Spin up a new Docker image with the arguments pointing to an existing database and mount the volumes.
2. Configure the task cap.
3. (Optional) add the new node into the load balancer (if the node is hosting the Octopus UI).

Assuming the node is configured to process tasks, it should start picking up tasks to process within a few minutes.

## Removing High Availability Nodes

Occasionally, you'll want to delete a node.  Perhaps you added two, three, or four nodes in anticipation of a large project involving hundreds of deployments, and now it is time to scale back down.

To do that, you'll want to follow these steps:

1. Configure the node to [drain](/docs/administration/high-availability/maintain/maintain-high-availability-nodes.md#drain).  This will finish all tasks and prevent any new ones from being picked up.
2. Wait until any executing tasks on that node are complete.
3. Remove the node from any load balancers.
4. Delete server or Docker image.
5. Remove the node from the [nodes UI](/docs/administration/high-availability/maintain/maintain-high-availability-nodes.md) by clicking on `...` next to the node name and selecting **Delete**.

:::hint
Any task associated with the node will fail if you don't wait for the node to finish draining and wrapping up any active tasks.
:::

## Auto Scaling High Availability Nodes

It is possible to use auto-scaling technology to add/remove high availability nodes.  Adding a node is a lot easier than removing a node; assuming all the file shares are mounted and the node can see the database, the node will come online and pick up work.

Removing the node will require a bit more planning.  When the node is deleted by the auto-scaling technology, any tasks in process will fail.  If you are in AWS or Azure, you can use a Lambda or Azure Function to:

1. Call the Octopus API to drain the node and cancel any tasks.  You'll want to cancel the tasks as you'll have a short timeframe to wait.
2. Use the Octopus API to find any active tasks running on that node and cancel them.
3. Use the Octopus API to remove the node.
4. Resubmit any canceled deployments, and runbook runs so a different node can pick them up.

<span><a class="btn btn-success" href="/docs/getting-started/best-practices/spaces-recommendations">Next</a></span>