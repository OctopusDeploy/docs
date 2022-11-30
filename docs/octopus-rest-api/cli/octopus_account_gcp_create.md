---
title: octopus account gcp create
description: Create a Google Cloud account
position:
---

Create a Google Cloud account in Octopus Deploy

```text
Usage:
  octopus account gcp create [flags]

Aliases:
  create, new

Flags:
  -d, --description string        A summary explaining the use of the account to other users.
  -D, --description-file file     Read the description from file
  -e, --environment stringArray   The environments that are allowed to use this account
  -K, --key-file string           The json key file to use when authenticating against Google Cloud.
  -n, --name string               A short, memorable, unique name for this account.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations
```

## Examples

!include <samples-instance>

```text
$ octopus account gcp create
```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)