---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus project variables update
description: Update the value of a project variable
navOrder: 78
---

Update the value of a project variable in Octopus Deploy


```
Usage:
  octopus project variables update [flags]

Flags:
      --channel-scope strings       Assign channel scopes to the variable. Multiple scopes can be supplied.
      --environment-scope strings   Assign environment scopes to the variable. Multiple scopes can be supplied.
      --id string                   The variable id to update
  -n, --name string                 The name of the variable
      --process-scope strings       Assign process scopes to the variable. Valid scopes are 'deployment' or a runbook name. Multiple scopes can be supplied.
  -p, --project string              The project
      --role-scope strings          Assign role scopes to the variable. Multiple scopes can be supplied.
      --step-scope strings          Assign process step scopes to the variable. Multiple scopes can be supplied.
      --tag-scope strings           Assign tag scopes to the variable. Multiple scopes can be supplied.
      --target-scope strings        Assign deployment target scopes to the variable. Multiple scopes can be supplied.
      --unscoped                    Remove all shared from the variable, cannot be used with shared
      --value string                The value to set on the variable


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus project variable update
$ octopus project variable update --name varname --value "abc"
$ octopus project variable update --name varname --value "password"
$ octopus project variable update --name varname --unscoped
$ octopus project variable update --name varname --environment-scope test


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)