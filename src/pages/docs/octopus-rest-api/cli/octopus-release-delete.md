---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus release delete
description: Delete a release
navOrder: 88
---

Delete a release in Octopus Deploy


```
Usage:
  octopus release delete [flags]

Aliases:
  delete, del, rm

Flags:
  -p, --project string    Name or ID of the project to delete releases in
  -v, --version strings   Release version to delete, can be specified multiple times


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus release delete myProject 2.0
$ octopus release delete --project myProject --version 2.0
$ octopus release rm "Other Project" -v 2.0


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)