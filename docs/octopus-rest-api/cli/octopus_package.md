---
title: octopus package
description: Manage packages
position: 54
---

Manage packages in Octopus Deploy


```text
Usage:
  octopus package [command]

Available Commands:
  help Help about any command
  list List packages
  upload upload one or more packages to Octopus Deploy
  versions List versions of a package

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus package [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus package upload

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)