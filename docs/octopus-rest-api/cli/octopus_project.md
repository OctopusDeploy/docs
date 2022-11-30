---
title: octopus project
description: Manage projects
position:
---

Manage projects in Octopus Deploy

```text
Usage:
  octopus project [command]

Aliases:
  project, proj

Available Commands:
  connect Connect a tenant to a project
  create Create a project
  delete Delete a project
  disconnect Disconnect a tenant from a project
  help Help about any command
  list List projects
  view View a project

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus project [command] --help" for more information about a command.```

## Examples

!include <samples-instance>

```text
$ octopus project list
$ octopus project ls

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)