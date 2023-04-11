---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus environment list
description: List environments
navOrder: 56
---

List environments in Octopus Deploy


```text
Usage:
  octopus environment list [flags]

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
$ octopus environment list
$ octopus environment ls"


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)