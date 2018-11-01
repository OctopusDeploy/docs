---
title: Tentacle.exe Command Line
description: Tentacle.exe is the command line executable that runs the Octopus Tentacle instance.
position: 110
hideInThisSection: true
---

**Tentacle.exe** is the executable that runs the Octopus Tentacle instance. It includes several helpful commands that allow you to manage the instance some of which are built on top of the [Octopus Deploy HTTP API](/docs/api-and-integration/api/index.md).

## Commands {#tentacle.exeCommandLine-Commands}

`tentacle.exe` supports the following commands:

- **[agent](/docs\api-and-integration\tentacle.exe-command-line/agent.md)**:  Starts the Tentacle Agent in debug mode.
- **[checkservices](/docs\api-and-integration\tentacle.exe-command-line/checkservices.md)**:  Checks the Tentacle instances are running.
- **[configure](/docs\api-and-integration\tentacle.exe-command-line/configure.md)**:  Sets Tentacle settings such as the port number and thumbprints.
- **[create-instance](/docs\api-and-integration\tentacle.exe-command-line/create-instance.md)**:  Registers a new instance of the Tentacle service.
- **[delete-instance](/docs\api-and-integration\tentacle.exe-command-line/delete-instance.md)**:  Deletes an instance of the Tentacle service.
- **[deregister-from](/docs\api-and-integration\tentacle.exe-command-line/deregister-from.md)**:  Deregisters this deployment target from an Octopus Server.
- **[deregister-worker](/docs\api-and-integration\tentacle.exe-command-line/deregister-worker.md)**:  Deregisters this worker from an Octopus Server.
- **[extract](/docs\api-and-integration\tentacle.exe-command-line/extract.md)**:  Extracts a NuGet package.
- **[import-certificate](/docs\api-and-integration\tentacle.exe-command-line/import-certificate.md)**:  Replace the certificate that Tentacle uses to authenticate itself.
- **[list-instances](/docs\api-and-integration\tentacle.exe-command-line/list-instances.md)**:  Lists all installed Tentacle instances.
- **[new-certificate](/docs\api-and-integration\tentacle.exe-command-line/new-certificate.md)**:  Creates and installs a new certificate for this Tentacle.
- **[polling-proxy](/docs\api-and-integration\tentacle.exe-command-line/polling-proxy.md)**:  Configure the HTTP proxy used by polling tentacles to reach the Octopus Server.
- **[poll-server](/docs\api-and-integration\tentacle.exe-command-line/poll-server.md)**:  Configures an Octopus Server that this Tentacle will poll.
- **[proxy](/docs\api-and-integration\tentacle.exe-command-line/proxy.md)**:  Configure the HTTP proxy used by Octopus.
- **[register-with](/docs\api-and-integration\tentacle.exe-command-line/register-with.md)**:  Registers this machine as a deployment target with an Octopus Server.
- **[register-worker](/docs\api-and-integration\tentacle.exe-command-line/register-worker.md)**:  Registers this machine as a worker with an Octopus Server.
- **[server-comms](/docs\api-and-integration\tentacle.exe-command-line/server-comms.md)**:  Configure how the Tentacle communicates with an Octopus Server.
- **[service](/docs\api-and-integration\tentacle.exe-command-line/service.md)**:  Start, stop, install and configure the Tentacle service.
- **[show-configuration](/docs\api-and-integration\tentacle.exe-command-line/show-configuration.md)**:  Outputs the Tentacle configuration.
- **[show-thumbprint](/docs\api-and-integration\tentacle.exe-command-line/show-thumbprint.md)**:  Show the thumbprint of this Tentacle's certificate.
- **[version](/docs\api-and-integration\tentacle.exe-command-line/version.md)**:  Show the Tentacle version information.
- **[watchdog](/docs\api-and-integration\tentacle.exe-command-line/watchdog.md)**:  Configure a scheduled task to monitor the Tentacle service(s).

## General Usage {#Tentacle.exeCommandLine-Generalusage}

All commands take the form of:

```powershell
Tentacle <command> [<options>]
```
