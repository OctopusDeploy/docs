---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Lost Master Key
description: Get your Octopus Server working again after losing your Master Key
navOrder: 122
---

Get your Octopus Server working again after losing your Master Key.

:::div{.warning}
Before using this command, we recommend taking a look at our [guide on recovering after losing your master key](/docs/administration/managing-infrastructure/lost-master-key).
:::

**lost-master-key options**

```text
Usage: octopus.server lost-master-key [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --iReallyWantToResetAllMySensitiveData
                             Confirm you really want to generate a new Master
                               Key and reset all your sensitive data.
      --iHaveBackedUpMyDatabase
                             Confirm you have taken a backup of your database
                               in its current state. If something goes wrong at
                               least you can start again from that point in
                               time.
      --upgradeDatabase      Confirm you are willing to let Octopus upgrade
                               the schema of your database so it can safely
                               load and save data in the expected format.
      --skipCurrentMasterKeyTest
                             By default this command will test whether the
                               existing Master Key can decrypt the Octopus
                               Server X.509 certificate. Use this switch if you
                               are certain you want to ignore the results of
                               this test.
      --scrubPii             Use this switch to scrub all personally
                               identifiable information from the database.
      --skipLicenseCheck     Skips the license check when performing a schema
                               upgrade

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example will re-create the master key for the instance named `OctopusServer`.

:::div{.problem}

**Please note:**
The command below will replace the existing Master Key with a newly generated Master Key, and **reset all sensitive data** in the Octopus instance - be sure you have taken a database backup before running this.
:::

```
octopus.server lost-master-key --instance="OctopusServer" --iReallyWantToResetAllMySensitiveData --iHaveBackedUpMyDatabase
```
