---
title: octopus project delete
description: Delete a project
position: 65
---

Delete a project in Octopus Deploy


```text
Usage:
  octopus project delete {<name> | <id> | <slug>} [flags]

Aliases:
  delete, del, rm, remove

Flags:
  -y, --confirm   Don't ask for confirmation before deleting the project.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus project delete
$ octopus project rm


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)