---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus package list
description: List packages
navOrder: 58
---

List packages in Octopus Deploy


```
Usage:
  octopus package list [flags]

Aliases:
  list, ls

Flags:
  -q, --filter string   filter packages to match only ones that contain the given string
      --limit int32     limit the maximum number of results that will be returned


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus package list
$ octopus package list --limit 50 --filter SomePackage
$ octopus package ls -n 30 -q SomePackage


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)