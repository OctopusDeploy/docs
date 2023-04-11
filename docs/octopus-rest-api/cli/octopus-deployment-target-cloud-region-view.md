---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus deployment-target cloud-region view
description: View a Cloud Region deployment target
navOrder: 35
---

View a Cloud Region deployment target in Octopus Deploy


```
Usage:
  octopus deployment-target cloud-region view {<name> | <id>} [flags]

Flags:
  -w, --web   Open in web browser


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus deployment-target cloud-region view 'EU'
$ octopus deployment-target cloud-region view Machines-100


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)