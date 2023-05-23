---
title: octopus tenant clone
description: Clone a tenant
position: 102
---

Clone a tenant in Octopus Deploy


```text
Usage:
  octopus tenant clone [flags]

Flags:
  -d, --description string     Description of the new tenant
  -n, --name string            Name of the new tenant
      --source-tenant string   Name of the source tenant


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus tenant clone
$ octopus tenant clone --name "Garys Cakes" --source-tenant "Bobs Wood Shop" 


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)