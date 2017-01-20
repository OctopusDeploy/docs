---
title: Polling Tentacles
position: 1
---


When installing a Tentacle, you will be asked to choose how Tentacle will communicate with the Octopus server. In **polling** mode, Tentacle will poll the Octopus server periodically to check whether there are any tasks for it to perform. Polling mode is the opposite to [listening mode](/docs/home/installation/installing-tentacles/listening-tentacles.md). *In polling mode, Octopus is the TCP server, and Tentacle is the TCP client.*


![](/docs/images/3048113/5865875.png)


The advantage to polling mode is that you don't need to make any firewall changes on the Tentacle side; you only need to allow access to a port on the Octopus server. The disadvantage is that it also uses more resources on the Tentacle side, since Tentacle needs to poll periodically even if there aren't any jobs for it to perform. That's why [we recommend listening mode](/docs/home/installation/installing-tentacles/listening-tentacles.md) most of the time.


Polling mode is good for scenarios that involve Tentacle being behind NAT or a dynamic IP address. A good example might be servers at branch offices or a chain of retail stores, where the IP address of each server running Tentacle may change.

:::warning
**SSL offloading is not supported**
The communication protocol used by Octopus and Tentacle requires intact end-to-end TLS connection for message encryption, tamper-proofing, and authentication. For this reason SSL offloading is not supported.
:::

:::warning
**Proxy servers supported for tentacle communications since Octopus 3.4**
The communication protocol used by Octopus and Tentacle 3.4 and above supports proxies. Read more about configuring proxy servers for Tentacle communications in [proxy support](/docs/home/installation/installing-tentacles/proxy-support.md).


If you are using a version of Octopus/Tentacle prior to 3.4 you will need to arrange a bypass/exception for traffic initiated from the Tentacle to the Octopus server on the configured TCP Port (port **10943** by default).
:::

## Installation

:::success
**Download the Tentacle MSI**
The latest Tentacle MSI can always be [downloaded from the Octopus Deploy downloads page](https://octopus.com/downloads).
:::


This three minute video (with captions) will walk you through the process of installing a Tentacle in polling mode, and registering it with your [Octopus Deploy server](/docs/home/installation/installing-octopus.md).

## Firewall changes


To allow Tentacle to connect to your Octopus Deploy server, you'll need to allow access to port **10943** on the Octopus server (or the port you selected during the installation wizard - port 10943 is just the default). You will also need to allow Tentacle to access the Octopus HTTP web portal (typically port **80** or**443**- these bindings are selected when you [install the Octopus Deploy server](/docs/home/installation/installing-octopus.md)).


Note that the port used to poll Octopus for jobs is different to the port used by your team to access the Octopus Deploy web interface; this is on purpose, and it means you can use different firewall conditions to allow Tentacles to access Octopus by IP address.


Using polling mode, you won't typically need to make any firewall changes on the Tentacle.

:::success
**Intermediary firewalls**
Don't forget to allow access not just in Windows Firewall, but also any intermediary firewalls between the Tentacle and your Octopus server. For example, if your Octopus server is hosted in Amazon EC2, you'll also need to modify the AWS security group firewall to tell EC2 to allow the traffic. Similarly if your Octopus server is hosted in Microsoft Azure you'll also need to add an Endpoint to tell Azure to allow the traffic.
:::

## Troubleshooting


We have provided a detailed guide for [Troubleshooting Polling Tentacles](/docs/home/how-to/troubleshoot-polling-tentacles.md) but feel free to start with these simple steps.


If Tentacle is unable to connect to the Octopus Deploy server, any errors will appear in the Windows Event Viewer. You can also open a web browser on the Tentacle and try browsing to the Octopus Deploy server using **HTTPS** (will not work with HTTP) and be welcomed with a friendly message.

:::hint
**Client Certificates and Certificate Warnings**
You may be prompted to provide a client certificate, you can simply cancel this prompt and move on. You may also be warned the connection is not private or the server is not trusted which happens because Octopus uses a self-signed certificate for its listening endpoint. You can safely ignore these warnings and proceed to the site.
:::


![](/docs/images/3048113/3277906.png)


If you can browse to the Octopus server listening endpoint, but Tentacle is unable to communicate with it, try using remote desktop on the Tentacle server and browsing to the Octopus listening endpoint address using the format above. If you can't access the Octopus server, check any intermediary firewalls.

**Like using curl?**

```bash
curl https://your-octopus:10943 -k
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
Invoke-WebRequest -Uri https://your-octopus:10943
```
