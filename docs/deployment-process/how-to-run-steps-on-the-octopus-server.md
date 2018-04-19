---
title: How to Run Steps on the Octopus Server
description: How to run steps directly on the Octopus Server in scenarios where they don't need to be run on a deployment target.
position: 21
---

You can [run scripts](/docs/deploying-applications/custom-scripts/index.md) on the Octopus Server with the same user context as the Octopus Server.

When adding a [NuGet Package step](/docs/deployment-process/deploying-packages/index.md) or [Script step](/docs/deploying-applications/custom-scripts/index.md), Octopus will expect you to choose a Tentacle that the step will run on. However, sometimes you might not want to run the step on another machine, and instead wish to run it on the central Octopus Server. To do this, you need to install Tentacle on the Octopus server.

## Install Tentacle on the Octopus Server

1. Follow the steps to [install Tentacles](/docs/infrastructure/windows-targets/index.md) to download the Tentacle MSI and install it on the Octopus Server.
2. Configure the Tentacle in [listening mode](/docs/infrastructure/windows-targets/listening-tentacles/index.md) and register it so that it appears in your [Environments](/docs/infrastructure/environments/index.md) tab.
3. Assign the machine to all of your applicable environments, and give it a role like `octopus-server`.
4. When configuring your step, you can now choose the `octopus-server` role as your target role.

Tentacle let's you run tasks in a flexible way.  You can configure your Tentacle service to run under a different user account, for example. In fact, you could have one [Tentacle instance](/docs/administration/managing-multiple-instances.md) for your pre-production steps, and another for production steps, running under different user.

An analogy is to think about the way build agents in TeamCity or TFS work. You can't make the TeamCity server or TFS server arbitrarily run scripts during the build. But you can install the build agent service on the same server as your TeamCity/TFS server, and it has the same effect, but with more flexibility.
