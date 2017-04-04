---
title: Polling Tentacles over WebSockets
description: Octopus Polling Tentacles open a connection to the Octopus server over WebSockets to ask what to do.
position: 1
version: "3.12"
---

Read about [(TCP) Polling Tentacles](polling-tentacles.md) before continuing.

Polling Tentacles can be setup to operate over HTTPS (Secure WebSockets) instead of raw TCP sockets. The advantage is that the port can be shared with another website (e.g. IIS or Octopus itself). The downside is the setup is a little more complicated and network communications are slightly slower.

If there is an available port, we recommend using [TCP Polling Tentacles](polling-tentacles.md). If only port 443 and 80 are available, it is possible to run Octopus Web UI just on 443 (HTTPS) and a TCP Polling Tentacle on port 80. Even though it is using port 80, which is by convention HTTP, the tentacle communications will still use TLS and be secure.

!toc

## Server Setup

The following prerequisites must be met to use this feature:

- Both the Octopus Server and Tentacle must be running windows 2012 or later.
- The server expects an SSL/TLS connection, so SSL offloading is not supported
- The other application using the port must be using the standard Windows networking library ([HTTP.sys](https://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/a2a45c42-38bc-464c-a097-d7a202092a54.mspx)). This includes IIS, .NET apps and Octopus itself. However, it does not include any applications that utilise non-HTTP.sys TCP/IP or HTTP stacks. Check your product's documentation for more information.
- The other application must be using HTTPS on that port

### Listen Address

The first step is to select a URL listen prefix. HTTP.sys handles the initial TLS handshake and then routes the request based on the HTTP headers. This means that the request can be routed based on IP, hostname and path. See the 
[UrlPrefix documentation](https://msdn.microsoft.com/en-us/library/windows/desktop/aa364698(v=vs.85).aspx) for the syntax and how routes are matches. 

In most cases, we recommend using `+` as the host name and a unique string for path. This will ensure that address
takes the highest precedence. For example, to listen on port 443: `https://+:443/OctopusComms`. The path should not be 
used by the other applications listening on the port.

A SSL certificate must be configured for the chosen address and port (the path is ignored). If an existing application (eg the Octopus Web UI) is already using that address and port, no extra configuration is required. If not see [Certificate section below](#Certificate).

Once selected the Octopus Server can be configured to listen on that prefix using the following commands:
```
.\Octopus.Server.exe service --instance OctopusServer --stop
.\Octopus.Server.exe configure --instance OctopusServer --commsListenWebSocket https://+:443/OctopusComms
.\Octopus.Server.exe service --instance OctopusServer --start
```

### Testing
To confirm that the server is successfully configured, open the listen address in your browser. If you are using `+` for the host, replace that with `localhost`. For example `https://localhost:443/OctopusComms`. You should get a page titled `Octopus Server configured successfully`. 

If you get a connection refused or reset error, check the address and port and ensure a certificate is [configured](#Certificate) for that address.

If you get the other application that is listening on that port, ensure that your listen address has a [higher precedence](https://msdn.microsoft.com/en-us/library/windows/desktop/aa364698(v=vs.85).aspx) and that 
the server sucessfully bound to that address in the [server log file](/reference/log-files.md).

If you encounter a certificate warning, ignore it and continue. This warning is due to the certificate not having a valid chain of trust back to a trusted certificate authority. Octopus [trusts certificates directly](https://octopus.com/blog/why-self-signed-certificates).

## Tentacle Setup
The setup of a WebSocket tentacle is the same as a TCP polling tentacle, except for the thumbprint and the command line option to specify the communications address.

### Registering
When issuing the `register-with` command during tentacle setup, omit the `--server-comms-port` parameter and specify the `--server-web-socket <address>` parameter. The address to use is the listen prefix (replacing `+` with the hostname) and `https` replaced with `wss` (e.g. `wss://example.com:443/OctopusComms`). For example:
```powershell
.\Tentacle.exe register-with --instance MyInstance --server "https://example.com/"  --server-web-socket "wss://example.com:443/OctopusComms" --comms-style TentacleActive --apikey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO" --environment "Test" --role "Web" 
```

### Changing an Existing Tentacle
To change an existing tentacle to poll using WebSockets, run the following commands:
```powershell
.\Tentacle.exe service --instance MyInstance --stop
.\Tentacle.exe configure --reset-trust
.\Tentacle.exe register-with --instance MyInstance --server "https://example.com/" --server-web-socket "wss://example.com:443/OctopusComms" --comms-style TentacleActive --apikey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO" --environment "Test" --role "Web" 
.\Tentacle.exe service --instance MyInstance --start
```

### High Availablity
When issuing the `poll-server` command to add additional nodes to poll, omit the `--server-comms-port` parameter and specify the `--server-web-socket <address>` parameter. For example:

```powershell
poll-server --instance MyInstance --server "https://example.com/"  --server-web-socket "wss://example.com:443/OctopusComms" --apikey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO"
```
## More Information

### Certificate
Windows will need to be configured with a SSL certificate on the selected address and port. Usually this is done by the other application sharing the port.
The certificate does _not_ need have a valid chain of trust to a certificate authority. Therefore [Self signed certificates](https://octopus.com/blog/why-self-signed-certificates) can be used. The certificate also does not need to match the hostname.
 It does need to be installed into the Personal certificate store of the Machine account.

The easiest way to get the SSL certificate set up is to configure [Octopus to use HTTPS](/docs/how-to/expose-the-octopus-web-portal-over-https.md) on that address and port.

If you need to generate a self signed certificate, this can be done by issuing the following PowerShell command. Take note of the thumbprint generated.
```powershell
New-SelfSignedCertificate -Subject "CN=Example Website" -CertStoreLocation "Cert:\localMachine\My" -KeyExportPolicy Exportable
```

If your chosen certificate has not yet been associated with the selected address and port, use the `netsh` tool to install it. For example:
```powershell
netsh http add sslcert ipport=0.0.0.0:443 certhash=966857B08601B9ACA9A9F10E7D469AC521E2CD4B appid='{00112233-4455-6677-8899-AABBCCDDEEFF}'
```
```console
netsh http add sslcert ipport=0.0.0.0:443 certhash=966857B08601B9ACA9A9F10E7D469AC521E2CD4B appid={00112233-4455-6677-8899-AABBCCDDEEFF}
```
For more details instructions, see Microsoft's [certificate HowTo](https://msdn.microsoft.com/en-us/library/ms733791(v=vs.110).aspx).

### Thumbprint
Unlike other tentacle configurations, the tentacle must be configured to trust the thumbprint of the SSL certificate and not the thumprint Octopus uses for other methods of tentacle communication. This is due to HTTP.sys performing the certificate exchange (not the Octopus Server) and then delegating the connection. Both the tentacle and server still verify the certificate thumbprint match the trusted thumbprint.
