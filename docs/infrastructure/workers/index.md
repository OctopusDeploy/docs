---
title: Workers
description: External workers are machines that can execute steps that don't need to be performed on the Octopus server or deployment targets.
position: 30
---

Workers are machines that can execute tasks that don't need to be run on the Octopus server or individual deployment targets.

Workers are useful for the following steps:

- Publishing to Azure websites.
- Deploying AWS CloudFormation templates.
- Deploying to AWS Elastic Beanstalk.
- Uploading files to Amazon S3.
- Backing up databases.
- Performing database schema migrations
- Configuring load balancers.

![Workers diagram](workers-diagram-img.png "width=1000")

## Where Steps Run

The following step types and configurations run on a worker:

- Any step that runs a script (usually user supplied) or has a package that has an execution plan of `Octopus Server`, `Octopus Server on behalf of roles`, `Worker Pool` or `Worker Pool on behalf of roles`.
- Any steps that run on a Cloud Region, an Azure Target, or any target that isn’t a Tentacle, an SSH Target, or an Offline Drop.
- All AWS, Terraform, and Azure steps.

The following steps always run inside the Octopus Server process (and do not run user-supplied code):

- Email
- Manual Intervention
- Import Certificate

A worker receives instruction from the Octopus server to execute a step, it executes the step using Calamari and returns the logs and any collected artifacts to the Octopus server.

There are two kinds of workers you can use in Octopus:

