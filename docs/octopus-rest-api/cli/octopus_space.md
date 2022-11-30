---
title: octopus space
description: Manage spaces
position:
---

Manage spaces in Octopus Deploy

```text
Usage:
  octopus space [command]

Available Commands:
  create Create a space
  delete Delete a space
  help Help about any command
  list List spaces
  view View a space

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus space [command] --help" for more information about a command.```

## Examples

!include <samples-instance>

```text
$ octopus space list
$ octopus space view Spaces-302

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)