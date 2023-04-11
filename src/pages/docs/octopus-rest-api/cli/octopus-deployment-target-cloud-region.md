---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus deployment-target cloud-region
description: Manage Cloud Region deployment targets
navOrder: 32
---

Manage Cloud Region deployment targets in Octopus Deploy


```
Usage:
  octopus deployment-target cloud-region [command]

Available Commands:
  create Create a Cloud Region deployment target
  help Help about any command
  list List Cloud Region deployment targets
  view View a Cloud Region deployment target

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus deployment-target cloud-region [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```
$ octopus deployment-target cloud-region list

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)