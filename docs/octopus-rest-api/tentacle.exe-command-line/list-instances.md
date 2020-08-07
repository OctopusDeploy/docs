---
title: List instances
description: Using the Tentacle.exe command line executable to query Tentacle settings.
version: "[3.12,)"
---

Lists all installed Octopus instances

**List instances options**

```text
Usage: tentacle list-instances [<options>]

Where [<options>] is any of:

      --format=VALUE         The format of the output (text,json). Defaults
                               to text.

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples
This example lists the instances of Tentacle on the machine
```text
Tentacle list-instances
```

This example lists the instances of Tentacle on the machine in JSON format
```text
Tentacle list-instances --format="JSON"
```