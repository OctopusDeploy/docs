---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus user delete
description: Delete a user
navOrder: 111
---

Delete a user in Octopus Deploy


```
Usage:
  octopus user delete {<name> | <id>} [flags]

Aliases:
  delete, del, rm, remove

Flags:
  -y, --confirm   Don't ask for confirmation before deleting the user.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus user delete someusername
$ octopus user rm Users-123


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)