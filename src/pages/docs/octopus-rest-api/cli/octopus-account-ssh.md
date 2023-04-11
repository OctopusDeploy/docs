---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus account ssh
description: Manage SSH Key Pair accounts
navOrder: 14
---

Manage SSH Key Pair accounts in Octopus Deploy


```text
Usage:
  octopus account ssh [command]

Available Commands:
  create Create a SSH Key Pair account
  help Help about any command
  list List SSH Key Pair accounts

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus account ssh [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus account ssh list

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)