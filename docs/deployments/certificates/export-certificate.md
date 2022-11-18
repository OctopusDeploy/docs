---
title: Export a certificate
description: Export a certificate managed by Octopus as a selected file-format
position: 60
---

Certificates can be downloaded from the Octopus Portal to your local machine.  The certificate may be exported in any of the [supported file-formats](/docs/deployments/certificates/index.md), or exactly as it was originally uploaded.

![](images/download-certificate-btn.png "width=500")

![](images/download-certificate-dialog.png "width=500")

## Private-keys

If the certificate includes a private-key, then user requires the _Export certificate private-keys_ permission to download the certificate in a format which includes the private-key.

Exporting a certificate with a private-key will be [audited](/docs/security/users-and-teams/auditing/index.md).
