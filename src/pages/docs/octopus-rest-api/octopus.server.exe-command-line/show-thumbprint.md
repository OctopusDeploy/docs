---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Show thumbprint
description:  Shows the thumbprint of the server instance
navOrder: 193
---

Use the show thumbprint command to show the thumbprint of the server instance.

**Show thumbprint options**

```text
Usage: octopus.server show-thumbprint [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
  -e, --export-file=VALUE    Exports the Tentacle thumbprint to a file
      --format=VALUE         The format of the output (text,json). Defaults
                               to text.

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples

This example displays the thumbprint of the default instance:

```
octopus.server show-thumbprint
```

This example exports the thumbprint for the instance named `MyNewInstance` to a file in JSON format:

```
octopus.server show-thumbprint --instance="MyNewInstance" --export-file="c:\temp\thumbprint.json" --format="json"
```
