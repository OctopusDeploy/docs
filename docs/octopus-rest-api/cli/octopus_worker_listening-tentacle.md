---
title: octopus worker listening-tentacle
description: Manage Listening Tentacle workers
position:
---

Manage Listening Tentacle workers in Octopus Deploy

```text
Usage:
  octopus worker listening-tentacle [command]

Available Commands:
  create Create a listening tentacle worker
  help Help about any command
  list List Listening Tentacle workers
  view View a Listening Tentacle worker

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus worker listening-tentacle [command] --help" for more information about a command.```

## Examples

!include <samples-instance>

```text
$ octopus worker listening-tentacle list
```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)