---
title: Project Triggers
position: 3
---


Project Triggers allow you to define an unattended behavior for your [Projects](/docs/home/key-concepts/projects.md).

:::hint
Project Triggers were introduced in Octopus Deploy 3.4
:::

:::success
We have written a [comprehensive guide](/docs/home/guides/elastic-and-transient-environments.md) about using Project Triggers (specifically [Automatic Deployment Triggers](/docs/home/deploying-applications/automatic-deployment-triggers.md)) with a focus on deploying to elastic and transient environments.
:::


Project Triggers allow you to choose from a subset of **events** that can occur in Octopus Deploy, apply a **filter** to those events, and decide on an **action** you want performed once the trigger fires. The example below shows an [Automatic Deployment Trigger](/docs/home/deploying-applications/automatic-deployment-triggers.md) configured to fire when a [Deployment Target](/docs/home/deployment-targets.md) with the [Machine Role](/docs/home/key-concepts/machine-roles.md) **web-server** belonging to the **Production**[Environment](/docs/home/key-concepts/environments.md) becomes available.


![](/docs/images/5671189/5865830.png)

## What kinds of Project Triggers are available?


[Automatic Deployment Triggers](/docs/home/deploying-applications/automatic-deployment-triggers.md) are the first kind of Project Trigger available in Octopus Deploy, and at the time of writing, the only kind. We think this concept could also extend to other automated actions like these:

- Automatically create a [Release](/docs/home/key-concepts/projects/releases.md) when packages are pushed to a repository (think of a more intelligent version of [Automatic Release Creation](/docs/home/deploying-applications/automatic-release-creation.md))
- Automatically deploy a [Release](/docs/home/key-concepts/projects/releases.md) to a particular [Environment](/docs/home/key-concepts/environments.md) when the Release is created
- Automatically deploy the current [Release](/docs/home/key-concepts/projects/releases.md) to a [Tenant](/docs/home/key-concepts/tenants.md) when they are [connected to a Project and Environment](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md)



Get in touch and let us know what you think of these ideas!
