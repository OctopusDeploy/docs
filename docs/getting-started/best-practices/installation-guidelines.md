---
title: Installation Guidelines
description: Guidelines and recommendations for installing Octopus Deploy on your infrastructure.
position: 10
hideInThisSection: true
---

This page will provide guidelines and recommendations for installing Octopus Deploy on your infrastructure.  If you are using Octopus Cloud please click the button below to move onto the next section in the guide.

<span><a class="btn btn-success" href="/docs/getting-started/best-practices/worker-recommendations">Next</a></span>

The amount of compute resources will depend on the expected number of concurrent deployments and users.  A team of 10 people doing 5 deployments a day will not need the same amount of compute resources as a division of 500 users doing a 1000 deployments a day.  

Octopus Deploy installation requirements are:
- SQL Server 2016 or higher (AWS RDS SQL Server and Azure SQL are supported)
- Windows Server 2012 R2 or later when hosting on VMs
- Linux is supported when using the [Octopus Deploy Docker Container](https://octopus.com/blog/introducing-linux-docker-image)

Octopus Deploy provides a [high avalability](/docs/administration/high-availablity/index.md) functionality to any Server or Data Center license sold.  

![](/docs/administration/high-availablity/images/high-availability.svg)

Here are some items to consider when installing Octopus Deploy:
- Cloud providers (GCP, AWS, Azure) will charge roughly the same for 2 VMs with 2 cores / 4 GB of RAM or 1 VM with 4 cores / 8 GB of RAM.  The difference in cost is typically less than $10 USD per month.
- The ideal number of concurrent tasks is 10-15 for every 2 cores / 4 GB of RAM.
- It is much more performant when the Octopus Deploy service and SQL Server are separated.
- The less latency between SQL Server and Octopus Deploy the better.
- It is trivial to add additional high availability nodes once the initial configuration is done.
- Configuring high availability mode provides additional benefits, including moving items stored on an internal hard drive to shared storage, making Octopus much more resilent.

## Recommendation

Configure Octopus Deploy to run in [high availability mode](/docs/administration/high-availability/configure/index.md) from the start, even if you only plan on running one node.  This will involve setting up:

- 1 VM to host Octopus Deploy or 1 container
- SQL Server to host Octopus Deploy database
- Load balancer for web traffic
- File storage (DFS, NAS, SAN, Azure File Storage, AWS FSx, etc.)

Configuring HA from the start will ensure your Octopus Deploy instance is more reslient, if the VM hosting Octopus Deploy were to ever crash or stop responding, recovery time can be measured in minutes not hours.  Adding more nodes to your HA cluster will result in zero downtime in the event of crashes or normal restarts to update Windows.

This configuration will also allow you to scale horizontally; you will add more nodes as you add more users and do more deployments.  

### Octopus Deploy VM

When hosting Octopus Deploy on a Windows VM the recommended specs are 2 CPUs and 4 GB of RAM.  This will enable you to run 10-15 concurrent deployments.  Doubling that to 4 CPUs / 8 GB of RAM should enable you to run 20-25 concurrent deployments.  We don't recommend going beyond those specs and instead recommend scaling horizontally via HA.

Octopus Deploy is a Windows service that will run as `Local System` by default.  If possible, run that service using a specific Active Directory or Azure Active Directory account.  Use integrated security instead for the database instead of providing a username and password.  

### Octopus Deploy Container

For Linux containers set the request for CPU to 400m with a limit of 4000m.  For memory set the request to 400Mi with the limit to 4Gi.

:::hint
At this time, it is not possible to run Windows VMs and Linux Containers in the same HA cluster.
:::

### Database

For the database, re-use an existing Production-Level SQL Server 2016+ Server, Azure SQL Database, or AWS RDS SQL Server if possible.  

If you need to stand up a new server, the recommendations are
- 10-20 concurrent deployments (small teams, companies or customers doing POCs/pilots): SQL Server Express with 2 Cores / 8 GB of RAM or Azure SQL with 50-100 DTUs
- 20+ concurrent deployments (medium to enterprise customers): SQL Server Standard or Enterprise with at least 4 cores / 16 GB of RAM or Azure SQL with 200+ DTUs.

If you are going to run SQL Server Standard or Enterprise, configure either a [failover cluster instance](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/windows/always-on-failover-cluster-instances-sql-server?view=sql-server-ver15) or an [availability group](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/prereqs-restrictions-recommendations-always-on-availability?view=sql-server-ver15) to ensure database resilency.

:::hint
As you increase the number of concurrent deployments you will also need to increase database resources.  
:::

### Load Balancer

The Octopus Deploy UI is a stateless React single page application that leverages a RESTful API for its data.  Any standard load balancer, be it F5, Netscaler, or provided via a cloud provider will work.  If you need a small load balancer, [NGINX](/docs/security/exposing-octopus/use-nginx-as-reverse-proxy.md) will provide all the functionality you'll need.

The recommendations for load balancers are:

- Avoid sticky sessions, use round robin or "least busy" mode.
- SSL offloading for all traffic over port 443 is is fine (unless you plan on using polling tentacles over web sockets).
- Use `/api/octopusservernodes/ping` to test service health.

:::hint
Octopus Deploy will return the name of the node in the `Octopus-Node` response header.
:::

### File Storage

Octopus Deploy stores BLOB items such as task logs (generated during deployments), deployment artifacts, packages, project images on a file share instead of in the database.

The kind of file storage will depend on where you are hosting Octopus Deploy.
- On-premise data center: Any SMB-based file storage technology will work.  If running Octopus Deploy as a specific Active Directory account, limit write permissions to the file share to that account and system administrators.
- AWS Windows EC2 instance: [Use AWS FSx](/docs/administration/high-availability/design/octopus-for-high-availability-on-aws.md)
- Azure: [Use Azure File storage](/docs/administration/high-availability/design/octopus-for-high-availability-on-azure.md)

### Monitoring

You can use the same `/api/octopusservernodes/ping` to monitor service uptime.  Any monitoring tool that allows you make http calls to test health will work.  Internally we use the tool [Better Uptime](https://betteruptime.com) to track if Octopus Deploy status and alert us when it is down.  

