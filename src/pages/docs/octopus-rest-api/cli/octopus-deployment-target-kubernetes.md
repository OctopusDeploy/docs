---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus deployment-target kubernetes
description: Manage Kubernetes deployment targets
navOrder: 37
---

Manage Kubernetes deployment targets in Octopus Deploy


```text
Usage:
  octopus deployment-target kubernetes [command]

Aliases:
  kubernetes, k8s

Available Commands:
  create Create a Kubernetes deployment target
  help Help about any command
  list List Kubernetes deployment targets
  view View a Kubernetes deployment target

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus deployment-target kubernetes [command] --help" for more information about a command.
```

## Examples

!include <samples-instance>


```text
$ octopus deployment-target kubernetes create

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)