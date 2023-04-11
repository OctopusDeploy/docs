---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus tenant connect
description: Connect a tenant to a project
navOrder: 103
---

Connect a tenant to a project in Octopus Deploy


```
Usage:
  octopus tenant connect [flags]

Flags:
      --enable-tenant-deployments   Update the project to support tenanted deployments, if required
      --env strings                 The environments to connect to the tenant (can be specified multiple times)
  -e, --environment strings         The environments to connect to the tenant (can be specified multiple times)
  -p, --project string              Name, ID or Slug of the project to connect to the tenant
  -t, --tenant string               Name or Id of the tenant


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus tenant connect
$ octopus tenant connect --tenant "Bobs Wood Shop" --project "Deploy web site" --environment "Production"


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)