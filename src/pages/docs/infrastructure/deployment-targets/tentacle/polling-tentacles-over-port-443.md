---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-06-23
title: Polling Tentacles over port 443
description: Octopus Polling Tentacles open a connection to the Octopus Server over port 443 to ask the Server if there is any work to do.
navOrder: 50
---

[Polling Tentacles](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication/#polling-tentacles) usually communicate with Octopus Server over TCP port 10943. If your network configuration prevents outbound connections from your Tentacles on non-standard ports, you can configure Tentacle to use port 443 (HTTPS).

:::div{.hint}
**Please Note:**

- You must be running **Tentacle 6.3.417** (or higher) to configure polling tentacles over port 443.
- Configuring polling tentacles over port 443 does **not use WebSockets**. For more information, see [Polling Tentacles over WebSockets](/docs/infrastructure/deployment-targets/tentacle/windows/polling-tentacles-web-sockets).
:::

The procedure for configuring Polling Tentacles to use port 443 varies based upon your chosen method of hosting Octopus Server.

## Octopus Cloud

The setup of a Polling Tentacle for an [Octopus Cloud](/docs/octopus-cloud) instance over port 443 is the same as a [Polling Tentacle over port 10943](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication/#polling-tentacles), except when registering the Tentacle. Change the `register-with` and `register-worker` commands:

 - Omit the `--server-comms-port` parameter.
 - Specify the `--server-comms-address <address>` parameter.
   - The address to use is your [Octopus Cloud](/docs/octopus-cloud) instance URL prefixed with `polling.` (e.g. `https://polling.<yoururl>.octopus.app`).

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

For self-hosted installations of Octopus Server, you will require specific network configuration and/or services to support the use of Polling Tentacles over port 443. This may be in addition to any existing configuration to support making the Octopus Web Portal and REST API available over port 443. 

A reverse proxy specific to Polling Tentacles (e.g. NGINX) could be set up on the Octopus Server or a machine/appliance that fronts it. The reverse proxy would inspect connections coming in on the desired port (in this case 443) and forward to the configured port in Octopus Server for Polling Tentacles (defaults to 10943).

:::div{.hint}
During registration with Octopus Server as a [Worker](/docs/infrastructure/workers) or [Deployment Target](/docs/infrastructure/deployment-targets), Polling Tentacles use HTTPS to communicate with the Octopus REST API. 

Once a Tentacle is registered with Octopus Server, it uses a [secure TCP connection](/docs/security/octopus-tentacle-communication) to communicate with Octopus Server, and doesn't make HTTP calls. 

This means that you will need to use a TCP reverse proxy for Polling Tentacles as opposed to a HTTP reverse proxy for the Octopus Web Portal and REST API and may require using an additional machine to achieve. For example when using NGINX you should use a [stream](https://docs.nginx.com/nginx/admin-guide/load-balancer/tcp-udp-load-balancer/) reverse proxy and not a [http](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/) reverse proxy for the polling connection.
:::

For example:
- Configure a new DNS record dedicated for Polling Tentacle traffic. 
  - This will be used when registering your Workers and Tentacles (i.e. `--server-comms-address https://<your-polling-url>`) 
- Configure a reverse proxy rule to redirect inbound traffic on port 443 on the new DNS record to port 10943 on your Octopus Server.

The setup of a Polling Tentacle for your self-hosted instance over port 443 is the same as a [Polling Tentacle over port 10943](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication/#polling-tentacles), except when registering the Tentacle. Change the `register-with` and `register-worker` commands:
 - Omit the `--server-comms-port` parameter.
 - Specify the `--server-comms-address <address>` parameter.
   - The address to use is your new DNS record (e.g. `https://<your-polling-url>/`).

### Registering a new Tentacle

```powershell
.\Tentacle register-with --instance MyInstance --server "https://<your-octopus-url>" --server-comms-address "https://<your-polling-url>" --comms-style TentacleActive --apiKey "API-YOURKEY" --environment "Test" --role "Web"
```

### Changing an existing Tentacle

```powershell
.\Tentacle service --instance MyInstance --stop
.\Tentacle configure --reset-trust
.\Tentacle register-with --instance MyInstance --server "https://<your-octopus-url>" --server-comms-address "https://<your-polling-url>" --comms-style TentacleActive --apiKey "API-YOURKEY" --environment "Test" --role "Web"
.\Tentacle service --instance MyInstance --start
```

### Registering a new Worker
```powershell
.\Tentacle register-worker --instance MyInstance --server "https://<your-octopus-url>" --server-comms-address "https://<your-polling-url>" --comms-style TentacleActive --apiKey "API-YOURKEY" --workerpool MyWorkerPool
```

### Changing an existing Worker
```powershell
.\Tentacle service --instance MyInstance --stop
.\Tentacle configure --reset-trust
.\Tentacle register-worker --instance MyInstance --server "https://<your-octopus-url>" --server-comms-address "https://<your-polling-url>" --comms-style TentacleActive --apiKey "API-YOURKEY" --workerpool MyWorkerPool
.\Tentacle service --instance MyInstance --start
```

## Learn more

For further reading on the installation and configuration of Tentacle:

- [Polling Tentacles](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication/#polling-tentacles)
- [Windows Tentacles](/docs/infrastructure/deployment-targets/tentacle/windows)
- [Linux Tentacles](/docs/infrastructure/deployment-targets/tentacle/linux)
- [Tentacle command line](/docs/octopus-rest-api/tentacle.exe-command-line)
  - [register-with](/docs/octopus-rest-api/tentacle.exe-command-line/register-with)
  - [register-worker](/docs/octopus-rest-api/tentacle.exe-command-line/register-worker)
