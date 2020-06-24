---
title: Path
description: Set the file paths that Octopus will use for storage
position: 160
---

Set the file paths that Octopus will use for storage

**path options**

```text
Usage: Octopus.Server path [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --skipDatabaseCompatibilityCheck
                             Skips the database compatibility check
      --skipDatabaseSchemaUpgradeCheck
                             Skips the database schema upgrade checks. Use
                               with caution
      --clusterShared=VALUE  Set the root path where shared files will be
                               stored for Octopus clusters
      --cacheDirectory=VALUE Directory to use for temporary files and cachin-
                               g, e.g. downloaded packages. The data in this
                               directory can be removed when the Octopus Server
                               is not running. This directory should not be
                               shared between nodes.
      --nugetRepository=VALUE
                             Set the package path for the built-in package
                               repository
      --artifacts=VALUE      Set the path where artifacts are stored
      --taskLogs=VALUE       Set the path where task logs are stored
      --telemetry=VALUE      Set the path where telemetry is stored

Or one of the common options:

      --help                 Show detailed help for this command
```

