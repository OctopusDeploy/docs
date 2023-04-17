---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus project variables include
description: Include a variable set in a project
navOrder: 76
---

Include a variable set in a project in Octopus Deploy


```text
Usage:
  octopus project variables include [flags]

Flags:
  -p, --project string         The project
      --variable-set strings   The name of the library variable set


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus project variable include
$ octopus project variable include --variable-set "Slack Variables"


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)