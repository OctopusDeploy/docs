---
title: octopus deployment-target ssh list
description: List SSH deployment targets
position:
---

List SSH deployment targets in Octopus Deploy

```text
Usage:
  octopus deployment-target ssh list [flags]

Aliases:
  list, ls

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations
```

## Examples

!include <samples-instance>

```text
$ octopus deployment-target ssh list
$ octopus deployment-target ssh ls

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)