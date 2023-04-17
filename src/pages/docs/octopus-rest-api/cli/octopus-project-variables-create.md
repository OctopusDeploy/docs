---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: octopus project variables create
description: Create a variable for a project
navOrder: 73
---

Create a variable for a project in Octopus Deploy


```
Usage:
  octopus project variables create [flags]

Aliases:
  create, add

Flags:
      --channel-scope strings            Assign channel scopes to the variable. Multiple scopes can be supplied.
      --environment-scope strings        Assign environment scopes to the variable. Multiple scopes can be supplied.
  -n, --name string                      The name of the variable
      --process-scope strings            Assign process scopes to the variable. Valid scopes are 'deployment' or a runbook name. Multiple scopes can be supplied.
  -p, --project string                   The project
      --prompt-description string        Description for the prompted variable
      --prompt-dropdown-option strings   Options for a dropdown prompt. May be specified multiple times. Must be in format 'value|description'
      --prompt-label string              The label for the prompted variable
      --prompt-required                  Prompt will require a value for deployment
      --prompt-type string               The input type for the prompted variable. Valid values are 'text', 'multiline-text', 'checkbox' and 'dropdown'
      --prompted                         Make a prompted variable
      --role-scope strings               Assign role scopes to the variable. Multiple scopes can be supplied.
      --step-scope strings               Assign process step scopes to the variable. Multiple scopes can be supplied.
      --tag-scope strings                Assign tag scopes to the variable. Multiple scopes can be supplied.
      --target-scope strings             Assign deployment target scopes to the variable. Multiple scopes can be supplied.
  -t, --type string                      The type of variable. Valid values are text, sensitive, workerpool, awsaccount, azureaccount, googleaccount, certificate. Default is text
      --value string                     The value to set on the variable


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus project variable create
$ octopus project variable create --name varname --value "abc"
$ octopus project variable create --name varname --value "passwordABC" --type sensitive
$ octopus project variable create --name varname --value "abc" --scope environment='test'


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key)