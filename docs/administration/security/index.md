---
title: Security
description: Security considerations for Octopus Administrators.
position: 9
---

We pride ourselves on making Octopus Deploy a secure product. The security and integrity of your Octopus Deploy installation is the result of a partnership between us as the software vendor, and you as the host and administrators of your installation.

This section provides information about the responsibility we take to provide a secure software product, and considerations for you as the host and administrator of your Octopus Deploy installation.

## Data encryption

Octopus Deploy encrypts any data which we deem to be sensitive. You can also instruct Octopus Deploy to encrypt sensitive variables which can be used as part of your deployments.

Learn about [data encryption](/docs/administration/security/data-encryption.md) and [sensitive variables](/docs/deployment-process/variables/sensitive-variables.md).

## Secure communication

Your Octopus Server communicates with the machines you configure as targets for your deployments using transport encryption and tamper proofing techniques.

Learn about [secure communication](/docs/administration/security/octopus-tentacle-communication/index.md).

## Safely exposing your Octopus Deploy installation

In many scenarios you will want to expose parts of your Octopus Deploy installation to external networks. You should take care to understand the security implications of exposing your Octopus Deploy installation, and how to configure it correctly to prevent unwanted guests from accessing or interfering in your deployments.

Learn about [safely exposing Octopus Deploy](/docs/administration/security/exposing-octopus/index.md).

## Identity and access control

Before a person can access your Octopus Deploy installation, they must validate their identity. We provide built-in support for the most commonly used authentication providers including Active Directory (NTLM and Kerberos), Google Apps, and Microsoft Azure Active Directory. Octopus Deploy works natively with Open ID Connect (OIDC) so you can connect to other identity providers. If you don't want to use an external identity providers, you can let Octopus Deploy securely manage your usernames and passwords for you.

Learn about [authentication providers](/docs/administration/authentication-providers/index.md).

Once a person has verified their identity, you can control which activities these users can perform.

Learn about [managing users and teams](/docs/administration/managing-users-and-teams/index.md).

## Auditing

Arguably one of the most appreciated features in Octopus Deploy is our support for detailed auditing of important activity.

Learn about [auditing](/docs/administration/auditing.md).

## Prevention of common vulnerabilities and exploits

To make Octopus Deploy useful to your organization it needs a high level of access to your servers and infrastructure. We take great care to understand common vulnerabilities and exploits which could affect your Octopus Deploy installation, and ensure our software prevents anyone from leveraging these.

## Disclosure policy

No software is ever bug free, and as such, there will occasionally be security issues. Once we have fixed a verified security vulnerability we follow a practice of [responsible disclosure](https://en.wikipedia.org/wiki/Responsible_disclosure). You can view the entire list of disclosed security vulnerabilities in the [MITRE CVE database](https://www.cvedetails.com/vulnerability-list/vendor_id-16785/product_id-39115/Octopus-Octopus-Deploy.html).

Learn about our [security disclosure policy](https://octopus.com/security/disclosure).

## Contact us

If you have a concern regarding security with Octopus Deploy, or would like to report a security vulnerability, please send an email to [security@octopus.com](mailto:security@octopus.com).

For security vulnerabilities, please include as much information as possible, with full details about how to reproduce and validate the vulnerability, preferably with a proof of concept. If you wish to encrypt your report, please use our [PGP key](https://octopus.com/pgp-key.pub). Please give us a reasonable amount of time to correct the issue, before making it public.

We will respond to your report within 1 business day.