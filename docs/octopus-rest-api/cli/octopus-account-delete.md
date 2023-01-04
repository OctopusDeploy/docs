---
title: octopus account delete
description: Delete an account
position: 9
---

Delete an account in Octopus Deploy


```text
Usage:
  octopus account delete {<name> | <id>} [flags]

Aliases:
  delete, del, rm, remove

Flags:
  -y, --confirm   Don't ask for confirmation before deleting the account.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus account delete
$ octopus account rm


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)