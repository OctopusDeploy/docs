---
title: Polling Tentacles over port 443
description: Octopus Polling Tentacles open a connection to the Octopus Server over port 443 to ask what to do.
position: 130
---

[Polling Tentacles](docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#polling-tentacles) usually communicate with Octopus Server over port 10943. If your network configuration prevents outbound connections from your Tentacles on non-standard ports, you may be able to configure Tentacle to use port 443 (HTTPS).

Based upon your chosen method of hosting Octopus Server, 

## Octopus Cloud

To setup a Polling Tentacle for an Octopus Cloud instance, omit the `--server-comms-port` parameter and specify the `--server-comms-address <address>` parameter. The address to use is your Octopus Cloud instance URL prefixed with `polling.` (e.g. `https://polling.<yoururl>.octopus.app`) 

### Registering a new Tentacle
```powershell
.\Tentacle register-with --instance MyInstance --server "https://<yoururl>.octopus.app" --server-comms-address "https://polling.<yoururl>.octopus.app" --comms-style TentacleActive --apiKey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO" --environment "Test" --role "Web"
```

### Changing an existing Tentacle

```powershell
.\Tentacle service --instance MyInstance --stop
.\Tentacle configure --reset-trust
.\Tentacle register-with --instance MyInstance --server "https://<yoururl>.octopus.app" --server-comms-address "https://polling.<yoururl>.octopus.app" --comms-style TentacleActive --apiKey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO" --environment "Test" --role "Web"
.\Tentacle service --instance MyInstance --start
```

### Registering a new Worker
```powershell
.\Tentacle register-worker --instance MyInstance --server "https://<yoururl>.octopus.app" --server-comms-address "https://polling.<yoururl>.octopus.app" --comms-style TentacleActive --apiKey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO" --workerpool MyWorkerPool
```

### Changing an existing Worker
```powershell
.\Tentacle service --instance MyInstance --stop
.\Tentacle configure --reset-trust
.\Tentacle register-worker --instance MyInstance --server "https://<yoururl>.octopus.app" --server-comms-address "https://polling.<yoururl>.octopus.app" --comms-style TentacleActive --apiKey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO" --workerpool MyWorkerPool
.\Tentacle service --instance MyInstance --start
```


## Self-hosted

For self-hosted installations of Octopus Server, additional network configuration and/or services are required to support the use of Polling Tentacles over port 443 alongside the Octopus Server UI and API.

:::warning
This document requires additional network configuration... (ie. Reverse Proxy) or the use of [Octopus Cloud](/docs/octopus-cloud/index.md).
:::

New hostname/DNS record pointing at the same IP as the Server URL
Reverse proxy to redirect inbound traffic on port 443 to port 10943 on the Octopus Server.
 - Reverse proxy must pass-through all Tentacle traffic and not attempt SSL offloading

