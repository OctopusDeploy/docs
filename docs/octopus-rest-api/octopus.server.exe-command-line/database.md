---
title: Database
description:  Create or drop the Octopus database
position: 40
---

Use the database command to create or drop the Octopus database.

**Database options**

```text
Usage: octopus.server database [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --create               Creates a new empty database, and upgrades the
                               database to the expected schema
      --connectionString=VALUE
                             [Optional] Sets the database connection string
                               to use, and saves it in the config file. If
                               omitted, the value from the config file will be
                               used to perform operations on the database.
      --masterKey=VALUE      [Optional] Sets the master key to use when
                               encrypting/decrypting data. If omitted, the
                               value from the config file will be used. Use
                               this option when pointing to an existing
                               database which uses an existing master key.
      --upgrade              Upgrades the database to the expected schema
      --skipLicenseCheck     Skips the licence check when performing a schema
                               upgrade
      --skipDatabaseCompatibilityCheck
                             Skips the database compatibility check
      --delete               Deletes the database
      --grant=VALUE          Grants db_owner access to the database

Or one of the common options:

      --help                 Show detailed help for this command
```

