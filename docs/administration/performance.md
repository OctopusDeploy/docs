---
title: Performance
description: Octopus is all about reliable and repeatable deployments, but that doesn't mean it has to be slow. This page will help you tune your Octopus installation for the best performance in your scenario. 
position: 10
---

Over the years we have built Octopus to enable reliable and repeatable deployments, but that doesn't necessarily mean it has to be slow. In fact, Octopus can scale with you as you grow. Octopus is a complex system with a core component allowing you to run your own custom scripts. We work hard to ensure all the parts we control work quickly and efficiently leaving as many resources as possible for running your deployments. That being said, there are many things you can do to ensure your Octopus installation continues to operate efficiently.

## Maintenance

Routine maintenance can help your Octopus keep running at optimum performance and efficiency.

### Retention policies

Octopus are generally hygienic creatures, cleaning up after themselves, and your Octopus is no different. Configuration documents, like [projects](/docs/key-concepts/projects/index.md) and [environments](/docs/key-concepts/environments/index.md), are stored until you delete them, unlike historical documents like [releases](/docs/key-concepts/projects/releases.md). These will be cleaned up according to the [retention policies](/docs/administration/retention-policies/index.md) you configure.

_The one exception to this is the `Events` table which records an [audit trail](/docs/administration/auditing.md) of every significant event in your Octopus._

A tighter retention policy means your Octopus Server will run faster across the board.

### SQL Server Maintenance {#sql-maintenance}

