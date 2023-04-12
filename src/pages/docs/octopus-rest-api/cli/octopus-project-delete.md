---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus project delete
description: Delete a project
navOrder: 69
---

Delete a project in Octopus Deploy


```
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


```
$ octopus project delete
$ octopus project rm


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)