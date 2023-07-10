---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Run
description:  Starts the Octopus Server in debug mode.
navOrder: 181
---

Use this to see detailed output of Octopus running to help diagnose any issues you may be having.

**Run options**

```text
Usage: octopus.server run [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --customextension=VALUE
                             File path of a custom extension to load
      --skipDatabaseCompatibilityCheck
                             Skips the database compatibility check
      --skipDatabaseSchemaUpgradeCheck
                             Skips the database schema upgrade checks. Use
                               with caution
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example starts the default instance in debug mode in the console:

```
octopus.server run --console
```
