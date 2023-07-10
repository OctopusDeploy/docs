---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Rotate Master Key
description: Generate a new Master Key and re-encrypt all the sensitive data.
navOrder: 123
---

Generate a new Master Key and re-encrypt all the sensitive data. This option was added in **Octopus 2022.4**.

:::div{.warning}

Before using this command, we recommend taking a look at our [guide on rotating the Master Key](/docs/administration/managing-infrastructure/rotate-master-key).
:::

**rotate-master-key options**

```text
Usage: octopus.server rotate-master-key [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --iReallyWantToRotateMyMasterKey
                             Confirm you really want to generate a new Master
                               Key and re-encrypt all your sensitive data.
      --iHaveBackedUpMyDatabase
                             Confirm you have taken a backup of your database
                               in its current state. If something goes wrong at
                               least you can start again from that point in
                               time.
      --upgradeDatabase      Confirm you are willing to let Octopus upgrade
                               the schema of your database so it can safely
                               load and save data in the expected format.
      --skipLicenseCheck     Skips the license check when performing a schema
                               upgrade
      --masterKey=VALUE      The new master key that should be used

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example will rotate the master key for the instance named `OctopusServer`.

:::div{.problem}

**Please note:**
The command below will replace the existing Master Key with a newly generated Master Key, and **re-encrypt all sensitive data** in the Octopus instance - be sure you have taken a database backup before running this.
:::

```
octopus.server rotate-master-key --instance="OctopusServer" --iReallyWantToRotateMyMasterKey --iHaveBackedUpMyDatabase
```
