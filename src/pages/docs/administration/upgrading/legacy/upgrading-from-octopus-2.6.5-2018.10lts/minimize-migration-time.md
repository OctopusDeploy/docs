---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Minimize the data-migration time
description: Tips to minimize the time taken to migrate your data from Octopus 2.6 to 2018.10 LTS
navOrder: 5
navSearch: false
---

Migrating data from an **Octopus 2.6** backup file into an **Octopus 2018.10 LTS** instance can take a significant time to run (hours or even days in some cases).  

We strongly recommend taking the following actions to minimize the migration duration.  

## Remove unnecessary data from your 2.6 instance

Our strongest recommendation is to use [retention-policies](/docs/administration/retention-policies) in your **Octopus 2.6** instance to remove unnecessary data.

The goal is for the document count in the 2.6 RavenDB to be as low as possible.
You can find the document count by viewing the RavenDB studio through the Octopus Manager. The document count is in the footer of the RavenDB studio.
Less than 150k documents is a rough guide, though obviously some customers will simply have more required data than this.

:::div{.hint}
The original complete backup can always be retained if it is required for audit purposes.
:::

## Limit historical data

By default we migrate everything from your backup including all historical data. You can use the `maxage=` argument when executing the migrator via the [command-line](/docs/octopus-rest-api/octopus.migrator.exe-command-line) to limit the number of days to keep. For example: `maxage=90` will keep 90 days of historical data ignoring anything older.

## RAM

The migrator is a memory-hungry process.  Allocate the machine which will execute the migrator process as much memory as possible.  The more memory is available, the faster the process will run.

As a rule-of-thumb:

- If your .octobak file is >500MB, allow at least 16GB of RAM
- If your .octobak file is >1GB, allow at least 32GB of RAM

This RAM is only required for the migration, and can be deallocated once it is complete.

## No logs

To minimize the initial migration time, you can skip migrating the server-task log files.  
This option is available as a check-box in the Octopus Manager, or can be supplied as a `--nologs` option if running via the [command-line](/docs/octopus-rest-api/octopus.migrator.exe-command-line).

:::div{.hint}
The logs can always be imported later using the `--onlylogs` option if required
:::
