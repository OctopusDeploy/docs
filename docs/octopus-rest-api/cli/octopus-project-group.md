---
title: octopus project-group
description: Manage project groups
position: 79
---

Manage project groups in Octopus Deploy


```text
Usage:
  octopus project-group [command]

Available Commands:
  create Create a project group
  delete Delete a project group
  help Help about any command
  list List project groups
  view View a project group

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus project-group [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus project-group list
$ octopus project-group ls


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)