---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus deployment-target view
description: View a deployment target
navOrder: 53
---

View a deployment target in Octopus Deploy


```text
Usage:
  octopus deployment-target view {<name> | <id>} [flags]

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


```text
$ octopus deployment-target view Machines-100
$ octopus deployment-target view 'web-server'


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)