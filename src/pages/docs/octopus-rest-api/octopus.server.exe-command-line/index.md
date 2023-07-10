---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Octopus.Server.exe command line
description: Octopus.Server.exe is the executable that runs the Octopus instance, it can also be called from the command line.
navOrder: 50
hideInThisSection: true
---

**Octopus.Server.exe** is the executable that runs the Octopus Server instance. It includes many helpful commands that allow you to manage the instance, including; authentication, configuration, diagnostics and running the service.

## Commands {#octopus.server.exeCommandLine-Commands}

`octopus.server.exe` supports the following commands:

- **[admin](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/admin.md)**:  Reset admin user passwords, re-enable them, and ensure they are in the admin group.
- **[builtin-worker](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/builtin-worker.md)**:  Configure the built-in worker used to run deployment actions and scripts on the Octopus Server.
- **[checkservices](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/checkservices.md)**:  Checks the Octopus instances are running.
- **[configure](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/configure.md)**:  Configure this Octopus instance.
- **[create-instance](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/create-instance.md)**:  Registers a new instance of the Octopus service.
- **[database](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/database.md)**:  Create, drop or configure the Octopus database.
- **[delete-instance](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/delete-instance.md)**:  Deletes an instance of the Octopus service.
- **[export-certificate](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/export-certificate.md)**:  Exports the certificate that Octopus Server can use to authenticate itself with its Tentacles.
- **[import-certificate](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/import-certificate.md)**:  Replace the certificate that Octopus Server uses to authenticate itself with its Tentacles.
- **[license](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/license.md)**:  Import a license key.
- **[list-instances](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/list-instances.md)**:  Lists all installed Octopus instances.
- **[lost-master-key](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/lost-master-key.md)**:  Get your Octopus Server working again after losing your Master Key.
- **[new-certificate](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/new-certificate.md)**:  Creates a new certificate that Octopus Server can use to authenticate itself with its Tentacles.
- **[node](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/node.md)**:  Configure settings related to this Octopus Server node.
- **[path](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/path.md)**:  Set the file paths that Octopus will use for storage.
- **[proxy](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/proxy.md)**:  Configure the HTTP proxy used by Octopus.
- **[rotate-master-key](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/rotate-master-key.md)**:  Rotate the Master Key on your Octopus Server and re-encrypt all sensitive data.
- **[run](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/run.md)**:  Starts the Octopus Server in debug mode.
- **[service](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/service.md)**:  Start, stop, install and configure the Octopus service.
- **[set-master-key](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/set-master-key.md)**:  Set the Master Key on your Octopus Server after rotating the database.
- **[show-configuration](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/show-configuration.md)**:  Outputs the server configuration.
- **[show-master-key](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/show-master-key.md)**:  Print the server's Master Encryption Key, so that it can be backed up.
- **[show-thumbprint](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/show-thumbprint.md)**:  Shows the squid and thumbprint of the server instance.
- **[ssl-certificate](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/ssl-certificate.md)**:  Binds the SSL/TLS certificate used by the portal to the specified address/port.
- **[version](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/version.md)**:  Show the Octopus Server version information.
- **[watchdog](/src/pages/docs/octopus-rest-api/octopus.server.exe-command-line/watchdog.md)**:  Configure a scheduled task to monitor the Octopus service(s).

## General usage {#Octopus.Server.exeCommandLine-Generalusage}

All commands take the form of:

```powershell
Octopus.Server <command> [<options>]
```

To get help for a specific command use:

```powershell
Octopus.Server <command> --help
```
