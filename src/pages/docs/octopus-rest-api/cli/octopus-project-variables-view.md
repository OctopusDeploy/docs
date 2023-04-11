---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus project variables view
description: View all values of a project variable
navOrder: 79
---

View all values of a project variable in Octopus Deploy


```text
Usage:
  octopus project variables view [flags]

Aliases:
  view, ls

Flags:
      --id string        The Id of the specifically scoped variable
  -p, --project string   The project containing the variable
  -w, --web              Open in web browser


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus project variable view
$ octopus project variable view DatabaseName --project "Vet Clinic" 


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)