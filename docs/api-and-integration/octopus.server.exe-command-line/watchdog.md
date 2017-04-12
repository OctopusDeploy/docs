---
title: Watchdog
description:  Configure a scheduled task to monitor the Octopus service(s).
---

Use the watchdog command to configure a scheduled task to monitor the Octopus service(s).

**Watchdog options**

```text
Usage: Octopus.Server watchdog [<options>]

Where [<options>] is any of:

      --create=VALUE         Create the watchdog task for the given instance
      --delete=VALUE         Delete the watchdog task for the given instances
      --interval=VALUE       The interval, in minutes, at which that the service(s)
                               should be checked (default: 5)
      --instances=VALUE      List of instances to be checked (default: *)

Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                              user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log to the console
```

