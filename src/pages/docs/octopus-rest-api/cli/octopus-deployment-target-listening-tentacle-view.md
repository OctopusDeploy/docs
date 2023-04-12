---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus deployment-target listening-tentacle view
description: View a Listening Tentacle deployment target
navOrder: 45
---

View a Listening Tentacle deployment target in Octopus Deploy


```
Usage:
  octopus deployment-target listening-tentacle view {<name> | <id>} [flags]

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
$ octopus deployment-target listening-tentacle view 'EU'
$ octopus deployment-target listening-tentacle view Machines-100


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)