---
title: octopus worker-pool dynamic create
description: Create a dynamic worker pool
position: 131
---

Create a dynamic worker pool in Octopus Deploy


```text
Usage:
  octopus worker-pool dynamic create [flags]

Flags:
      --description string   Description of the worker pool.
  -n, --name string          A short, memorable, unique name for this worker pool.
  -w, --web                  Open in web browser
      --worker-type string   The worker type to use for all leased workers.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus worker-pool dynamic create


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)