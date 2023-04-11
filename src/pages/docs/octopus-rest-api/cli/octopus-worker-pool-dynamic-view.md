---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus worker-pool dynamic view
description: View a dynamic worker pool
navOrder: 132
---

View a dynamic worker pool in Octopus Deploy


```text
Usage:
  octopus worker-pool dynamic view {<name> | <id>} [flags]

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
$ octopus worker-pool dynamic view WorkerPools-3
$ octopus worker-pool dynamic view 'Hosted Workers'


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)