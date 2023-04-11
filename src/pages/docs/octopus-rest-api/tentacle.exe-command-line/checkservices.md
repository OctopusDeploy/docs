---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Check services
description: Checks the Tentacle instances are running
---

The checkservices command checks the Octopus Tentacle instances to see if they are running, and start them if they're not. The watchdog command sets up a scheduled task that calls checkservices.

**checkservices options**

```text
Usage: tentacle checkservices [<options>]

Where [<options>] is any of:

      --instances=VALUE      Comma-separated list of instances to check, or *
                               to check all instances

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example checks to see if the `default` instance is running and start it if it's not:

```text
Tentacle checkservices --instances="default"
```
