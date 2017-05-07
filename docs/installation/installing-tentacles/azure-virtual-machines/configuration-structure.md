---
title: Tentacle VM Extension Configuration Structure
description: Detailed file format information for the configuration files required for the Azure Tentacle VM Extension
position: 7
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
  "Tenants": [
    "Acme Corp"
  ],
  "TenantTags": [
    "Tenant type/External",
    "Upgrade ring/Early adopter"
  ],
  "MachinePolicy": "Transient machines",
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
* `Tenants`: (array of string) The tenants to assign to the Tentacle.
* `TenantTags`: (array of strings) The tenant tags in [canonical name format](/docs/key-concepts/tenants/tenant-tags.md#referencing-tenant-tags-tenanttags-referencingtenanttags) to assign to the Tentacle.
* `MachinePolicy`: (string) The name of a machine policy to apply to the Tentacle.
* `Port`: The port on which to listen for connections from the server (in `Listen` mode), or the port on which to connect to the Octopus server (`Poll` mode).
* `PublicHostNameConfiguration`: If in listening mode, how the server should contact the Tentacle. Can be one of the following:
  * `PublicIP` - looks up the public IP address using <https://api.ipify.org>.
  * `FQDN` - concatenates the local hostname with the (active directory) domain name. Useful for domain joined computers.
  * `ComputerName` - uses the local hostname.
  * `Custom` - allows you to specify a custom value, using the `CustomPublicHostName` property.
* `CustomPublicHostName`: If in listening mode, and `PublicHostNameConfiguration` is set to `Custom`, the address that the server should use for this Tentacle.

:::hint
In `Listen` mode, the extension will automatically add a Windows Firewall rule to allow inbound traffic, but you will still need to ensure that [endpoints](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/classic/setup-endpoints) / [NSG rules](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-nsg) are added to allow network traffic from the Octopus Server to the Tentacle.
The Tentacle will also need to be able to reach the Octopus Server portal to register the Tentacle. Once registered, this is no longer required.
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
