---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: SSH deployments
description: Deploying software to Linux and Unix deployment targets.
navOrder: 30
---

Below are some details of how deployments are performed to SSH targets.

## Features

The vast majority of Octopus features are supported when deploying to SSH targets.

Keep in mind the platform differences such as file paths or separators, line breaks, environment variables and security considerations.

Windows-specific features such as IIS and Windows Services are not supported when deploying to non-Windows targets.

## Scripts

You can execute scripts using almost any installed scripting runtime. Learn about what you can do with [custom scripts](/docs/deployments/custom-scripts).

:::div{.hint}
**Environment Variable Differences**
If you are writing a cross-platform script, be aware of the differences between environment variables for each platform. For example the Windows based variable `env:USERNAME` roughly correlates to `env:USER` on an Ubuntu machine however `env:ProgramFiles(x86)` has no corollary.
:::

:::div{.hint}
**Bash (and other shell) variables**
Octopus Deploy will log into the SSH target via a non-interactive shell. Because of this, startup files like `.bashrc` are not fully evaluated. If you are referencing bash variables `export`ed in these files, you should move them before the following common code block at the top of the file:
```
# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac
```
This will ensure that they are evaluated on non-interactive logins.
:::


### Example: Using variables in Bash

Your script can use a [variable value](/docs/projects/variables) by invoking the `get_octopusvariable` function. For example, to echo out the installation directory call

> `echo "Installed to step: " $(get_octopusvariable "Octopus.Action[Acme Deployment].Output.Package.InstallationDirectoryPath")`

You can also set an [output variable](/docs/projects/variables/output-variables):

> ```
> set_octopusvariable RandomNumber 3
> ```

### Example: Collecting an artifact

Your script can tell Octopus to collect a file and store it as a [deployment artifact](/docs/projects/deployment-process/artifacts):

> ```
> new_octopusartifact "./subdir/anotherdir/myfile"
> ```

which results in the server retrieving that file, at the end of that step. Keep in mind that this means the file must be accessible over SFTP using the same credentials as that used during execution.

## Transport

The package and any supporting deployment files are uploaded via SFTP.

## File footprint {#SSHTargets-Footprint}

- The root directory for all Octopus work is `$HOME/.octopus`
- All packages are deployed to a relative location at `$HOME/.octopus/Applications/#{instance}/#{environment}/#{package}/#{version}`.
- When Calamari is copied across by a deployment it is extracted to `$HOME/.octopus/#{instance}/Calamari/#{version}`.

By making all paths relative to the user's home directory, you can then theoretically use the same physical machine with multiple user accounts acting as separate targets. The Octopus Server can then treat each machine\user as a separate SSH endpoint which will update Calamari and deploy independently of each other.

## Package acquisition

Leveraging Calamari means that the deployment can obtain the package via the same methods as a target running the Tentacle agent; either pushed from the server or directly from a NuGet repository. There is therefore no bottleneck in acquisition if there are multiple SSH endpoints all trying to retrieve the same package independently.

## Calamari

Calamari is the tool Octopus uses to execute deployments on a remote computer. Before any processing is begun we do an initial check to ensure the available Calamari executable on the endpoint is up to date with the server. If not, we push up the latest Calamari package and then recommence the task. The Calamari package is sent as a `.tar.gz` so it can be extracted with minimal dependencies. This means the server needs to be able to un-tar that package, however, this should be available by default in most distros.

## Learn more

- [Linux blog posts](https://octopus.com/blog/tag/linux)
- [Node.js sample](/docs/deployments/node-js/node-on-linux)
