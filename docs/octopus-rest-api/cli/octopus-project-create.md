---
title: octopus project create
description: Create a project
position: 64
---

Create a project in Octopus Deploy


```text
Usage:
  octopus project create [flags]

Flags:
  -n, --name string                            Name of the project
  -d, --description string                     Description of the project
  -g, --group string                           Project group of the project
  -l, --lifecycle string                       Lifecycle of the project
      --process-vcs                            Use Config As Code for the project
      --git-url string                         Url of the Git repository for storing project configuration
      --git-branch string                      The default branch to use for Config As Code. Default is 'main'.
      --git-credentials string                 The Id or name of the Git credentials stored in Octopus
      --git-username string                    The username to authenticate with Git
      --git-password string                    The password to authenticate with Git
      --git-credential-store string            The location to store the supplied Git credentials. Options are library or project. Default is library
      --git-initial-commit string              The initial commit message for configuring Config As Code.
      --git-base-path string                   The directory where Octopus should store the project files in the repository. Default is '.octopus/'
      --git-initial-commit-branch string       The branch to initially commit Config As Code settings. Only required if 'git-branch' is listed as a 'git-protected-branch-pattern'. Default value is 'octopus-vcs-conversion'.
      --git-protected-branch-pattern strings   Git branches which are protected from having Config As Code settings committed directly


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus project create
$ octopus project create --process-vcs
$ octopus project create --name 'Deploy web app' --lifecycle 'Default Lifecycle' --group 'Default Project Group'


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)