---
title: octopus environment
description: Manage environments
position:
---

Manage environments in Octopus Deploy

```text
Usage:
  octopus environment [command]

Available Commands:
  delete Delete an environment
  help Help about any command
  list List environments

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus environment [command] --help" for more information about a command.```

## Examples

!include <samples-instance>

```text
$ octopus environment list
$ octopus environment ls

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)