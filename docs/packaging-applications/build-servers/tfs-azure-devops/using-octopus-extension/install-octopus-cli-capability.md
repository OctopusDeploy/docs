---
title: Installing the Octopus CLI as a capability
description: This guide covers how to add the Octopus CLI as a capability to your Azure DevOps/TFS custom build agents.
---

There are times when you may want to install the Octopus CLI on a build agent, such as to avoid downloads, opening any firewalls and or changing proxy rules. There are a few ways in which this can be
achieved. In every option presented here, you must [install the Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md) so that it's in your current environment path. It should also be noted
that the same steps can be used to register capabilities such as `DotNetCore` as well.

:::warning
Installing the Octopus CLI as a global tool will require an additional shell execution script to be in the path to delegate execution to `dotnet octo`. The reason for this is that the global tool install is only available via `dotnet octo` and doesn't
provide a way to execute `octo` directly.

For example, create a script called octo.ps1 with the following content:
```powershell
& dotnet octo $args
```
:::

## Agent capability scanning

Usually Azure DevOps agents scan for associated capabilities, but won't pick anything up from the PATH automatically. In order for a capability to be detected, you must also add an environment variable named `Octo` with the associated
version.

![Octo System Variable](images/octo-system-variable.jpg "width=500")

Once the Octopus CLI is in the path and the above system variable is specified, Azure DevOps will detect the capability automatically.

```powershell
[Environment]::SetEnvironmentVariable("Octo", "4.39.3", "Machine")
```

:::hint
You must restart the build agent service if making these changes while it is currently running.
:::

## Specify the capability manually

If you know that a build agent has the Octopus CLI available on the path then you can also specify the capability manually using the Azure DevOps/TFS web interface. Although this may be rather simple, the capability would have to be specified for
each agent individually which can be quite cumbersome.

![Octo specify capability](images/octo-manual-capability.jpg "width=500")

## Images and automation

Microsoft provide a number of starting points to create your own build agent images which can be modified to include the Octopus CLI as an added capability. This includes [packer images](https://github.com/actions/virtual-environments/tree/main/images) as well as instructions on [running a self-hosted agent in Docker](https://docs.microsoft.com/en-gb/azure/devops/pipelines/agents/docker).

## Troubleshooting

If you're having difficulties downloading the Octopus CLI when you run each step (perhaps due to firewalls and proxies) we also offer another helpful step: `Octopus tools installer`

![Octopus tools installer](/images/octopus-tools-installer.png "width=500")

This step will fallback to using an embedded version of `octo` if the selected version cannot be successfully downloaded.
