---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Certificates
description: Manage X.509 certificates with Octopus Deploy
navOrder: 40
hideInThisSectionHeader: true
---

X.509 certificates are a key component of many deployment processes. Octopus Deploy provides the ability to securely store and manage your certificates, and easily use them in your Octopus Projects.  

## Supported certificate file formats

The following certificate formats are supported in Octopus Deploy:

- **[PKCS#12](https://en.wikipedia.org/wiki/PKCS_12)**: .pfx files. May include a private-key.  
- **[PEM](https://en.wikipedia.org/wiki/Privacy-enhanced_Electronic_Mail)**: Base64-encoded [ASN.1](https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One). Usually has .pem file extension (though sometimes .cer or .crt on Windows). May include a private-key.
- **[DER](https://en.wikipedia.org/wiki/X.690#DER_encoding)**: Binary-encoded ASN.1. Generally stored with file extensions .crt, .cer, or .der. Does not include private-key.

## Securely store certificates and private-keys

![](/docs/deployments/certificates/certificate-list.png "width=500")

- [Add certificate](/docs/deployments/certificates/add-certificate/)
- [Replacing certificates](/docs/deployments/certificates/replace-certificate/)
- [Archiving and deleting certificates](/docs/deployments/certificates/archiving-and-deleting-certificates/)
- [Exporting certificates](/docs/deployments/certificates/export-certificate/)

## Configure subscriptions for expiry notifications

[Octopus Subscriptions](/docs/administration/managing-infrastructure/subscriptions/) can be used to configure notifications when certificates are close to expiry or have expired.

There is a "Certificate expiry events" event-group, and three events:  

- Certificate expiry 20-day warning.
- Certificate expiry 10-day warning.
- Certificate expired.

:::info
The background task which raises the certificate-expiry events runs:
- 10 minutes after the Octopus Server service starts
- Every 4 hours

Certificate-expiry events are _not_ raised for [archived](/docs/deployments/certificates/archiving-and-deleting-certificates/) certificates.
:::

## Import certificates into the Windows certificate store  

Certificates can be imported to Windows Certificate Stores as part of a deployment process using the [Import Certificate Deployment Step](/docs/deployments/certificates/import-certificate-step/).

![](/docs/deployments/certificates/images/import-certificate-step-select.png "width=500")

## Use certificates for HTTPS bindings when deploying IIS websites   

When configuring HTTPS bindings for [IIS Websites](/docs/deployments/windows/iis-websites-and-application-pools/), a certificate can be configured either by:
- entering the thumbprint directly (this assumes the certificate has already been installed on the machine).
- selecting a certificate-typed variable (this will automatically install the certificate).

![](/docs/deployments/certificates/images/https-binding-certificate.png "width=500")

## Create certificate-typed variables

Certificates managed by Octopus can be configured as the [value of variables](/docs/projects/variables/certificate-variables/), and used from custom deployment scripts.

![](/docs/deployments/certificates/images/certificate-variables-scoped.png "width=500")

Note that certificates can not be selected directly when configuring a deployment step. Selecting a certificate in deployment steps presents a drop-down list of the certificate variables that have been defined in the project.

## Learn more

- [Lets Encrypt runbook examples](/docs/runbooks/runbook-examples/routine/lets-encrypt-renew-certificate/).