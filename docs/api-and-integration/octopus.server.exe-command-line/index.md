---
title: Octopus.Server.exe Command Line
description: Octopus.Server.exe is the executable that runs the Octopus instance, it can also be called from the command line.
position: 90
---

**Octopus.Server.exe** is the executable that runs the Octopus Server instance. It includes many helpful commands that allow you to manage the instance, including; authentication, configuration, diagnostics and running the service.

## Commands {#octopus.server.exeCommandLine-Commands}

`octopus.server.exe` supports the following commands:

- **`admin`**:  Reset admin user passwords, re-enable them, and ensure they are in the admin group.
- **`builtin-worker`**:  Configure the built-in worker used to run deployment actions and scripts on the Octopus Server..
- **`checkservices`**:  Checks the Octopus instances are running.
- **`configure`**:  Configure this Octopus instance.
- **`create-instance`**:  Registers a new instance of the Octopus service.
- **`database`**:  Create or drop the Octopus database.
- **`delete-instance`**:  Deletes an instance of the Octopus service.
- **`export-certificate`**:  Exports the certificate that Octopus server can use to authenticate itself with its Tentacles.
- **`help`**:  Prints this help text.
- **`import-certificate`**:  Replace the certificate that Octopus server uses to authenticate itself with its Tentacles.
- **`license`**:  Import a license key.
- **`list-instances`**:  Lists all installed Octopus instances.
- **`lost-master-key`**:  Get your Octopus Server working again after losing your master key.
- **`metrics`**:  Configure metrics logging.
- **`new-certificate`**:  Creates a new certificate that Octopus server can use to authenticate itself with its Tentacles.
- **`node`**:  Configure settings related to this Octopus Server node.
- **`path`**:  Set the file paths that Octopus will use for storage.
- **`proxy`**:  Configure the HTTP proxy used by Octopus.
- **`run`**:  Starts the Octopus Server in debug mode.
- **`service`**:  Start, stop, install and configure the Octopus service.
- **`show-configuration`**:  Outputs the server configuration.
- **`show-master-key`**:  Print the server's Master Encryption Key, so that it can be backed up.
- **`show-thumbprint`**:  Shows the squid and thumbprint of the server instance.
- **`ssl-certificate`**:  Binds the SSL/TLS certificate used by the portal to the specified address/port..
- **`version`**:  Show the Octopus Server version information.
- **`watchdog`**:  Configure a scheduled task to monitor the Octopus service(s).

## General Usage {#Octopus.Server.exeCommandLine-Generalusage}

All commands take the form of:

```powershell
Octopus.Server <command> [<options>]
```

To get help for a specific command use:

```powershell Octopus 3.14 or earlier
Octopus.Server help <command>
```

```powershell Octopus 3.15 or later
Octopus.Server <command> --help
```
