---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Replace a certificate
description: Replace a certificate managed by Octopus Deploy
navOrder: 80
---

The replace certificate feature is designed for the scenario where a new certificate has been obtained via a renewal process.

The new certificate will assume the ID of the previous certificate, meaning all referencing variables will now refer to the new certificate.

The previous certificate will be [archived](/docs/deployments/certificates/archiving-and-deleting-certificates/).

To replace a certificate, navigate to the certificate details page and click 'Replace':

![](/docs/deployments/certificates/images/replace-certificate-btn.png "width=500")

Select the replacement certificate file and password (if required):

![](/docs/deployments/certificates/images/replace-certificate-dialog.png "width=500")
