---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Node
description: Configure settings related to this Octopus Server node
navOrder: 141
---

Configure settings related to this Octopus Server node

**node options**

```text
Usage: octopus.server node [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --taskCap=VALUE        Set the number of tasks the node can execute at
                               a time
      --drain=VALUE          Set to true to prevent the node from executing
                               more tasks
      --wait=VALUE           Seconds to wait for node to drain tasks. This
                               argument can only be passed if the `--drain`
                               parameter is set to `true`. Defaults to 0.
      --cancel-tasks         Cancels remaining tasks still running at the end
                               of the drain wait period. This argument can only
                               be passed if the `--drain` parameter is set to
                               `true`.
      --skipDatabaseCompatibilityCheck
                             Skips the database compatibility check
      --skipDatabaseSchemaUpgradeCheck
                             Skips the database schema upgrade checks. Use
                               with caution

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples

This example drains the default node:
```
octopus.server node --drain="true"
```

This example sets the task cap for the node to 15 on instance `MyNewInstance`:
```
octopus.server node --taskCap="15" --instance="MyNewInstance"
```
