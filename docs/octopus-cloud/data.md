---
title: Data
position: 10
description: How to work with your data in Octopus Cloud.
---

We make backups of instance databases and store these securely so that we have multiple restore points in the unlikely event of a disaster.

We evaluate our backup and recovery strategy frequently to improve resiliency and recovery as we need to.

## Importing Data

Due to some key differences between the self-hosted and cloud configurations, it currently **isn't** possible to use the existing [Migration API](/docs/api-and-integration/migration-api/index.md). If you are migrating from an existing self-hosted instance please see [migrating from self-hosted to Octopus Cloud](/docs/octopus-cloud/migrations.md).

## Exporting Your Data

If you need to export your data, this can be done with the [Migration API](/docs/api-and-integration/migration-api/index.md), alternatively, we can provide you with a full database backup if required. Please visit the [support page](https://octopus.com/support) if you need this.
