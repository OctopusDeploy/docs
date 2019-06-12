---
title: node
description: Configure settings related to this Octopus Server node
---

Configure settings related to this Octopus Server node

**node options**

```text
Usage: octopus.server node [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
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

Or one of the common options:

      --help                 Show detailed help for this command
```

