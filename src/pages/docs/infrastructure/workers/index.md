---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Workers
description: External workers are machines that can execute steps that don't need to be performed on the Octopus Server or deployment targets.
navOrder: 30
hideInThisSectionHeader: true
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/v6621BId7fE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

!include <workers>

## Where steps run {#where-steps-run}

The following step types and configurations run on a worker:

- Any step that runs a script (usually user supplied) or has a package that has an execution location of `Octopus Server`, `Octopus Server on behalf of roles`, `Worker Pool` or `Worker Pool on behalf of roles`.
- Any steps that run on a Cloud Region, an Azure Target, or any target that isn’t a Tentacle, an SSH Target, or an Offline Drop.
- All AWS, Terraform, and Azure steps.

The following steps always run inside the Octopus Server process (and do not run user-supplied code):

- Email
- Manual intervention
- Import certificate

A worker receives instruction from the Octopus Server to execute a step, it executes the step using Calamari and returns the logs and any collected artifacts to the Octopus Server.

There are two kinds of workers you can use in Octopus:

1. [The built-in worker](#built-in-worker) (default)
1. [External workers](#external-workers)

:::hint
Workers are assigned at the start of a deployment or runbook, not at the time the individual step executes.
:::

## Ignoring Workers {#ignoring-workers}

Octopus works out-of-the-box without setting up workers.  You can run all deployment processes, run script steps on the built-in worker, deploy to Azure and run AWS and Terraform steps, without further setup.  The built-in worker is available in a default Octopus set up, and Octopus workers are designed so that, if you aren't using external workers, none of your deployment processes need to be worker aware.

The choices of built-in worker, built-in worker running in a separate account, and external workers enable to you harden your Octopus Server and scale your deployments.

## Migrating to Workers {#migrating-to-workers}

Octopus workers also provides a smooth path to move off the built-in worker, and thus off running scripts on the Octopus Server, and onto external workers, without updating any deployment processes.  Learn about how to [use the default worker pool to move steps off the Octopus Server](/docs/infrastructure/workers/worker-pools.md#Using-the-default-pool-to-stop-running-scripts-on-the-server).

## Built-in Worker {#built-in-worker}

The Octopus Server has a built-in worker that can deploy packages, execute scripts, and perform tasks that don't need to be performed on a deployment target. The built-in worker is configured by default, however, the built-in worker can be disabled by navigating to **Configuration** and selecting **Disable** for the **Run steps on the Octopus Server** option.

The **built-in worker** is executed on the same machine as the Octopus Server.  When the built-in worker is needed to execute a step, the Octopus Server spawns a new process and runs the step using Calamari.  The spawned process is either under the server's security context (default) or under a [context configured for the built-in worker](/docs/infrastructure/workers/built-in-worker.md#Running-tasks-on-the-Octopus-Server-as-a-different-user).

Adding a worker to the default worker pool will disable the built-in worker, and steps will no longer run on the Octopus Server.

Learn about the security implications and how to configure the [built-in worker](/docs/infrastructure/workers/built-in-worker.md).

## External Workers {#external-workers}

An **External Worker** is either:
- A [Windows](/docs/infrastructure/deployment-targets/tentacle/windows/index.md) or [Linux](/docs/infrastructure/deployment-targets/tentacle/linux/) Tentacle.
- An [SSH machine](/docs/infrastructure/deployment-targets/linux/ssh-target.md) that has been registered with the Octopus Server as a worker.  

The setup of a worker is the same as setting up a deployment target as a [Windows Tentacle target](/docs/infrastructure/deployment-targets/tentacle/windows/) or an [SSH target](/docs/infrastructure/deployment-targets/linux/ssh-target.md), except that instead of being added to an environment, a worker is added to a worker pool.

Using external workers allows delegating work to a machine other than the Octopus Server.  This can make the server more secure and allow scaling.  When Octopus executes a step on an external worker, it's the external worker that executes Calamari and no user-provided script executes on the Octopus Server itself.

Workers have machine policies, are health checked, and run Calamari, just like deployment targets.

## Registering an External Worker {#registering-an-external-worker}

Once the Tentacle or SSH machine has been configured, workers can be added using the [Web Portal](#registering-workers-in-the-web-portal), the [Octopus Deploy REST API](/docs/octopus-rest-api/index.md), the [Octopus.Clients library](/docs/octopus-rest-api/octopus.client/) or with the Tentacle executable.  Only a user with the `ConfigureServer` permission can add or edit workers.

### Registering Workers in the Octopus Web Portal {#registering-workers-in-the-octopus-web-portal}

You can register workers from the Octopus Web portal if they are a Windows or Linux [Listening Tentacle](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md#listening-tentacles-recommended) or an [SSH deployment target](/docs/infrastructure/deployment-targets/linux/ssh-target.md).

You can choose between:

- [Registering a Windows Listening Tentacle as a Worker](#registering-windows-listening-worker).
- [Registering a Linux Listening Tentacle as a Worker](#registering-linux-listening-worker).
- [Registering an SSH deployment target as a Worker](#registering-ssh-connection-worker).

After you have saved the new worker, you can navigate to the worker pool you assigned the worker to, to view its status.

### Registering a Windows Listening Tentacle as a Worker {#registering-windows-listening-worker}

!include <install-tentacle-manager>
!include <configure-windows-listening-worker>

### Registering a Linux Listening Tentacle as a Worker {#registering-linux-listening-worker}

The Tentacle agent will need to be installed on the target server to communicate with the Octopus Server. Please read the instructions for [installing a Linux Tentacle](/docs/infrastructure/deployment-targets/tentacle/linux/) for more details.

!include <configure-linux-listening-worker>

### Registering a Worker with an SSH Connection {#registering-ssh-connection-worker}

!include <configure-ssh-connection-worker>

### Registering a Windows Polling Tentacle as a Worker {#registering-windows-polling-worker}

!include <install-tentacle-manager>
!include <configure-windows-polling-worker>

The new Polling Tentacle will automatically show up in the Workers list.

### Registering a Linux Polling Tentacle as a Worker {#registering-linux-polling-worker}

The Tentacle agent will need to be installed on the target server to communicate with the Octopus Server. Please read the instructions for [installing a Linux Tentacle](/docs/infrastructure/deployment-targets/tentacle/linux/) for more details.

!include <configure-linux-polling-worker>

The new Polling Tentacle will automatically show up in the Workers list.

### Registering Workers with the Tentacle executable {#registering-workers-with-the-tentacle-executable}

Tentacle workers can also register with the server using the Tentacle executable (version 3.22.0 or later), for example:

```
.\Tentacle.exe register-worker --instance MyInstance --server "https://example.com/" --comms-style TentaclePassive --apikey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO" --workerpool "Default Worker Pool"
```

Use `TentacleActive` instead of `TentaclePassive` to register a polling Tentacle worker.

The Tentacle executable can also be used to deregister workers, for example:
```
.\Tentacle.exe deregister-worker --instance MyInstance --server "https://example.com/" --apikey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO"
```

:::hint
For information on creating an API key, see [how to create an API key](/docs/octopus-rest-api/how-to-create-an-api-key.md).
:::

## Recommendations for External Workers {#recommendations-for-external-workers}

We highly recommend setting up external workers on a different machine to the Octopus Server.

We also recommend running external workers as a different user account to the Octopus Server.

It can be advantageous to have workers on the same local network as the server to reduce package transfer times.

Default pools attached to cloud targets allow co-location of workers and targets, this can help make workers specific to your targets as well as making the Octopus Server more secure by using external workers.

## Run Multiple processes on Workers simultaneously {#run-multiple-processes-on-workers-simultaneously}

!include <workers-multiple-simultaneous-processes>

### Run a process on a Worker exclusively {#run-process-on-worker-exclusively}

!include <workers-individual-process-exclusively>

!include <powershell-named-mutex>

### Workers in HA setups 

With Octopus High Availability, each node has a task cap and can invoke the built-in worker locally, so for a 4-node HA cluster, there are 4 built-in workers.  Therefore if you move to external workers, it's likely you'll need to provision workers to at least match your server nodes, otherwise, you'll be asking each worker to do the sum of what the HA nodes were previously doing.

## Learn more

- [Worker blog posts](https://octopus.com/blog/tag/workers)
- [Worker pool variables](/docs/projects/variables/worker-pool-variables.md)
