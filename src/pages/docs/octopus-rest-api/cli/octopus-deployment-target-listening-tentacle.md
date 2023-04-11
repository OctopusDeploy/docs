---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus deployment-target listening-tentacle
description: Manage Listening Tentacle deployment targets
navOrder: 42
---

Manage Listening Tentacle deployment targets in Octopus Deploy


```
Usage:
  octopus deployment-target listening-tentacle [command]

Available Commands:
  create Create a Listening Tentacle deployment target
  help Help about any command
  list List Listening Tentacle deployment targets
  view View a Listening Tentacle deployment target

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus deployment-target listening-tentacle [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```
$ octopus deployment-target listening-tentacle list

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)