---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: octopus worker listening-tentacle view
description: View a Listening Tentacle worker
navOrder: 119
---

View a Listening Tentacle worker in Octopus Deploy


```
Usage:
  octopus worker listening-tentacle view {<name> | <id>} [flags]

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
$ octopus worker listening-tentacle view 'WindowsWorker'
$ octopus worker listening-tentacle view Machines-100


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)