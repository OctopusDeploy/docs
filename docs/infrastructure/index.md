---
title: Infrastructure
description: Configure your infrastructure so Octopus Deploy can deploy software to your Windows servers, Linux servers, Microsoft Azure, an offline package drop, or Cloud Regions.
position: 2
---

With Octopus Deploy you can deploy software to Windows servers, Linux servers, Microsoft Azure, AWS, an offline package drop, or cloud regions. These machines and services are your *deployment targets*, and because software is typically deployed to more than one machine (or deployment target) Octopus organizes your deployment targets into groups called [environments](/docs/infrastructure/environments/index.md). Typical environments are **Development**, **Test**, and **Production**.

After you've configured your environments, you can define a [lifecycle](/docs/infrastructure/lifecycles/index.md) that specifies how your software is promoted through your environments.

Your environments and deployment targets are managed from the **Infrastructure** tab of the **Octopus Web Portal**.
