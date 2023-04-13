---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Performance
description: Octopus is all about reliable and repeatable deployments, but that doesn't mean it has to be slow. This page will help you tune your Octopus installation for the best performance in your scenario.
navOrder: 60
---

Over the years, we have built Octopus to enable reliable and repeatable deployments, but that doesn't necessarily mean it has to be slow. Octopus can scale with you as you grow. Some Octopus customers are reliably deploying hundreds of projects to many thousands of deployment targets from a single [Octopus High Availability](/docs/administration/high-availability/) cluster.

Octopus is a complex system where we control some parts of the deployment while offering you the freedom to inject your own custom steps into the process. We work hard to make our parts work quickly and efficiently, leaving as many resources available for running your parts of the deployment. We can't control the performance of your custom parts, but there are many things you can do as an Octopus administrator to ensure your installation operates efficiently.

This page is intended to help Octopus System Administrators tune and maintain their Octopus installations and troubleshoot problems as they occur.

:::hint
Want to tune your deployments for optimum performance? Read our [detailed guide on optimizing your deployments](docs/projects/deployment-process/performance/).
:::

## Minimum requirements

!include <minimum-requirements>

## Database

[SQL Server](/docs/installation/sql-server-database/) is the data persistence backbone of Octopus. Performance problems with your SQL Server will make Octopus run and feel slow and sluggish. 

### Infrastructure

It is possible to host Octopus Deploy and SQL Server on the same Windows Server.  We only recommend you do that for Proof of Concepts or demos.  Never for any Octopus Deploy instance used to deploy to Production.  

Keep Octopus Deploy and SQL Server on separate servers.  This will keep them from competing for the same CPU, memory, disk and network resources.

We've worked with customers who have large Production SQL Server instances with a lot of computing power (64 Cores and 512 GB of RAM).  If you count yourself amongst those users, and one of those servers is not at capacity, then hosting Octopus Deploy on a shared server should be fine.  If you don't count yourself amongst those users, then avoid hosting Octopus Deploy on a shared server.

### SQL Server maintenance {#sql-maintenance}

