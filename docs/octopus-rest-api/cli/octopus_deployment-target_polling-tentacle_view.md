---
title: octopus deployment-target polling-tentacle view
description: View a Polling Tentacle deployment target
position: 48
---

View a Polling Tentacle deployment target in Octopus Deploy


```text
Usage:
  octopus deployment-target polling-tentacle view {<name> | <id>} [flags]

Flags:
  -w, --web   Open in web browser


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus deployment-target polling-tentacle view 'EU'
$ octopus deployment-target polling-tentacle view Machines-100


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)