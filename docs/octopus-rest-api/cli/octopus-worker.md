---
title: octopus worker
description: Manage workers
position: 113
---

Manage workers in Octopus Deploy


```text
Usage:
  octopus worker [command]

Available Commands:
  delete Delete a worker
  help Help about any command
  list List workers
  listening-tentacle Manage Listening Tentacle workers
  polling-tentacle Manage Polling Tentacle workers
  ssh Manage SSH workers
  view View a worker

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus worker [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus worker list
$ octopus worker ls


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)