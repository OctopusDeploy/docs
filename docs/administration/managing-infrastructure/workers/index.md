---
title: Workers
description: Worker setup and configuration.
position: 1400
---

Your deployment process will normally need to deal with packages and execute scripts. Quite often, those packages will be pushed across to a [Tentacle](/docs/infrastructure/deployment-targets/windows-targets/index.md) or an [SSH deployment target](/docs/infrastructure/deployment-targets/linux/index.md), and your scripts will execute on those machines. However, many deployments don't need a Tentacle or SSH target, like deployments to cloud services. In these cases, it would be annoying if you had to set up a Tentacle or SSH target just to push a package to an API or run a script when you don't care where that script runs.

In Octopus, a worker is used to run [steps](/docs/deployment-process/steps/index.md) in a [deployment process](/docs/deployment-process/index.md) that do not run on a [deployment target](/docs/infrastructure/index.md).

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

1. The built-in worker (default)
1. External workers

## Built-in Worker

The **built-in worker** is executed on the same machine as the Octopus server.  When the built-in worker is needed to execute a step, the Octopus Server spawns a new process and runs the step using Calamari.  The spawned process is either under the server's security context (default) or under a [context configured for the built-in worker](/docs/infrastructure/workers/built-in-worker.md#Running-tasks-on-the-Octopus-Server-as-a-different-user).

Learn about the security implications and how to configure the [built-in worker](/docs/infrastructure/workers/built-in-worker.md).

## External Workers

An **external worker** is a Tentacle or SSH machine.  An external worker allows delegating work to a machine other than the Octopus server.  This can make the server more secure and allow scaling.  When Octopus executes a step on an external worker, it's the external worker that executes Calamari and no user-provided script executes on the Octopus Server itself.

Learn about [external workers](/docs/infrastructure/workers/index.md).

Learn about how Octopus picks a worker to execute a step and how to configure [worker pools](/docs/infrastructure/worker-pools.md).

## Ignoring Workers

Octopus works out-of-the-box without setting up workers.  You can run all deployment processes, run script steps on the built-in worker, deploy to Azure and run AWS and Terraform steps, without further setup.  The built-in worker is available in a default Octopus set up, and Octopus workers are designed so that, if you aren't using external workers, none of your deployment processes need to be worker aware.

The choices of built-in worker, built-in worker running in a separate account, and external workers enable to you harden your Octopus server and scale your deployments.

## Migrating to Workers

Octopus workers also provides a smooth path to move off the built-in worker, and thus off running scripts on the Octopus server, and onto external workers, without updating any deployment processes.  Learn about how to [use the default worker pool to move steps off the Octopus server](/docs/infrastructure/worker-pools.md#Using-the-default-pool-to-stop-running-scripts-on-the-server).
