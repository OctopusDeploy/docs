---
title: octopus worker-pool
description: Manage worker pools
position: 116
---

Manage worker pools in Octopus Deploy


```text
Usage:
  octopus worker-pool [command]

Available Commands:
  delete Delete a worker pool
  dynamic Manage dynamic worker pools
  help Help about any command
  list List worker pools
  static Manage static worker pools
  view View a worker pool

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus worker-pool [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus worker-pool list
$ octopus worker-pool ls


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)