[SQL Server](/docs/installation/installing-octopus/sql-server-database-requirements.md) is the data persistence backbone of Octopus. Performance problems with your SQL Server will make Octopus run and feel slow and sluggish. You should implement a routine maintenance plan for your Octopus database. Here is a [sure guide](http://g.octopushq.com/SQLServerMaintenanceGuide) (free e-book) for maintaining SQL Server.

## Tips

Follow these tips to tune and maintain the performance of your Octopus:

1. Configure your Octopus Server and SQL Server on separate servers.
1. Avoid hosting your Octopus Server and its SQL Database on shared servers to prevent Octopus or the other applications from becoming "noisy neighbors".
1. Provide sufficient resources to your Octopus Server and SQL Server. Measure resource utilization during typical and/or heavy load, and decide whether you need to provision more resources.
    - We don't provide a one-size-fits-all set of specifications - your resource requirements will vary heavily depending on your specific scenario. The best way to determine what "sufficient resources" means, is to measure then adjust until you are satisfied.
1. Configure short [retention policies](/docs/administration/retention-policies/index.md). Less history == faster Octopus.
1. Maintain your SQL Server.
    - [See above](#sql-maintenance).
    - Quite often negative performance symptoms are caused by outdated statistics or other common SQL Server maintenance problems.
1. If you have saturated your current servers you may want to consider scaling up, by increasing the resources available to the Octopus and SQL Servers, or scaling out:
    - Consider [Octopus High Availability](/docs/administration/high-availability/index.md) if you are reaching saturation on your current infrastructure, or want to improve the up-time of your Octopus Server, especially across [Operating System patches](/docs/administration/applying-operating-system-upgrades.md). Octopus High Availability is designed to scale linearly as you add nodes to your cluster.
    - Consider sharding your teams/projects across "spaces" using the upcoming [Octopus Data Centre Manager](https://octopus.com/blog/odcm-rfc) especially if your teams/projects are loosely coupled to each other.
1. Try not to do too much work in parallel, especially without thorough testing. Performing lots of deployment tasks in parallel can be a false economy more often than not:
    - You can configure how many tasks from the task queue will run at the same time on any given Octopus Server node by going to {{Configuration>Nodes}}. The default task cap is `5` (safe-by-default). You can increase this cap to push your Octopus to work harder.
    - Learn about [tuning your deployment processes for performance]().
1. Consider how you transfer your packages:
    - If network bandwidth is the limiting factor, consider using [delta compression for package transfers](/docs/deploying-applications/delta-compression-for-package-transfers.md).
    - If network bandwidth is not a limiting factor, consider using a custom package feed close to your deployment targets, and download the packages directly on the agent.
1. Consider the size of your packages:
    - Larger packages require more network bandwidth to transfer to your deployment targets.
    - When using [delta compression for package transfers](/docs/deploying-applications/delta-compression-for-package-transfers.md), larger packages require more CPU on the Octopus Server to calculate deltas - this is a tradeoff you can determine through testing.
1. Consider the size of your Task Logs: {#tip-task-logs}
    - Larger task logs put the entire Octopus pipeline under more pressure.
    - We recommend printing messages required to understand progress and deployment failures. The rest of the information should be streamed to a file, then published as a deployment [artifact](/docs/deploying-applications/artifacts.md).
1. Prefer [Listening Tentacles](/docs/installation/installing-tentacles/listening-tentacles.md) or [SSH](/docs/deployment-targets/ssh-targets/index.md) instead of [Polling Tentacles](/docs/installation/installing-tentacles/polling-tentacles.md) wherever possible:
    - Listening Tentacles and SSH place the Octopus Server under less load.
1. Reduce the frequency and complexity of automated health checks using [machine policies](/docs/key-concepts/environments/machine-policies.md).
1. Disable automatic indexing of the [built-in package repository](/docs/packaging-applications/package-repositories/index.md) if not required.

## Troubleshooting

The best place to start troubleshooting your Octopus Server is to inspect the [Octopus Server logs](/docs/reference/log-files.md). Octopus writes details for common causes of performance problems:

1. `Request took 5123ms: GET {correlation-id}`: If HTTP requests are taking a long time to be fulfilled, you'll see a message like this. The timer is started when the request is first received, ending when the response is sent.
    - Look for trends as to which requests are taking a really long time.
    - Look to see if the performance problem occurs, and goes away, on a regular basis. This can indicate another process hogging resources periodically.
1. The dashboard or project overview are taking a really long time to load: this is usually caused by long retention policies. Consider tightening up your retention policies to keep less releases.
1. `{Insert/Delete/Update/Reader} took 8123ms in transaction '{transaction-name}'`: If a particular database operation takes a long time you'll see a message like this. The timer is started when the operation starts, ending when the operation is completed (including any retries for transient failure recovery).
    - If you are seeing these operations take a long time it indicates your SQL Server is struggling under load, or your network connection from Octopus to SQL Server is saturated.
    - Check the maintenance plan for your SQL Server. See [tips above](#sql-maintenance).
    - Test an extremely simple query like `SELECT * FROM OctopusServerNode`. If this query is slow it indicates a problem with your SQL Server.
    - Test a more complex query like `SELECT * FROM Release ORDER BY Assembled DESC`. If this query is slow it indicates a problem with your SQL Server, or the sheer number of Releases you are retaining.
    - Check the network throughput between the Octopus Server and SQL Server by trying a larger query like `SELECT * FROM Events`.
1. Task Logs are taking a long time to load, or your deployments are taking a long time: The size of your task logs might be to blame.
    - See [tips above](#tip-task-logs).
    - Make sure the disks used by your Octopus Server have sufficient throughput/IOPS available for processing the demand required by your scenario. Task logs are written and read directly from disk.

:::tip
Analyzing Octopus Server log files for performance problems is much easier in a tool like [Seq](https://getseq.net). We've built a [helpful tool](https://github.com/OctopusDeploy/SeqFlatFileImport) for importing Octopus Server and Task Logs directly into Seq for analysis.
:::

### Getting help from us {#support}

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
1. [Record and attach the performance problem occurring in your web browser](/docs/how-to/record-a-problem-with-your-browser.md) (if applicable).
1. Attach the [Octopus Server logs](/docs/reference/log-files.md).
1. Attach the [raw task logs](/docs/how-to/get-the-raw-output-from-a-task.md) for any tasks exhibiting the performance problem, or that may have been running at the same time as the performance problem.
1. If the performance problem is causing high CPU utilization on the Octopus Server, please [record and attach a performance trace](/docs/how-to/record-a-performance-trace.md).
1. If the performance problem is causing high memory utilization on the Octopus Server, please [record and attach a memory trace](/docs/how-to/record-a-memory-trace.md).