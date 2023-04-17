---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: octopus project variables exclude
description: Exclude a variable set from a project
navOrder: 75
---

Exclude a variable set from a project in Octopus Deploy


```
Usage:
  octopus project variables exclude [flags]

Flags:
  -p, --project string         The project
      --variable-set strings   The name of the library variable set


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus project variable exclude
$ octopus project variable exclude --variable-set "Slack Variables"


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key)