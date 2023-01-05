---
title: octopus deployment-target azure-web-app
description: Manage Azure Web App deployment targets
position: 28
---

Manage Azure Web App deployment targets in Octopus Deploy


```text
Usage:
  octopus deployment-target azure-web-app [command]

Available Commands:
  create Create an Azure Web App deployment target
  help Help about any command
  list List Azure Web App deployment targets
  view View an Azure Web App deployment target

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus deployment-target azure-web-app [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus deployment-target azure-web-app list

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)