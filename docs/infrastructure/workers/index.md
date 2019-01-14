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

## Built-in Worker

The Octopus server has an built-in worker that can deploy packages, execute scripts, and perform tasks that don't need to be performed on a deployment target. The built-in worker is configured by default, however, the built-in worker can be disabled by navigating to **Configuration** and selecting **Disable** fo the **Run steps on the Octopus Server** option.

Learn more about the [built-in worker](/docs/administration/workers/built-in-worker.md).

## External Workers

An **external worker** is either a [Tentacle](/docs/infrastructure/deployment-targets/windows-targets/index.md) or an [SSH machine](/docs/infrastructure/deployment-targets/linux/index.md) that has been registered with the Octopus server as a worker.  The setup of a worker is the same as setting up a deployment target as a [Windows Tentacle target](/docs/infrastructure/deployment-targets/windows-targets/index.md) or an [SSH target](/docs/infrastructure/deployment-targets/linux/index.md), except that instead of being added to an environment, a worker is added to a worker pool.

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
