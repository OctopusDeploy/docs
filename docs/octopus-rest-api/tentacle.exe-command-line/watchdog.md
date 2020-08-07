---
title: watchdog
description: Configure a scheduled task to monitor the Tentacle service(s)
---

Configure a scheduled task to monitor the Tentacle service(s)

**watchdog options**

```text
Usage: tentacle watchdog [<options>]

Where [<options>] is any of:

      --create               Create the watchdog task for the given instances
      --delete               Delete the watchdog task for the given instances
      --interval=VALUE       The interval, in minutes, at which that the
                               service(s) should be checked (default: 5)
      --instances=VALUE      List of instances to be checked (default: *)

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples (Windows only)
This example creates the watchdog task for all instances
```
Tentacle watchdog --create --instances=*
```

This example creates the workdog service for instances `default` and `MyNewInstance`
```
Tentacle watchdog --create --isntances="Default,MyNewInstance"
```

This example deletes all watchdog tasks
```
Tentacle watchdog --delete
```
