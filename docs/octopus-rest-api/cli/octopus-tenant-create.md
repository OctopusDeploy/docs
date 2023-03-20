---
title: octopus tenant create
description: Create a tenant
position: 104
---

Create a tenant in Octopus Deploy


```text
Usage:
  octopus tenant create [flags]

Aliases:
  create, new

Flags:
  -d, --description string   Description of the tenant
  -n, --name string          Name of the tenant
  -t, --tag stringArray      Tag to apply to tenant, must use canonical name: <tag_set>/<tag_name>


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus tenant create

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)