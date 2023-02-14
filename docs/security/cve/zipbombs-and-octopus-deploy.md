---
title: ZipBombs and Octopus Deploy
description: Octopus Server actively prevents ZipBomb-based denial-of-service attacks using a number of preventative measures.
position: 1
---

We take every reasonable effort to make Octopus Deploy secure against well-known vulnerabilities. One such vulnerability is denial-of-service attacks via ZipBombs.

## What is a ZipBomb?

Using a specially crafted archive file (eg .zip, .jar, .tar.gz), a malicious actor could potentially cause a machine to become unresponsive by consuming large amounts of CPU and disk space. For more information about Zip Bombs, refer to the following:

- [ZipBombs according to OWASP](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic_Testing/09-Test_Upload_of_Malicious_Files#zip-bombs)
- [ZipBombs according to Security Researcher, David Fifield](https://www.bamsoftware.com/hacks/zipbomb/)

## Does Octopus Deploy prevent ZipBomb attacks?

Yes. The Octopus Server, and deployment agents that run on Workers and deployment targets, are designed to detect and prevent extraction of potentially malicious archives.

The responsibility for protecting against ZipBomb attacks is shared between us as the software vendor, and you as the customer.

### What is Octopus Deploy responsible for?

We take responsibility to provide commercially reasonable protection against ZipBomb attacks. If you [find and report](https://octopus.com/security/disclosure) a specific ZipBomb vulnerability, we will follow our practice of [responsible disclosure](https://octopus.com/security/disclosure).

We will assist Octopus Cloud customers in adjusting their instance limits if [the default limits](#cloud-limits) are impacting their ability to deploy legitimate packages.

### What is the customer responsible for?

As the customer, you are responsible for granting access to people you trust, and ensuring the security of your own network and operating systems.

Octopus Server ensures that archives can only be uploaded for processing by authenticated users with specific permissions, which means that the only potential attackers are users whose access to the Octopus instance has been specifically granted by the customer.

For self-hosted Octopus Deploy instances, the customer is responsible for using [the available configuration settings](#self-hosted-limits) to ensure these protections 

## How Octopus Deploy prevents ZipBomb attacks {#prevention}

The only perfect way to prevent every possible ZipBomb attack would be if Octopus Deploy didn't extract archives uploaded by users. As deployment packages are almost always archives, this is obviously not a viable solution. We have taken great care to design Octopus Deploy to strike a balance between enabling our customers to do what Octopus Deploy was designed to do, and preventing harm via ZipBombs.

### Octopus Cloud default archive limits {#cloud-limits}

The following archive limits are in place for all Octopus Cloud customers, which generally align to the available resources on the Octopus Cloud infrastructure:

* Maximum size a deployment package can decompress to: 1 terabyte
  * Applies to all Deployment Targets, Dynamic Workers and self-hosted Worker Pools
* Maximum size an archive can decompress to on Octopus Server for all other operations: 10 gigabytes
  * Applies to any other non-deployment operations that use archives

These limits can be adjusted on a per-customer basis. If your standard business operations are being impacted by these limits, please contact support@octopus.com and we'll be happy to help adjust your limits to find the appropriate balance of functionality and protection.

### Self-Hosted default archive limits {#self-hosted-limits}
The following default archive limits are in place for all self-hosted:

* Maximum size a deployment package can decompress to: 1 petabyte
  * Applies to all Deployment Targets, the in-built Worker (the "Run on Octopus Server" option available for some steps), and self-hosted Worker Pools
* Maximum size an archive can decompress to on Octopus Server for all other operations: 1 terabyte
  * Applies to any other non-deployment operations that use archives

These limits can be adjusted by an Octopus Server Administrator, via the Configuration > Settings > Archive Limits page in Octopus Server.
