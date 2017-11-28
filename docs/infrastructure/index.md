---
title: Infrastructure 
description: Configure your infrastructure so Octopus Deploy can deploy software to your Windows servers, Linux servers, Microsoft Azure, an offline package drop, or Cloud Regions.
hideInThisSection: true
position: 3
---

With Octopus Deploy you can deploy software to Windows servers, Linux servers, Microsoft Azure, or even an offline package drop. These machines and services are your *deployment targets*, and because software is typically deployed to more than one machine (or deployment target) Octopus organizes your deployment targets into groups called *environments*. Typical environments are **Test**, **Stage**, and **Production**. 

Grouping your deployment targets by environment lets you define your deployment processes (no matter how many machines are involved) and have Octopus deploy the right versions of your software to the right environments at the right time.

Learn how to define your [environments](/docs/infrastructure/environments/index.md) and configure your deployment targets:
* [Windows Targets](/docs/infrastructure/windows-targets/index.md)
* [Linux and Unix Targets](/docs/infrastructure/ssh-targets/index.md)
* [Microsoft Azure](/docs/infrastructure/azure/index.md)
* [Offline Package Drops](/docs/infrastructure/offline-package-drop.md)
* [Cloud Regions](/docs/infrastructure/cloud-regions.md)
