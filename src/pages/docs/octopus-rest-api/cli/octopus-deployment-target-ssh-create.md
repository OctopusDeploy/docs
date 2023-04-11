---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus deployment-target ssh create
description: Create a SSH deployment target
navOrder: 50
---

Create a SSH deployment target in Octopus Deploy


```
Usage:
  octopus deployment-target ssh create [flags]

Aliases:
  create, new

Flags:
      --account string          The name or ID of the SSH key pair or username/password account
      --environment strings     Choose at least one environment for the deployment target.
      --fingerprint string      The host fingerprint of the SSH target.
      --host string             The hostname or IP address of the SSH target to connect to.
      --machine-policy string   The machine policy for the deployment target to use, only required if not using the Default Machine Policy
  -n, --name string             A short, memorable, unique name for this deployment target.
      --platform string         The platform to use for the self-contained Calamari. Options are 'linux-x64', 'linux-arm64', 'linux-arm' or 'osx-x64'
      --port int                The port to connect to the SSH target on.
      --proxy string            Select whether to use a proxy to connect to this SSH target. If omitted, will connect directly.
      --role strings            Choose at least one role that this deployment target will provide.
      --runtime string          The runtime to use to run Calamari on the SSH target. Options are 'self-contained' or 'mono'
      --tenant strings          Associate the deployment target with tenants
      --tenant-tag strings      Associate the deployment target with tenant tags, should be in the format 'tag set name/tag name'
      --tenanted-mode string    
                                Choose the kind of deployments where this deployment target should be included. Default is 'untenanted'
  -w, --web                     Open in web browser


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus deployment-target ssh create

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)