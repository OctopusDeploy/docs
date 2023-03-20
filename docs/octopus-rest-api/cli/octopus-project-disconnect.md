---
title: octopus project disconnect
description: Disconnect a tenant from a project
position: 70
---

Disconnect a tenant from a project in Octopus Deploy


```text
Usage:
  octopus project disconnect [flags]

Flags:
  -y, --confirm          Don't ask for confirmation disconnecting the project.
  -p, --project string   Name, ID or Slug of the project to connect to the tenant
  -t, --tenant string    Name or Id of the tenant


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus project disconnect
$ octopus project disconnect --tenant "Test Tenant" --project "Deploy web site" --confirm


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)