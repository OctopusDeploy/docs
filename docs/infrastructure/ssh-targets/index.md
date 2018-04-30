---
title: SSH Targets
description: Deploying software to Linux and Unix deployment targets.
position: 50
---

For Linux and Unix systems, you can configure Octopus Deploy to communicate with your deployment targets through SSH.

## Topology {#SSHTargets-Topology}

In the standard-model the Octopus server talks to the Tentacle (ignoring the distinction between between [Polling](/docs/infrastructure/windows-targets/tentacle-communication.md#polling-tentacles) and [Listening](/docs/infrastructure/windows-targets/tentacle-communication.md#listening-tentacles-recommended)) who in turn delegates the actual deployment work to [Calamari](/docs/api-and-integration/calamari.md), which contains all the information regarding conventions and deployments. Calamari then executes the scripts and the Tentacle passes back to the Server the task progress, logs and artifacts.

![](/docs/images/3048063/3277601.png)

The Octopus Server will communicate with the target server via SSH and execute bash scripts to invoke Calamari, in much the same way that would be done by a Tentacle.

![](/docs/images/3048063/3277602.png)

The great thing about this approach is that by using effectively the same Calamari code base, it should continue to have almost complete feature parity!

## Requirements {#SSHTargets-Requirements}

We generally expect deployments with Octopus to work with practically any distribution so long as a few key prerequisites are met. Of course, if you notice it failing on some other popular distribution then please drop us a line.

To use this feature there are the following requirements:

- It must be accessible using SSH and SFTP
- The `$HOME` environment variable must be available
- `bash` 3+ is available at `/bin/bash`. (It does not need to be the user’s default shell.)
- `tar` is available - for unpacking calamari
- `base64` is available - for encoding/decoding variables
- `grep` is available - Everyone needs grep!

The health check that takes places once you configure the target should check for these requirements and let you know if any dependencies are missing.

:::warning
You may see the error message `"Required command 'mono' is not available".` when connecting to a Mac OSX instance via SSH, despite the fact that mono is installed and can be executed from a local shell. This is because the environment exposed to a SSH session can differ from the environment used by a local shell.

To fix this, create a file called `.bashrc` in the home folder of the user that is connecting to the Mac OSX instance. If the remote user is called `octopus`, then this file will be located at `/Users/octopus/.bashrc`.

Then modify the path environment variable inside the `.bashrc` file to include the location of the mono executable e.g.
```
export PATH=/Library/Frameworks/Mono.framework/Versions/Current/bin/:${PATH}
```
:::

### .NET

Calamari runs on .NET. For unix-like operating-systems, Calamari can either run on the [Mono framework](mono-calamari.md) or as a [self-contained .NET Core distributable](self-contained-calamari.md).

## Footprint {#SSHTargets-Footprint}

Getting just the right naming pattern is a tricky balance. In an effort to keep some similarity with the Windows based Tentacle, we have gone with the following approach:

The root directory for all Octopus work is `$HOME/.octopus` and all packages are deployed to a relative location similar to that done by a normal Tentacle at `$HOME/.octopus/Applications/#{instance}/#{environment}/#{package}/#{version}`.
Calamari is also copied across by the deployment if a new version is detected and extracted to `$HOME/.octopus/#{instance}/Calamari/#{version}`.

By making all paths relative to the user's home directory, you can then theoretically use the same physical machine with multiple user accounts acting as separate targets. The Octopus server can then treat each machine\user as a separate SSH endpoint which will update Calamari and deploy independently of each other.

:::success
**Bash Startup Files**
When connecting to a target over SSH, Octopus Deploy connects then executes the script via the `/bin/bash` command to ensure it is running with a bash shell (and not the default terminal shell for that user). Any login scripts that you wish to run should therefore be put into the `.bashrc`script file since this is invoked for non-login shells.

For example, with targets on a Mac the default $PATH variable may be missing `/usr/sbin`. This can be added in the `.bashrc`script with the line

> PATH=$PATH:/usr/sbin

See the Bash Reference Manual, section [6.2 Bash Startup Files](http://www.gnu.org/software/bash/manual/bashref.html#Bash-Startup-Files) for more information about startup scripts.
:::

## Deployment {#SSHTargets-Deployment}

As we are just using Calamari directly, essentially the same steps are taken as a standard Tentacle Agents whenever a deployment takes place with a few key differences due to the missing Tentacle layer.

**Transport**

The package and any supporting deployment files are uploaded via SFTP.

**Calamari**

Before any processing is begun we do an initial check to ensure the available Calamari executable on the endpoint is up to date with the server. If not we push up the latest Calamari package and then recommence the task. The Calamari package is sent as a `.tar.gz` so it can be extracted with minimal dependencies. This obviously means the server needs to be able to un-tar that package however this should be available by default in most distros.

**Package Acquisition**

Leveraging Calamari means that the deployment can obtain the package via the same methods as a normal Tentacle; either pushed from the server or directly from a NuGet repository. There is therefore no bottleneck in acquisition if there are multiple SSH endpoints all trying to retrieve the same package independently.

:::success
**Non-NuGet Package Types**
Since version 3.3, Octopus Deploy has [support for tar packages](/docs/packaging-applications/creating-packages/supported-packages.md).

See our [Node.js sample](/docs/deploying-applications/node-on-nix-deployments/index.md) for an example of deploying to a Linux target
:::

**Features**

The vast majority of Octopus features are supported when deploying to SSH targets.

Keep in mind the platform differences such as file paths or separators, line breaks, environment variables and security considerations.

Obviously Windows-specific features such as IIS and Windows Services are not supported when deploying to non-Windows targets.

**Scripts**

As yet we do not support running PowerShell scripts on Linux, either on their own as a script task, or as pre-deploy/deploy/post-deploy steps. We do however support running bash scripts on SSH endpoints. Conversely, bash is not yet supported on normal Windows Tentacles, even with Cygwin available.

The deployment process will check for scripts either provided in the deployment step itself or embedded in the package, looking for `PreDeploy.sh`, `Deploy.sh` and `PostDeploy.sh` (names are case-sensitive). If these scripts are found, Calamari will then execute their contents at the appropriate time. 

If you want to start some background task in an script that runs while the deployment continues to complete, you should become familiar with the `screen` command. For example, running
```bash
echo "Going to Sleep..."
screen -d -m sleep 20
echo "I'm Awake!"
```
will write out the two echo lines in sucession while the sleep command continues to run in the background. This will mean that the deployment can complete while the sleep process is still running.

**Variables**

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

## Health Checks {#SSHTargets-HealthChecks}

Although there is no Tentacle involved with SSH endpoints there are still some useful metrics that are used to determine its health in regards to its ability to perform deployments. For a standard SSH target, it is the absence of any dependencies (e.g. tar) that deems the endpoint unhealthy (in addition to the typical checks of inability to even connect using the provided credentials) while an absence or out-of-date version of Calamari is considered only a warning as this will be updated when its required by a task.

![](/docs/images/3048063/3277600.png "width=500")

The introduction of [Raw Scripting](/docs/deploying-applications/custom-scripts/raw-scripting.md) provides the ability to run scripts on SSH endpoints without any additional Octopus dependencies. To facilitate these targets, [machine policies](/docs/infrastructure/machine-policies.md) allow you to configure health checks to test only for SSH connectivity to your machine to be considered healthy.

Note that due to the Tentacle being effectively a “virtual Tentacle” running on the server itself, if the endpoint is healthy it will indicate in the health logs that the running version is the same as the server version.
