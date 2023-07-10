---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Version
description: Show the Octopus Server version information
navOrder: 220
---

Show the Octopus Server version information

**version options**

```text
Usage: octopus.server version [<options>]

Where [<options>] is any of:

      --format=VALUE         The format of the output (text,json). Defaults
                               to text.

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples

This example displays the version of Octopus Server installed on the machine:

```
octopus.server version
```

This example displays the version of Octopus Server installed on the machine, in JSON format:

```
octopus.server version --format="json"
```
