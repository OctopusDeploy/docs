---
title: Watchdog
description:  Configure a scheduled task to monitor the Octopus service(s).
---

Use the watchdog command to configure a scheduled task to monitor the Octopus service(s).

**Watchdog options**

```text
Usage: octopus.server watchdog [<options>]

Where [<options>] is any of:

      --create               Create the watchdog task for the given instances
      --delete               Delete the watchdog task for the given instances
      --interval=VALUE       The interval, in minutes, at which that the
                               service(s) should be checked (default: 5)
      --instances=VALUE      List of instances to be checked (default: *)

Or one of the common options:

      --help                 Show detailed help for this command



```
