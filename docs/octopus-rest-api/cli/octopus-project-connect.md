---
title: octopus project connect
description: Connect a tenant to a project
position: 66
---

Connect a tenant to a project in Octopus Deploy


```text
Usage:
  octopus project connect [flags]

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


```text
$ octopus project connect
$ octopus project connect --tenant "Bobs Wood Shop" --project "Deploy web site" --environment "Production"


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)