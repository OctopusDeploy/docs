---
title: octopus project-group view
description: View a project group
position: 83
---

View a project group in Octopus Deploy


```text
Usage:
  octopus project-group view {<name> | <id> | <slug>} [flags]

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
$ octopus project-group view 'Default Project Group'
$ octopus project-group view ProjectGroups-9000


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)