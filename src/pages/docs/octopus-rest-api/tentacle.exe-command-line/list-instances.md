---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: List instances
description: Using the Tentacle.exe command line executable to query Tentacle settings.
version: "[3.12,)"
---

Lists all installed Octopus Tentacle instances.

**List instances options**

```
Usage: tentacle list-instances [<options>]

Where [<options>] is any of:

      --format=VALUE         The format of the output (text,json). Defaults
                               to text.

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples

This example lists all Octopus Tentacle instances on the machine:

```
Tentacle list-instances
```

This example lists all Octopus Tentacle instances on the machine in JSON format:

```
Tentacle list-instances --format="JSON"
```
