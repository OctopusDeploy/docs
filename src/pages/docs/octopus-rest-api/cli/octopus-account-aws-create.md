---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus account aws create
description: Create an AWS account
navOrder: 3
---

Create an AWS account in Octopus Deploy


```
Usage:
  octopus account aws create [flags]

Aliases:
  create, new

Flags:
      --access-key string         The AWS access key to use when authenticating against Amazon Web Services.
  -d, --description string        A summary explaining the use of the account to other users.
  -D, --description-file file     Read the description from file
  -e, --environment stringArray   The environments that are allowed to use this account
  -n, --name string               A short, memorable, unique name for this account.
      --secret-key string         The AWS secret key to use when authenticating against Amazon Web Services.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus account aws create

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)