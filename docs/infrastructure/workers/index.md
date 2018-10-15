---
title: Workers
description: External workers are machines that Octopus can use to delegate steps to during a deployment.  You can disable the built-in worker and delegate work to external workers instead. Using external workers makes your Octopus Server more secure, and allows you to decide where your workers do their work, and the context in which they perform their work.
position: 70
---

The Octopus Server has an built-in worker that can deploy packages, execute scripts, and perform tasks that don't need to be performed on a deployment target. This can be useful when you are working with an API, a cloud service, or it doesn't matter where a script runs. The built-in worker is configured by default.

Learn more about the [built-in worker](/docs/administration/workers/built-in-worker.md).

## External Workers

An **external worker** is either a [Tentacle](/docs/infrastructure/windows-targets/index.md) or an [SSH machine](/docs/infrastructure/ssh-targets/index.md) that has been registered with the Octopus server as a worker.  The setup of a worker is the same as setting up a deployment target as a [Windows Tentacle target](/docs/infrastructure/windows-targets/index.md) or an [SSH target](/docs/infrastructure/ssh-targets/index.md), except that instead of being added to an environment, a worker is added to a worker pool.

Workers have machine policies, are health checked, and run Calamari, just like deployment targets.

!toc

## Registering an External Worker

Once the Tentacle or SSH machine has been configured, workers can be added using the UI, the [Octopus Deploy REST API](/docs/api-and-integration/api/index.md), the [Octopus.Clients library](/docs/api-and-integration/octopus.client.md) or with the tentacle executable.  Only a user with the `ConfigureServer` permission can add or edit workers.

To register a worker in the **Octopus Web Portal**, navigate to the **Infrastructure** tab, select **Workers** and click **ADD WORKER**.

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
