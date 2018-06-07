---
title: External Workers
description: You can disable the built-in worker and delegate work to external workers instead. Using external workers makes your Octopus Server more secure, and allows you to decide where your workers do their work, and the context in which they perform their work.
position: 1
---

In **Octopus 3.0** we introduced the concept of a [worker](index.md) which can deal with packages and execute scripts without the need to install and configure a Tentacle or SSH target. When you first install Octopus Server, by default, this kind of work is performed by the [built-in worker](built-in-worker.md).

In **Octopus 2018.2.0** we added the ability to nominate a Tentacle to replace the [built-in worker](built-in-worker.md). We call this the **external worker**. This Tentacle can be installed on the Octopus Server or any other machine, and it can run under a different user account. If you configure an external worker on a different machine, you effectively prevent any user-provided scripts from executing on the Octopus Server itself.

:::hint
The built-in worker is automatically disabled when an external worker is configured.
:::

!toc

## Setting up the external worker

These instructions are for **Octopus 2018.6.x**, the instructions for other versions differ.

:::hint
There is currently no User Interface support for the external worker and there is a limit of one worker
:::

To enable the external worker, you will need to set up a Tentacle (version 3.22.0 or later), either on the same machine as the Octopus Server, or a different machine (recommended). You can use an existing Tentacle that is used as a deployment target. We recommend that the Tentacle is on the same local network as the server to speed up package transfers.

Once you have done that, run the following command from the tentacle program directory for a listening tentacle:

```
.\Tentacle.exe register-worker --instance MyInstance --server "https://example.com/" --comms-style TentaclePassive --apikey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO" --workerpool "Default Worker Pool"
```

Use `TentacleActive` instead of `TentaclePassive` to register a polling worker.

## Reverting to the built-in worker

If you want to revert to the built-in worker, run the following command from the tentacle program directory:

```
.\Tentacle.exe deregister-worker --instance MyInstance --server "https://example.com/" --apikey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO"
```

## Recommendations for the external worker

We highly recomend setting up your external worker on a different machine to the Octopus Server.

We also recommend running the external worker as a different user account to the Octopus Server.

Finally, we recommend the Octopus Server and external worker are in the same local network.

## Limitations of the external worker

The external worker currently has the following limitations:

- There can only be one.
- Packages are always transferred from the server to the worker, download on target is not supported.
- The worker will run steps from different projects simultaneously (keeping the behavior of the built-in worker), which could allow one project to access the working folder of another project.
