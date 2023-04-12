---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus project convert
description: Convert a project to use Config As Code
navOrder: 67
---

Convert a project to use Config As Code in Octopus Deploy


```
Usage:
  octopus project convert [flags]

Flags:
      --git-base-path string                   The directory where Octopus should store the project files in the repository. Default is '.octopus/'
      --git-branch string                      The default branch to use for Config As Code. Default is 'main'.
      --git-credential-store string            The location to store the supplied Git credentials. Options are library or project. Default is library
      --git-credentials string                 The Id or name of the Git credentials stored in Octopus
      --git-initial-commit string              The initial commit message for configuring Config As Code.
      --git-initial-commit-branch string       The branch to initially commit Config As Code settings. Only required if 'git-branch' is listed as a 'git-protected-branch-pattern'. Default value is 'octopus-vcs-conversion'.
      --git-password string                    The password to authenticate with Git
      --git-protected-branch-pattern strings   Git branches which are protected from having Config As Code settings committed directly
      --git-url string                         Url of the Git repository for storing project configuration
      --git-username string                    The username to authenticate with Git
  -p, --project string                         Name, ID or Slug of the project to convert


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus project convert
$ octopus project convert --project "Deploy web site" --git-url https://github.com/orgname/reponame"


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)