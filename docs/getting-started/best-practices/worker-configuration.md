---
title: Worker Configuration
description: Guidelines and recommendations for configuring workers in Octopus Deploy.
position: 30
hideInThisSection: true
---

[Workers](/docs/infrastructure/workers/index.md) were introduced in **Octopus Server 2018.7** as a way to offload work done by the Octopus Server.  Worker pools are groups of workers.  You configure your deployment or runbook to run on worker pools.

Some important items to note about workers:
- Workers serve as "jumpboxes" between the server and targets where the tentacle agent cannot be installed such databases, Azure Web Apps or K8s clusters.  The scripts to update the database schema or the kubectl scripts to change the K8s cluster have to run somewhere.
- Unlike deployment targets workers are designed to run multiple tasks concurrently.
- It is possible for a steps to run on different workers, even if the the steps reference the same pool.  
- **Octopus Server 2020.1** added the [Worker Pool Variable Type](/docs/projects/variables/worker-pool-variables.md) making it possible to scope worker pools to environments.
- **Octopus Server 2020.2** added [execution container for workers](/docs/projects/steps/execution-containers-for-workers.md) making it easier to manage software dependencies.
- We provide a [tentacle docker image](https://hub.docker.com/repository/docker/octopusdeploy/tentacle) that can be configured to run as a worker.

![Workers diagram](/docs/shared-content/concepts/images/workers-diagram-img.png "width=1000")

## Provided Workers

The Octopus Server includs a [built-in worker](/docs/infrastructure/workers/buit-in-worker.md).  When you configure a deployment or runbook to run tasks on the server it is actually handing off that work to the built-in worker.   

:::hint
Octopus Cloud is running the Octopus Linux container.  To ensure maximum cross-compatiability with both Windows and Linux, the built-in worker is disabled on Octopus Cloud.  Instead we provide you with the ability to choose from 3 dynamic workers, Windows Server 2016, Windows Server 2019 and Ubuntu 18.04.  
:::

The built-in worker and dynamic workers were created to help get you started.  Using them at scale will quickly expose their flaws.

- The built-in worker will run under the same account as the Octopus Deploy service.  By default that is `Local System`.  You can change it to run under a different account, but it can only run under one account.
- The built-in worker may or may not be in the same data center as your deployment targets.  You could experience some significant latency.
- Dynamic workers and built-in worker are limited to the software installed on the host servers.  
- The IP address assigned to dynamic workers will change at least once an hour and at most once every 72 hours.  

## Recommendation

If you plan on using Octopus Deploy at scale, [disable the built-in worker](/docs/infrastructure/workers/built-in-worker.md#switching-off-the-built-in-worker) for self-hosted or stop using the dynamic workers.

- Establish an easy to understand naming convention for workers.  For example `p-db-omaha-worker-01` for a worker located in Omaha to do database deployments on Production.  
- Configure workers to run in the same data centers as your deployment targets.  For example, if you are hosting Octopus Deploy in an on-premise data center, but you are deploying to the US-central region in Azure, then create workers to run in that region in Azure.  
- Name the worker pool to match the purpose, location, and environment.  For example, `Azure Central US Production Worker Pool`.
- When possible, configure the underlying tentacle Windows service as a specific Active Directory account to better control the permissions.  Consider not only what it should have access to (this worker can run SQL Scripts on a Dev SQL Server), but also what it shouldn't have access to (this worker cannot run SQL Scripts on any Test or Production SQL Server).
- For redudancy, have at least two workers per pool.
- Whenever possible leverage [execution container for workers](/docs/projects/steps/execution-containers-for-workers.md) to limit the amount of software to install and maintain on the workers.

## The difference between workers and high availability nodes

With the introduction of workers there was some confusion as to the difference between a worker and a [high availability node](/docs/administration/high-availability/index.md).  They are not the same thing.  Here are the key differences.

- A high availability node is running the Octopus Server service while a worker is running the Octopus Tentacle service.
- A high availability node is responsible for hosting the Octopus Deploy UI while a worker does no such thing.
- A high availability node orchestrates and coordinates deployments and runbook runs while a worker may be used to run 1 to N steps in a deployment or runbook run.

Think of the high availability node as the manager and the worker as well, the worker doing the work.

## The difference between workers and deployment targets

There isn't much difference between a deployment target or a worker as both are tentacle agents.  It is a matter of how they are registered.  Deployment targets are registered to environments while workers are registered to worker pools.  In fact a listening tentacle can be registered as both a worker and a deployment target.  We don't recommend it, but it is possible.

<span><a class="btn btn-outline-dark" href="/docs/getting-started/best-practices/space-recommendations">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/best-practices/environments-and-deployment-targets">Next</a></span>