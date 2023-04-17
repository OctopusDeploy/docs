---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: octopus tenant disconnect
description: Disconnect a tenant from a project
navOrder: 106
---

Disconnect a tenant from a project in Octopus Deploy


```
Usage:
  octopus tenant disconnect [flags]

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


```
$ octopus tenant disconnect
$ octopus tenant disconnect --tenant "Test Tenant" --project "Deploy web site" --confirm


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key)