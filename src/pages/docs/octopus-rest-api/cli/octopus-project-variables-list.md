---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus project variables list
description: List project variables
navOrder: 77
---

List project variables in Octopus Deploy


```
Usage:
  octopus project variables list [flags]

Aliases:
  list, ls

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus project variable list
$ octopus project variable ls


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)