---
title: Worker Pools
description: Worker pools are used to group workers and allow targeting steps at the pool of workers best equipped to execute the step.  This page describes how to configure worker pools for a variety of scenarios.
position: 40
---

Worker pools are groups of [workers](/docs/infrastructure/workers/index.md).  When a task is assigned to a worker pool, the task will be executed by one of the workers you've configured in the pool.

Worker pools are available globally if not scoped by environment, and only available in the scoped environments, otherwise.  A user that can view an environment can view the worker pools scoped to that environment, and also view if there are any available workers in the pool. A user with `WorkerPoolEdit` can add and edit worker pools.  Only a user with the `WorkerView` permission can see the worker machines, and a user with `WorkerEdit` can add and edit workers.

## Default Worker Pool

There is always a default worker pool.  The default pool can't be deleted, but you can swap which pool is the default. Initially the default pool contains only the Built-in worker, but you can add other workers and remove the Built-in worker.

## Using Multiple Worker Pools

Using multiple workers pools allows you to configure the workers in your  pools for the tasks they will be assigned. For instance, depending on your teams' needs you might configure worker pools in the following ways:

- Pools for scripts that expect different operating systems (Linux vs. Windows).
- Pools for scripts that rely on different versions of cloud CLI tools: Azure CLI, AWS CLI, Terraform CLI, Kubernetes CLI (kubectl) etc.
- Pools in special subnets or with access to protected servers, such as for database deployments or in DMZs

For your default pool it might be enough that the workers are Tentacles running PowerShell 5, but you might have two teams working with different version of an SDK and so provision worker pools with workers running the appropriate SDK for each team.

## Using Workers

When a step that requires a worker is executed, Octopus first determines what worker pool the step should use, and then selects a worker from that pool to execute the step.

For a step that requires a worker, Octopus selects:

- The default pool, if no pool is selected (or the step targets the Octopus Server).
- The specified pool, if one is set.
- The result of resolving a worker pool variable, if one is specified.

When the pool has been selected, Octopus selects any healthy worker from the pool.

Octopus makes no other guarantees about which worker is picked from a pool.

The step will fail for lack of a worker if:

- There are no healthy workers in the pool.
- Octopus selects a healthy worker from the pool, but during the deployment process can't contact the worker.

## Using the Default Pool

The initial configuration has only a default pool that contains the built-in worker.  Because no steps will reference a worker pool, all steps that require a worker will resolve to the default pool and Octopus will pick the healthy worker in that pool - the built-in worker.

If you want to move steps off the Octopus server, but don't want to change deployment processes, then simply add external workers to the default worker pool and disable the built-in worker.  Steps that need a worker will still resolve to the default pool, but now Octopus will pick an external worker.

## Add New Worker Pools

Only users with the `WorkerPoolEdit` permission can add or edit worker pools.

1. Navigate to {{Infrastructure,Worker Pools}} in the **Octopus Web Portal** and click **ADD WORKER POOL**.  
1. Give the worker pool a meaningful name.
1. If this pool should be the default worker pool expand the **Default Worker Pool** section and the default checkbox.
1. Give the worker pool a description.

You can add as many worker pools as you need.

## Restricting pools to environments

If you select environment restrictions for a pool, it can only be used for deployments to those environments.  A deployment will fail if any step resolves to a pool that isn't available in the deployment environment.  Restricting pools to particular environments is useful, for example, if the workers are configured with security relating to the environment, or if you want to reserve particular workers to be available for production deployments and not be burdened by developement workloads.

If pools are restricted to environments, it's helpful to target steps at worker pool variables that evaluate to the correct pool for each environment.

## Configuring a Step to Use a Worker Pool

If there are worker pools configured, any step that requires a worker can be targeted at a pool.  It's possible to use multiple pools in the one deployment process, for example, if you configured one pool of workers for script steps and another for Azure deployments.  Once there are pools other than the default configured, the **Octopus Web Portal** will give you the option of selecting a pool or a variable for any step that requires a worker.  Leaving this option blank always results in the default pool.

:::hint
**What's Shown in the UI?**
The **Octopus Web Portal** is worker pool aware.  If you haven't configured pools or workers, the only option for steps that require a worker is the built-in worker, so the UI will only display the option to run a step on the `Octopus Server`.  In this case, Azure, AWS and Terraform steps will assume the default and display no choice.  If you have configured extra workers or pools, script, Azure, AWS and Terraform steps will allow the selection of a worker pool.
:::

## Configuring a Cloud Target to Have a Default Worker Pool

Cloud targets can set their own default pool.  If a step is targeted at a cloud target and the worker pool for the step is the default pool, the cloud target's default pool is used.  This allows setting up workers that are co-located with cloud targets.  Another option is locking down cloud targets so the only machines that can deploy are co-located polling workers.

Health checks for cloud targets are run from the target's default worker pool (or the global defaul if non is set for the target).

## Workers Q&A

*I've added only a single worker to the default pool and removed the built-in worker, won't that machine get overworked?*

Your server has a task cap governing how many deployment tasks can run in parallel.  Variable `Octopus.Action.MaxParallelism` then governs the amount of parallelism Octopus allows within a deployment task.  The amount of work the built-in worker could be asked to do at once is governed by these two numbers.  With external workers, it's the same.  So a single external worker is only being asked to do the same amount of work the built-in was doing.  However, workers does give you the capability to spread that work over a number of machines, and to scale up how much work is being done.

*Isn't the built-in worker a bit special?*

It was a bit special before Octopus version 2018.2.0.  It wasn't visible and would only be available in the default pool if the pool was empty.  Now it acts like any other worker.

*Can I leave the built-in worker in the default pool, so some scripts do run on the server, but also provision other pools?*

Yes, the existence of other pools doesn't affect the behavior of the default pool.

*I see "leases" being taken out on particular workers in the deployment logs, can I get an exclusive lease for my deployment and clean off the worker once I'm done?*

Not yet.  At the moment, the only time an exclusive lease is taken out is if a Tentacle upgrade runs on a worker.  We are thinking about features that allow exclusive access for deployments.
