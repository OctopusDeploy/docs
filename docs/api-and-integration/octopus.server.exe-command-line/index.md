---
title: Octopus.Server.exe Command Line
description: Octopus.Server.exe is the executable that runs the Octopus instance, it can also be called from the command line.
position: 10
---

**Octopus.Server.exe** is the executable that runs the Octopus Tentacle instance. It includes several helpful commands that allow you to manage the instance some of which are built on top of the [Octopus Deploy HTTP API](/docs/api-and-integration/octopus-rest-api.md).

## Commands {#Octopus.Server.exeCommandLine-Commands}

`Octopus.Server.exe` supports the following commands:

- **`run`**: Sets Tentacle settings such as the port number and thumbprints
- **`create-instance`**: Registers a new instance of the Tentacle service
- **`delete-instance`**: Deletes an instance of the Tentacle service
- **`deregister-from`**: Deregisters this machine from an Octopus Server
- **`import-certificate`**: Replace the certificate that Tentacle uses to authenticate itself
- **`new-certificate`**: Creates and installs a new certificate for this Tentacle
- **`polling-proxy`**:  Configure the HTTP proxy used by polling tentacles to reach the Octopus Server
- **`poll-server`**: Configures an Octopus Server that this Tentacle will poll
- **`proxy`**: Configure the HTTP proxy used by Octopus
- **`register-with`**: Registers this machine with an Octopus Server
- **`server-comms`**: Configure how the Tentacle communicates with an Octopus Server
- **`service`**: Start, stop, install and configure the Tentacle service
- **`show-thumbprint`**: Show the thumbprint of this Tentacle's certificate


- **`run`**:  Starts the Octopus Server in debug mode
- **`service`**:  Start, stop, install and configure the Octopus service
                .WithParameter("serviceName", "OctopusDeploy
                .WithParameter("serviceDescription", "Octopus Deploy: Server and web portal
                .WithParameter("assemblyContainingService", typeof (Program).Assembly);
- **`watchdog`**:  Configure a scheduled task to monitor the Octopus service(s)
                .WithParameter("applicationName", ApplicationName.OctopusServer);
- **`checkservices`**: Checks the Octopus instances are running
- **`proxy`**:  Configure the HTTP proxy used by Octopus
- **`admin`**:  Reset admin user passwords, re-enable them, and ensure they are in the admin group
- **`license`**:  Import a license key
- **`create-instance`**:  Registers a new instance of the Octopus service
- **`delete-instance`**:  Deletes an instance of the Octopus service
- **`database`**:  Create or drop the Octopus database
- **`configure`**:  Configure this Octopus instance
- **`import-certificate`**:  Replace the certificate that Octopus server uses to authenticate itself with its Tentacles
- **`regenerate-certificate`**:  Regenerate one or more of the certificates that Octopus uses
- **`show-master-key`**:  Print the server's Master Encryption Key, so that it can be backed up
- **`show-thumbprint`**:  Shows the squid and thumbprint of the server instance
- **`show-configuration`**:  Outputs the server configuration
- **`path`**:  Set the file paths that Octopus will use for storage

## General usage {#Octopus.Server.exeCommandLine-Generalusage}

All commands take the form of:

```powershell
Octopus.Server <command> [<options>]
```
