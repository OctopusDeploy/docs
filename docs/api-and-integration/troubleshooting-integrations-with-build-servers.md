---
title: Troubleshooting Integrations Between Build Servers and Octopus
description: General guide to troubleshoot integrations between build servers such as TeamCity or VSTS with Octopus Deploy
position: 140
---

Making your build server work with your deployment server is a key aspect of any successful Continuous Integration (CI) story. For this reason, at Octopus we put a lot of effort in supporting integrations with pretty much any build server technology in the market.

A key player in this story is our command line tool [Octo.exe](\docs\api-and-integration\octo.exe-command-line\index.md). This tool exposes some of the most important functionalities of Octopus through easy commands that can be included in pretty much any process. It was built using `.NET core` so it can be used in Windows, Linux and Mac environments.

If you are reading this doc, odds are you already tried to run an Octopus-related step in your build process and something didn't work the way you expected it. The goal of this document is to explain how all our integration steps work on the background so anyone can troubleshoot them on their own.

!toc

## Troubleshooting build steps created by the Octopus Deploy team{#Octopus-Steps}

### What happens when an Octopus step is executed during the build process {#Octopus-Steps-What-happens-behind}

The Octopus Deploy team supports many of the most popular integration plugins/extensions our there, like the ones for [VSTS/TFS](\docs\api-and-integration\tfs-vsts\index.md), [Teamcity](\docs\api-and-integration\teamcity.md) and [Bamboo](\docs\api-and-integration\bamboo.md). All the steps provided by these extensions/plugins are nothing but wrappers of `Octo.exe` that provide a UI with fields whose values will be passed to this command line tool during the build.

Lets take for example this TeamCity **Octopus Deploy: Create Release** step:

![](\docs\images\5672460\5672462.png)

Each of the values marked on the fields above can be seen in the `Octo.exe` call made by the build server later on:

![](\docs\images\5672460\5672463.png)

*This is a screenshot of a TeamCity log fragment edited for visual purposes. You can check the real log output in our [Shared TeamCity server](http://teamcity.octopusdeploy.com/viewLog.html?buildId=440630&buildTypeId=OctoFX_OctoFX&tab=buildLog&state=1021%2C1023#_state=1021,1023&focus=1024) by logging in as a guest. You might have to click on that link once to login, and then a second time to go to the highlighted line in the log*

The same holds true for this **Package Application** step in VSTS and its log output:

![](\docs\images\5672460\5672464.png)


![](\docs\images\5672460\5672465.png)

The bottom line is that every step will in the end call an `Octo.exe` command. For the full list of commands [check our documentation](\docs\api-and-integration\octo.exe-command-line\index.md).

### Troubleshooting the error {#Octopus-Steps-Troubleshooting-the-error}

As shown in the above screenshots, the exact `Octo.exe` command that was executed (and failed) will be printed in the logs. So the best way to troubleshoot that error would be to copy the full command, and try to run it yourself by [downloading Octo.exe to your local machine](https://octopus.com/downloads). A few tips and gotchas for this:

- If you are not familiar with `Octo.exe`, then [read our documentation about it](\docs\api-and-integration\octo.exe-command-line\index.md). Understanding how the command you are troubleshooting works will be critical for your success.

- Your build server will most likely execute the `Octo.exe` command from a build agent machine, which won't be identical to your workstation (mostly network-wise). Keep this in mind when troubleshooting your `Octo.exe`command, and if possible always try to run it from the same machine that your build server is using as build agent.

- Each version of our extension/plugin will ship with the latest version of `Octo.exe` at the moment it was created. Perhaps the version of `Octo.exe` used by your current extension version is not the latest, in which case the recommended thing to do would be to upgrade your extension to the latest version available. You can tell which version of `Octo.exe` you are using from the initial line that gets printed by the command:

```
[15:00:43][Octopus Deploy] Running command:   octo.exe create-release --server https://demo.octopusdeploy.com --apikey SECRET --project OctoFX --enableservicemessages --version 3.3.379 --deployto Dev --progress --packageversion 3.3.379 --releasenotes Release created automatically via TeamCity
[15:00:43][Octopus Deploy] Creating Octopus Deploy release
[15:00:43][Octopus Deploy] Octopus Deploy Command Line Tool, version 3.3.8+Branch.master.Sha.f8a34fc6097785d7d382ddfaa9a7f009f29bc5fb
[15:00:43][Octopus Deploy]
[15:00:43][Octopus Deploy] Build environment is NoneOrUnknown
[15:00:43][Octopus Deploy] Handshaking with Octopus Server: https://demo.octopusdeploy.com
[15:00:44][Octopus Deploy] Handshake successful. Octopus version: 3.15.8; API version: 3.0.0
```
*In this case we are using `Octo.exe` version `3.3.8` against an Octopus Server version `3.15.8`*

- If the version of `Octo.exe` that your build server is using is out of date, and you downloaded that same version and you were able to reproduce the error, try downloading the latest version available of `Octo.exe` and see if you can still reproduce it. You can [download every single version of octo.exe from Nuget](https://www.nuget.org/packages/OctopusTools/). It's possible that the bug was already fixed and we only need to ship a new version of the plugin/extension with the fixed `octo.exe`. If that's the case, then [log an issue in our forum](https://help.octopus.com) so we can take care of it.

### Last resource - Ask for help {#Octopus-Steps-Ask-for-help}

The Octopus support team will always be there to give you a hand. But do know that the first thing we'll ask you is if you read this guide and followed all the steps on it! If you did and you still couldn't find the error, then [log a ticket in our forum](https://help.octopus.com) and include:

- Version of Octopus Server you are running.
- Name and Version of the build server technology you are using.
- If you can provide the version of the extension/plugin you are using, that'll be great.
- A brief description of the error. We'll be especially interested in knowing what you were expecting from the failed step.
- A full build log that shows the `octo.exe` command.

:::warning
**Keep sensitive info safe!**
Make sure to set the ticket as **private** before attaching any kind of log, as it might contain sensitive info. If you don't know how to set it to **private**, log the ticket without that log and ask us to do it. Once it's done we'll ask you to attach the log.
:::


## Troubleshooting build steps created by non-octopus-team-members {#Custom-Steps}

If you are using a custom step/plugin/extension to hook up your Build server with Octopus, then all we can recommend you is to know your `Octo.exe` game very well.

If you are using a build server technology [that's not in our supported list](\docs\api-and-integration\index.md), then we encourage you to go to our [Uservoice page](https://octopusdeploy.uservoice.com/) and log a feature request asking us to support it. If enough users vote for it, It'll show up in our radar and we might be able to do something about it.
