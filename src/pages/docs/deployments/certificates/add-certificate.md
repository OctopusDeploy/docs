---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-09
title: Add a certificate to Octopus
icon: fa-solid fa-lock
description: Upload a X.509 certificate to be managed by Octopus Deploy
navOrder: 10
---

To add a certificate to Octopus, navigate to **Deploy ➜ Certificates ➜ Add Certificate**

:::figure
![Add certificate](/docs/img/deployments/certificates/images/add-certificate.png)
:::

When selecting your certificate file for upload, it must be one of the [supported file-formats](/docs/deployments/certificates).

:::div{.hint}
**Security Recommendation: Scope your certificates to the appropriate environments**

If your certificate contains a production private-key, it is strongly recommended to scope your certificate to the appropriate environment.
This allows you to assign permissions based on environments, ensuring that only users with appropriate permissions in the scoped environments will be able to access the private-key.
:::
