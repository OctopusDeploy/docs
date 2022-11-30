---
title: octopus package versions
description: List versions of a package
position:
---

List versions of a package.

```text
Usage:
  octopus package versions [flags]

Aliases:
  versions, show

Flags:
      --package string   package ID to show versions for. required.
  -q, --filter string    filter packages to match only ones that contain the given string
  -n, --limit int32      limit the maximum number of results that will be returned


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations
```

## Examples

!include <samples-instance>

```text
$ octopus package versions --package SomePackage
$ octopus package versions SomePackage --filter beta --limit 5
$ octopus package show SomePackage -n 2

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)