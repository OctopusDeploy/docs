---
title: octopus project variables
description: Manage project variables
position: 72
---

Manage project variables in Octopus Deploy


```text
Usage:
  octopus project variables [command]

Aliases:
  variables, variable

Available Commands:
  create Create a variable for a project
  delete Delete a project variable
  help Help about any command
  list List project variables
  update Update the value of a project variable
  view View all values of a project variable

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus project variables [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus project variable list --project Deploy
$ octopus project variable view --name "DatabaseName" --project Deploy
$ octopus project variable update


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)