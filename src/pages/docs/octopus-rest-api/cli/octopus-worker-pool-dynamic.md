---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus worker-pool dynamic
description: Manage dynamic worker pools
navOrder: 130
---

Manage dynamic worker pools in Octopus Deploy


```
Usage:
  octopus worker-pool dynamic [command]

Available Commands:
  create Create a dynamic worker pool
  help Help about any command
  view View a dynamic worker pool

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus worker-pool dynamic [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```
$ octopus worker-pool dynamic view

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)