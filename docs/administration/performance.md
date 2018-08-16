---
title: Performance
description: Octopus is all about reliable and repeatable deployments, but that doesn't mean it has to be slow. This page will help you tune your Octopus installation for the best performance in your scenario.
position: 60
---

Over the years we have built Octopus to enable reliable and repeatable deployments, but that doesn't necessarily mean it has to be slow. In fact, Octopus can scale with you as you grow. Some Octopus customers are reliably deploying hundreds of projects to many thousands of deployment targets from a single [Octopus High Availability](/docs/administration/high-availability/index.md) cluster.

Octopus is a complex system, where we control some parts of the deployment whilst offering you the freedom to inject your own custom steps into the process. We work hard to make our parts work quickly and efficiently, leaving as many resources available for running your parts of the deployment. We can't control the performance of your custom parts, but there are many things you can do as an Octopus administrator to ensure your installation operates efficiently.

This page is intended to help Octopus System Administrators tune and maintain their Octopus installations and troubleshoot problems as they occur.

:::hint
Want to tune your deployments for optimum performance? Read our [detailed guide on optimizing your deployments](/docs/deployment-process/performance.md).
:::

## Minimum Requirements

There is no "one size fits all" approach to sizing your Octopus Server. If you are just starting out with Octopus Server you should begin with the [minimum requirements](/docs/installation/index.md) then monitor the performance of your server. Once your server is up and running you should consider [maintenance](#maintenance) and [scaling](#scaling) as you see fit.

## Maintenance {#maintenance}

Routine maintenance can help your Octopus keep running at optimum performance and efficiency.

### Upgrade

We are continually working to make Octopus perform better, and we will always recommend [upgrading to the latest version](/docs/administration/upgrading/index.md) whenever asked about performance. We generally tag [performance-related issues in our GitHub repository](https://github.com/OctopusDeploy/Issues/issues?q=label%3Afeature%2Fperformance) so you can see which performance improvements have been added in each version of Octopus.

As an example, many customers have reported speed improvements of 50-90% for their deployments after upgrading from an early version of Octopus 3.x to the latest version.

### Retention Policies

Octopus are generally hygienic creatures, cleaning up after themselves, and your Octopus is no different. Configuration documents, like [projects](/docs/deployment-process/projects/index.md) and [environments](/docs/infrastructure/environments/index.md), are stored until you delete them, unlike historical documents like [releases](/docs/deployment-process/releases/index.md). These will be cleaned up according to the [retention policies](/docs/administration/retention-policies/index.md) you configure.

_The one exception to this is the `Events` table which records an [audit trail](/docs/administration/auditing.md) of every significant event in your Octopus._

A tighter retention policy means your Octopus Server will run faster across the board.

:::hint
**We need to keep everything for auditing purposes**
You may not need to keep the entire history of releases - we record the entire history of your Octopus Server for [auditing](/docs/administration/auditing.md) purposes. This means you can safely use a short-lived [retention policy](/docs/administration/retention-policies/index.md) to have a fast-running Octopus Server, all the while knowing your audit history is safely kept intact. The retention policy simply cleans up the "potential to deploy a release" - it does not erase the fact a release was created, nor the deployments of that release, from history.
:::

### SQL Server Maintenance {#sql-maintenance}

[SQL Server](/docs/installation/sql-server-database.md) is the data persistence backbone of Octopus. Performance problems with your SQL Server will make Octopus run and feel slow and sluggish. You should implement a routine maintenance plan for your Octopus database. Here is a [sure guide](http://g.octopushq.com/SQLServerMaintenanceGuide) (free e-book) for maintaining SQL Server.

## Scaling Octopus Server {#scaling}

Octopus Servers do quite a lot of work during deployments, mostly around package acquisition:

- Downloading packages from the package source (network-bound)
- Verifying package hashes (CPU-bound)
- Calculating deltas between packages for [delta compression](/docs/deployment-examples/deploying-packages/delta-compression-for-package-transfers.md) (I/O-bound and CPU-bound)
- Uploading packages to deployment targets (network-bound)
- Monitoring deployment targets for job status, and collecting logs

At some point your server hardware is going to limit how many of these things a single Octopus Server can do concurrently. If a server over commits itself and hits these limits, timeouts (network or SQL connections) will begin to occur, and deployments can begin to fail. Above all else, your deployments should be repeatable and reliable.

We offer three options for scaling your Octopus Server:

- scale up by controlling the **task cap** and providing more server resources as required
- scale out using [Octopus High Availability](/docs/administration/high-availability/index.md)
- scale out using [Workers](/docs/administration/workers.index.md)

We are planning a fourth option for scaling your Octopus Server:

- dividing up your Octopus environment using [Spaces](https://octopus.com/blog/octopus-spaces-blog-series-kick-off) - planned for Octopus 2018.9.0

### Task Cap

An ideal situation would be an Octopus Server that's performing as many parallel deployments as it can, while staying just under these limits. We tried several techniques to automatically throttle Octopus Server, but in practice this kind of approach proved to be unreliable.

Instead, we decided to put this control into your hands, allowing you to control how many tasks each Octopus Server node will execute concurrently. This way, you can measure server metrics for **your own deployments**, and then increase/decrease the task cap appropriately. Administrators can change the task cap in {{Configuration>Nodes}}.

See this [blog post](https://octopus.com/blog/running-task-cap-and-high-availability) for more details on why we chose this approach.

The default task cap is set to `5` out of the box. Based on our load testing, this offered the best balance of throughput and stability for most scenarios.

The task cap also interacts with offloading deployment work to Workers.  If you have more workers available, you might be able to increase your deployment performance and [different task cap or step parallelism](/docs/infrastructure/workers.md#multiple-projects-run-simultaneously-on-workers) might be right with the extra ability to scale.


### Octopus High Availability

You can scale out your Octopus Server by implementing a [High Availability](/docs/administration/high-availability/index.md) cluster. In addition to linearly increasing the performance of your cluster, you can perform certain kinds of maintenance on your Octopus Servers without incurring downtime.

## Tips

Follow these tips to tune and maintain the performance of your Octopus:

1. Configure your Octopus Server and SQL Server on separate servers.
1. Avoid hosting your Octopus Server and its SQL Database on shared servers to prevent Octopus or the other applications from becoming "noisy neighbors".
1. Provide sufficient resources to your Octopus Server and SQL Server. Measure resource utilization during typical and/or heavy load, and decide whether you need to provision more resources.
    - We don't provide a one-size-fits-all set of specifications - your resource requirements will vary heavily depending on your specific scenario. The best way to determine what "sufficient resources" means, is to measure then adjust until you are satisfied.
1. Configure short [retention policies](/docs/administration/retention-policies/index.md). Less history == faster Octopus.
1. Maintain your SQL Server.
    - [See above](#sql-maintenance).
    - Upgrade to the latest version of Octopus Server.
    - Quite often negative performance symptoms are caused by outdated statistics or other common SQL Server maintenance problems.
1. If you have saturated your current servers you may want to consider scaling up, by increasing the resources available to the Octopus and SQL Servers, or scaling out:
    - Consider [Octopus High Availability](/docs/administration/high-availability/index.md) if you are reaching saturation on your current infrastructure, or want to improve the up-time of your Octopus Server, especially across [Operating System patches](/docs/administration/applying-operating-system-upgrades.md). Octopus High Availability is designed to scale linearly as you add nodes to your cluster.
    - Consider using [Workers](/docs/administration/workers.index.md) and worker pools if deployment load is affecting your server.  See this [blog post](https://octopus.com/blog/workers-performance) for a way to begin looking at workers for performance.
    - Consider sharing your teams/projects across "spaces" using the upcoming [Octopus Data Center Manager](https://octopus.com/blog/odcm-rfc) especially if your teams/projects are loosely coupled to each other.
1. Try not to do too much work in parallel, especially without thorough testing. Performing lots of deployment tasks in parallel can be a false economy more often than not:
    - You can configure how many tasks from the task queue will run at the same time on any given Octopus Server node by going to {{Configuration>Nodes}}. The default task cap is `5` (safe-by-default). You can increase this cap to push your Octopus to work harder.
    - Learn about [tuning your deployment processes for performance](/docs/deployment-process/performance.md).
1. Consider how you transfer your packages: {#package-transfer}
    - If network bandwidth is the limiting factor, consider using [delta compression for package transfers](/docs/deployment-examples/deploying-packages/delta-compression-for-package-transfers.md).
    - If network bandwidth is not a limiting factor, consider using a custom package feed close to your deployment targets, and download the packages directly on the agent. This alleviates a lot of resource contention on the Octopus Server.
    - If Octopus Server CPU and disk IOPS is a limiting factor, avoid using [delta compression for package transfers](/docs/deployment-examples/deploying-packages/delta-compression-for-package-transfers.md). Instead, consider downloading the packages directly on the agent. This alleviates a lot of resource contention on the Octopus Server.
1. Consider the size of your packages:
    - Larger packages require more network bandwidth to transfer to your deployment targets.
    - When using [delta compression for package transfers](/docs/deployment-examples/deploying-packages/delta-compression-for-package-transfers.md), larger packages require more CPU and disk IOPS on the Octopus Server to calculate deltas - this is a tradeoff you can determine through testing.
1. Consider the size of your Task Logs: {#tip-task-logs}
    - Larger task logs put the entire Octopus pipeline under more pressure.
    - We recommend printing messages required to understand progress and deployment failures. The rest of the information should be streamed to a file, then published as a deployment [artifact](/docs/deployment-process/artifacts.md).
1. Prefer [Listening Tentacles](/docs/infrastructure/windows-targets/tentacle-communication.md#listening-tentacles-recommended) or [SSH](/docs/infrastructure/ssh-targets/index.md) instead of [Polling Tentacles](/docs/infrastructure/windows-targets/tentacle-communication.md#polling-tentacles) wherever possible:
    - Listening Tentacles and SSH place the Octopus Server under less load.
    - We try to make Polling Tentacles as efficient as possible, but by their very nature, they can place the Octopus Server under high load just handling the incoming connections.
1. Reduce the frequency and complexity of automated health checks using [machine policies](/docs/infrastructure/machine-policies.md).
1. Disable automatic indexing of the [built-in package repository](/docs/packaging-applications/package-repositories/index.md) if not required.

## Troubleshooting

The best place to start troubleshooting your Octopus Server is to inspect the [Octopus Server logs](/docs/support/log-files.md). Octopus writes details for common causes of performance problems:

1. `Request took 5123ms: GET {correlation-id}`: If HTTP requests are taking a long time to be fulfilled, you'll see a message like this. The timer is started when the request is first received, ending when the response is sent.
    - Look for trends as to which requests are taking a really long time.
    - Look to see if the performance problem occurs, and goes away, on a regular basis. This can indicate another process hogging resources periodically.
1. The dashboard or project overview are taking a really long time to load: this is usually caused by long retention policies. Consider tightening up your retention policies to keep less releases. It can also be caused by the sheer number of projects you are using to model your deployments. Consider sharing your teams/projects across "spaces" using the upcoming [Octopus Data Center Manager](https://octopus.com/blog/odcm-rfc) especially if your teams/projects are loosely coupled to each other.
1. `{Insert/Delete/Update/Reader} took 8123ms in transaction '{transaction-name}'`: If a particular database operation takes a long time you'll see a message like this. The timer is started when the operation starts, ending when the operation is completed (including any retries for transient failure recovery).
    - If you are seeing these operations take a long time it indicates your SQL Server is struggling under load, or your network connection from Octopus to SQL Server is saturated.
    - Check the maintenance plan for your SQL Server. See [tips above](#sql-maintenance).
    - Test an extremely simple query like `SELECT * FROM OctopusServerNode`. If this query is slow it indicates a problem with your SQL Server.
    - Test a more complex query like `SELECT * FROM Release ORDER BY Assembled DESC`. If this query is slow it indicates a problem with your SQL Server, or the sheer number of Releases you are retaining.
    - Check the network throughput between the Octopus Server and SQL Server by trying a larger query like `SELECT * FROM Events`.
1. Task Logs are taking a long time to load, or your deployments are taking a long time: The size of your task logs might be to blame.
    - See [tips above](#tip-task-logs).
    - Make sure the disks used by your Octopus Server have sufficient throughput/IOPS available for processing the demand required by your scenario. Task logs are written and read directly from disk.
1. If you are experiencing overly high CPU or memory usage during deployments which may be causing your deployments to become unreliable:
   - Try reducing your Task Cap back towards the default of `5` and then increase progressively until your server is reliable again.
   - Look for potential [performance problems in your deployment processes](/docs/deployment-process/performance.md), especially:
       - Consider how you [transfer your packages](#package-transfer).
       - Consider reducing the amount of parallelism in your deployments by reducing the number of steps you run in parallel, or the number of machines you deploy to in parallel.
1. `System.InvalidOperationException: Timeout expired. The timeout period elapsed prior to obtaining a connection from the pool. This may have occurred because all pooled connections were in use and max pool size was reached.`: This error indicates two possible scenarios:
    - Your SQL Queries are taking a long time, exhausting the SQL Connection Pool. Investigate what might be making your SQL Queries take longer than they should and fix that if possible - see earlier troubleshooting points.
    - If your SQL Query performance is fine, and your SQL Server is running well below its capacity, perhaps your Octopus Server is under high load. This is perfectly normal in many situations at scale. If your SQL Server can handle more load from Octopus, you can increase the SQL Connection Pool size of your Octopus Server node(s). This will increase the amount of active connections Octopus is allowed to open against your SQL Server at any point in time, effectively allowing your Octopus Server to handle more concurrent requests. Try increasing the `Max Pool Size` in your `SQL Connection String`in the `Octopus.Server.config` file to something like `200` (the default is `100`) and see how everything performs. Learn about [Connection Strings and Max Pool Size](https://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlconnection.connectionstring).
    - Octopus is leaking SQL Connections. This should be very rare, but has happened in the past and we fix every instance we find. We recommend upgrading to the latest version of Octopus and [get help from us](#support) if the problem persists.

:::hint
Analyzing Octopus Server log files for performance problems is much easier in a tool like [Seq](https://getseq.net). We've built a [helpful tool](https://github.com/OctopusDeploy/SeqFlatFileImport) for importing Octopus Server and Task Logs directly into Seq for analysis.
:::

### Getting Help From Us {#support}

If none of these troubleshooting steps work, please get in contact with our [support team](https://octopus.com/support) and send along the following details (feel free to ignore points if they don't apply):

1. Are you running Octopus as an HA cluster, or single node?
1. Is the SQL Database Server on the same machine as Octopus or a different machine?
1. Are you hosting any other applications on the same machine as Octopus or its SQL database?
1. What kind of server specs are you running for Octopus and SQL Server?
1. Approximately how many users do you have using Octopus?
1. Approximately how many projects and machines do you have?
1. Approximately how many deployments do you perform at the same time?
1. Do you notice any correlation between deployments of certain projects and the performance problem?
1. Do you notice any correlation between other Octopus Server tasks (like package retention policy processing) and the performance problem?
1. Does the Octopus Server ever become unresponsive and how frequently does it become unresponsive?
1. Does the Octopus Server recover after the performance degrades, or does it need to be manually restarted in order to recover?

In addition to answering those questions, please collect and attach the following diagnostics to your support request (probably the most important part):

1. Attach a screen recording showing the performance problem.
1. Attach any charts showing the Octopus Server performance (CPU/RAM) for normal deployment workloads both before/after the performance problem started.
1. [Record and attach the performance problem occurring in your web browser](/docs/support/record-a-problem-with-your-browser.md) (if applicable).
1. Attach the [Octopus Server logs](/docs/support/log-files.md).
1. Attach the [raw task logs](/docs/support/get-the-raw-output-from-a-task.md) for any tasks exhibiting the performance problem, or that may have been running at the same time as the performance problem.
1. If the performance problem is causing high CPU utilization on the Octopus Server, please [record and attach a performance trace](/docs/support/record-a-performance-trace.md).
1. If the performance problem is causing high memory utilization on the Octopus Server, please [record and attach a memory trace](/docs/support/record-a-memory-trace.md).
