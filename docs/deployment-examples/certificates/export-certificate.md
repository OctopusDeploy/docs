---
title: Export a Certificate
description: Export a certificate managed by Octopus as a selected file-format
position: 60
---

Certificates can be downloaded via the Octopus Portal.  The certificate may be exported in any of the [supported file-formats](/docs/deployment-examples/certificates/file-formats.md), or exactly as it was originally uploaded.

![](download-certificate-btn.png)

![](download-certificate-dialog.png)

## Private-Keys

If the certificate includes a private-key, then user requires the _Export certificate private-keys_ permission to download the certificate in a format which includes the private-key.

Exporting a certificate with a private-key will be [audited](/docs/administration/managing-users-and-teams/auditing.md).
