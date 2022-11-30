---
title: octopus worker ssh create
description: Create a SSH worker
position:
---

Create a SSH worker in Octopus Deploy

```text
Usage:
  octopus worker ssh create [flags]

Flags:
      --account string          The name or ID of the SSH key pair or username/password account
      --fingerprint string      The host fingerprint of the worker.
      --host string             The hostname or IP address of the worker to connect to.
      --machine-policy string   The machine policy for the deployment target to use, only required if not using the Default Machine Policy
  -n, --name string             A short, memorable, unique name for this worker.
      --platform string         The platform to use for the self-contained Calamari. Options are 'linux-x64', 'linux-arm64', 'linux-arm' or 'osx-x64'
      --port int                The port to connect to the worker on.
      --proxy string            Select whether to use a proxy to connect to this SSH worker. If omitted, will connect directly.
      --runtime string          The runtime to use to run Calamari on the worker. Options are 'self-contained' or 'mono'
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
$ octopus worker ssh create
```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)