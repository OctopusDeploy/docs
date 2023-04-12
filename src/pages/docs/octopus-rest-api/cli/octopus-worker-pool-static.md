---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus worker-pool static
description: Manage static worker pools
navOrder: 134
---

Manage static worker pools in Octopus Deploy


```
Usage:
  octopus worker-pool static [command]

Available Commands:
  create Create a static worker pool
  help Help about any command
  view View a static worker pool

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus worker-pool static [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```
$ octopus worker-pool static view

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)