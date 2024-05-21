---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-05-01
title: Deploying packages to your Octopus Server
description: How to deploy packages to your Octopus Server.
---

If you want to deploy a package on your Octopus Server, you should [install a Tentacle on your Octopus Server](#install-tentacle) and treat it just like any other deployment target.

Tentacle lets you run tasks in a flexible way. You can configure your Tentacle service to run under a different user account, for example. In fact, you could have one [Tentacle instance](/docs/administration/managing-infrastructure/managing-multiple-instances) for your pre-production steps, and another for production steps, running under different user, all on the same machine.

An analogy is to think about the way build agents in TeamCity or TFS work. You can't make the TeamCity server or TFS server arbitrarily run scripts during the build. But you can install the build agent service on the same server as your TeamCity/TFS server, and it has the same effect, but with more flexibility.

## Install Tentacle on the Octopus Server {#install-tentacle}

1. Follow the steps to download and [install Tentacles](/docs/infrastructure/deployment-targets/tentacle/windows) on the Octopus Server.
2. Configure the Tentacle in [listening mode](/docs/infrastructure/deployment-targets/tentacle/windows/#configure-a-listening-tentacle-recommended).
3. Register the Tentacle so that it appears in your [Environments](/docs/infrastructure/environments) tab.
4. Assign the machine to all of your applicable environments, and give it a [target tag](/docs/infrastructure/deployment-targets/#target-roles) like `octopus-server`.
5. When configuring your step, you can now choose `octopus-server` as your target tag.
