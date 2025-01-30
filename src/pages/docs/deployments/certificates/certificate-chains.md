---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-09
title: Certificate chains in Octopus
navTitle: Certificate chains
icon: fa-solid fa-lock
description: Manage certificate files containing a chain of certificates
navOrder: 15
---

Uploaded PFX or PEM files may contain a certificate chain. i.e. A certificate with a private-key, plus one or more authority certificates.

Certificates which contain a chain are indicated by a chain icon on the certificate card, as shown below:

:::figure
![](/docs/deployments/certificates/images/certificate-chain-card.png)
:::

The details page will show the details of all certificates in the chain:

:::figure
![](/docs/deployments/certificates/images/certificate-chain-details.png)
:::

## Importing certificate chains

When a certificate-chain is imported to one of the Windows Certificate Stores (either via the [Import Certificate Step](/docs/deployments/certificates/import-certificate-step) or by using the certificate in an IIS HTTPS Binding) the authority certificates will be automatically imported into the CA or Root stores (Root if the authority certificate is self-signed, CA otherwise as it is an intermediate authority).   

_Note:_  Authority certificates will always be imported to the LocalMachine location, even if the subject certificate is imported to a user-specific location.
This is because importing to the Root store for a specific user results in a security-prompt being displayed, which obviously doesn't work with automated deployments.   

## Downloading certificate chains

When downloading a certificate containing a chain, the behavior depends on the format being downloaded.

- `Original`: The downloaded file will be exactly what was originally uploaded.
- `PFX`: The entire chain will be included in the exported file.
- `DER`: Only the subject certificate will be included.  DER files never contain chains.
- `PEM`: Download-dialog provides options to include:
   - Primary Certificate
   - Primary and Chain Certificates
   - Chain Certificates Only

![Download Chain in PEM format dialog](/docs/deployments/certificates/images/download-pem-chain.png)
