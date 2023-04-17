---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: octopus deployment-target azure-web-app list
description: List Azure Web App deployment targets
navOrder: 30
---

List Azure Web App deployment targets in Octopus Deploy


```
Usage:
  octopus deployment-target azure-web-app list [flags]

Aliases:
  list, ls

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus deployment-target azure-web-app list
$ octopus deployment-target azure-web-app ls


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)