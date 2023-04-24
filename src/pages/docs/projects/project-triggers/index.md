---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Project triggers
description: Project Triggers allow you to define unattended behavior for your project such as automatically deploying a release to an environment.
navOrder: 90
---

Project triggers allow you to define an unattended behavior for your [Projects](/docs/projects).

Project triggers allow you to choose from a subset of **events** that can occur in Octopus Deploy, apply a **filter** to those events, and decide on an **action** you want performed once the trigger fires. The example below shows an automatic deployment trigger configured to fire when a [deployment target](/docs/infrastructure/) that belongs to the **Production** [environment](/docs/infrastructure/environments) becomes available, and has the **web-server** [target role](/docs/infrastructure/deployment-targets/#target-roles).

![](/docs/projects/project-triggers/images/octopus-triggers-diagram.png "width=500")

:::div{.success}
We have written a [comprehensive guide](/docs/deployments/patterns/elastic-and-transient-environments) about using project triggers with a focus on deploying to elastic and transient environments.
:::
