---
title: octopus tenant variables update
description: Update the value of a tenant variable
position: 111
---

Update the value of a tenant variable in Octopus Deploy


```text
Usage:
  octopus tenant variables update [flags]

Flags:
  -e, --environment string            The environment
  -l, --library-variable-set string   The library variable set
  -n, --name string                   The name of the variable
  -p, --project string                The project
  -t, --tenant string                 The tenant
      --value string                  The value to set on the variable


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus tenant variable update
$ octopus tenant variable update --tenant "Bobs Fish Shack" --name "site-name" --value "Bobs Fish Shack" --project "Awesome Web Site" --environment "Test"
$ octopus tenant variable update --tenant "Sallys Tackle Truck" --name dbPassword --value "12345" --library-variable-set "Shared Variables"


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)