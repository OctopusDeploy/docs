---
title: SSH Deployments
description: Deploying software to Linux and Unix deployment targets.
position: 30
---

Below are some details of how deployments are performed to SSH targets.

Also see the [Node.js sample](/docs/deployment-examples/node-on-linux-deployments/index.md) for an example of deploying to a Linux target

## File Footprint {#SSHTargets-Footprint}

- The root directory for all Octopus work is `$HOME/.octopus`
- All packages are deployed to a relative location at `$HOME/.octopus/Applications/#{instance}/#{environment}/#{package}/#{version}`.
- When Calamari is copied across by a deployment it is extracted to `$HOME/.octopus/#{instance}/Calamari/#{version}`.

By making all paths relative to the user's home directory, you can then theoretically use the same physical machine with multiple user accounts acting as separate targets. The Octopus server can then treat each machine\user as a separate SSH endpoint which will update Calamari and deploy independently of each other.

## Transport

The package and any supporting deployment files are uploaded via SFTP.

## Calamari

Before any processing is begun we do an initial check to ensure the available Calamari executable on the endpoint is up to date with the server. If not, we push up the latest Calamari package and then recommence the task. The Calamari package is sent as a `.tar.gz` so it can be extracted with minimal dependencies. This obviously means the server needs to be able to un-tar that package however this should be available by default in most distros.

## Package Acquisition

Leveraging Calamari means that the deployment can obtain the package via the same methods as a target running the Tentacle agent; either pushed from the server or directly from a NuGet repository. There is therefore no bottleneck in acquisition if there are multiple SSH endpoints all trying to retrieve the same package independently.

## Features

The vast majority of Octopus features are supported when deploying to SSH targets.

Keep in mind the platform differences such as file paths or separators, line breaks, environment variables and security considerations.

Obviously Windows-specific features such as IIS and Windows Services are not supported when deploying to non-Windows targets.

## Scripts

As yet we do not support running PowerShell scripts on Linux, either on their own as a script task, or as pre-deploy/deploy/post-deploy steps. We do however support running bash scripts on SSH endpoints. Conversely, bash is not yet supported on normal Windows Tentacles even with Cygwin available.

The deployment process will check for scripts either provided in the deployment step itself or embedded in the package, looking for `PreDeploy.sh`, `Deploy.sh` and `PostDeploy.sh` (names are case-sensitive). If these scripts are found, Calamari will then execute their contents at the appropriate time. 

If you want to start some background task in an script that runs while the deployment continues to complete, you should become familiar with the `screen` command. For example, running:

```bash
echo "Going to Sleep..."
screen -d -m sleep 20
echo "I'm Awake!"
```
will write out the two echo lines in succession while the sleep command continues to run in the background. This will mean that the deployment can complete while the sleep process is still running.

## Variables

The same variables that are accessible to PowerShell scripts are available to the bash scripts, albeit using a different syntax. All scripts that run are wrapped inside bootstrapping code that provides access to getting/setting variables and the ability to designate build artifacts.

Getting access to a variable involves invoking a function named `get_octopusvariable`. For example, to echo out the installation directory call

> `echo "Installed to step: " $(get_octopusvariable "Octopus.Action[Acme Deployment].Output.Package.InstallationDirectoryPath")`

Setting a variable:

> ```
> set_octopusvariable RandomNumber 3
> ```

Collecting artifacts:

> ```
> new_octopusartifact "./subdir/anotherdir/myfile"
> ```

which results in the server retrieving that file, at the end of that step. Keep in mind that this means the file must be accessible over SFTP using the same credentials as that used during execution.

:::warning
**Environment Variable Differences**
Due to the different platform, some environment variables available on a windows machine will either be named differently or possibly non-existent on other platforms. For example the Windows based variable `env:USERNAME` roughly correlates to `env:USER` on an Ubuntu machine however `env:ProgramFiles(x86)` has no corollary.
:::
