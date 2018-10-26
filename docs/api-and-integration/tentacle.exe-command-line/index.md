---
title: Tentacle.exe Command Line
description: Tentacle.exe is the command line executable that runs the Octopus Tentacle instance.
position: 110
---

**Tentacle.exe** is the executable that runs the Octopus Tentacle instance. It includes several helpful commands that allow you to manage the instance some of which are built on top of the [Octopus Deploy HTTP API](/docs/api-and-integration/api/index.md).

## Commands {#tentacle.exeCommandLine-Commands}

`tentacle.exe` supports the following commands:

- **`agent`**:  Starts the Tentacle Agent in debug mode.
- **`checkservices`**:  Checks the Tentacle instances are running.
- **`configure`**:  Sets Tentacle settings such as the port number and thumbprints.
- **`create-instance`**:  Registers a new instance of the Tentacle service.
- **`delete-instance`**:  Deletes an instance of the Tentacle service.
- **`deregister-from`**:  Deregisters this deployment target from an Octopus Server.
- **`deregister-worker`**:  Deregisters this worker from an Octopus Server.
- **`extract`**:  Extracts a NuGet package.
- **`help`**:  Prints this help text.
- **`import-certificate`**:  Replace the certificate that Tentacle uses to authenticate itself.
- **`list-instances`**:  Lists all installed Tentacle instances.
- **`new-certificate`**:  Creates and installs a new certificate for this Tentacle.
- **`polling-proxy`**:  Configure the HTTP proxy used by polling tentacles to reach the Octopus Server.
- **`poll-server`**:  Configures an Octopus Server that this Tentacle will poll.
- **`proxy`**:  Configure the HTTP proxy used by Octopus.
- **`register-with`**:  Registers this machine as a deployment target with an Octopus Server.
- **`register-worker`**:  Registers this machine as a worker with an Octopus Server.
- **`server-comms`**:  Configure how the Tentacle communicates with an Octopus Server.
- **`service`**:  Start, stop, install and configure the Tentacle service.
- **`show-configuration`**:  Outputs the Tentacle configuration.
- **`show-thumbprint`**:  Show the thumbprint of this Tentacle's certificate.
- **`version`**:  Show the Tentacle version information.
- **`watchdog`**:  Configure a scheduled task to monitor the Tentacle service(s).

## General Usage {#Tentacle.exeCommandLine-Generalusage}

All commands take the form of:

```powershell
Tentacle <command> [<options>]
```
