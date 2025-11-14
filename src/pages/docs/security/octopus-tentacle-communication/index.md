---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-11-14
title: Octopus - Tentacle communication
description: Octopus Server and Tentacle communications details.
navOrder: 40
---

This page describes how the [Octopus Server](/docs/installation/) and the [Tentacle deployment agents](/docs/infrastructure/deployment-targets/tentacle/windows) communicate in a secure way.

## Background {#Octopus-Tentaclecommunication-Background}

Some deployment technologies are designed for the LAN and have no security at all. Some require machines to be on the same Active Directory domain. Others require you to set up usernames and passwords, and to store them in configuration files.

When designing Octopus, we wanted to make it easy to have secure deployments out of the box, without expecting machines to be on the same domain and without sharing passwords. Octopus needed to work in scenarios where the Octopus Server is running in your local LAN, close to your developers, while your production servers are running in the cloud or at a remote data center.

We achieve this security using [public-key cryptography](http://en.wikipedia.org/wiki/Public-key_cryptography "Wikipedia article on Public-key cryptography").

## Octopus/Tentacle trust relationship {#Octopus-Tentaclecommunication-Octopus/Tentacletrustrelationship}

Regardless of whether Tentacle is in [listening mode](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication/#listening-tentacles-recommended) or [polling mode](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication/#polling-tentacles), all communication between the Tentacle and Octopus is performed over a secure ([TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security)) connection. Octopus and Tentacle both have a public/private key pair that they use to establish the TLS connection and verify the identity of the other party.

When Tentacle is configured, you give it the thumbprint (which uniquely identifies the public key) of the Octopus Server. Likewise, you tell Octopus the thumbprint of the Tentacle. This establishes a trust relationship between the two machines:

1. Your Octopus Server will only issue commands to the Tentacles that it trusts.
2. Your Tentacles only accept commands from an Octopus they trust.

The only way another system can impersonate either party is by getting hold of the private key, which are kept safe and never leave the Octopus/Tentacle server (unless you export them from the certificate store). This makes it much more secure than exchanging passwords.  Since this is all based on public-key cryptography, it creates a highly secure way for the two machines to communicate without exchanging passwords, and works much like an SSH connection in the UNIX world.

:::div{.hint}
If necessary you can further restrict access using IPSec or VPNs.
:::

### Octopus certificates {#Octopus-Tentaclecommunication-Octopuscertificates}

The X.509 certificates used by Octopus and Tentacle are generated on installation and use 2048-bit private keys. There is an insightful discussion of [why Octopus uses self-signed certificates](https://octopus.com/blog/why-self-signed-certificates) by default.

:::div{.hint}
Instead of having Tentacle generate its own certificate, you can [import a Tentacle certificate](/docs/infrastructure/deployment-targets/tentacle/windows/automating-tentacle-installation/#export-and-import-tentacle-certificates-without-a-profile) which is helpful when [automating Tentacle installation](/docs/infrastructure/deployment-targets/tentacle/windows/automating-tentacle-installation).
:::

### Scenario: Listening Tentacles {#Octopus-Tentaclecommunication-Scenario-ListeningTentacles}

Tentacle plays the role of server and Octopus as the client:

1. Octopus establishes the TLS connection with the Tentacle.
2. The Tentacle presents its certificate as the server certificate allowing Octopus to verify the identity of the Tentacle.
3. Octopus presents its certificate as a client certificate so the Tentacle can verify the identity of Octopus.
4. Once the identity of the Octopus and Tentacle have been established the connection is held open and Octopus will start issuing commands to the Tentacle.

### Scenario: Polling Tentacles {#Octopus-Tentaclecommunication-Scenario-PollingTentacles}

Octopus plays the role of server and Tentacle as the client:

1. The Tentacle establishes the TLS connection with Octopus.
2. Octopus presents its certificate as the server certificate allowing the Tentacle to verify the identity of Octopus.
3. The Tentacle presents its certificate as a client certificate so Octopus can verify the identity of the Tentacle.
4. Once the identity of the Octopus and Tentacle have been established the connection is held open and Octopus will start issuing commands to the Tentacle.

### Data transport

Octopus uses [Halibut](https://github.com/OctopusDeploy/Halibut) to communicate. This is based on TCP, not HTTP, it is not possible to add HTTP headers to this communication channel.

Both Tentacle and Server expose a simple page on the listening port to web browsers to allow you to confirm your configuration. Some security scanners detect this page and incorrectly assume that it's a web server or a web app and warn about self-signed certificates.

## Transport Layer Security (TLS) implementation

Octopus Server and Tentacle use TLS for all communication, with the protocol version and cipher suites negotiated based on the host operating system's cryptographic capabilities.

**Protocol Support:**
- **TLS 1.2** - Minimum required version
- **TLS 1.3** - Supported on modern operating systems (Windows Server 2022+, Windows 11+, and current Linux distributions)

Modern versions of Octopus rely on the underlying OS TLS implementation:
- **Windows**: Schannel (Windows' native TLS/SSL provider)
- **Linux**: OpenSSL

The TLS handshake negotiates the strongest mutually supported protocol version and cipher suite. Both peers must support at least one compatible protocol, cipher suite, and signature algorithm to establish a connection.

:::div{.warning}
**TLS 1.0 and TLS 1.1 are deprecated and insecure.** While legacy Octopus versions may support these protocols if configured at the OS level, they should not be used in production environments. Ensure all systems support at least TLS 1.2.
:::

**Configuration Requirements:**

For details on the specific protocols, cipher suites, and signature algorithms required for Octopus communication, see [Minimum TLS Requirements](/docs/security/octopus-tentacle-communication/minimum-tls-requirements).

If your environment enforces custom TLS hardening policies, ensure they meet the minimum requirements to maintain connectivity between Octopus Server and Tentacle agents.

**Hardening TLS:**

To further secure your Octopus installation by disabling weak protocols or limiting cipher suites, review our documentation on [Hardening Octopus](/docs/security/hardening-octopus/#disable-weak-tls-protocols).

## Troubleshooting Tentacle communication problems {#Octopus-Tentaclecommunication-TroubleshootingTentaclecommunicationproblems}

We have built comprehensive troubleshooting guides for both [Listening and Polling Tentacles](/docs/infrastructure/deployment-targets/tentacle/troubleshooting-tentacles).

If you are seeing error messages like below, try [Troubleshooting Schannel and TLS](/docs/security/octopus-tentacle-communication/troubleshooting-schannel-and-tls):

Client-side:`System.Security.Authentication.AuthenticationException: A call to SSPI failed, see inner exception. ---> System.ComponentModel.Win32Exception: One or more of the parameters passed to the function was invalid`

Server-side:`System.IO.IOException: Unable to read data from the transport connection: An existing connection was forcibly closed by the remote host.`
