---
title: lost-master-key
description: Get your Octopus Server working again after losing your master key
---

Get your Octopus Server working again after losing your master key

**lost-master-key options**

```text
Usage: octopus.server lost-master-key [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --iReallyWantToResetAllMySensitiveData
                             Confirm you really want to generate a new master
                               key and reset all your sensitive data.
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
                               existing master key can decrypt the Octopus
                               Server X.509 certificate. Use this switch if you
                               are certain you want to ignore the results of
                               this test.
      --scrubPii             Use this switch to scrub all personally
                               identifiable information from the database.

Or one of the common options:

      --help                 Show detailed help for this command
```