1. [The built-in worker](#built-in-worker) (default)
1. [External workers](#external-workers)

## Ignoring Workers

Octopus works out-of-the-box without setting up workers.  You can run all deployment processes, run script steps on the built-in worker, deploy to Azure and run AWS and Terraform steps, without further setup.  The built-in worker is available in a default Octopus set up, and Octopus workers are designed so that, if you aren't using external workers, none of your deployment processes need to be worker aware.

The choices of built-in worker, built-in worker running in a separate account, and external workers enable to you harden your Octopus server and scale your deployments.

## Migrating to Workers

Octopus workers also provides a smooth path to move off the built-in worker, and thus off running scripts on the Octopus server, and onto external workers, without updating any deployment processes.  Learn about how to [use the default worker pool to move steps off the Octopus server](/docs/infrastructure/workers/worker-pools.md#Using-the-default-pool-to-stop-running-scripts-on-the-server).


## Built-in Worker {#built-in-worker}

The Octopus server has an built-in worker that can deploy packages, execute scripts, and perform tasks that don't need to be performed on a deployment target. The built-in worker is configured by default, however, the built-in worker can be disabled by navigating to **Configuration** and selecting **Disable** fo the **Run steps on the Octopus Server** option.

The **built-in worker** is executed on the same machine as the Octopus server.  When the built-in worker is needed to execute a step, the Octopus Server spawns a new process and runs the step using Calamari.  The spawned process is either under the server's security context (default) or under a [context configured for the built-in worker](/docs/infrastructure/workers/built-in-worker.md#Running-tasks-on-the-Octopus-Server-as-a-different-user).

Learn about the security implications and how to configure the [built-in worker](/docs/infrastructure/workers/built-in-worker.md).

## External Workers {#external-workers}

An **external worker** is either a [Tentacle](/docs/infrastructure/deployment-targets/windows-targets/index.md) or an [SSH machine](/docs/infrastructure/deployment-targets/linux/index.md) that has been registered with the Octopus server as a worker.  The setup of a worker is the same as setting up a deployment target as a [Windows Tentacle target](/docs/infrastructure/deployment-targets/windows-targets/index.md) or an [SSH target](/docs/infrastructure/deployment-targets/linux/index.md), except that instead of being added to an environment, a worker is added to a worker pool.

Using external workers allows delegating work to a machine other than the Octopus server.  This can make the server more secure and allow scaling.  When Octopus executes a step on an external worker, it's the external worker that executes Calamari and no user-provided script executes on the Octopus Server itself.

Workers have machine policies, are health checked, and run Calamari, just like deployment targets.

## Registering an External Worker

Once the Tentacle or SSH machine has been configured, workers can be added using the [Web Portal](#registering-workers-in-the-web-portal), the [Octopus Deploy REST API](/docs/api-and-integration/api/index.md), the [Octopus.Clients library](/docs/api-and-integration/octopus.client.md) or with the tentacle executable.  Only a user with the `ConfigureServer` permission can add or edit workers.

### Registering Workers in the Web Portal

1. Navigate to {{Infrastructure,Workers}} and click **ADD WORKER**.
1. Select **WINDOWS** or **SSH CONNECTION** and click the card for the type of worker you want to configure.

You can choose between:

- [Register a Worker as a Listening Mode](#register-a-worker-as-a-listening-tentacle).
- [Register a Worker as a Polling Mode](#register-a-worker-as-a-polling-tentacle).
- [Register a Worker with an SSH Connection](#register-a-worker-with-an-ssh-connection).

### Register a Worker as a Listening Tentacle

!include <install-tentacle-manager>
!include <configure-listening>
1. Select which worker pool the deployment target will be assigned to and click **SAVE**.

After you have saved the new worker, you can navigate to the worker pool you assigned the worker to, to view its status.

### Register a Worker as a Polling Tentacle

It is not currently possible to configure a worker as a Polling Tentacle with the Tentacle Manager, please [Registering Workers with the Tentacle Executable](#registering-workers-with-the-tentacle-executable).

### Register a Worker with an SSH Connection

To register a worker with an SSH Connection, see the instructions for configuring [SSH deployment targets](/docs/infrastructure/deployment-targets/linux/index.md).

### Registering Workers with the Tentacle Executable

Tentacle workers can also register with the server using the Tentacle executable (version 3.22.0 or later), for example:

```
.\Tentacle.exe register-worker --instance MyInstance --server "https://example.com/" --comms-style TentaclePassive --apikey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO" --workerpool "Default Worker Pool"
```

Use `TentacleActive` instead of `TentaclePassive` to register a polling Tentacle worker.

The Tentacle executable can also be used to deregister workers, for example:
```
.\Tentacle.exe deregister-worker --instance MyInstance --server "https://example.com/" --apikey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO"
```

## Recommendations for External Workers

We highly recommend setting up external workers on a different machine to the Octopus Server.

We also recommend running external workers as a different user account to the Octopus Server.

It can be advantageous to have workers on the same local network as the server to reduce package transfer times.

Default pools attached to cloud targets allow co-location of workers and targets, this can help make workers specific to your targets as well as making the Octopus Server more secure by using external workers.

## Multiple Projects Run Simultaneously on Workers

Many workers may be running in parallel and a single worker can run multiple actions in parallel.  

The [task cap](/docs/support/increase-the-octopus-server-task-cap.md) determines how many tasks (deployments or system tasks) can run simultaneously.  The [Octopus System Variable](/docs/deployment-process/variables/system-variables.md) `Octopus.Action.MaxParallelism` controls how much parallelism is allowed in executing a deployment action.  It applies the same to deployment targets as it does to workers.   For example, if `Octopus.Action.MaxParallelism` is at its default value of 10, any one deployment action will being deploying to at most 10 deployment targets simultaneously, or have no more than 10 concurrent worker invocations running. Parallel steps in a deployment can each reach their own `MaxParallelism`.  Coupled with multiple deployment tasks running, up to the task cap, you can see the number of concurrent worker invocations can grow quickly.

External workers and the built-in worker have the same behavior in this regard and in that Workers can run many actions simultaneously and can run actions from different projects simultaneously.  Note that this means the execution of an action doesn't have exclusive access to a worker, which could allow one project to access the working folder of another project.

Note that if external workers are added to the default pool, then the workload is shared across those workers: a single external worker will be asked to perform exactly the same load as the built-in worker would have been doing, two workers might get half each, etc.

### Workers in HA Setups

In an HA Octopus setup, each node has a task cap and can invoke a built-in worker locally, so for a 4-node HA cluster, there are 4 built-in workers.  Therefore if you move to external workers, it's likely you'll need to provision workers to at least match your server nodes, otherwise, you'll be asking each worker to do the sum of what the HA nodes were previously doing.
