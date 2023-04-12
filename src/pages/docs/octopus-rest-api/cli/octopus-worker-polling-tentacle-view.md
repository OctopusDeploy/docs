---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus worker polling-tentacle view
description: View a Polling Tentacle worker
navOrder: 122
---

View a Polling Tentacle worker in Octopus Deploy


```
Usage:
  octopus worker polling-tentacle view {<name> | <id>} [flags]

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
$ octopus worker polling-tentacle view 'WindowsWorker'
$ octopus worker polling-tentacle view Machines-100


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)