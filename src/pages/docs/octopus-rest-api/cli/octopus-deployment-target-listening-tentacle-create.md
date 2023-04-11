---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus deployment-target listening-tentacle create
description: Create a Listening Tentacle deployment target
navOrder: 43
---

Create a Listening Tentacle deployment target in Octopus Deploy


```
Usage:
  octopus deployment-target listening-tentacle create [flags]

Aliases:
  create, new

Flags:
      --environment strings     Choose at least one environment for the deployment target.
      --machine-policy string   The machine policy for the deployment target to use, only required if not using the Default Machine Policy
  -n, --name string             A short, memorable, unique name for this Listening Tentacle.
      --proxy string            Select whether to use a proxy to connect to this Listening Tentacle. If omitted, will connect directly.
      --role strings            Choose at least one role that this deployment target will provide.
      --tenant strings          Associate the deployment target with tenants
      --tenant-tag strings      Associate the deployment target with tenant tags, should be in the format 'tag set name/tag name'
      --tenanted-mode string    
                                Choose the kind of deployments where this deployment target should be included. Default is 'untenanted'
      --thumbprint string       The X509 certificate thumbprint that securely identifies the Tentacle.
      --url string              The network address at which the Tentacle can be reached.
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
$ octopus deployment-target listening-tentacle create

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)