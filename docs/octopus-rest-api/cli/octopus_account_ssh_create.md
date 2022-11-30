---
title: octopus account ssh create
description: Create a SSH Key Pair account
position:
---

Create a SSH Key Pair account in Octopus Deploy

```text
Usage:
  octopus account ssh create [flags]

Aliases:
  create, new

Flags:
  -d, --description string        A summary explaining the use of the account to other users.
  -D, --description-file file     Read the description from file.
  -e, --environment stringArray   The environments that are allowed to use this account.
  -n, --name string               A short, memorable, unique name for this account.
  -p, --passphrase string         The passphrase for the private key, if required.
  -K, --private-key string        Path to the private key file portion of the key pair.
  -u, --username string           The username to use when authenticating against the remote host.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations
```

## Examples

!include <samples-instance>

```text
$ octopus account ssh create
```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)