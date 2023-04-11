---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus account
description: Manage accounts
navOrder: 1
---

Manage accounts in Octopus Deploy


```
Usage:
  octopus account [command]

Available Commands:
  aws Manage AWS accounts
  azure Manage Azure subscription accounts
  create Create an account
  delete Delete an account
  gcp Manage Google Cloud accounts
  help Help about any command
  list List accounts
  ssh Manage SSH Key Pair accounts
  token Manage Token accounts
  username Manage Username/Password accounts

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus account [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```
$ octopus account list

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)