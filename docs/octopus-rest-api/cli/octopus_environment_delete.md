---
title: octopus environment delete
description: Delete an environment
position: 52
---

Delete an environment in Octopus Deploy


```text
Usage:
  octopus environment delete {<name> | <id>} [flags]

Aliases:
  delete, del, rm, remove

Flags:
  -y, --confirm   Don't ask for confirmation before deleting the environment.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus environment delete
$ octopus environment rm


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)