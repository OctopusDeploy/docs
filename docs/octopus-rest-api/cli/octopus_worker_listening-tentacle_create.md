---
title: octopus worker listening-tentacle create
description: Create a listening tentacle worker
position: 105
---

Create a listening tentacle worker in Octopus Deploy


```text
Usage:
  octopus worker listening-tentacle create [flags]

Flags:
      --machine-policy string   The machine policy for the deployment target to use, only required if not using the Default Machine Policy
  -n, --name string             A short, memorable, unique name for this Listening Tentacle worker.
      --proxy string            Select whether to use a proxy to connect to this Listening Tentacle. If omitted, will connect directly.
      --thumbprint string       The X509 certificate thumbprint that securely identifies the Tentacle.
      --url string              The network address at which the Listening Tentacle can be reached.
  -w, --web                     Open in web browser
      --worker-pool strings     The pools of which the worker will be a member.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus worker listening-tentacle create


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)