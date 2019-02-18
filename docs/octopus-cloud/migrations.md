---
title: Migrating from self-hosted to Octopus Cloud
position: 40
description:  Migrating from self-hosted to Octopus Cloud.
---

If you have an existing self-hosted Octopus server, and are looking to switch to using Octopus Cloud, you may want to migrate all of your existing projects, variables, history and configuration through to your new cloud instance. Due to some specific differences between the two platforms, we only support this through an entire database backup and restore, to ensure that we don't miss any key dependencies.

:::warning
**Note:** our existing [Migration API](/docs/api-and-integration/migration-api/index.md) is **not supported** for migrations to cloud instances at this time.
:::

## How it works

To get started migrating from self-hosted to cloud you will need to [email our support team](mailto:support@octopus.com) and book in a time for the migration to occur. There will be some things you need to do on your end to prepare, and then some things we will do on our end to bring all the data across. 

## Getting prepared for migration

We'll outline the specific steps we need you to do when you book in for the migration, but here are some things you could do in advance while you wait:

- email [support@octopus.com](mailto:support@octopus.com) to book in a mutually convenient time, and find out the specific steps involved
- upgrade to the [latest LTS version](https://octopus.com/downloads) of Octopus - this will help eliminate any compatibility problems that might occur
- schedule 1-2 days of possible downtime for your deployments, while we migrate your instance across to the cloud

## Got questions?

If you're unsure of anything, please [email our support team](mailto:support@octopus.com) and ask the question - we're always happy to help, and we'll be able to provide more specific information around the time you are ready to migrate.