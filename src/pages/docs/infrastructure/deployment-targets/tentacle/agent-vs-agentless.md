---
layout: src/layouts/Default.astro
pubDate: 2025-08-28
modDate: 2025-08-28
title: Agent vs Agentless  
description: A comparison of agent-based deployments using Tentacle versus agentless deployments using SSH or WinRM.  
navOrder: 55 
---

Generally speaking, the two options for communicating with remote machines are agent-based and agentless. Agent-based relies on an agent installed on the target, such as the Octopus Tentacle. Agentless is a misnomer, as there is an agent which is pre-installed on the machine, specifically SSH for Linux machines and WinRM for Windows.   

At Octopus, we prefer and recommend agent-based, using Octopus Tentacles. In this document, we compare the two approaches. 

## Connectivity Model

<table>
<tbody>
<tr>
<td>Tentacle</td>
<td>Tentacle can operate in Listening or Polling modes. This avoids firewall headaches by allowing outbound-only connections from the targets.</td>
</tr>
<tr>
<td>SSH</td>
<td>Inbound over port 22. This is standard in most Linux environments.</td>
</tr>
<tr>
<td>WinRM</td>
<td>Inbound over ports 5985 (HTTP) or 5986 (HTTPS).</td>
</tr>
</tbody>
</table>

## Authentication and Security

<table>
<tbody>
<tr>
<td>Tentacle</td>
<td>
Mutual X.509 certificate authentication. Both the Octopus Server and the Tentacle generate their own X.509 certificates when they’re installed. These are exchanged during the initial “trust” setup (the handshake). After that, each side verifies the other using the certificates before allowing communication. 

All communication between the Octopus Server and Tentacle is encrypted using TLS.  

There is no reliance on domain-trust or OS accounts.
</td>
</tr>
<tr>
<td>SSH</td>
<td>
Uses the SSH protocol with public-key cryptography.

Octopus Deploy proves identity with a configured key, either:
- SSH private key
- Username + password
</td>
</tr>
<tr>
<td>WinRM</td>
<td>
For encryption, typically uses HTTPS with TLS.
Uses Windows authentication models:

- Kerberos 
- NTLM
- Basic authentication
</td>
</tr>
</tbody>
</table>

## Installation and Configuration

<table>
<tbody>
<tr>
<td>Tentacle</td>
<td>
Requires installing a lightweight service (Windows or Linux).

Upgrades can be automated from Octopus.
</td>
</tr>
<tr>
<td>SSH</td>
<td>
No additional agent required.

Requires correct system configuration and credential management.
</td>
</tr>
<tr>
<td>WinRM</td>
<td>
No additional agent required.

Requires correct system configuration and credential management.
</td>
</tr>
</tbody>
</table>

## Summary
Using the Tentacle agent comes with the upfront cost of installing the service on target machines, but this is offset by

- More flexible connectivity model, supporting both Listening and Polling modes.
- Strong security independent of domain-trust or OS credentials, making it less likely to be misconfigured.

