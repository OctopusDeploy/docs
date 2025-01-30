---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-09
title: Archive and delete certificates
icon: fa-solid fa-lock
description: Archiving and Deleting certificates managed by Octopus Deploy
navOrder: 100
---

## Archive a certificate

Archiving a certificate will prevent it from being selected as the value of a variable, while still allowing it to be used by existing usages (projects, releases, deployments).

:::figure
![](/docs/deployments/certificates/images/archive-certificate.png)
:::

Archived certificates can be viewed by navigating to **Deploy ➜ Certificates ➜ View Archive**.

When a certificate is [replaced](/docs/deployments/certificates/replace-certificate), it is automatically archived if it is not already.

## Delete a certificate

Once a certificate has been archived, it can then be deleted.  

:::div{.warning}
This is a hard delete. Once deleted, a certificate and its private key (if present) cannot be recovered.
:::

You will be prevented from deleting a certificate if it is the value of one or more variables. You can view a certificates usage on the 'Usage' tab of the certificate details page.

Variables snapshotted as part of a release will not prevent deleting a certificate. Attempting to deploy a release which references a deleted certificate will result in an error.
