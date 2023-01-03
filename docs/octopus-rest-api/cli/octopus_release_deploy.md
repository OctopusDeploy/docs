---
title: octopus release deploy
description: Deploy releases
position: 77
---

Deploy releases in Octopus Deploy


```text
Usage:
  octopus release deploy [flags]

Flags:
  -p, --project string                      Name or ID of the project to deploy the release from
      --version string                      Release version to deploy
  -e, --environment strings                 Deploy to this environment (can be specified multiple times)
      --tenant strings                      Deploy to this tenant (can be specified multiple times)
      --tenant-tag strings                  Deploy to tenants matching this tag (can be specified multiple times)
      --deploy-at string                    Deploy at a later time. Deploy now if omitted. TODO date formats and timezones!
      --deploy-at-expiry string             Cancel the deployment if it hasn't started within this time period.
  -v, --variable strings                    Set the value for a prompted variable in the format Label:Value
      --update-variables                    Overwrite the release variable snapshot by re-importing variables from the project.
      --skip strings                        Exclude specific steps from the deployment
      --guided-failure string               Enable Guided failure mode (true/false/default)
      --force-package-download              Force re-download of packages
      --deployment-target strings           Deploy to this target (can be specified multiple times)
      --exclude-deployment-target strings   Deploy to targets except for this (can be specified multiple times)


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus release deploy  # fully interactive
$ octopus release deploy --project MyProject --version 1.0 --environment Dev
$ octopus release deploy --project MyProject --version 1.0 --tenant-tag Regions/East --tenant-tag Regions/South
$ octopus release deploy -p MyProject --version 1.0 -e Dev --skip InstallStep --variable VarName:VarValue
$ octopus release deploy -p MyProject --version 1.0 -e Dev --force-package-download --guided-failure true -f basic


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)