---
title: SSH Targets
position: 4
---


You may want to target your deployment for non-windows machines where you don't have the ability to run a full Tentacle. In cases such as this, a SSH Target is the next best thing.

## Topology


In the standard-model the Octopus server talks to the Tentacle (ignoring the distinction between between [Polling](/docs/installation/installing-tentacles/polling-tentacles.md) and [Listening](/docs/installation/installing-tentacles/listening-tentacles.md)) who in turn delegates the actual deployment work to Calamari, which contains all the information regarding conventions and deployments. Calamari then executes the scripts and the Tentacle passes back to the Server the task progress, logs and artifacts.


![](/docs/images/3048063/3277601.png)


As of Octopus Deploy 3.0, Calamari can now also run on mono and therefore any Unix-like OS that supports mono. In this set up the Octopus Server will communicate via SSH and execute bash scripts to invoke Calamari in much the same way that would be done by a Tentacle.


![](/docs/images/3048063/3277602.png)


The great thing about this approach is that by using effectively the same Calamari code base, it should continue to have almost complete feature parity!

## Requirements


We support any Unix-like OSthat can run mono, and we currently run automated tests against the following platforms:

- Centos 7.2 + Mono 4.4.2
- Debian 8.4 + Mono 4.4.2
- Fedora 23 + Mono 4.4.2
- FreeBSD 10.3 + Mono 4.6.2
- openSUSE 13.2 + Mono 4.6.0
- Redhat 7 + Mono 4.4.2
- SUSE LES 12 SP1 + Mono 4.6.0
- Ubuntu 12.02 LTS + Mono 3.12.1
- Ubuntu 14.04 LTS + Mono 4.0.5
- Ubuntu 16.04 LTS + Mono 4.6.1





:::warning
**F# and ScriptCS Support**
Please note that F# and ScriptCS support are only available with Mono 4 and above.
:::





We generally expect deployments with Octopus to work with practically any distribution so long as a few key prerequisites are met. Of course, if you notice it failing on some other popular distribution then please drop us a line.


To use this feature there are the following requirements:

