---
title: Worker Pools
description: Worker pools are used to group workers and allow targeting steps at the pool of workers best equiped to execute the step.  This page describes how to configure worker pools for a variety of scenarios.
position: 1
---

Worker pools are used to group workers and allow targeting steps at the pool of workers best equiped to execute the step.  There is always a default worker pool available.  The default pool can't be deleted, but you can swap which pool is the default.

Worker pools are global resources and can't be scoped for example to environments.  All users can see what pools are available and if there are workers in the pools.  Only a user with the `ConfigureServer` permission can see the worker machines or edit workers or pools.

When a [step that requires a worker](index.md#Where-steps-run) is executed, Octopus first determines what worker pool the step should use, and then selects a worker from that pool to execute the step.

!toc

## How the worker pool for a step is determined

For a step that requires a worker, Octopus selects

- the default pool, if no pool is selected (or the step targets the Octopus Server), or
- the specified pool, otherwise.

## How the worker is selected from a pool

Given the determination of a pool, Octopus then selects

- the built-in worker, if the step resolves to the default pool and there are no workers in the default pool, or
- a healthy worker from the pool, otherwise.

Octopus makes no other guarantees about what worker is picked from a pool.

The step will fail for lack of a worker if

- the step resolves to the built-in worker but it has been disabled,
- there are no healthy workers in the pool, or
- Octopus selects a healthy worker from the pool, but during the deployment process can't contact the worker.

## Using the default pool to stop running scripts on the server

It's possible to move off running steps on the built-in worker, and thus off the Octopus server, without updating any deployment processes.  Simply adding workers to the default pool will disable the built-in worker and direct any steps that require a worker to the added workers.

## Add New Worker Pools

Add new worker pools to Octopus by navigating to **{{Infrastructure,Worker Pools}}** in the **Octopus Web Portal** and click **ADD WORKER POOL**.  Only a user with the `ConfigureServer` permission can add or edit worker pools.

You can add as many worker pools as you need.

## Configuring a step to use a worker pool

If there are worker pools configured, any step that requires a worker can be targeted at any pool.  It's possible to use multiple pools in the one deployment process, for example, if you configured one pool of workers for script steps and another for Azure deployments.  Once there are worker pools configured, the **Octopus Web Portal** will ensure a pool is set for any step that requires a worker.

:::hint
**What's shown in the UI?**
The **Octopus Web Portal** is worker pool aware.  If you haven't configured pools or workers, the only option for steps that require a worker is the built-in worker, so the UI will only display the option to run a step on the `Octopus Server`.  In this case, Azure, AWS and Terraform steps will assume the default and display no choice.  If you have configured extra workers or pools, script, Azure, AWS and Terraform steps will allow the selection of a worker pool.
:::



## Configuring a cloud target to have a default worker pool

Cloud targets can set their own default pool.  If a step is targeted at a cloud target and the worker pool for the step is the default pool, the cloud target's default pool is used.  This allows setting up workers that are co-located with cloud targets.  Another option is locking down cloud targets so the only machines that can deploy are co-located polling workers.

## Workers Q&A

*I've added only a single worker to the default pool, won't that machine get overworked?*

Your server has a task cap governing how many deployment tasks can run in parallel.  Variable `Octopus.Action.MaxParallelism` then governs the amount of parallelism Octopus allows within a deployment task.  The amount of work the built-in worker could be asked to do at once is governed by these two numbers.  With external workers, it's the same, so a single external worker is only being asked to do the same amount of work the built-in was doing.  However, workers does give you the capability to spread that work over a number of machines, and to scale up how much work is being done.

*If the workers in the default pool aren't healthy will the built-in worker run?*

No, the built-in worker can only run if there are no workers in the default pool.

*Can I leave the default pool empty, so some scripts do run on the server, but also provision other pools?*

Yes, the existence of other pools doesn't affect the behaviour of the default pool.

*How can I cordon off my worker pools so each team only has access to certain pools?*

At the moment all worker pools are global, so you can provision pools for various teams or projects, but there's no way to enforce the division.  We'll soon be releasing our Spaces feature that will allow worker pools to be restricted to spaces.

