---
title: octopus deployment-target
description: Manage deployment targets
position: 27
---

Manage deployment targets in Octopus Deploy


```text
Usage:
  octopus deployment-target [command]

Available Commands:
  azure-web-app Manage Azure Web App deployment targets
  cloud-region Manage Cloud Region deployment targets
  delete Delete a deployment target
  help Help about any command
  kubernetes Manage Kubernetes deployment targets
  list List deployment targets
  listening-tentacle Manage Listening Tentacle deployment targets
  polling-tentacle Manage Polling Tentacle deployment targets
  ssh Manage SSH deployment targets
  view View a deployment target

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus deployment-target [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus deployment-target list

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)