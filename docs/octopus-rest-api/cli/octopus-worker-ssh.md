---
title: octopus worker ssh
description: Manage SSH workers
position: 123
---

Manage SSH workers in Octopus Deploy


```text
Usage:
  octopus worker ssh [command]

Available Commands:
  create Create a SSH worker
  help Help about any command
  list List SSH workers
  view View a SSH worker

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus worker ssh [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus worker SSH list

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)