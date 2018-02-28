---
title: External workers
description: You can disable the built-in worker and delegate work to external workers instead. Using external workers makes your Octopus Server more secure, and allows you to decide where your workers do their work, and the context in which they perform their work.
position: 1
---

In Octopus `3.0` we introduced the concept of a [worker](index.md) which can deal with packages and execute scripts without the need to install and configure a Tentacle or SSH target. When you first install Octopus Server, by default, this kind of work is performed by the [built-in worker](built-in-worker.md).

In Octopus `2018.2.0` we added the ability to nominate a Tentacle to replace the [built-in worker](built-in-worker.md). We call this the **external worker**. This Tentacle can be installed on the Octopus Server or any other machine, and it can run under a different user account. If you configure an external worker on a different machine, you effectively prevent any user-provided scripts from executing on the Octopus Server itself.

:::hint
The built-in worker is automatically disabled when an external worker is configured.
:::

!toc

## Setting up the external worker

To enable the external worker, you will need to set up a Tentacle, either on the same machine as the Octopus Server, or a different machine (recommended). You can use an existing Tentacle that is used as a deployment target. We recommend that the Tentacle is on the same local network as the server to speed up package transfers.

Once you have done that, and have its address and thumbprint, run the following command, remembering to replace the thumbprint below with the thumbprint from your Tentacle:

```
Octopus.Server external-worker --address=https://example.com:10933 --thumbprint C7524763110D271520C15B6A50296200DA6DDCAA
```

The external worker will be enabled after you restart the Octopus Server, and the built-in worker will be disabled.

## Reverting to the built-in worker

If you want to revert to the built-in worker, run the following command:

```
Octopus.Server external-worker --reset
```

## Recommendations for the external worker

We highly recomend setting up your external worker on a different machine to the Octopus Server.

We also recommend running the external worker as a different user account to the Octopus Server.

Finally, we recommend the Octopus Server and external worker are in the same local network.

## Limitations of the external worker

The external worker currently has the following limitations:

- There can only be one.
- It does not participate in Health Checks unless it is also a deployment target.
- Packages are always transferred from the server to the worker, download on target is not supported.
- The worker will run steps from different projects simultaneously (keeping the behavior of the built-in worker), which could allow one project to access the working folder of another project.

## External workers in the future

Future versions of Octopus Server will expand on the [worker concept](https://github.com/OctopusDeploy/Specs/blob/master/Workers/index.md), allowing you to create worker pools with multiple workers. Steps then can be configured to run on those pools.

When that feature is released, these command-line options for the external worker will be removed. If an external worker is configured when you upgrade Octopus Server to a version supporting worker pools, the external worker will be automatically added to the default worker pool.
