---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Octopus.Server.exe command line
description: Octopus.Server.exe is the executable that runs the Octopus instance, it can also be called from the command line.
navOrder: 110
hideInThisSection: true
---

**Octopus.Server.exe** is the executable that runs the Octopus Server instance. It includes many helpful commands that allow you to manage the instance, including; authentication, configuration, diagnostics and running the service.

## Commands {#octopus.server.exeCommandLine-Commands}

`octopus.server.exe` supports the following commands:

- **[admin](/docs/administration/octopus.server.exe-command-line/admin)**:  Reset admin user passwords, re-enable them, and ensure they are in the admin group.
- **[builtin-worker](/docs/administration/octopus.server.exe-command-line/builtin-worker)**:  Configure the built-in worker used to run deployment actions and scripts on the Octopus Server.
- **[checkservices](/docs/administration/octopus.server.exe-command-line/checkservices)**:  Checks the Octopus instances are running.
- **[configure](/docs/administration/octopus.server.exe-command-line/configure)**:  Configure this Octopus instance.
- **[create-instance](/docs/administration/octopus.server.exe-command-line/create-instance)**:  Registers a new instance of the Octopus service.
- **[database](/docs/administration/octopus.server.exe-command-line/database)**:  Create, drop or configure the Octopus database.
- **[delete-instance](/docs/administration/octopus.server.exe-command-line/delete-instance)**:  Deletes an instance of the Octopus service.
- **[export-certificate](/docs/administration/octopus.server.exe-command-line/export-certificate)**:  Exports the certificate that Octopus Server can use to authenticate itself with its Tentacles.
- **[import-certificate](/docs/administration/octopus.server.exe-command-line/import-certificate)**:  Replace the certificate that Octopus Server uses to authenticate itself with its Tentacles.
- **[license](/docs/administration/octopus.server.exe-command-line/license)**:  Import a license key.
- **[list-instances](/docs/administration/octopus.server.exe-command-line/list-instances)**:  Lists all installed Octopus instances.
- **[lost-master-key](/docs/administration/octopus.server.exe-command-line/lost-master-key)**:  Get your Octopus Server working again after losing your Master Key.
- **[new-certificate](/docs/administration/octopus.server.exe-command-line/new-certificate)**:  Creates a new certificate that Octopus Server can use to authenticate itself with its Tentacles.
- **[node](/docs/administration/octopus.server.exe-command-line/node)**:  Configure settings related to this Octopus Server node.
- **[path](/docs/administration/octopus.server.exe-command-line/path)**:  Set the file paths that Octopus will use for storage.
- **[proxy](/docs/administration/octopus.server.exe-command-line/proxy)**:  Configure the HTTP proxy used by Octopus.
- **[rotate-master-key](/docs/administration/octopus.server.exe-command-line/rotate-master-key)**:  Rotate the Master Key on your Octopus Server and re-encrypt all sensitive data.
- **[run](/docs/administration/octopus.server.exe-command-line/run)**:  Starts the Octopus Server in debug mode.
- **[service](/docs/administration/octopus.server.exe-command-line/service)**:  Start, stop, install and configure the Octopus service.
- **[set-master-key](/docs/administration/octopus.server.exe-command-line/set-master-key)**:  Set the Master Key on your Octopus Server after rotating the database.
- **[show-configuration](/docs/administration/octopus.server.exe-command-line/show-configuration)**:  Outputs the server configuration.
- **[show-master-key](/docs/administration/octopus.server.exe-command-line/show-master-key)**:  Print the server's Master Encryption Key, so that it can be backed up.
- **[show-thumbprint](/docs/administration/octopus.server.exe-command-line/show-thumbprint)**:  Shows the squid and thumbprint of the server instance.
- **[ssl-certificate](/docs/administration/octopus.server.exe-command-line/ssl-certificate)**:  Binds the SSL/TLS certificate used by the portal to the specified address/port.
- **[version](/docs/administration/octopus.server.exe-command-line/version)**:  Show the Octopus Server version information.
- **[watchdog](/docs/administration/octopus.server.exe-command-line/watchdog)**:  Configure a scheduled task to monitor the Octopus service(s).

## General usage {#Octopus.Server.exeCommandLine-Generalusage}

All commands take the form of:

```powershell
Octopus.Server <command> [<options>]
```

To get help for a specific command use:

```powershell
Octopus.Server <command> --help
```
