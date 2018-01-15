---
title: Exposing Octopus
description: You can keep your Octopus installation inside your corporate network, or you may want to expose it to the internet. This section describes how to safely expose your Octopus installation and the security implications you should consider.
position: 3
---

Your entire Octopus installation and all of the targets you deploy to could be contained safely within your corporate network. This is nice from a security perspective, however you may want your team to access Octopus from outside your corporate network, or you may need to deploy to servers outside your corporate network. This section will help you plan your Octopus installation and help you understand the security implications of different network topologies.

!toc

## Security and encryption

We take security very seriously at Octopus Deploy and have gone to great lengths to protect your privacy and security.

Learn more about [how Octopus handles security and encryption of your data](/docs/administration/security/data-encryption.md).

Learn more about [how Octopus communicates with Tentacle](/docs/administration/octopus-tentacle-communication/index.md).

We undertake routine penetration testing and security audits. These reports are available on request by contacting our [support team](https://octopus.com/support).

## Where to host your Octopus Server

The Octopus Server is the central component of your Octopus installation. It hosts the Octopus HTTP API and the web portal, and is the central communication hub for deploying your applications. It needs direct access to your [SQL Server Database](/docs/administration/octopus-database/index.md) and a file store, which can be on a local disk, or a network file share.

You should host your Octopus Server in the best location based on your scenario. As a general rule of thumb, you should host your Octopus Server where it has the best access to the machines where you deploy your applications, and to the users who design and perform deployments.

You can choose to expose your Octopus Server to the public internet, or you can constrain access to your corporate network.

## Inbound requests

The Octopus Server hosts an HTTP API and web portal which you can configure to use standard TCP ports (80/443) or non-standard ports. Your Octopus Server can also be configured to accept inbound requests from Polling Tentacles over a custom TCP port, or using WebSockets.

The only inbound requests to your Octopus Server should be ones authorized by you. It could be your users, or Polling Tentacles, or services you've configured to leverage the Octopus API.

### Octopus HTTP API and web portal

If you do not want to expose your Octopus Server to the public internet, but want to provide remote access to users or other services, we recommend using a VPN. This will allow your remote workers to access your Octopus Server without exposing it to the public internet directly.

However, you may want to provide access for your users, or external services which leverage Octopus, and using a VPN is impractical. If you decide to expose the HTTP API and web portal of your Octopus Server to the public internet, here are some things you should consider:

1. Always enable HTTPS using SSL. We also recommend forcing all requests to use HTTPS, and enabling HSTS. Learn about [exposing Octopus Server over HTTPS](/docs/administration/security/exposing-octopus/expose-the-octopus-web-portal-over-https.md). Avoid exposing your Octopus Server via HTTP without SSL.
1. Consider how your users authenticate with your Octopus Server. You should use an authentication provider which supports multi-factor authentication (MFA). Learn about [authentication providers](/docs/administration/authentication-providers/index.md).
1. Consider setting up a routine security scan of your Octopus Server using a tool of your choice. This will provide further insights into the security precautions you should take.
1. Octopus enables certain security-related HTTP headers by default, however some of them are optional. Learn about [security headers](/docs/administration/security-headers.md).

### Polling Tentacles

The Octopus Server communicates with the machines involved in your deployments via Tentacle or SSH, or via some other protocol depending on your specific scenario. In most cases these are outbound requests, originating from the Octopus Server. The one exception to this are Polling Tentacles, where the Tentacle initiates a request to the Octopus Server. If you are using Polling Tentacles, you will need to open your firewall to allow Polling Tentacles to access your Octopus Server via the TCP port you've configured (default is port 10943), or via WebSockets using the HTTPS binding you have configured.

Learn about [Polling Tentacles](/docs/infrastructure/windows-targets/polling-tentacles/index.md) and [proxy server support for Polling Tentacles](/docs/infrastructure/windows-targets/proxy-support.md).

We generally recommend using Listening Tentacles and SSH wherever practical.

If you are not using Polling Tentacles you can keep that port closed on your firewall.

## Outbound requests

The Octopus Server generally makes outbound requests according to your specific deployment scenarios, like sending instructions to a Listening Tentacle or SSH endpoint, or reaching out to an external web service. You should consider the security implications related to your Octopus Server and outbound requests to design a set of network restrictions which balance security and usability.

Learn more about [outbound requests](/docs/administration/security/outbound-requests.md).

### Proxy servers

You can configure Octopus Server to make any outbound HTTP requests, and even Tentacle or SSH connections, via a proxy server offering you a greater level of control over outbound requests from the Octopus Server.

Learn about [proxy server support](/docs/infrastructure/windows-targets/proxy-support.md).