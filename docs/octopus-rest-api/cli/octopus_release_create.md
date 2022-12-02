---
title: octopus release create
description: Create a release
position: 71
---

Create a release in Octopus Deploy


```text
Usage:
  octopus release create [flags]

Flags:
  -p, --project string              Name or ID of the project to create the release in
  -c, --channel string              Name or ID of the channel to use
  -r, --git-ref string              Git Reference e.g. refs/heads/main. Only relevant for config-as-code projects
      --git-commit string           Git Commit Hash; Specify this in addition to Git Reference if you want to reference a commit other than the latest for that branch/tag.
      --package-version string      Default version to use for all Packages
  -n, --release-notes string        Release notes to attach
      --release-notes-file string   Release notes to attach (from file)
      --version string              Override the Release Version
  -x, --ignore-existing             If a release with the same version exists, do nothing instead of failing.
      --ignore-channel-rules        Allow creation of a release where channel rules would otherwise prevent it.
      --package strings             Version specification a specific packages.
                                    Format as {package}:{version}, {step}:{version} or {package-ref-name}:{packageOrStep}:{version}
                                    You may specify this multiple times


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus release create --project MyProject --channel Beta --version 1.2.3
$ octopus release create -p MyProject -c Beta -v 1.2.3
$ octopus release create -p MyProject -c default --package "utils:1.2.3" --package "utils:InstallOnly:5.6.7"
$ octopus release create -p MyProject -c Beta --no-prompt


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)