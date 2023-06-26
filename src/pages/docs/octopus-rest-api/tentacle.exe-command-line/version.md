---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: version
description: Show the Tentacle version information
---

Show the Tentacle version information.

**version options**

```
Usage: tentacle version [<options>]

Where [<options>] is any of:

      --format=VALUE         The format of the output (text,json). Defaults
                               to text.

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples

This example displays the Tentacle version in the default text format:

```
tentacle version
```

This example displays the Tentacle version in JSON format:

```
tentacle version --format="json"
```
