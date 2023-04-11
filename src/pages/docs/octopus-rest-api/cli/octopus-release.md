---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus release
description: Manage releases
navOrder: 86
---

Manage releases in Octopus Deploy


```
Usage:
  octopus release [command]

Available Commands:
  create Create a release
  delete Delete a release
  deploy Deploy releases
  help Help about any command
  list List releases

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus release [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```
$ octopus release list

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)