---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-09
title: Export a certificate
icon: fa-solid fa-lock
description: Export a certificate managed by Octopus as a selected file-format
navOrder: 60
---

Certificates can be downloaded from Octopus to your local machine.  The certificate may be exported in any of the [supported file-formats](/docs/deployments/certificates), or exactly as it was originally uploaded.

:::figure
![](/docs/img/deployments/certificates/images/download-certificate-btn.png)
:::

## Private-keys

If the certificate includes a private-key, then user requires the _Export certificate private-keys_ permission to download the certificate in a format which includes the private-key.

Exporting a certificate with a private-key will be [audited](/docs/security/users-and-teams/auditing).
