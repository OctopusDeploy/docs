---
title: octopus space create
description: Create a space
position: 83
---

Create a space in Octopus Deploy


```text
Usage:
  octopus space create [flags]

Aliases:
  create, new

Flags:
  -d, --description string   Description of the space
  -n, --name string          Name of the space
  -t, --team strings         The teams to manage the space (can be specified multiple times)
  -u, --user strings         The users to manage the space (can be specified multiple times)


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus space create

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)