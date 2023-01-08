---
title: octopus release list
description: List releases
position: 78
---

List releases in Octopus Deploy


```text
Usage:
  octopus release list [flags]

Aliases:
  list, ls

Flags:
  -p, --project string   Name or ID of the project to list releases for


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus release list myProject
$ octopus release ls "Other Project"
$ octopus release list --project myProject


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)