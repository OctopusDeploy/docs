---
title: Workers
description: Worker setup and configuration.
position: 1400
---

When your deployment process runs a script or extracts a package without involving a Tentacle or SSH target, the process is performed by a worker (see [where steps run](#where-steps-run) below). By default the worker lives inside the Octopus Server process (the built-in worker), however you can also configure an [external worker](#external-worker). 

## Built-in Worker

Any time a script needs to be run (e.g. PowerShell or Calamari), Octopus Server spawns a new process from it's process under it's security context. In `2018.1.0` we introduced the ability to [change the security context](docs/administration/security/built-in-worker) under which those new processes spawned, adding a layer of security.

:::hint
Future versions of Octopus Server will bundle a worker with the server that is started automatically. It will be run under the user contect supplied through the `builtin-worker` command.
:::

## External Worker

In `2018.2.0` we added the ability to nominate a Tentacle to perform the role of the worker. This Tentacle can run under a different user account and also on a different machine, adding extra layers of security. The built in worker is automatically disabled when an external worker is configured, preventing the Octopus Server from running any user provided scripts.

:::hint
Future versions of Octopus Server will expand on the worker concept, allowing you to create worker pools with multiple workers. Steps then can be configured to run on those pools.

When that feature is released, the commandline options will be removed. If a external worker is configured, it will automatically be added to the default worker pool.
:::

### Setup

To enable the external worker, you will need to setup a Tentacle, either on the same machine as the server or a different machine. You can use an existing Tentacle that is used as a deployment target. We recommend that the Tentacle is on the same local network as the server to speed up package transfers.

Once you have done that, and have it's address and thumbprint, run the following command.

```
Octopus.Server external-worker --address=https://example.com:10933 --thumbprint C7524763110D271520C15B6A50296200DA6DDCAA
```

After restarting, the built-in worker will be disabled. If you want to revert to the built-in worker, run the following command.

```
Octopus.Server external-worker --reset
```

### Limitations
The external worker currently has the following limitations
- There can only be one
- It does not participate in Health Checks unless it is also a deployment target
- Packages are always transfered from the server to the worker, download on target is not supported
- The worker will run steps from different projects simultaneously (keeping the behaviour of the built-in worker), which could allow one project to access the working folder of another project 

## Where steps run
The following step types and configurations run on a worker
- Any step that runs a script (usually user supplied) or has a package that has an execution plan of `Octopus Server` or `Octopus Server on behalf of roles`
- Any step that runs on a target other than a Tentacle, SSH or Offline Drop (eg Cloud Region, Azure Target)
- All AWS and Azure steps

The following steps always run inside the Octopus Server process (and do not run user-supplied code)
- Health Check
- Email
- Manual Intervention
- Import Certificate
