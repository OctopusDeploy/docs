---
title: Listening Tentacles
position: 0
---


When installing a Tentacle, you will be asked to choose how Tentacle will communicate with the Octopus server. In **listening** mode, Tentacle *listens* on a TCP port (port **10933** by default). When a package needs to be deployed, Octopus will connect to the Tentacle service on that port. *In listening mode Tentacle is the TCP server, and Octopus is the TCP client.*


*![](/docs/images/3048114/5865876.png)*

:::success
**Listening mode is recommended**
When choosing a communication mode, we recommend listening mode when possible. Listening mode uses the least resources (listening on a TCP port is cheaper than actively trying to connect to one). It also gives you the most control (you can use rules in your firewall to limit which IP addresses can connect to the port). [Octopus and Tentacle use SSL when communicating](/docs/reference/octopus---tentacle-communication.md), and Tentacle will outright reject connections that aren't from an Octopus server that it trusts (identified by an X.509 certificate public key that you provide during setup).
:::

:::warning
**SSL offloading is not supported**
The communication protocol used by Octopus and Tentacle requires intact end-to-end TLS connection for message encryption, tamper-proofing, and authentication. For this reason SSL offloading is not supported.
:::

:::warning
**Proxy servers supported for tentacle communications since Octopus 3.4**
The communication protocol used by Octopus and Tentacle 3.4 and above supports proxies. Read more about configuring proxy servers for Tentacle communications in [proxy support](/docs/installation/installing-tentacles/proxy-support.md).


If you are using a version of Octopus/Tentacle prior to 3.4 you will need to arrange a bypass/exception for traffic initiated from the Octopus server to the Tentacle on the configured TCP Port (port **10933** by default).
:::

## Installation

:::success
**Download the Tentacle MSI**
The latest Tentacle MSI can always be [downloaded from the Octopus Deploy downloads page](https://octopus.com/downloads).
:::


This four minute video (with captions) will walk you through the process of installing a Tentacle in listening mode, and registering it with your [Octopus Deploy server](/docs/installation/installing-octopus.md).

## Firewall changes


To allow your Octopus Deploy server to connect to the Tentacle, you'll need to allow access to TCP port **10933** on the Tentacle (or the port you selected during the installation wizard - port 10933 is just the default).


Using listening mode, you won't typically need to make any firewall changes on the Octopus Deploy server.

:::success
**Intermediary firewalls**
Don't forget to allow access not just in Windows Firewall, but also any intermediary firewalls between the Octopus server and your Tentacle. For example, if your Tentacle server is hosted in Amazon EC2, you'll also need to modify the AWS security group firewall to tell EC2 to allow the traffic. Similarly if your Tentacle server is hosted in Microsoft Azure you'll also need to add an Endpoint to tell Azure to allow the traffic.
:::

## Troubleshooting connections


We have provided a detailed guide for [Troubleshooting Listening Tentacles](/docs/how-to/troubleshoot-listening-tentacles.md) but feel free to start with these simple steps.


*On the Tentacle machine*, open a web browser and navigate to [https://localhost:10933](https://localhost:10933/) (or your chosen Tentacle communications port if it isn't the default). Make sure an**HTTPS**URL is used.

- If you're presented with a prompt to "confirm a certificate" or "select a certificate" choose "Cancel" - don't provide one


- If you're presented with a warning about the invalidity of the site's certificate, "continue to the site" or "add an exception"



The page shown should look like the one below.


![](/docs/images/3048114/3277907.png)


If you can browse to the Tentacle server, but Octopus is unable to communicate with it, try using remote desktop on the Octopus server and browsing to the Tentacle address using the format above. If you can't access the Tentacle, check any intermediary firewalls.




**Like using curl?**

```bash
curl https://localhost:10933 -k
```

**Prefer PowerShell?**

```powershell
Add-Type @"
    using System.Net;
    using System.Security.Cryptography.X509Certificates;
    public class TrustAllCertsPolicy : ICertificatePolicy {
        public bool CheckValidationResult(
            ServicePoint srvPoint, X509Certificate certificate,
            WebRequest request, int certificateProblem) {
            return true;
        }
    }
"@

[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy
Invoke-WebRequest -Uri https://localhost:10933
```
