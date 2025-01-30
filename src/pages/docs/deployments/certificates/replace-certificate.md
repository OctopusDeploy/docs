---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-09
title: Replace a certificate
icon: fa-solid fa-lock
description: Replace a certificate managed by Octopus Deploy
navOrder: 80
---

The replace certificate feature is designed for the scenario where a new certificate has been obtained via a renewal process.

The new certificate will assume the ID of the previous certificate, meaning all referencing variables will now refer to the new certificate.

The previous certificate will be [archived](/docs/deployments/certificates/archiving-and-deleting-certificates).

To replace a certificate, navigate to the certificate details page and click 'Replace':

:::figure
![](/docs/deployments/certificates/images/replace-certificate-btn.png)
:::
