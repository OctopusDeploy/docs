---
title: Migrating from self-hosted to Octopus Cloud
position: 40
description:  Migrating from self-hosted to Octopus Cloud.
---

If you have an existing self-hosted Octopus server, and you want to switch to Octopus Cloud, you may want to migrate all of your existing projects, variables, history, and configuration from your self-hosted instance to your new Octopus Cloud instance. The only way to achieve this is through a full migration, with an entire database backup and restore. This ensures we don't miss any key dependencies.

:::warning
**Warning:** our existing [Migration API](/docs/api-and-integration/migration-api/index.md) is **not supported** for migrations to cloud instances due to configuration differences between On-Premise and Cloud installations.
:::

## How it Works

To get started migrating from self-hosted to cloud, [email our support team](mailto:support@octopus.com) and book a time for the migration to occur. 

### Prepare for the Migration

- Email [support@octopus.com](mailto:support@octopus.com) to book in a mutually convenient time. We'll reply with the specific steps that are involved.
- Upgrade to the [latest LTS version](https://octopus.com/downloads) of Octopus. This will help eliminate any compatibility problems that could occur.
- Schedule two days of possible downtime for your deployments, while we migrate your instance across to the cloud.
- Due to the length of time required to complete the migration, we will only be able to schedule one migration per week. We will let you know the timeframe when you contact support.

## Got questions?

If you're unsure of anything, please [email our support team](mailto:support@octopus.com) and ask the question. We're always happy to help, and we can provide more specific information when you are ready to migrate.
