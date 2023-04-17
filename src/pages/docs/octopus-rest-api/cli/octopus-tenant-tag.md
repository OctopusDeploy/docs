---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: octopus tenant tag
description: Override tags for a tenant
navOrder: 108
---

Override tags for a tenant in Octopus Deploy


```
Usage:
  octopus tenant tag [flags]

Flags:
  -t, --tag stringArray   Tag to apply to tenant, must use canonical name: <tag_set>/<tag_name>
      --tenant string     Name or ID of the tenant you wish to update


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus tenant tag Tenant-1

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key)