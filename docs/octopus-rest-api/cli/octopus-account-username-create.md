---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus account username create
description: Create a Username/Password account
navOrder: 21
---

Create a Username/Password account in Octopus Deploy


```
Usage:
  octopus account username create [flags]

Flags:
  -d, --description string        A summary explaining the use of the account to other users.
  -D, --description-file file     Read the description from file.
  -e, --environment stringArray   The environments that are allowed to use this account.
  -n, --name string               A short, memorable, unique name for this account.
  -p, --password string           The password to use to when authenticating against the remote host.
  -u, --username string           The username to use when authenticating against the remote host.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus account username create"


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)