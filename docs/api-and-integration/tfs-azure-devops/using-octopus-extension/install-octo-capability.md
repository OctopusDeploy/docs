---
title: Installing Octo as a Capability
description: This guide covers how to add Octo as a capability to your TFS/Azure DevOps custom build agents.
---

There are times when you may want to install Octo on a build agent, such as to avoid downloads, opening any firewalls and or changing proxy rules. There are a few ways in which this can be
achieved. In every option presented here, you must [install Octo](/docs/api-and-integration/octo.exe-command-line/index.md) so that it's in your current environment path. It should also be noted
that the same steps can be used to register capabilities such as `DotNetCore` as well.

:::warning
Installing Octo as a global tool will require an additional shell execution script to be in the path to delegate execution to `dotnet octo`. The reason for this is that the global tool install is only available via `dotnet octo` and doesn't
provide a way to execute `Octo` directly.

E.g. create a script called octo.ps1 and give it this content
```
& dotnet octo $args
```
Then ensure this script is present on your PATH
:::

## Agent Capability Scanning

Usually Azure DevOps agents scan for associated capabilities, but won't pick anything up from the PATH automatically. In order for a capability to be detected, you must also add an environment variable named `Octo` with the associated
version.

![Octo System Variable](/docs/api-and-integration/tfs-azure-devops/using-octopus-extension/octo-system-variable.jpg)

Once Octo is in the path and the above system variable is specified, Azure DevOps will detect the capability automatically.

```powershell
[Environment]::SetEnvironmentVariable("Octo", "4.39.3", "Machine")
```

:::hint
You must restart the build agent service if making these changes while it is currently running.
:::

## Specify the Capability Manually

If you know that a build agent has `Octo` available on the path then you can also specify the capability manually using the Azure DevOps/TFS web interface. Although this may be rather simple, the capability would have to be specified for
each agent individually which can be quite cumbersome.

![Octo specify capability](/docs/api-and-integration/tfs-azure-devops/using-octopus-extension/octo-manual-capability.jpg)

## Images and Automation

Microsoft provide a number of starting points to create your own build agent images which can be modified to include Octo as an added capability. This includes [packer images](https://github.com/Microsoft/vsts-image-generation) as well as the [docker images](https://github.com/Microsoft/vsts-agent-docker).
