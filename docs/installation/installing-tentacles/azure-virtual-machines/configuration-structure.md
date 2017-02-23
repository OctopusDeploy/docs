---
title: Azure VM Extension Configuration Structure
description: Detailed file format information for the configuration files required for the Azure VM Extension
position: 6
---

These files are required to install the extension [via the Azure CLI](via-the-azure-cli.md) or [via PowerShell](via-powershell.md).

## Public Settings

The schema for the public configuration file is:

```json
{
  "OctopusServerUrl": "https://octopus.example.com",
  "Environments": [
    "Test",
    "Production"
  ],
  "Roles": [
    "web-server",
    "app-server"
  ],
  "CommunicationMode": "Listen",
  "Port": 10933
}

```

* `OctopusServerUrl`: (string) The url to the Octopus server portal.
* `Environments`: (array of strings) The environments to which the Tentacle should be added.
* `Roles`: (array of strings) The roles to assign to the Tentacle.
* `CommunicationMode`: (string) Whether the Tentacle should wait for connections from the server (`Listen`) or should poll the server (`Poll`).
* `Port`: The port on which to listen for connections from the server (in `Listen` mode), or the port on which to connect to the Octopus server (`Poll` mode).

## Private Settings

The schema for the private configuration file is:

```json
{
  "ApiKey": "API-1234567890ABCDEF1234567890"
}
```

* `ApiKey`: (string) The Api Key to use to connect to the Octopus server.