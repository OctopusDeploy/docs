---
title: Built-in Worker
description: The built-in worker is enabled by default in your Octopus Server. This is very convenient when getting started with Octopus, but comes with several security implications.
position: 55
---

Octopus Server comes with a built-in worker which enables you to conveniently run parts of your deployment process on the Octopus Server without the need to install a Tentacle or other deployment target. This is very convenient when you are getting started with Octopus Deploy, but it does come with several security implications.

## Default Configuration

By default Octopus Server runs as the highly privileged `Local System` account on Windows. We typically recommend running Octopus Server as a different account, either a User or Managed Service Account (MSA), so you can grant specific privileges to that account.

When you first install Octopus Server the built-in worker is configured to run using the **same user account as the Octopus Server itself**. This means your deployment process can do the same things the Octopus Server can do.

## Secure Configuration

We highly recommend running the built-in worker in a different, lower privileged, security context. Alternatively you can disable the built-in worker and delegate that work to an external worker perhaps on another server or in an entirely different network zone.

Learn about [workers](/docs/administration/workers/index.md) and the different options you have for securing them.
