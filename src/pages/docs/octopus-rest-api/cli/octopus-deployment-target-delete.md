---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus deployment-target delete
description: Delete a deployment target
navOrder: 36
---

Delete a deployment target in Octopus Deploy


```text
Usage:
  octopus deployment-target delete {<name> | <id>} [flags]

Aliases:
  delete, del, rm, remove

Flags:
  -y, --confirm   Don't ask for confirmation before deleting the deployment target.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus deployment-target delete
$ octopus deployment-target rm


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)