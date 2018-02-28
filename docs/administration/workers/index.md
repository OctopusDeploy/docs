---
title: Workers
description: Worker setup and configuration.
position: 1400
---

Your deployment process will normally need to deal with packages and execute scripts. Quite often those packages will be pushed across to a Tentacle or SSH deployment target, and your scripts will execute on those machines. However, many deployments don't need a Tentacle or SSH target - like deployments to cloud services or similar. In this case it would be annoying if you had to set up a Tentacle or SSH target just to push a package to an API, or run a script but you don't care where that script runs.

In Octopus `3.0` we introduced the concept of a worker which can deal with packages and execute scripts without the need to install and configure a Tentacle or SSH target.

There are two kinds of workers you can use in Octopus:

1. The built-in worker (default)
1. External workers

## Built-in worker

When you first install Octopus Server, by default, the worker lives inside the Octopus Server process. We call this the **built-in worker**. This is very convenient but it does come with some security implications.

Any time a script needs to be run (e.g. PowerShell or Calamari), Octopus Server spawns a new process from its process under its security context. In `2018.1.0` we introduced the ability to [change the security context](/docs/administration/workers/built-in-worker.md) under which those new processes spawned, adding a layer of security.

Learn about the [built-in worker](built-in-worker.md).

## External workers

In `2018.2.0` we added the ability disable the built-in worker and delegate this work to a Tentacle. We call this the **external worker**. This Tentacle can be installed on the Octopus Server or any other machine, and it can run under a different user account. If you configure an external worker on a different machine, you effectively prevent any user-provided scripts from executing on the Octopus Server itself. In a future version of Octopus you will be able to configure multiple external workers and configure them as members of worker pools.

Learn about [external workers](external-workers.md).

## Where steps run

The following step types and configurations run on a worker:

- Any step that runs a script (usually user supplied) or has a package that has an execution plan of `Octopus Server` or `Octopus Server on behalf of roles`.
- Any steps that run on a Cloud Region, an Azure Target, or any target that isn’t a Tentacle, SSH Target, or Offline Drop.
- All AWS and Azure steps.

The following steps always run inside the Octopus Server process (and do not run user-supplied code)

- Health Check
- Email
- Manual Intervention
- Import Certificate
