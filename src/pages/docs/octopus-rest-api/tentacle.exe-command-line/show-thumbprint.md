---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Show thumbprint
description: Using the Tentacle.exe command line executable to show the thumbprint of the Tentacle's certificate.
---

Show the thumbprint of the Tentacle's certificate.

**New certificate options**

```
Usage: tentacle show-thumbprint [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
  -e, --export-file=VALUE    Exports the Tentacle thumbprint to a file
      --thumbprint-only      DEPRECATED: Only print out the thumbprint, with
                               no additional text. This switch has been
                               deprecated and will be removed in Octopus 4.0
                               since it is no longer needed.
      --format=VALUE         The format of the output (text,json). Defaults
                               to text.

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples

This example displays the Tentacle thumbprint in the default text format:

```
tentacle show-thumbprint
```

This example displays the Tentacle thumbprint for the instance `MyNewInstance` in JSON format:

```
tentacle show-thumbprint --instance="MyNewInstance" --format="JSON"
```

This example exports the Tentacle thumbprint to a file:

Windows:

```
tentacle show-thumbprint --export-file="c:\temp\thumbprint.txt"
```
Linux:

```
tentacle show-thumbprint --export-file="/tmp/thumbprint.txt"
```
