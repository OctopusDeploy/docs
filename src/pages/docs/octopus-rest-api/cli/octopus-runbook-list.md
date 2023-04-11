---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus runbook list
description: List runbooks
navOrder: 92
---

List runbooks in Octopus Deploy


```text
Usage:
  octopus runbook list [flags]

Aliases:
  list, ls

Flags:
  -q, --filter string    filter runbooks to match only ones with a name containing the given string
      --limit int32      limit the maximum number of results that will be returned
  -p, --project string   Name or ID of the project to list runbooks for


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus runbook list SomeProject
$ octopus runbook list --project SomeProject --limit 50 --filter SomeKeyword
$ octopus runbook ls -p SomeProject -n 30 -q SomeKeyword


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)