---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus account username
description: Manage Username/Password accounts
navOrder: 20
---

Manage Username/Password accounts in Octopus Deploy


```
Usage:
  octopus account username [command]

Available Commands:
  create Create a Username/Password account
  help Help about any command
  list List Username/Password accounts

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus account username [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```
$ octopus account username list

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)