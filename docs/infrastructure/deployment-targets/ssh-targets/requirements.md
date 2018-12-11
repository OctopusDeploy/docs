---
title: SSH Target Requirements
description: Requirements for using SSH deployment targets with Octopus.
position: 5
---

We generally expect deployments with Octopus to work with practically any distribution so long as a few key prerequisites are met. Of course, if you notice it failing on some other popular distribution then please drop us a line.

To use this feature there are the following requirements:

- It must be accessible using SSH and SFTP (See [creating a SSH Key Pair](/docs/infrastructure/accounts/ssh-key-pair.md#Creating-a-SSH-Key-Pair)).
- The `$HOME` environment variable must be available.
- `bash` 3+ is available at `/bin/bash`. (It does not need to be the user’s default shell.)
- `tar` is available - for unpacking calamari.
- `base64` is available - for encoding/decoding variables.
- `grep` is available.

The health check that takes places once you configure the target should check for these requirements and let you know if any dependencies are missing.

:::warning
You may see the error message `"Required command 'mono' is not available".` when connecting to a Mac OSX instance via SSH, despite the fact that mono is installed and can be executed from a local shell. This is because the environment exposed to a SSH session can differ from the environment used by a local shell.

To fix this, create a file called `.bashrc` in the home folder of the user that is connecting to the Mac OSX instance. If the remote user is called `octopus`, then this file will be located at `/Users/octopus/.bashrc`.

Then modify the path environment variable inside the `.bashrc` file to include the location of the mono executable e.g.
```
export PATH=/Library/Frameworks/Mono.framework/Versions/Current/bin/:${PATH}
```
:::

## .NET

Calamari runs on .NET. For unix-like operating-systems, Calamari can either run on the [Mono framework](/docs/infrastructure/deployment-targets/ssh-targets/calamari-on-ssh-targets.md#mono-calamari) or as a [self-contained .NET Core distributable](/docs/infrastructure/deployment-targets/ssh-targets/calamari-on-ssh-targets.md#self-contained-calamari).

## Footprint {#SSHTargets-Footprint}

Getting just the right naming pattern is a tricky balance. In an effort to keep some similarity with the Windows based Tentacle, we have gone with the following approach:

The root directory for all Octopus work is `$HOME/.octopus` and all packages are deployed to a relative location similar to that done by a normal Tentacle at `$HOME/.octopus/Applications/#{instance}/#{environment}/#{package}/#{version}`.
Calamari is also copied across by the deployment if a new version is detected and extracted to `$HOME/.octopus/#{instance}/Calamari/#{version}`.

By making all paths relative to the user's home directory, you can then theoretically use the same physical machine with multiple user accounts acting as separate targets. The Octopus Server can then treat each machine\user as a separate SSH endpoint which will update Calamari and deploy independently of each other.

:::success
**Bash Startup Files**
When connecting to a target over SSH, Octopus Deploy connects then executes the script via the `/bin/bash` command to ensure it is running with a bash shell (and not the default terminal shell for that user). Any login scripts that you wish to run should therefore be put into the `.bashrc`script file since this is invoked for non-login shells.

For example, with targets on a Mac the default $PATH variable may be missing `/usr/sbin`. This can be added in the `.bashrc` script with the line

> PATH=$PATH:/usr/sbin

See the Bash Reference Manual, section [6.2 Bash Startup Files](http://www.gnu.org/software/bash/manual/bashref.html#Bash-Startup-Files) for more information about startup scripts.
:::
