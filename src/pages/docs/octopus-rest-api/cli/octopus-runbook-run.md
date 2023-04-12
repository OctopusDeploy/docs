---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus runbook run
description: Run runbooks in Octopus Deploy
navOrder: 93
---

Run runbooks in Octopus Deploy


```
Usage:
  octopus runbook run [flags]

Flags:
  -p, --project string               Name or ID of the project to run the runbook from
  -n, --name string                  Name of the runbook to run
  -e, --environment strings          Run in this environment (can be specified multiple times)
      --tenant strings               Run for this tenant (can be specified multiple times)
      --tenant-tag strings           Run for tenants matching this tag (can be specified multiple times)
      --run-at string                Run at a later time. Run now if omitted. TODO date formats and timezones!
      --run-at-expiry string         Cancel a scheduled run if it hasn't started within this time period.
  -v, --variable strings             Set the value for a prompted variable in the format Label:Value
      --snapshot string              Name or ID of the snapshot to run. If not supplied, the command will attempt to use the published snapshot.
      --skip strings                 Exclude specific steps from the runbook
      --guided-failure string        Enable Guided failure mode (true/false/default)
      --force-package-download       Force re-download of packages
      --run-target strings           Run on this target (can be specified multiple times)
      --exclude-run-target strings   Run on targets except for this (can be specified multiple times)


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus runbook run  # fully interactive
$ octopus runbook run --project MyProject ... TODO


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)