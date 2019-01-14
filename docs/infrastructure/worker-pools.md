---
title: Worker Pools
description: Worker pools are used to group workers and allow targeting steps at the pool of workers best equipped to execute the step.  This page describes how to configure worker pools for a variety of scenarios.
position: 40
---

Worker pools are groups of [workers](/docs/infrastructure/workers/index.md), when a task is assigned to a worker, the task will be executed by one of the workers in the worker pools you've configured.

## Default Worker Pool

There is always a default worker pool, and the default pool can't be deleted, but you can swap which pool is the default. Worker pools are global resources which can't be scoped.  All users can see what pools are available and if there are workers in the pools. Only a user with the `ConfigureServer` permission can see the worker machines or edit workers or pools.

Using multiple workers pools allows you to configure the workers in your  pools for the tasks they will be assigned. For instance, depending on your teams needs you might configure worker pools in the following ways:

- Pools for scripts that expect different operating systems (Linux vs. Windows).
- Pools for scripts that rely on different versions of cloud CLI tools: Azure CLI, AWS CLI, Terraform CLI, Kubernetes CLI (kubectl) etc.
- Pools in special subnets or access to protected servers, such as for database deployments or in DMZs

For your default pool it might be enough that the workers are Tentacles running PowerShell 5, but you might have two teams working with different version of an SDK and so provision worker pools with workers running the appropriate SDK for each team.

## Using Workers

When a step that requires a worker is executed, Octopus first determines what worker pool the step should use, and then selects a worker from that pool to execute the step.

For a step that requires a worker, Octopus selects:

- The default pool, if no pool is selected (or the step targets the Octopus Server).
- The specified pool.

When the pool has been selected, Octopus selects a worker from the pool:

- A healthy worker from the selected pool.
- The built-in worker, if the step resolves to the default pool, but there are no workers in the default pool. Note, if there are unhealthy workers in the pool, the built-in worker will **not** run. It will only run if there are no workers in the pool.

Octopus makes no other guarantees about which worker is picked from a pool.

The step will fail for lack of a worker if:

- The step resolves to the built-in worker but it has been disabled.
- There are no healthy workers in the pool.
- Octopus selects a healthy worker from the pool, but during the deployment process can't contact the worker.

## Using the Default Pool for Scripts

When you add workers to the default worker pool the built-in worker will be disabled. This means any deployment processes that previously used the built-in worker on the Octopus server, will automatically move from using the built-in worker to workers in the worker pool.

## Add New Worker Pools

Only users with the `ConfigureServer` permission can add or edit worker pools.

1. Navigate to {{Infrastructure,Worker Pools}} in the **Octopus Web Portal** and click **ADD WORKER POOL**.  
1. Give the worker pool a meaningful name.
1. If this pool should be the default worker pool expand the **Default Worker Pool** section and the default checkbox.
1. Give the worker pool a description.

You can add as many worker pools as you need.

## Configuring a Step to Use a Worker Pool

If there are worker pools configured, any step that requires a worker can be targeted at any pool.  It's possible to use multiple pools in the one deployment process, for example, if you configured one pool of workers for script steps and another for Azure deployments.  Once there are worker pools configured, the **Octopus Web Portal** will ensure a pool is set for any step that requires a worker.

:::hint
**What's Shown in the UI?**
The **Octopus Web Portal** is worker pool aware.  If you haven't configured pools or workers, the only option for steps that require a worker is the built-in worker, so the UI will only display the option to run a step on the `Octopus Server`.  In this case, Azure, AWS and Terraform steps will assume the default and display no choice.  If you have configured extra workers or pools, script, Azure, AWS and Terraform steps will allow the selection of a worker pool.
:::

## Configuring a Cloud Target to Have a Default Worker Pool

Cloud targets can set their own default pool.  If a step is targeted at a cloud target and the worker pool for the step is the default pool, the cloud target's default pool is used.  This allows setting up workers that are co-located with cloud targets.  Another option is locking down cloud targets so the only machines that can deploy are co-located polling workers.

## Workers Q&A

*I've added only a single worker to the default pool, won't that machine get overworked?*

Your server has a task cap governing how many deployment tasks can run in parallel.  Variable `Octopus.Action.MaxParallelism` then governs the amount of parallelism Octopus allows within a deployment task.  The amount of work the built-in worker could be asked to do at once is governed by these two numbers.  With external workers, it's the same, so a single external worker is only being asked to do the same amount of work the built-in was doing.  However, workers does give you the capability to spread that work over a number of machines, and to scale up how much work is being done.

*If the workers in the default pool aren't healthy will the built-in worker run?*

No, the built-in worker can only run if there are no workers in the default pool.

*Can I leave the default pool empty, so some scripts do run on the server, but also provision other pools?*

Yes, the existence of other pools doesn't affect the behavior of the default pool.

*How can I cordon off my worker pools so each team only has access to certain pools?*

At the moment all worker pools are global, so you can provision pools for various teams or projects, but there's no way to enforce the division.  We'll soon be releasing our Spaces feature that will allow worker pools to be restricted to spaces.

*I see "leases" being taken out on particular workers in the deployment logs, can I get an exclusive lease for my deployment and clean off the worker once I'm done?*

Not yet.  At the moment, the only time an exclusive lease is taken out is if a Tentacle upgrade runs on a worker.  We are thinking about features that allow exclusive access for deployments.
