---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Database
description:  Create or drop the Octopus database
navOrder: 40
---

Use the database command to create or drop the Octopus database.

**Database options**

```text
Usage: octopus.server database [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --create               Creates a new empty database, and upgrades the
                               database to the expected schema
      --connectionString=VALUE
                             [Optional] Sets the database connection string
                               to use, and saves it in the config file. If
                               omitted, the value from the config file will be
                               used to perform operations on the database.
      --masterKey=VALUE      [Optional] Sets the Master Key to use when
                               encrypting/decrypting data. If omitted, the
                               value from the config file will be used. Use
                               this option when pointing to an existing
                               database that uses an existing Master Key.
      --upgrade              Upgrades the database to the expected schema
      --skipLicenseCheck     Skips the license check when performing a schema
                               upgrade
      --skipDatabaseCompatibilityCheck
                             Skips the database compatibility check
      --delete               Deletes the database
      --grant=VALUE          Grants db_owner access to the database

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example creates a new database for the `MyNewInstance` instance.  This example expects the database for instance `MyNewInstance` not to exist. If it does, it will say it already exists and won't do anything:

```
octopus.server database --create --instance="MyNewInstance"
```

## Create database with supplied master key

This example creates a new database for the `MyInstance` instance using a supplied master key.

1. First, create a master key using the `openssl` command:

    ```bash
    openssl rand 16 | base64
    ```

    The output should be a base64 encoded string, similar to this:

    ```bash
    DVNbYEHJ9hmmH7YsVfLJQw==
    ```
2. Use the database command with the `--masterKey` parameter, replacing `<MASTER_KEY>` with your generated value:

    ```
    octopus.server database --create --instance="MyInstance" --connectionString "<DB_CONN_STRING>" --masterKey "<MASTER_KEY>"
