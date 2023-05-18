---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Path
description: Set the file paths that Octopus will use for storage
navOrder: 160
---

Set the file paths that Octopus will use for storage

**path options**

```
Usage: octopus.server path [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --skipDatabaseCompatibilityCheck
                             Skips the database compatibility check
      --skipDatabaseSchemaUpgradeCheck
                             Skips the database schema upgrade checks. Use
                               with caution
      --cacheDirectory=VALUE Directory to use for temporary files and cachin-
                               g, e.g. downloaded packages. The data in this
                               directory can be removed when the Octopus Server
                               is not running. This directory should not be
                               shared between nodes.
      --clusterShared=VALUE  Set the root path where shared files will be
                               stored for Octopus clusters
      --nugetRepository=VALUE
                             Set the package path for the built-in package
                               repository
      --artifacts=VALUE      Set the path where artifacts are stored
      --imports=VALUE        Set the path where imported zip files are stored
      --taskLogs=VALUE       Set the path where task logs are stored
      --telemetry=VALUE      Set the path where telemetry is stored
      --eventExports=VALUE   Set the path where event audit logs are exported

Or one of the common options:

      --help                 Show detailed help for this command
```

:::hint
EventExports is available from **2023.3** onwards as part of the audit log retention feature.
:::

## Basic examples
This example configures all paths (artifacts, task logs, packages, imports, and telemetry) to a network share:
```
octopus.server path --clusterShared \\OctoShared\OctopusData

octopus.server path --artifacts Artifacts
octopus.server path --taskLogs TaskLogs
octopus.server path --nugetRepository Packages
octopus.server path --imports Imports
octopus.server path --telemetry Telemetry
octopus.server path --eventExports EventExports
```

This example configures the paths for the different components individually:
```
octopus.server path --artifacts \\Octoshared\OctopusData\Artifacts
octopus.server path --taskLogs \\Octoshared\OctopusData\TaskLogs
octopus.server path --nugetRepository \\Octoshared\OctopusData\Packages
octopus.server path --imports \\Octoshared\OctopusData\Imports
octopus.server path --telemetry \\Octoshared\OctopusData\Telemetry
octopus.server path --eventExports \\Octoshared\OctopusData\EventExports
```

:::hint
EventExports is available from **2023.3** onwards as part of the audit log retention feature.
:::
