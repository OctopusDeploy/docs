---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-03-22
title: SSH target requirements
description: Requirements for using SSH deployment targets with Octopus.
navOrder: 15
---

Before you can configure your [SSH deployment targets](/docs/infrastructure/deployment-targets/linux/ssh-target), they must meet the [requirements](/docs/infrastructure/deployment-targets/linux/#requirements) for a Linux server and the following additional requirements:

- It must be accessible through SSH and SFTP (See [creating an SSH Key Pair](/docs/infrastructure/accounts/ssh-key-pair/#Creating-a-SSH-Key-Pair)).

## Bash startup files

When connecting to a target over SSH, the Octopus Server connects then executes the script via the `/bin/bash` command to ensure it is running with a bash shell (and not the default terminal shell for that user). Any login scripts that you wish to run should therefore be put into the `.bashrc` script file since this is invoked for non-login shells.

For example, with targets on a Mac the default $PATH variable may be missing `/usr/sbin`. This can be added in the `.bashrc` script with the line:

```
PATH=$PATH:/usr/sbin
```

If the `.bashrc` file doesn't already exist, create it in the user folder of the user that is connecting to the Max OSX instance. If the remote user is called `octopus`, then this file will be located at `/Users/octopus/.bashrc`.

See the Bash Reference Manual, section [6.2 Bash Startup Files](http://www.gnu.org/software/bash/manual/bashref.html#Bash-Startup-Files) for more information about startup scripts.

## .NET {#dotnet}

[Calamari](/docs/octopus-rest-api/calamari) is the command-line tool that is invoked to perform the deployment steps on the deployment target. It runs on .NET and is built as a [.NET Core self-contained distributable](https://docs.microsoft.com/en-us/dotnet/core/deploying/#self-contained-deployments-scd).

Since it is self-contained, .NET Core does not need to be installed on the target server. However, there are still some [pre-requisite dependencies](https://learn.microsoft.com/en-us/dotnet/core/install/linux-scripted-manual#dependencies) required for .NET Core itself that must be installed.

## Python
Octopus can execute Python scripts on SSH targets provided the following criteria are met:

- Python is version 3.4+
- Python3 is on the path for the SSH user executing the deployment
- pip is installed or the pycryptodome python package is installed

## Learn more

- Configure your [SSH deployment targets](/docs/infrastructure/deployment-targets/linux/ssh-target)
- [Linux blog posts](https://octopus.com/blog/tag/linux/1)
