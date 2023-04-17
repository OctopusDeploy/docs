---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: octopus project variables delete
description: Delete a project variable
navOrder: 74
---

Delete a project variable in Octopus Deploy


```
Usage:
  octopus project variables delete {<name>} [flags]

Aliases:
  delete, del, rm, remove

Flags:
  -y, --confirm          Don't ask for confirmation before deleting the project variable.
      --id string        The id of the specific variable value to delete
  -n, --name string      The name of the variable
  -p, --project string   The project


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus project variable delete "Database Name" --project "Deploy Site" 
$ octopus project variable delete "Database Name" --id 26a58596-4cd9-e072-7215-7e15cb796dd2 --project "Deploy Site" --confirm 


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key)