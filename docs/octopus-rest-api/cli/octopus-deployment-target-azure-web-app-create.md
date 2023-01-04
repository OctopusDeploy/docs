---
title: octopus deployment-target azure-web-app create
description: Create an Azure Web App deployment target
position: 29
---

Create an Azure Web App deployment target in Octopus Deploy


```text
Usage:
  octopus deployment-target azure-web-app create [flags]

Aliases:
  create, new

Flags:
      --account string          The name or ID of the Azure Service Principal account
      --environment strings     Choose at least one environment for the deployment target.
  -n, --name string             A short, memorable, unique name for this Azure Web App.
      --resource-group string   The resource group of the Azure Web App
      --role strings            Choose at least one role that this deployment target will provide.
      --tenant strings          Associate the deployment target with tenants
      --tenant-tag strings      Associate the deployment target with tenant tags, should be in the format 'tag set name/tag name'
      --tenanted-mode string    
                                Choose the kind of deployments where this deployment target should be included. Default is 'untenanted'
  -w, --web                     Open in web browser
      --web-app string          The name of the Azure Web App for this deployment target
      --web-app-slot string     The name of the Azure Web App Slot for this deployment target
      --worker-pool string      The worker pool for the deployment target, only required if not using the default worker pool


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus deployment-target azure-web-app create

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)