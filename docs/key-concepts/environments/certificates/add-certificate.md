---
title: Add a Certificate to Octopus
position: 0
---

To add a certificate to Octopus, navigate to **Environments** -> **Certificates** -> **Add Certificate** 

![Add certificate](/docs/images/certificates/add-certificate.png)

When selecting your certificate file for upload, it must be one of the [supported file-formats](/docs/key-concepts/environments/certificates/file-formats.md).

:::hint
**Security Recommendation: Scope your certificates to the appropriate Environments**
If your certificate contains a production private-key, it is strongly recommended to scope your certificate to the appropriate environment.
This allows you to assign permissions based on Environments, ensuring that only users with appropriate permissions in the scoped Environments will be able to access the private-key. 
:::