- It must be accessible using SSH and SFTP
- The `$HOME` environment variable must be available
- `bash` 3+ is available at `/bin/bash`. (It does not need to be the user’s default shell.)
- `mono-complete` 3.10+ is available (you can find instructions on how to install mono on the related [mono docs page](http://www.mono-project.com/docs/getting-started/install/linux/)).
- `tar` is available - for unpacking calamari
- `base64` is available - for encoding/decoding variables
- `grep` is available - Everyone needs grep!



The health check that takes places once you configure the target should check for these requirements and let you know if any dependencies are missing.




:::warning
**SSL Certificates in Mono**
If you configure your deployment such that the target pulls down the package itself directly from the NuGet repository, the correct SSL certificates need to also be available to mono. By default, mono pre 3.12 didn’t trust any certificates and the root certs in question would need to be either manually imported, or synced with Mozilla’s list by invoking `mozroots` or `cert-sync`. Thankfully mono's latest builds perform this step during installation so it should “just work”. See [mono’s security FAQ](http://www.mono-project.com/docs/faq/security/) for more details.
:::

## Footprint


Getting just the right naming pattern is a tricky balance. In an effort to keep some similarity with the Windows based Tentacle, we have gone with the following approach:


The root directory for all Octopus work is `$HOME/.octopus` and all packages are deployed to a relative location similar to that done by a normal Tentacle at `$HOME/.octopus/Applications/#{instance}/#{environment}/#{package}/#{version}`.
Calamari is also copied across by the deployment if a new version is detected and extracted to `$HOME/.octopus/#{instance}/Calamari/#{version}`.


By making all paths relative to the user's home directory, you can then theoretically use the same physical machine with multiple user accounts acting as separate targets. The Octopus server can then treat each machine\user as a separate SSH endpoint which will update Calamari and deploy independently of each other.

:::success
**Bash startup files**
When connecting to a target over SSH, Octopus Deploy connects then executes the script via the `/bin/bash` command to ensure it is running with a bash shell (and not the default terminal shell for that user). Any login scripts that you wish to run should therefore be put into the `.bashrc`script file since this is invoked for non-login shells.


For example, with targets on a Mac the default $PATH variable may be missing `/usr/sbin`. This can be added in the `.bashrc`script with the line


> PATH=$PATH:/usr/sbin



See the Bash Reference Manual, section [6.2 Bash Startup Files](http://www.gnu.org/software/bash/manual/bashref.html#Bash-Startup-Files) for more information about startup scripts.
:::

## Deployment


As we are just using Calamari directly, essentially the same steps are taken as a standard Tentacle Agents whenever a deployment takes place with a few key differences due to the missing Tentacle layer.


**Transport**


The package and any supporting deployment files are uploaded via SFTP.


**Calamari**


Before any processing is begun we do an initial check to ensure the available Calamari executable on the endpoint is up to date with the server. If not we push up the latest Calamari package and then recommence the task. The Calamari package is sent as a `.tar.gz` so it can be extracted with minimal dependencies. This obviously means the server needs to be able to un-tar that package however this should be available by default in most distros.


**Package Acquisition**


Leveraging Calamari means that the deployment can obtain the package via the same methods as a normal Tentacle; either pushed from the server or directly from a NuGet repository. There is therefore no bottleneck in acquisition if there are multiple SSH endpoints all trying to retrieve the same package independently.

:::success
**Non-NuGet package types**
Since version 3.3, Octopus Deploy has [support for tar packages](/docs/packaging-applications/supported-packages.md).


See our [Node.js sample](/docs/guides/node-on-nix-deployments.md) for an example of deploying to a Linux target
:::


**Features**


The vast majority of Octopus features are supported, with the exception of IIS steps and Windows services. To support windows services under Mono, we suggest using [mono-service](https://linux.die.net/man/1/mono-service).


**Scripts**


As yet we do not support running PowerShell scripts on Linux, either on their own as a script task, or as pre-deploy/deploy/post-deploy steps. We do however support running bash scripts on SSH endpoints. Conversely, bash is not yet supported on normal Windows Tentacles, even with Cygwin available.


The deployment process will check for scripts either provided in the deployment step itself or embedded in the package, looking for `PreDeploy.sh`, `Deploy.sh` and `PostDeploy.sh` (names are case-sensitive). If these scripts are found, Calamari will then execute their contents at the appropriate time. Again an interesting side-effect of using Calamari on mono is that any C# or F# scripts should continue to function just like with normal Tentacles. Keep in mind the platform differences such as file paths or separators, line breaks, environment variables and security considerations.


**Variables**


The same variables that are accessible to PowerShell scripts are available to the bash scripts, albeit using a different syntax. All scripts that run are wrapped inside bootstrapping code that provides access to getting/setting variables and the ability to designate build artifacts.


Getting access to a variable involves invoking a function named `get_octopusvariable`. For example, to echo out the installation directory call


> `echo &quot;Installed to step: &quot; $(get_octopusvariable &quot;Octopus.Action[Acme Deployment].Output.Package.InstallationDirectoryPath&quot;)`



Setting a variable:


> ```
> set_octopusvariable RandomNumber 3
> ```



Collecting artifacts:


> ```
> new_octopusartifact "./subdir/anotherdir/myfile"
> ```



which results in the server retrieving that file, at the end of that step. Keep in mind that this means the file must be accessible over SFTP using the same credentials as that used during execution.

:::problem
**XML Transformation Only Supported on Mono 4.2.3+**
In addition to not supporting PowerShell scripts it should also be noted that **XML transformations are only supported on Mono 4.2.3 and above**. Prior to this, variable substitutions will still work without a problem, but the XML transformations will not as they rely on some code in mono that was broken. For details around this bug, please see [Xamarin bug 19426](https://bugzilla.xamarin.com/show_bug.cgi?id=19426).
:::

:::warning
**Environment Variable Differences**
Due to the different platform, some environment variables available on a windows machine will either be named differently or possibly non-existent on other platforms. For example the Windows based variable `env:USERNAME` roughly correlates to `env:USER` on an Ubuntu machine however `env:ProgramFiles(x86)` has no corollary.
:::

## Health Checks


Although there is no Tentacle involved with SSH endpoints there are still some useful metrics that are used to determine its health in regards to its ability to perform deployments. It is the absence of any dependencies (i.e. mono, tar) that deems the endpoint unhealthy (in addition to the typical checks of inability to even connect using the provided credentials) while an absence or out-of-date version of Calamari is considered only a warning as this will be updated when its required by a task.


![](/docs/images/3048063/3277600.png)


Note that due to the Tentacle being effectively a “virtual Tentacle” running on the server itself, if the endpoint is healthy it will indicate in the health logs that the running version is the same as the server version.
