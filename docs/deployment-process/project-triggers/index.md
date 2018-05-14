---
title: Project Triggers
description: Project Triggers allow you to define unattended behavior for your project such as automatically deploying a release to an environment.
position: 30
---

Project Triggers allow you to define an unattended behavior for your [Projects](/docs/deployment-process/projects/index.md).

Project Triggers allow you to choose from a subset of **events** that can occur in Octopus Deploy, apply a **filter** to those events, and decide on an **action** you want performed once the trigger fires. The example below shows an Automatic Deployment Trigger configured to fire when a [Deployment Target](/docs/infrastructure/index.md) that belongs to the **Production** [Environment](/docs/infrastructure/environments/index.md) becomes available, and has the **web-server** [Target Role](/docs/infrastructure/target-roles/index.md).

![](/docs/images/5671189/5865830.png "width=500")

:::success
We have written a [comprehensive guide](/docs/deployment-patterns/elastic-and-transient-environments/index.md) about using Project Triggers with a focus on deploying to elastic and transient environments.
:::
