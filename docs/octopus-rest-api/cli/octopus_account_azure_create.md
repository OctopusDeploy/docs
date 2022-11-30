---
title: octopus account azure create
description: Create an Azure subscription account
position:
---

Create an Azure subscription account in Octopus Deploy

```text
Usage:
  octopus account azure create [flags]

Aliases:
  create, new

Flags:
  -d, -- string                               A summary explaining the use of the account to other users.
      --ad-endpoint-base-uri string           Set this only if you need to override the default Active Directory Endpoint.
      --application-id string                 Your Azure Active Directory Application ID.
      --application-key string                The password for the Azure Active Directory application.
      --azure-environment string              Set only if you are using an isolated Azure Environment. Configure isolated Azure Environment. Valid option are AzureChinaCloud, AzureChinaCloud, AzureGermanCloud or AzureUSGovernment
  -D, --description-file file                 Read the description from file
  -e, --environment stringArray               The environments that are allowed to use this account
  -n, --name string                           A short, memorable, unique name for this account.
      --resource-management-base-uri string   Set this only if you need to override the default Resource Management Endpoint.
      --subscription-id string                Your Azure subscription ID.
      --tenant-id string                      Your Azure Active Directory Tenant ID.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations
```

## Examples

!include <samples-instance>

```text
$ octopus account azure create
```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)