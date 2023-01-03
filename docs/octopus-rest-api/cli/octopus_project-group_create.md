---
title: octopus project-group create
description: Create a project group
position: 70
---

Create a project group in Octopus Deploy


```text
Usage:
  octopus project-group create [flags]

Aliases:
  create, new

Flags:
  -n, --name string          Name of the project group
  -d, --description string   Description of the project group


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus project-group create

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)