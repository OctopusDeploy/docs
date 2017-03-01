---
title: Tentacle VM Extension Configuration Structure
description: Detailed file format information for the configuration files required for the Azure Tentacle VM Extension
position: 6
---

:::hint
The Azure VM Extension is currently in preview.
:::

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
  "Port": 10933,
  "PublicHostNameConfiguration": "PublicIP|FQDN|ComputerName|Custom",
  "CustomPublicHostName": "web01.example.com"
}

```

* `OctopusServerUrl`: (string) The url to the Octopus server portal.
* `Environments`: (array of string) The environments to which the Tentacle should be added.
* `Roles`: (array of string) The roles to assign to the Tentacle.
* `CommunicationMode`: (string) Whether the Tentacle should wait for connections from the server (`Listen`) or should poll the server (`Poll`).
* `Port`: The port on which to listen for connections from the server (in `Listen` mode), or the port on which to connect to the Octopus server (`Poll` mode).
* `PublicHostNameConfiguration`: If in listening mode, how the server should contact the Tentacle. Can be `PublicIP`, `FQDN`, `ComputerName` or `Custom`.
* `CustomPublicHostName`: If in listening mode, and `PublicHostNameConfiguration` is set to `Custom`, the address that the server should use for this Tentacle.

:::hint
The extension will automatically add a Windows Firewall rule to allow traffic, but you will still need to ensure that endpoints / NSG rules are added to allow network traffic to reach the server.
:::


## Private Settings

The schema for the private configuration file is:

```json
{
  "ApiKey": "API-1234567890ABCDEF1234567890"
}
```

* `ApiKey`: (string) The Api Key to use to connect to the Octopus server.

The private configuration will be encrypted by Azure, and is only decryptable on the Azure VM using a special certificate installed by the Azure VM Agent.
