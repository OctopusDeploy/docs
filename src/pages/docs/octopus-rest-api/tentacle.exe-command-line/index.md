---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-10-04
title: Tentacle.exe command line
description: Tentacle.exe is the command line executable that runs the Octopus Tentacle instance.
navOrder: 60
hideInThisSection: true
---

**Tentacle.exe** is the executable that runs the Octopus Tentacle instance. It includes several helpful commands that allow you to manage the instance some of which are built on top of the [Octopus Deploy HTTP API](/docs/octopus-rest-api).

## Commands {#tentacleCommandLine-Commands}

`tentacle` supports the following commands:

- **[agent](/docs/octopus-rest-api/tentacle.exe-command-line/agent)**:  Starts the Tentacle Agent in debug mode.
- **[checkservices](/docs/octopus-rest-api/tentacle.exe-command-line/checkservices)**:  Checks the Tentacle instances are running.
- **[configure](/docs/octopus-rest-api/tentacle.exe-command-line/configure)**:  Sets Tentacle settings such as the port number and thumbprints.
- **[create-instance](/docs/octopus-rest-api/tentacle.exe-command-line/create-instance)**:  Registers a new instance of the Tentacle service.
- **[delete-instance](/docs/octopus-rest-api/tentacle.exe-command-line/delete-instance)**:  Deletes an instance of the Tentacle service.
- **[deregister-from](/docs/octopus-rest-api/tentacle.exe-command-line/deregister-from)**:  Deregisters this deployment target from an Octopus Server.
- **[deregister-worker](/docs/octopus-rest-api/tentacle.exe-command-line/deregister-worker)**:  Deregisters this worker from an Octopus Server.
- **[extract](/docs/octopus-rest-api/tentacle.exe-command-line/extract)**:  Extracts a NuGet package.
- **[import-certificate](/docs/octopus-rest-api/tentacle.exe-command-line/import-certificate)**:  Replace the certificate that Tentacle uses to authenticate itself.
- **[list-instances](/docs/octopus-rest-api/tentacle.exe-command-line/list-instances)**:  Lists all installed Tentacle instances.
- **[new-certificate](/docs/octopus-rest-api/tentacle.exe-command-line/new-certificate)**:  Creates and installs a new certificate for this Tentacle.
- **[polling-proxy](/docs/octopus-rest-api/tentacle.exe-command-line/polling-proxy)**:  Configure the HTTP proxy used by polling Tentacles to reach the Octopus Server.
- **[poll-server](/docs/octopus-rest-api/tentacle.exe-command-line/poll-server)**:  Configures an Octopus Server that this Tentacle will poll.
- **[proxy](/docs/octopus-rest-api/tentacle.exe-command-line/proxy)**:  Configure the HTTP proxy used by Octopus.
- **[register-with](/docs/octopus-rest-api/tentacle.exe-command-line/register-with)**:  Registers this machine as a deployment target with an Octopus Server.
- **[register-worker](/docs/octopus-rest-api/tentacle.exe-command-line/register-worker)**:  Registers this machine as a worker with an Octopus Server.
- **[server-comms](/docs/octopus-rest-api/tentacle.exe-command-line/server-comms)**:  Configure how the Tentacle communicates with an Octopus Server.
- **[service](/docs/octopus-rest-api/tentacle.exe-command-line/service)**:  Start, stop, install and configure the Tentacle service.
- **[show-configuration](/docs/octopus-rest-api/tentacle.exe-command-line/show-configuration)**:  Outputs the Tentacle configuration.
- **[show-thumbprint](/docs/octopus-rest-api/tentacle.exe-command-line/show-thumbprint)**:  Show the thumbprint of this Tentacle's certificate.
- **[update-trust](/docs/octopus-rest-api/tentacle.exe-command-line/update-trust)**:  Replaces the trusted Octopus Server thumbprint of any matching polling or listening registrations with a new thumbprint to trust.
- **[version](/docs/octopus-rest-api/tentacle.exe-command-line/version)**:  Show the Tentacle version information.
- **[watchdog](/docs/octopus-rest-api/tentacle.exe-command-line/watchdog)**:  Configure a scheduled task to monitor the Tentacle service(s).

## General usage {#Tentacle.exeCommandLine-Generalusage}

All commands take the form of:

```powershell
Tentacle <command> [<options>]
```
