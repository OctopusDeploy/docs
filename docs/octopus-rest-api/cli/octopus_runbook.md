---
title: octopus runbook
description: Manage runbooks
position: 79
---

Manage runbooks in Octopus Deploy


```text
Usage:
  octopus runbook [command]

Available Commands:
  help Help about any command
  list List runbooks
  run Run runbooks in Octopus Deploy

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus runbook [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus runbook list
$ octopus runbook run


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)