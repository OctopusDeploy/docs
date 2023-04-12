---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus tenant delete
description: Delete a tenant
navOrder: 105
---

Delete a tenant in Octopus Deploy


```
Usage:
  octopus tenant delete {<name> | <id>} [flags]

Aliases:
  delete, del, rm, remove

Flags:
  -y, --confirm   Don't ask for confirmation before deleting the tenant.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus tenant delete
$ octopus tenant rm


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)