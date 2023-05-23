---
title: octopus tenant variables
description: Manage tenant variables
position: 109
---

Manage tenant variables in Octopus Deploy


```text
Usage:
  octopus tenant variables [command]

Aliases:
  variables, variable

Available Commands:
  help Help about any command
  list List tenant variables
  update Update the value of a tenant variable

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus tenant variables [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus tenant variables list --tenant "Bobs Wood Shop"
$ octopus tenant variables view --name "DatabaseName" --tenant "Bobs Wood Shop"


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)