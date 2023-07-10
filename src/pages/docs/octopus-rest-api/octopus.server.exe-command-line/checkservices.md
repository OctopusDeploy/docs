---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Check services
description:  Checks the Octopus instances are running
navOrder: 30
---

The `checkservices` command checks the Octopus Server instances to see if they are running and start them if they're not.  The [watchdog](/docs/administration/managing-infrastructure/service-watchdog) command sets up a scheduled task that calls `checkservices`.

**Check Services options**

```text
Usage: octopus.server checkservices [<options>]

Where [<options>] is any of:

      --instances=VALUE      Comma-separated list of instances to check, or *
                               to check all instances

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example checks to see if all of the instances are running on the machine and start them if they are not:

```
octopus.server checkservices --instances=*
```
