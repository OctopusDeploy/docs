---
title: octopus account aws
description: Manage AWS accounts
position: 2
---

Manage AWS accounts in Octopus Deploy


```text
Usage:
  octopus account aws [command]

Available Commands:
  create Create an AWS account
  help Help about any command
  list List AWS accounts

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus account aws [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus account aws list

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)