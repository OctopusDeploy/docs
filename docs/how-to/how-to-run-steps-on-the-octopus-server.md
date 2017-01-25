---
title: How to run steps on the Octopus Server
position: 21
---

When adding a [NuGet Package step](/docs/deploying-applications/deploying-packages/index.md) or [Script step](/docs/deploying-applications/custom-scripts/index.md), Octopus will expect you to choose a Tentacle that the step will run on. However, sometimes you might not want to run the step on another machine, and instead wish to run it on the central Octopus Server. This guide explains how you can accomplish this.

:::hint
Octopus 3.3 and newer support [Running Scripts on the Octopus Server](/docs/deploying-applications/custom-scripts/index.md).
:::

## Step-by-step guide {#HowtorunstepsontheOctopusServer-Step-by-stepguide}

Follow these steps to install a Tentacle on the Octopus Server.

1. Follow the steps on [installing Tentacles](/docs/installation/installing-tentacles/index.md) to download the Tentacle MSI and install it on the Octopus Server.
2. Configure the Tentacle in [listening mode](/docs/installation/installing-tentacles/listening-tentacles.md), and register it so that it appears in your [Environments](/docs/key-concepts/environments/index.md) tab.
3. Assign the machine to all of your applicable environments, and give it a role like `octopus-server`:

![](/docs/images/3702872/3964962.png "width=500")
4. When configuring your step, you can now choose the `octopus-server` role as your target:

![](/docs/images/3702872/3964961.png "width=500")

## Why do I have to install Tentacle?  {#HowtorunstepsontheOctopusServer-WhydoIhavetoinstallTentacle?}

Octopus Tentacle enable tasks to be run in a flexible way.  You can configure your Tentacle service to run under a different user account, for example. In fact, you could have one [Tentacle instance](/docs/administration/managing-multiple-instances.md) for your pre-production steps, and another for production steps, running under different user

An analogy is to think about the way build agents in TeamCity or TFS work. You can't make the TeamCity server or TFS server arbitrarily run scripts during the build. But you can install the build agent service on the same server as your TeamCity/TFS server, and it has the same effect, but with more flexibility.
