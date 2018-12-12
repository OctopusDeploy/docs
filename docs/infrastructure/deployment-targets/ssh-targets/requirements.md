---
title: SSH Target Requirements
description: Requirements for using SSH deployment targets with Octopus.
position: 5
---

You SSH deployment targets must meet the following requirements:

- It is accessible through SSH and SFTP (See [creating an SSH Key Pair](/docs/infrastructure/accounts/ssh-key-pair.md#Creating-a-SSH-Key-Pair)).
- The `$HOME` environment variable must be available.
- `bash` 3+ is available at `/bin/bash`. (It does not need to be the user’s default shell.)
- `tar` is available. This is used to unpack Calamari.
- `base64` is available. This is used for encoding and decoding variables.
- `grep` is available.

## Bash Startup Files

When connecting to a target over SSH, the Octopus server connects then executes the script via the `/bin/bash` command to ensure it is running with a bash shell (and not the default terminal shell for that user). Any login scripts that you wish to run should therefore be put into the `.bashrc` script file since this is invoked for non-login shells.

For example, with targets on a Mac the default $PATH variable may be missing `/usr/sbin`. This can be added in the `.bashrc` script with the line:

> PATH=$PATH:/usr/sbin

If the `.bashrc` file doesn't already exist, create it in the user folder of the user that is connecting to the Max OSX instance. If the remote user is called `octopus`, then this file will be located at `/Users/octopus/.bashrc`.

See the Bash Reference Manual, section [6.2 Bash Startup Files](http://www.gnu.org/software/bash/manual/bashref.html#Bash-Startup-Files) for more information about startup scripts.

## Mono on OSX

If you are using a Mac with OSX as an SSH deployment target, you may see the following error message:

`Required command 'mono' is not available`

This can occur even if Mono is installed and can be executed from a local shell. This is because the environment exposed to an SSH session can differ from the environment used by a local shell.

To fix this:

1. If it doesn't already exist, create a file called `.bashrc` in the home folder of the user that is connecting to the Mac OSX instance. If the remote user is called `octopus`, then this file will be located at `/Users/octopus/.bashrc`.
2. Add the path environment variable to the `.bashrc` file to include the location of the mono executable e.g.

```
export PATH=/Library/Frameworks/Mono.framework/Versions/Current/bin/:${PATH}
```

## .NET

Calamari runs on .NET. For unix-like operating-systems, Calamari can either run on the [Mono framework](/docs/infrastructure/deployment-targets/ssh-targets/calamari-on-ssh-targets.md#mono-calamari) or as a [self-contained .NET Core distributable](/docs/infrastructure/deployment-targets/ssh-targets/calamari-on-ssh-targets.md#self-contained-calamari).

## Footprint {#SSHTargets-Footprint}

Getting just the right naming pattern is a tricky balance. In an effort to keep some similarity with the Windows based Tentacle, we have gone with the following approach:

- The root directory for all Octopus work is `$HOME/.octopus`
- All packages are deployed to a relative location at `$HOME/.octopus/Applications/#{instance}/#{environment}/#{package}/#{version}`.
- When Calamari is copied across by a deployment it is extracted to `$HOME/.octopus/#{instance}/Calamari/#{version}`.

By making all paths relative to the user's home directory, you can then theoretically use the same physical machine with multiple user accounts acting as separate targets. The Octopus server can then treat each machine\user as a separate SSH endpoint which will update Calamari and deploy independently of each other.
