---
title: Installation Guidelines
description: Guidelines and recommendations for installing Octopus Deploy on your infrastructure.
position: 10
hideInThisSection: true
---

This page will provide guidelines and recommendations for installing Octopus Deploy on your infrastructure.  If you are using Octopus Cloud, please click the button below to move onto the next section in the guide.

<span><a class="btn btn-success" href="/docs/getting-started/best-practices/spaces-recommendations">Next</a></span>

The compute resources required are directly correlated to the expected number of concurrent deployments and runbook runs, and users.  A team of 10 people doing five deployments a day will not need the same amount of resources as a division of 500 users doing 1000 deployments a day.  

Octopus Deploy installation requirements are:
- SQL Server 2016 or higher (AWS RDS SQL Server and Azure SQL are supported)
- Windows Server 2012 R2 or later when hosting on Windows Server
- Linux is supported when using the [Octopus Deploy Docker Container](https://octopus.com/blog/introducing-linux-docker-image)

[High avalability](/docs/administration/high-availablity/index.md) functionality is included with both Server and Data Center licenses sold.  

![](/docs/administration/high-availablity/images/high-availability.svg)

Here are some items to consider when installing Octopus Deploy:
- Cloud providers (GCP, AWS, Azure) will charge roughly the same for 2 VMs with 2 cores / 4 GB of RAM or 1 VM with 4 cores / 8 GB of RAM.  The difference in cost is typically less than $10 USD per month.
- The ideal number of concurrent tasks is 10-15 for every 2 cores / 4 GB of RAM.
- It is much more performant when the Octopus Deploy service and SQL Server are separated.
- The less latency between SQL Server and Octopus Deploy, the better.
- It is trivial to add additional high availability nodes once the initial configuration is done.
- Configuring high availability mode provides additional benefits, including moving items stored on an internal hard drive to shared storage, making Octopus much more resilient.

## Calculating Concurrent Deployments

When starting, you won't be doing more than ten concurrent deployments or runbook runs.  There might be one or two times when you go over that limit, but those deployments will queue for a few minutes before being processed.  When you see more and more deployments or runbook runs being queued, then time to add capacity.  The recommendation below will enable you to add capacity quickly.

Some reference points to consider:
- One customer has ~10,000 deployment targets, 120 projects, ~6000 tenants and has done over 500,000 deployments in 3.5 years.  Their instance configurations handle 160 concurrent deployments.
- Another customer has ~1400 deployment targets, 787 projects, 0 tenants, and has done over 645,000 deployments in 5.5 years.  Their instance configuration handles 100 concurrent deployments.

## Recommendation - Initial Configuration

Configure Octopus Deploy to run in [high availability mode](/docs/administration/high-availability/configure/index.md) from the start, even if you only plan on running one node.  A high availability configuration will involve setting up:

- 1 to 2 servers or 1 to 2 containers
- SQL Server to host Octopus Deploy database
- Load balancer for web traffic
- 40 GB of File storage (DFS, NAS, SAN, Azure File Storage, AWS FSx, etc.)

Configuring HA from the start will ensure your Octopus Deploy instance is more resilient, even with a single node.  If the server hosting Octopus Deploy were ever to crash or stop responding, recovery time is measured in minutes, not hours.  Adding more than one additional node to your HA cluster will result in zero downtime in the event of crashes or regular restarts to update Windows.

This configuration will also allow you to scale horizontally quickly; you can add more nodes as you add more users and do more deployments.  

### Octopus Deploy Windows Server

When hosting Octopus Deploy on a Windows Server, the recommended specs are 2 CPUs and 4 GB of RAM.  Those specs will enable you to run 10-15 concurrent deployments.  Doubling that to 4 CPUs / 8 GB of RAM will enable you to run 20-30 concurrent deployments.  While possible to increase the compute resources, we don't recommend going beyond them and instead recommend scaling horizontally via HA.

Octopus Deploy is a Windows service that will run as `Local System` by default.  If possible, run that service using a specific Active Directory or Azure Active Directory account.  Use integrated security instead for the database instead of providing a username and password.  

### Octopus Deploy Container

When using the Octopus Linux container, set the request for CPU to 400m with a limit of 4000m; for memory, set the request to 400Mi with the limit to 4Gi.

:::hint
Due to how Octopus stores folder references for BLOB files, it is not possible to run Windows Servers and Linux Containers in the same HA cluster.  If you plan on scaling beyond 1 or 2 nodes in your HA cluster, we recommend running Octopus on Windows Servers at this time.
:::

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

### Configure task cap

By default, the number of concurrent deployments or runbook runs for each Octopus Deploy node is 5.  Increase that to 10 using this [guide](/docs/support/increase-the-octopus-server-task-cap.md).

:::hint
Setting the task cap to 0 will mean that node picks up no tasks.  It will only host web requests for the Octopus Deploy UI.
:::

### Load Balancer

The Octopus Deploy UI is a stateless React single page application that leverages a RESTful API for its data.  Any standard load balancer, be it F5, Netscaler, or provided via a cloud provider, will work.  If you need a small load balancer, [NGINX](/docs/security/exposing-octopus/use-nginx-as-reverse-proxy.md) will provide all the functionality you'll need.

The recommendations for load balancers are:

- Avoid sticky sessions; use round-robin or "least busy" mode.
- SSL offloading for all traffic over port 443 is fine (unless you plan on using polling tentacles over web sockets).
- Use `/api/octopusservernodes/ping` to test service health.

:::hint
Octopus Deploy will return the name of the node in the `Octopus-Node` response header.
:::

If you plan on having external [polling tentacles](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md) connect to your instance through a load balancer / firewall you will need to configure passthrough ports to each node.  

### File Storage

Octopus Deploy stores BLOB items such as task logs (generated during deployments), deployment artifacts, packages, project images on a file share instead of in the database.

The kind of file storage will depend on where you are hosting Octopus Deploy.
- On-premise data center: Any SMB-based file storage technology will work.  If running Octopus Deploy as a specific Active Directory account, limit permissions to the file share to that account and system administrators.
- AWS Windows EC2 instance: [Use AWS FSx](/docs/administration/high-availability/design/octopus-for-high-availability-on-aws.md)
- Azure: [Use Azure File storage](/docs/administration/high-availability/design/octopus-for-high-availability-on-azure.md)

### Monitoring

You can use the same `/api/octopusservernodes/ping` to monitor service uptime.  Any monitoring tool that allows you to make http calls to test health will work.  Internally we use the tool [Better Uptime](https://betteruptime.com) to track if Octopus Deploy status and alert us when it is down.  

## Recommendation - Enterprise Configuration

The above recommendation is designed for people working in small to medium-sized companies or people working in large enterprise-level companies getting started with Octopus, perhaps in a POC or a Pilot.  The recommendation below is for an enterprise-grade Octopus Deploy configuration.  We don't recommend starting with this unless you plan to onboard dozens of teams quickly.  If you follow the recommendations from above, it will be easy to scale up to this as all the necessary infrastructure, load balancer, file storage, and SQL Server will be in place.

- 4 Windows servers with 4 Cores / 8 GB of RAM, with each server having the task cap set to 20 (can increase to 30 without increasing compute).
- 2 Windows servers with 2 Cores / 4 GB of RAM, with each server having the task cap set to 0.  These are UI-only nodes.
- SQL Server 2016 Standard or higher (or Azure SQL) running on at least 4 Cores / 16 GB of RAM with either Failover Cluster Instance or Availability Groups configured.
- 200 GB of file storage configured.
- Load balancer to manage traffic to UI-only nodes.

This configuration will provide 80 concurrent deployments, with the capacity to quickly increase to 120.  Keeping the task cap at 20 will allow Octopus to evenly split the load across all the nodes.  The two UI-only nodes will allow users to interact with Octopus Deploy without consuming compute resources needed to orchestrate deployments.

:::hint
You will notice the Octopus Linux container is not mentioned in this section.  That omission is intentional.  

Customers have been running Octopus Deploy on Windows Server with High Availability configured since 2015.  While we are confident in the Octopus Linux container's reliability and performance, after all, Octopus Cloud runs on the Octopus Linux container in AKS clusters in Azure; we don't have the same amount of data as we do with Windows Server.  

We know of two pieces of functionality the Octopus Linux container does not support.

- Active Directory Authentication
- Running PowerShell scripts targeted at PowerShell 5.1 or earlier

We are currently working with our existing customers on what best practices look like for the Octopus Linux container. 

At this time, for predictable performance, uptime, and configuration, we recommend hosting Octopus Deploy on Windows Server with High Availability configured.  If you'd like to use the Octopus Linux container, please reach out to the customer solutions team at advice@octopus.com.
:::

<span><a class="btn btn-success" href="/docs/getting-started/best-practices/spaces-recommendations">Next</a></span>