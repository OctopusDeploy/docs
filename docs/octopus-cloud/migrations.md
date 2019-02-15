---
title: Migrating from self-hosted to Octopus Cloud
position: 40
description:  Migrating from self-hosted to Octopus Cloud.
---

If you have an existing self-hosted Octopus server, and are looking to switch to using Octopus Cloud, you may want to migrate all of your existing projects, variables, history and configuration through to your new cloud instance. Due to some specific differences between the two platforms, we only support this through an entire database backup and restore, to ensure that we don't miss any key dependencies.

:::warning
**Note:** our existing [Migration API](/docs/api-and-integration/migration-api/index.md) is **not supported** for migrations to cloud instances at this time.
:::

## Before you start

This migration process is intended as a one-off operation to lift and shift everything across to an Octopus Cloud instance. Before you schedule time with our team to do the migration, please keep in mind:

- there will be an outage of 1-2 business days while we migrate your data through to a running cloud instance
- we will need a number of data files to do the migration on our end, so please schedule some time to export the necessary files and artifacts
- exports will need to be generated from a **minimum** version of 2018.10, so please make sure you are running this version or higher before exporting the database

:::info
**Why can't I do a self-service migration at my own pace?**
We are currently working on making the process more seamless without such a long outage period, and plan to release some tooling to help streamline the data-gathering process in the future. Keep an eye out on our blog for updates on our progress in this area.
:::

## The migration process

1. Book in a mutually convenient time with our team by emailing [support@octopus.com](mailto:support@octopus.com), so you can schedule the outage to a time that suits your needs. Please allow 1-2 business days of downtime
1. Make sure your Octopus Server is running _at least_ version [2018.10](https://octopus.com/downloads/2018.10.0) (or higher), so avoid any complications with the migration process
1. When you're ready to do the migration, shutdown your Octopus Server and generate the required files (see below), and send these through to us via `<How do we want to receive these files??>`
1. We'll be in contact within 1-2 business days from when you supply the files to us with an update on the progress of the migration to Octopus Cloud

## Required files for migration

- Full Octopus database backup
- Master key
- Packages?
- Artifacts?
- Task logs / server logs?
- ???
