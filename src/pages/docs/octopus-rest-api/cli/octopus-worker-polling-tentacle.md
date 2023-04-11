---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus worker polling-tentacle
description: Manage Polling Tentacle workers
navOrder: 120
---

Manage Polling Tentacle workers in Octopus Deploy


```
Usage:
  octopus worker polling-tentacle [command]

Available Commands:
  help Help about any command
  list List Polling Tentacle workers
  view View a Polling Tentacle worker

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus worker polling-tentacle [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```
$ octopus worker polling-tentacle list

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)