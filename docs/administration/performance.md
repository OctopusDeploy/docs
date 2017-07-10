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

### SQL Server Maintenance

[SQL Server](/docs/installation/installing-octopus/sql-server-database-requirements.md) is the data persistence backbone of Octopus. Performance problems with your SQL Server will make Octopus run and feel slow and sluggish. You should implement a routine maintenance plan for your Octopus database. Here is a [sure guide](http://g.octopushq.com/SQLServerMaintenanceGuide) (free e-book) for maintaining SQL Server.

## Tips

Follow these tips to tune and maintain the performance of your Octopus:

1. Configure your Octopus Server and SQL Server on separate servers.
1. Provide sufficient resources to your Octopus Server and SQL Server. Measure resource utilization during typical and/or heavy load, and decide whether you need to provision more resources.
1. Configure short [retention policies](/docs/administration/retention-policies/index.md). Less history == faster Octopus.
1. Maintain your SQL Server. Here is a [sure guide](http://g.octopushq.com/SQLServerMaintenanceGuide) (free e-book) for maintaining SQL Server. Quite often negative performance symptoms are caused by outdated statistics or other common SQL Server maintenance problems.
1. Measure the resource utilization of your Octopus Server and SQL Server processes. If you have saturated your infrastructure you may want to consider scaling up by increasing the resources available, or scaling out using [Octopus High Availability](/docs/administration/high-availability/index.md) or the upcoming [Octopus Data Centre Manager](https://octopus.com/blog/odcm-rfc).
    - Consider [Octopus High Availability](/docs/administration/high-availability/index.md) if you are reaching saturation on your current infrastructure, or want to improve the up-time of your Octopus Server, especially across [Operating System patches](/docs/administration/applying-operating-system-upgrades.md).
    - Consider sharding your teams/projects across "spaces" using the upcoming [Octopus Data Centre Manager](https://octopus.com/blog/odcm-rfc) especially if your teams/projects are loosely coupled to each other.
1. Try not to do too much work in parallel, especially without thorough testing. Performing lots of deployment tasks in parallel can be a false economy more often than not:
    - You can configure how many tasks from the task queue will run at the same time on any given Octopus Server node by going to {{Configuration>Nodes}}. The default task cap is `5` (safe-by-default). You can increase this cap to push your Octopus to work harder.
    - You can configure your project deployment process to start certain steps at the same time, running the steps in parallel. [Learn more](/docs/key-concepts/projects/deployment-processes.md#DeploymentProcesses-HowOctopusexecutesyourdeploymentprocess).
    - You can configure each step of your deployment process to deploy to all deployment targets in parallel, or progress through your deployment targets in batches as a [rolling deployment](/docs/key-concepts/projects/deployment-processes.md#rolling-deployments).

## Troubleshooting



### Getting help from us {#support}

If none of these troubleshooting steps work, please get in contact with our [support team](https://octopus.com/support) and send along the following details (feel free to ignore points if they don't apply):

1. Are you running Octopus as an HA cluster, or single node?
1. Is the SQL Database Server on the same machine as Octopus or a different machine?
1. What kind of server specs are you running for Octopus and SQL Server?
1. Approximately how many users do you have using Octopus?
1. Approximately how many projects and machines do you have?
1. Approximately how many deployments do you perform at the same time?
1. Do you notice any correlation between deployments of certain projects and the performance problem?
1. Do you notice any correlation between other Octopus Server tasks (like package retention policy processing) and the performance problem?
1. Does the Octopus Server ever become unresponsive and how frequently does it become unresponsive?
1. Does the Octopus Server recover after the performance degrades, or does it need to be manually restarted in order to recover?

In addition to answering those questions, please collect and attach the following diagnostics to your support request (probably the most important part):

1. Attach any charts showing the Octopus Server performance (CPU/RAM) for normal deployment workloads both before/after the performance problem started.
1. [Record and attach the performance problem occurring in your web browser](/docs/how-to/record-a-problem-with-your-browser.md) (if applicable).
1. Attach the [Octopus Server logs](/docs/reference/log-files.md).
1. Attach the [raw task logs](/docs/how-to/get-the-raw-output-from-a-task.md) for any tasks exhibiting the performance problem, or that may have been running at the same time as the performance problem.
1. If the performance problem is causing high CPU utilization on the Octopus Server, please [record and attach a performance trace](/docs/how-to/record-a-performance-trace.md).
1. If the performance problem is causing high memory utilization on the Octopus Server, please [record and attach a memory trace](/docs/how-to/record-a-memory-trace.md).
1. 