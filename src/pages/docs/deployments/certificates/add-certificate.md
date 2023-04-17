---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Add a certificate to Octopus
description: Upload a X.509 certificate to be managed by Octopus Deploy
navOrder: 10
---

To add a certificate to Octopus, navigate to **{{Library,Certificates,Add Certificate}}**

![Add certificate](/docs/deployments/certificates/images/add-certificate.png "width=500")

When selecting your certificate file for upload, it must be one of the [supported file-formats](/docs/deployments/certificates/).

:::hint
**Security Recommendation: Scope your certificates to the appropriate Environments**
If your certificate contains a production private-key, it is strongly recommended to scope your certificate to the appropriate environment.
This allows you to assign permissions based on Environments, ensuring that only users with appropriate permissions in the scoped Environments will be able to access the private-key.
:::
