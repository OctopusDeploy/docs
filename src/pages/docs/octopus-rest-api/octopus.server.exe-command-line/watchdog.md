---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Watchdog
description:  Configure a scheduled task to monitor the Octopus service(s).
navOrder: 230
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
      --instances=VALUE      Comma separated list of instances to be checked,
                               or * to check all instances (default: *)

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples

This example creates a watchdog task for the `default` instance:

```
octopus.server watchdog --create --instances="default"
```

This example deletes the watchdog tasks for instances named `default` and `MyNewInstance`:

Comma separated:

```
octopus.server watchdog --delete --instances="default,MyNewInstance"
```

Semi-colon separated:

```
octopus.server watchdog --delete --instances="default;MyNewInstance"
```
