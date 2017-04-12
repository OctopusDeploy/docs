---
title: Tentacle.exe Command Line
description: Tentacle.exe is the command line executable that runs the Octopus Tentacle instance.
position: 11
---

**Tentacle.exe** is the executable that runs the Octopus Tentacle instance. It includes several helpful commands that allow you to manage the instance some of which are built on top of the [Octopus Deploy HTTP API](/docs/api-and-integration/octopus-rest-api.md).

## Commands {#Tentacle.exeCommandLine-Commands}

`Tentacle.exe` supports the following commands:

- **`configure`**: Sets Tentacle settings such as the port number and thumbprints
- **`create-instance`**: Registers a new instance of the Tentacle service
- **`delete-instance`**: Deletes an instance of the Tentacle service
- **`deregister-from`**: Deregisters this machine from an Octopus Server
- **`import-certificate`**: Replace the certificate that Tentacle uses to authenticate itself
- **`new-certificate`**: Creates and installs a new certificate for this Tentacle
- **`polling-proxy`**:  Configure the HTTP proxy used by Polling Tentacles to reach the Octopus Server
- **`poll-server`**: Configures an Octopus Server that this Tentacle will poll
- **`proxy`**: Configure the HTTP proxy used by Octopus
- **`register-with`**: Registers this machine with an Octopus Server
- **`server-comms`**: Configure how the Tentacle communicates with an Octopus Server
- **`service`**: Start, stop, install and configure the Tentacle service
- **`show-thumbprint`**: Show the thumbprint of this Tentacle's certificate
!partial <list-instances-command>

## General usage {#Tentacle.exeCommandLine-Generalusage}

All commands take the form of:

```powershell
Tentacle <command> [<options>]
```
