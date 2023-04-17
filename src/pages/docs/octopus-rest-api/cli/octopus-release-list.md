---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: octopus release list
description: List releases
navOrder: 90
---

List releases in Octopus Deploy


```
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


```
$ octopus release list myProject
$ octopus release ls "Other Project"
$ octopus release list --project myProject


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key)