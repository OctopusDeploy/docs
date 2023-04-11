---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus account create
description: Create an account
navOrder: 8
---

Create an account in Octopus Deploy


```
Usage:
  octopus account create [flags]

Aliases:
  create, new

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus account create

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)