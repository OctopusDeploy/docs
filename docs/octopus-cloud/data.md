---
title: Data
position: 10
description: How to work with your data in Octopus Cloud instance.
---

We make backups of instance databases and store these securely so that we have multiple restore points in the unlikely event of a disaster.

We evaluate our backup and recovery strategy frequently to improve resiliency and recovery as we need to.

## Importing data

Due to some key differences between the self-hosted and cloud configurations, it currently **isn't** possible to use the existing [Migration API](/docs/octopus-rest-api/migration-api/index.md) to import data. If you are migrating from an existing self-hosted instance please see [migrating from self-hosted to Octopus Cloud](/docs/octopus-cloud/migrations.md).

## Exporting your data

If you need to export your data, this can be done with the [Migration API](/docs/octopus-rest-api/migration-api/index.md), alternatively, we can provide you with a full database backup if required. Please visit the [support page](https://octopus.com/support) if you need this.
