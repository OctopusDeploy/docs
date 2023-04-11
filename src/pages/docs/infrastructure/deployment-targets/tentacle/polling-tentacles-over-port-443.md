---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Polling Tentacles over port 443
description: Octopus Polling Tentacles open a connection to the Octopus Server over port 443 to ask the Server if there is any work to do.
navOrder: 50
---

[Polling Tentacles](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md#polling-tentacles) usually communicate with Octopus Server over TCP port 10943. If your network configuration prevents outbound connections from your Tentacles on non-standard ports, you can configure Tentacle to use port 443 (HTTPS).

:::hint
Note: Configuring polling tentacles over port 443 via HTTPS described here does **not use WebSockets**. For more information on that topic, see [Polling Tentacles over WebSockets](/docs/infrastructure/deployment-targets/tentacle/windows/polling-tentacles-web-sockets.md).
:::

The procedure for configuring Polling Tentacles to use port 443 varies based upon your chosen method of hosting Octopus Server.

## Octopus Cloud

The setup of a Polling Tentacle for an [Octopus Cloud](/docs/octopus-cloud/index.md) instance over port 443 is the same as a [Polling Tentacle over port 10943](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md#polling-tentacles), except when registering the Tentacle. Change the `register-with` and `register-worker` commands:

 - Omit the `--server-comms-port` parameter.
 - Specify the `--server-comms-address <address>` parameter.
   - The address to use is your [Octopus Cloud](/docs/octopus-cloud/index.md) instance URL prefixed with `polling.` (e.g. `https://polling.<yoururl>.octopus.app`).

### Registering a new Tentacle

```powershell
.\Tentacle register-with --instance MyInstance --server "https://<yoururl>.octopus.app" --server-comms-address "https://polling.<yoururl>.octopus.app" --comms-style TentacleActive --apiKey "API-YOURKEY" --environment "Test" --role "Web"
```

### Changing an existing Tentacle

```powershell
.\Tentacle service --instance MyInstance --stop
.\Tentacle configure --reset-trust
.\Tentacle register-with --instance MyInstance --server "https://<yoururl>.octopus.app" --server-comms-address "https://polling.<yoururl>.octopus.app" --comms-style TentacleActive --apiKey "API-YOURKEY" --environment "Test" --role "Web"
.\Tentacle service --instance MyInstance --start
```

### Registering a new Worker
```powershell
.\Tentacle register-worker --instance MyInstance --server "https://<yoururl>.octopus.app" --server-comms-address "https://polling.<yoururl>.octopus.app" --comms-style TentacleActive --apiKey "API-YOURKEY" --workerpool MyWorkerPool
```

### Changing an existing Worker
```powershell
.\Tentacle service --instance MyInstance --stop
.\Tentacle configure --reset-trust
.\Tentacle register-worker --instance MyInstance --server "https://<yoururl>.octopus.app" --server-comms-address "https://polling.<yoururl>.octopus.app" --comms-style TentacleActive --apiKey "API-YOURKEY" --workerpool MyWorkerPool
.\Tentacle service --instance MyInstance --start
```

## Self-hosted

For self-hosted installations of Octopus Server, you will require additional network configuration and/or services to support the use of Polling Tentacles, Octopus Web Portal and REST API all over port 443. 

A reverse proxy (e.g. NGINX) can be set up either on the machine or a machine/appliance that fronts it. The reverse proxy would inspect connections coming in on the same port and decide which backend port to forward them to.

The proxy could differentiate the connections based on:
- Hostname (TLS SNI)
- IP Address

This reverse proxy must pass-through all Tentacle traffic as [SSL offloading is not supported](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md#ssl-offloading-is-not-supported).

For example, using TLS SNI you will require:
- A new DNS record dedicated for Polling Tentacle traffic. 
  - This will be used when registering your Workers and Tentacles (i.e. `--server-comms-address https://<your-polling-url>`) 
- A reverse proxy rule to redirect inbound traffic on port 443 on the new DNS record to port 10943 on your Octopus Server.

The setup of a Polling Tentacle for your self-hosted instance over port 443 is the same as a [Polling Tentacle over port 10943](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md#polling-tentacles), except when registering the Tentacle. Change the `register-with` and `register-worker` commands:
 - Omit the `--server-comms-port` parameter.
 - Specify the `--server-comms-address <address>` parameter.
   - The address to use is your new DNS record (e.g. `https://<your-polling-url>/`).

## Learn more

For further reading on the installation and configuration of Tentacle:

- [Polling Tentacles](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md#polling-tentacles)
- [Windows Tentacles](/docs/infrastructure/deployment-targets/tentacle/windows/index.md)
- [Linux Tentacles](/docs/infrastructure/deployment-targets/tentacle/linux/index.md)
- [Tentacle command line](/docs/octopus-rest-api/tentacle.exe-command-line/index.md)
  - [register-with](/docs/octopus-rest-api/tentacle.exe-command-line/register-with.md)
  - [register-worker](/docs/octopus-rest-api/tentacle.exe-command-line/register-worker.md)
