---
layout: src/layouts/Default.astro
pubDate: 2024-09-17
modDate: 2024-09-17
title: SHA1 Certificates on older Windows versions
description: How to diagnose and resolve compatibility issues with using SHA1 certificates
navOrder: 71
---

## Background
[Since 2017](../../../../security/cve/shattered-and-octopus-deploy#detecting-sha1-certificates-with-powershell), Octopus Server no longer supports SHA1 certificates due to their inherent security vulnerabilities. SHA1 is an outdated cryptographic hash algorithm that has been replaced by the more secure SHA256 standard, in line with industry best practices.


## Compatibility Issue: SHA1 on Windows Server 2012 R2
If your Octopus Server is still using a SHA1 certificate and is running on Windows Server 2012 R2, you may encounter issues when trying to connect with the Kubernetes Agent. This is due to a known incompatibility between the agent and older Windows systems using SHA1 certificates.

## Why This Happens
Windows Server 2012 R2 lacks support for certain modern cipher suites and hash algorithms required by the Kubernetes agent. Specifically, the agent fails during SSL negotiation because it cannot find the necessary SHA1RSA signature hash algorithm in the system's cryptographic libraries. This results in a failure to establish a secure connection between the Tentacle agent and the Octopus Server.

## Diagnosis
To confirm that the issue is caused by SHA1 compatibility, check each of the following signs:
1. **Verify the OS**: Ensure the Octopus Server is running on Windows Server 2012 R2.
2. **Check the Certificate Type**: Confirm that the Octopus Server is using a SHA1 certificate. Verify that the Octopus Server is using a SHA1 certificate. The simplest method is to query the Octopus REST API endpoint `/api/certificates/certificate-global` and inspect the **SignatureAlgorithm** field.
3. **Enable Schannel Event Logging**: On the Windows Server, [enable Schannel event logging](https://learn.microsoft.com/en-us/troubleshoot/developer/webapps/iis/health-diagnostic-performance/enable-schannel-event-logging). Look for an error event stating:
`An TLS 1.2 connection request was received from a remote client application, but none of the cipher suites supported by the client application are supported by the server. The SSL connection request has failed.`
This error will occur when the agent attempts to connect to the server, typically during agent startup or installation.

:::figure
![Windows Event Viewer Schannel Error](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-troubleshooting-sha1-windows-event-viewer.png)
:::

## Solutions
To resolve this issue and continue using the Kubernetes agent with your Octopus Server, you have two options, both of which are recommended regardless of the current issue:

### Option 1: Rotate the SSL certificate
Replace the current SHA1 certificate with a more secure **SHA256** certificate. This will ensure that the Kubernetes agent can successfully complete the SSL handshake with the server.

#### Steps to rotate the certificate
1. Generate a new self-signed certificate using the SHA256RSA algorithm.
2. Install the new certificate on your Octopus Server.
3. Update all the associated Tentacles to trust the new certificate.

Refer to this [documentation page](../../../../security/octopus-tentacle-communication/custom-certificates-with-octopus-server-and-tentacle) for detailed instructions on how to set up certificates with Octopus Server and Tentacle.

### Option 2: Upgrade the Windows Server Version
Upgrade the Octopus server from Windows Server 2012 R2 to a newer version, such as **Windows Server 2016 or later**, which supports the necessary cryptographic standards. Since Windows Server 2012 R2 has already reached [end-of-support](https://azure.microsoft.com/en-au/updates/windows-server-2012r2-reaches-end-of-support) and no longer receives updates from Microsoft, it remains vulnerable to security risks. Moving to a supported version will not only ensure compatibility with modern SSL/TLS protocols but also protect your system by receiving ongoing security updates and enhancements. 
