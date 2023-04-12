---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus user
description: Manage users
navOrder: 110
---

Manage user in Octopus Deploy


```
Usage:
  octopus user [command]

Available Commands:
  delete Delete a user
  help Help about any command
  list List users

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus user [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```
$ octopus user list
$ octopus user ls


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)