You should implement a routine maintenance plan for your Octopus database. Here is a [sure guide](https://oc.to/SQLServerMaintenanceGuide) (free e-book) for maintaining SQL Server.  At the very least you should:

- Rebuild all indexes **online** with fragmentation > 50% once a day during off-hours (typically 2-3 AM).
- Rebuild all indexes **offline** with fragmentation > 50% once a week during off-hours (typically a Sunday morning).
- Regenerate statistics once a month.

:::hint
Modern versions of Octopus Deploy automatically rebuild fragmented indexes during the upgrade process.  If you frequently upgrade you might not notice high index fragmentation compared to someone who upgrades once a year.
:::

## Maintenance {#maintenance}

Routine maintenance can help your Octopus keep running at optimum performance and efficiency.

### Upgrade

We are continually working to make Octopus perform better, and we will always recommend [upgrading to the latest version](/docs/administration/upgrading/) whenever asked about performance. We generally tag [performance-related issues in our GitHub repository](https://github.com/OctopusDeploy/Issues/issues?q=label%3Afeature%2Fperformance) so you can see which performance improvements have been added in each version of Octopus.

As an example, many customers have reported speed improvements of 50-90% for their deployments after upgrading from an early version of **Octopus 3.x** to the latest version.

### Retention policies

Octopus are generally hygienic creatures, cleaning up after themselves, and your Octopus is no different. Configuration documents, like [projects](/docs/projects/) and [environments](/docs/infrastructure/environments/), are stored until you delete them, unlike historical documents like [releases](/docs/releases/). These will be cleaned up according to the [retention policies](/docs/administration/retention-policies/) you configure.

_The one exception to this is the `Events` table which records an [audit trail](/docs/security/users-and-teams/auditing/) of every significant event in your Octopus._

A tighter retention policy means your Octopus Server will run faster across the board.

:::hint
**We need to keep everything for auditing purposes**
You may not need to keep the entire history of releases - we record the entire history of your Octopus Server for [auditing](/docs/security/users-and-teams/auditing/) purposes. This means you can safely use a short-lived [retention policy](/docs/administration/retention-policies/) to have a fast-running Octopus Server, all the while knowing your audit history is safely kept intact. The retention policy simply cleans up the "potential to deploy a release" - it does not erase the fact a release was created, nor the deployments of that release, from history.
:::

## Scaling Octopus Server {#scaling}

Octopus Servers do quite a lot of work during deployments, mostly around package acquisition:

- Downloading packages from the package source (network-bound).
- Verifying package hashes (CPU-bound).
- Calculating deltas between packages for [delta compression](/docs/deployments/packages/delta-compression-for-package-transfers/) (I/O-bound and CPU-bound).
- Uploading packages to deployment targets (network-bound).
- Monitoring deployment targets for job status, and collecting logs.

At some point your server hardware is going to limit how many of these things a single Octopus Server can do concurrently. If a server over commits itself and hits these limits, timeouts (network or SQL connections) will begin to occur, and deployments can begin to fail. Above all else, your deployments should be repeatable and reliable.

We offer four options for scaling your Octopus Server:

- scale up by controlling the **task cap** and providing more server resources as required.
- scale out using [Octopus High Availability](/docs/administration/high-availability/).
- scale out using [Workers](/docs/infrastructure/workers/).
- dividing up your Octopus environment using [Spaces](/docs/administration/spaces/).

### Task cap

An ideal situation would be an Octopus Server that's performing as many parallel deployments as it can, while staying just under these limits. We tried several techniques to throttle Octopus Server automatically. In practice, this kind of approach proved to be unreliable.

Instead, we decided to put this control into your hands, allowing you to control how many tasks each Octopus Server node will execute concurrently. This way, you can measure server metrics for **your own deployments**, and then increase/decrease the task cap appropriately. Administrators can change the task cap in **{{Configuration>Nodes}}**.

See this [blog post](https://octopus.com/blog/running-task-cap-and-high-availability) for more details on why we chose this approach.

The default task cap is set to `5` out of the box. Based on our load testing, this offered the best balance of throughput and stability for most scenarios.  Increasing that to 10 should be fine without requiring more CPU or RAM.  Anything more and we recommend [High Availability](/docs/administration/high-availability/).

The task cap also interacts with offloading deployment work to Workers.  If you have more workers available, you might be able to increase your deployment performance and [different task cap or step parallelism](/docs/infrastructure/workers/#run-multiple-processes-on-workers-simultaneously) might be right with the extra ability to scale.

### Octopus High Availability

You can scale out your Octopus Server by implementing a [High Availability](/docs/administration/high-availability/) cluster. Each node in the cluster will have its own task cap.  Two servers in a cluster each with a task cap of 5 means you can process 10 concurrent tasks.  

In addition to linearly increasing the performance of your cluster, you can perform certain kinds of maintenance on your Octopus Servers without incurring downtime.

### Workers

Consider using [Workers](/docs/infrastructure/workers/) and worker pools if deployment load is affecting your server.  See this [blog post](https://octopus.com/blog/workers-performance) for a way to begin looking at workers for performance.

### Spaces

Consider separating your teams/projects into "spaces" using the [Spaces](/docs/administration/spaces/) feature.  A space is considered a "hard wall". Each space has its own environments, projects, deployment targets, packages, machine policies, etc.  The only thing shared is users and teams.  That means less data for the Octopus UI to query.  Splitting 60 projects evenly into 3 spaces will result in the dashboard only having to load 20 projects instead of 60.

## Tentacles

Prefer [Listening Tentacles](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md#listening-tentacles-recommended) or [SSH](/docs/infrastructure/deployment-targets/linux/ssh-target/) instead of [Polling Tentacles](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md#polling-tentacles) wherever possible.  Listening Tentacles and SSH place the Octopus Server under less load.  We try to make Polling Tentacles as efficient as possible. However, they can place the Octopus Server under high load, just handling incoming connections.

Reduce the frequency and complexity of automated health checks using [machine policies](/docs/infrastructure/deployment-targets/machine-policies/).

## Packages {#package-transfer}

Transferring packages from your Octopus Server is a key piece of functionality when executing deployments and runbooks.  This can also have an impact on your Octopus Server's performance.

### Network bandwidth

The larger the package the more network bandwidth is required to transfer data to your deployment targets.  

Consider using [delta compression for package transfers](/docs/deployments/packages/delta-compression-for-package-transfers/).  Larger packages will require more CPU and disk IOPS to calculate the delta - monitor resource consumption to ensure delta compression doesn't negatively impact the rest of your Octopus Server.

:::hint
Delta compression doesn't always result in smaller package transfers.  The algorithm will transfer the entire package if over a certain percentage changes.
:::

If your packages have a lot of static data, consider creating a package containing only that static data and deploying it only when it changes.  

### Custom Package Feed

Consider using a custom package feed close to your deployment targets, and download the packages directly on the agent. This alleviates a lot of resource contention on the Octopus Server.

### Retention Policy

The built-in package feed has its own [retention policy](/docs/administration/retention-policies/#set-builtinfeed-retentionpolicy).  Ensure that is enabled to keep the amount of packages to store and index down.

:::hint
The package retention policy only deletes packages not referenced by a release or runbook.  Setting the retetion policy to 1 day means the package will be deleted 1 day after the release is deleted.
:::

## File Storage 

Octopus Deploy stores BLOB data (task logs, packages, project images, etc.) on the file system.

### Task Logs {#tip-task-logs}

Larger task logs put the entire Octopus pipeline under more pressure.  The task log has to be transferred from the Tentacle to the server, it has to be saved to the file system, and is read when you are on the deployment or runbook screen.  We recommend printing messages required to understand progress and deployment failures. The rest of the information should be streamed to a file, then published as a deployment [artifact](docs/projects/deployment-process/artifacts/).

### Image Size

While it is fun to have gifs and fancy images for your projects consider the size of each image.  Keep them under 100x100 pixels.  This will reduce the amount of data you have to download from the Octopus Server. 

## Deployment Parallelism

By default, Octopus will only run one process on each [deployment target](/docs/infrastructure/deployment-targets/) at a time, queuing the rest. There may be times that you want to run multiple processes at a time. In those situations, there are three special variables that can be used to control the way Octopus runs steps in parallel:

- `OctopusBypassDeploymentMutex` - allows for multiple processes to run at once on the target.
- `Octopus.Acquire.MaxParallelism` - limits the maximum number of packages that can be concurrently deployed to multiple targets.
- `Octopus.Action.MaxParallelism` - limits the maximum number of machines on which the action will concurrently execute

For more details, see our [run multiple processes on a target simultaneously](docs/administration/managing-infrastructure/run-multiple-processes-on-a-target-simultaneously/) page.

## Troubleshooting

The best place to start troubleshooting your Octopus Server is to inspect the [Octopus Server logs](/docs/support/log-files/). Octopus writes details for common causes of performance problems.

### Long running requests

When HTTP requests take a long time to be fulfilled you'll see a message similar to: `Request took 5123ms: GET {correlation-id}`: The timer is started when the request is first received, ending when the response is sent.

Actions to take when you see messages similar to this in your log:
- Look for trends as to which requests are taking a really long time.
- Look to see if the performance problem occurs, and goes away, on a regular basis. This can indicate another process hogging resources periodically.

### Slow loading dashboard or project overview pages

Long retention policies usually cause this. Consider tightening up your retention policies to keep less releases. It can also be caused by the sheer number of projects you are using to model your deployments.  

You can use the **CONFIGURE** button on the dashboard to limit the projects and/or environments shown to you.  Filtering out the unneeded projects and environments on your dashboard can significantly reduce the amount of data needing to be returned, which will improve speed.

### Slow database

If a particular database operation takes a long time you'll see a message similar to: `{Insert/Delete/Update/Reader} took 8123ms in transaction '{transaction-name}'`. The timer is started when the operation starts, ending when the operation is completed (including any retries for transient failure recovery).

Actions to take when you see messages similar to this in your log:
- If you are seeing these operations take a long time it indicates your SQL Server is struggling under load, or your network connection from Octopus to SQL Server is saturated.
- Check the maintenance plan for your SQL Server. See [tips above](#sql-maintenance).
- Test an extremely simple query like `SELECT * FROM OctopusServerNode`. If this query is slow it indicates a problem with your SQL Server.
- Test a more complex query like `SELECT * FROM Release ORDER BY Assembled DESC`. If this query is slow it indicates a problem with your SQL Server, or the sheer number of Releases you are retaining.
- Check the network throughput between the Octopus Server and SQL Server by trying a larger query like `SELECT * FROM Events`.

### Deployment screen is slow to load

When the Task Logs are taking a long time to load, or your deployments are taking a long time the size of your task logs might be to blame.  First refer to the [tips above](#tip-task-logs).  After that, make sure the disks used by your Octopus Server have sufficient throughput/IOPS available for processing the demand required by your scenario. Task logs are written and read directly from disk.

### High resource usage during deployments

When you experience overly high CPU or memory usage during deployments which may be causing your deployments to become unreliable:
- Try reducing your Task Cap back towards the default of `5` and then increase progressively until your server is reliable again.
- Look for potential [performance problems in your deployment processes](docs/projects/deployment-process/performance/), especially:
    - Consider how you [transfer your packages](#package-transfer).
    - Consider reducing the amount of parallelism in your deployments by reducing the number of steps you run in parallel, or the number of machines you deploy to in parallel.

### Connection pool timeout

Seeing the error message `System.InvalidOperationException: Timeout expired. The timeout period elapsed prior to obtaining a connection from the pool. This may have occurred because all pooled connections were in use and max pool size was reached.` in your log indicates two possible scenarios:

- Your SQL Queries are taking a long time, exhausting the SQL Connection Pool. Investigate what might be making your SQL Queries take longer than they should and fix that if possible - see earlier troubleshooting points.
- If your SQL Query performance is fine, and your SQL Server is running well below its capacity, perhaps your Octopus Server is under high load. This is perfectly normal in many situations at scale. If your SQL Server can handle more load from Octopus, you can increase the SQL Connection Pool size of your Octopus Server node(s). This will increase the amount of active connections Octopus is allowed to open against your SQL Server at any point in time, effectively allowing your Octopus Server to handle more concurrent requests. Try increasing the `Max Pool Size` in your `SQL Connection String`in the `OctopusServer.config` file to something like `200` (the default is `100`) and see how everything performs. Learn about [Connection Strings and Max Pool Size](https://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlconnection.connectionstring).
- Octopus is leaking SQL Connections. This should be very rare, but has happened in the past and we fix every instance we find. We recommend upgrading to the latest version of Octopus and [get help from us](#support) if the problem persists.

:::hint
Analyzing Octopus Server log files for performance problems is much easier in a tool like [Seq](https://getseq.net). We've built a [helpful tool](https://github.com/OctopusDeploy/SeqFlatFileImport) for importing Octopus Server and Task Logs directly into Seq for analysis.
:::

## Getting help from us {#support}

If none of the above troubleshooting steps work, please get in contact with our [support team](https://octopus.com/support) and send along the following details to help us debug:

1. An overview of the problem and when it occurs (page load, during a deployment, only when doing lots of deployments, etc.)
1. Frequency of the problem happenening (on every deploymenet, on initial startup, etc.)
1. Observed correlations (during a deployment the dashboard is slow to load, during active directory sync unable for users to login, etc.)
1. A high level overview of your Octopus Deploy instance:
    - Version of Octopus Deploy installed
    - How many nodes your Octopus Deploy instance has
    - The server specs for each node (CPU/Memory)       
1. Database details
    - What version of SQL Server
    - Where the SQL Server is hosted what are the DTUs or hardware specs (CPU/Memory)    
    - Overall database size
    - Number of rows per table (see query below)
    - Last time indexes were rebuilt and stats were regenerated
1. Utilization during of resources (CPU/Disk/Memory %) used during peak times vs. non-peak

This query will return all the rows in all the tables in the Octopus Deploy database.

```sql
SELECT
QUOTENAME(SCHEMA_NAME(obj.schema_id)) + '.' + QUOTENAME(obj.name) AS [TableName],
SUM(dmv.row_count) AS [RowCount]
FROM sys.objects AS obj
  INNER JOIN sys.dm_db_partition_stats AS dmv
  ON obj.object_id = dmv.object_id
WHERE obj.type = 'U'
  AND obj.is_ms_shipped = 0x0
  AND dmv.index_id in (0, 1)
GROUP BY obj.schema_id, obj.name
ORDER BY Obj.name
```

In addition to providing the above information, gathering logs and traces will help us troubleshoot your performance problem.

1. Attach a screen recording showing the performance problem or charts showing the Octopus Server performance.  If problem happens at certain times, please attach charts and screen recordings before and during those events.
1. [Record and attach the performance problem occurring in your web browser](/docs/support/record-a-problem-with-your-browser/) (if applicable).
1. Attach the [Octopus Server logs](/docs/support/log-files/).
1. Attach the [raw task logs](/docs/support/get-the-raw-output-from-a-task/) for any tasks exhibiting the performance problem, or that may have been running at the same time as the performance problem.
1. If the performance problem is causing high CPU utilization on the Octopus Server, please [record and attach a performance trace](/docs/administration/managing-infrastructure/performance/record-a-performance-trace/).
1. If the performance problem is causing high memory utilization on the Octopus Server, please [record and attach a memory trace](/docs/administration/managing-infrastructure/performance/record-a-memory-trace/).
1. We might ask for a sanitized database backup to do our own testing against.  Please [follow these instructions](/docs/administration/managing-infrastructure/performance/create-sanitized-database-backup/).
