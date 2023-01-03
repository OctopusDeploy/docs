---
title: octopus project view
description: View a project
position: 68
---

View a project in Octopus Deploy


```text
Usage:
  octopus project view {<name> | <id> | <slug>} [flags]

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
$ octopus project view 'Deploy Web App'
$ octopus project view Projects-9000
$ octopus project view deploy-web-app


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)