---
title: Octopus.Server.exe Command Line
description: Octopus.Server.exe is the executable that runs the Octopus instance, it can also be called from the command line.
position: 9
---

**Octopus.Server.exe** is the executable that runs the Octopus Server instance. It includes many helpful commands that allow you to manage the instance, including; authentication, configuration, diagnostics and running the service.

## Commands {#Octopus.Server.exeCommandLine-Commands}

`Octopus.Server.exe` supports the following commands:

- **`run`**:  Starts the Octopus Server in debug mode
- **`service`**:  Start, stop, install and configure the Octopus service
- **`watchdog`**:  Configure a scheduled task to monitor the Octopus service(s)
- **`checkservices`**: Checks the Octopus instances are running
- **`proxy`**:  Configure the HTTP proxy used by Octopus
- **`admin`**:  Reset admin user passwords, re-enable them, and ensure they are in the admin group
- **`license`**:  Import a license key
- **`create-instance`**:  Registers a new instance of the Octopus service
- **`delete-instance`**:  Deletes an instance of the Octopus service
- **`database`**:  Create or drop the Octopus database
- **`configure`**:  Configure this Octopus instance
- **`new-certificate`**:  Creates a new certificate that Octopus server can use to authenticate itself with its Tentacles
- **`import-certificate`**:  Replace the certificate that Octopus server uses to authenticate itself with its Tentacles
- **`export-certificate`**:  Exports the certificate that Octopus server can use to authenticate itself with its Tentacles
- **`regenerate-certificate`**:  DEPRECATED: Regenerate one or more of the certificates that Octopus uses
- **`show-master-key`**:  Print the server's Master Encryption Key, so that it can be backed up
- **`show-thumbprint`**:  Shows the squid and thumbprint of the server instance
- **`show-configuration`**:  Outputs the server configuration
- **`path`**:  Set the file paths that Octopus will use for storage
- **`list-instances`**:  Lists all installed Octopus instances

## General usage {#Octopus.Server.exeCommandLine-Generalusage}

All commands take the form of:

```powershell
Octopus.Server <command> [<options>]
```
