---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus worker-pool static create
description: Create a static worker pool
navOrder: 135
---

Create a static worker pool in Octopus Deploy


```
Usage:
  octopus worker-pool static create [flags]

Flags:
      --description string   Description of the worker pool.
  -n, --name string          A short, memorable, unique name for this worker pool.
  -w, --web                  Open in web browser


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus worker-pool static create


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)