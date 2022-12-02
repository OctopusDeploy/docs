---
title: octopus space view
description: View a space
position: 82
---

View a space in Octopus Deploy


```text
Usage:
  octopus space view {<name> | <id>} [flags]

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus space view 'Pattern - Blue-Green'
$ octopus space view Spaces-302


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)