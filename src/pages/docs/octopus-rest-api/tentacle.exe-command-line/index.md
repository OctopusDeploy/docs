---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Tentacle.exe command line
description: Tentacle.exe is the command line executable that runs the Octopus Tentacle instance.
navOrder: 60
hideInThisSection: true
---

**Tentacle.exe** is the executable that runs the Octopus Tentacle instance. It includes several helpful commands that allow you to manage the instance some of which are built on top of the [Octopus Deploy HTTP API](/docs/octopus-rest-api).

## Commands {#tentacleCommandLine-Commands}

`tentacle` supports the following commands:

- **[agent](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/agent.md)**:  Starts the Tentacle Agent in debug mode.
- **[checkservices](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/checkservices.md)**:  Checks the Tentacle instances are running.
- **[configure](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/configure.md)**:  Sets Tentacle settings such as the port number and thumbprints.
- **[create-instance](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/create-instance.md)**:  Registers a new instance of the Tentacle service.
- **[delete-instance](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/delete-instance.md)**:  Deletes an instance of the Tentacle service.
- **[deregister-from](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/deregister-from.md)**:  Deregisters this deployment target from an Octopus Server.
- **[deregister-worker](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/deregister-worker.md)**:  Deregisters this worker from an Octopus Server.
- **[extract](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/extract.md)**:  Extracts a NuGet package.
- **[import-certificate](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/import-certificate.md)**:  Replace the certificate that Tentacle uses to authenticate itself.
- **[list-instances](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/list-instances.md)**:  Lists all installed Tentacle instances.
- **[new-certificate](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/new-certificate.md)**:  Creates and installs a new certificate for this Tentacle.
- **[polling-proxy](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/polling-proxy.md)**:  Configure the HTTP proxy used by polling Tentacles to reach the Octopus Server.
- **[poll-server](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/poll-server.md)**:  Configures an Octopus Server that this Tentacle will poll.
- **[proxy](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/proxy.md)**:  Configure the HTTP proxy used by Octopus.
- **[register-with](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/register-with.md)**:  Registers this machine as a deployment target with an Octopus Server.
- **[register-worker](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/register-worker.md)**:  Registers this machine as a worker with an Octopus Server.
- **[server-comms](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/server-comms.md)**:  Configure how the Tentacle communicates with an Octopus Server.
- **[service](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/service.md)**:  Start, stop, install and configure the Tentacle service.
- **[show-configuration](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/show-configuration.md)**:  Outputs the Tentacle configuration.
- **[show-thumbprint](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/show-thumbprint.md)**:  Show the thumbprint of this Tentacle's certificate.
- **[update-trust](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/update-trust.md)**:  Replaces the trusted Octopus Server thumbprint of any matching polling or listening registrations with a new thumbprint to trust.
- **[version](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/version.md)**:  Show the Tentacle version information.
- **[watchdog](/src/pages/docs/octopus-rest-api/tentacle.exe-command-line/watchdog.md)**:  Configure a scheduled task to monitor the Tentacle service(s).

## General Usage {#Tentacle.exeCommandLine-Generalusage}

All commands take the form of:

```powershell
Tentacle <command> [<options>]
```
