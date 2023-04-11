---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus task wait
description: Wait for task(s) to finish
navOrder: 100
---

Wait for a provided list of task(s) to finish


```
Usage:
  octopus task wait [TaskIDs] [flags]

Flags:
      --timeout int   Duration to wait (in seconds) before stopping execution (default 600)


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus task wait

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)