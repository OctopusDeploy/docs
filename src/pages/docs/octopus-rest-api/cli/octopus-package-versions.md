---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus package versions
description: List versions of a package
navOrder: 62
---

List versions of a package.


```
Usage:
  octopus package versions [flags]

Aliases:
  versions, show

Flags:
      --package string   package ID to show versions for. required.
  -q, --filter string    filter packages to match only ones that contain the given string
      --limit int32      limit the maximum number of results that will be returned


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus package versions --package SomePackage
$ octopus package versions SomePackage --filter beta --limit 5
$ octopus package show SomePackage -n 2


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)