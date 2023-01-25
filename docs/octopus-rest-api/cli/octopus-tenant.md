---
title: octopus tenant
description: Manage tenants
position: 99
---

Manage tenants in Octopus Deploy


```text
Usage:
  octopus tenant [command]

Available Commands:
  clone Clone a tenant
  connect Connect a tenant to a project
  create Create a tenant
  delete Delete a tenant
  disconnect Disconnect a tenant from a project
  help Help about any command
  list List tenants
  tag Override tags for a tenant
  view View a tenant

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus tenant [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus tenant list
$ octopus tenant ls


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)