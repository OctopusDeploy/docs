---
title: Key Concepts
description: Key concepts to understanding how Octopus Deploy works.
position: 2
---

## Environments, machines and roles {#KeyConcepts-Environments,machinesandroles}

Before you can deploy software, you need somewhere to deploy it *to*. Any non-trivial application is likely to run on more than one server - you might have Windows Services that run on application servers, or ASP.NET applications that run under IIS on web servers. 


![](/docs/images/3048100/3277804.png "width=500")



## Projects, deployment processes, lifecycles and variables {#KeyConcepts-Projects,deploymentprocesses,lifecyclesandvariables}

A *project* is one of the most important concepts in Octopus. A project defines:

- A *[deployment process](/docs/deploying-applications/index.md)*, which specifies the steps that need to happen in a given order during the deployment
- *[Variables](/docs/deploying-applications/variables/index.md)*, which allow deployments to be parameterized across environments

![](/docs/images/3048100/3277800.png "width=500")

A project in Octopus can consist of many deliverable components (e.g., web sites, Windows services). It's usually helpful to think of Octopus projects in terms of business projects: if you have 5 developers working together on the "HR Portal rewrite" project, than that's probably a single project in Octopus.

:::success
**Tip**
Don't confuse Octopus projects with Visual Studio projects. A project in Octopus is more likely to map to an entire Visual Studio solution.
:::

The deployment process consists of a number of steps. Octopus supports many different kinds of steps, such as:

- [Deploying NuGet packages](/docs/deploying-applications/deploying-packages/index.md) (this is how web sites and windows services are [packaged](/docs/packaging-applications/index.md) and deployed)
- Running ad-hoc [Custom scripts](/docs/deploying-applications/custom-scripts/index.md)
- [Sending an email](/docs/deploying-applications/email-notifications.md)
- Pausing for [manual intervention](/docs/deploying-applications/manual-intervention-and-approvals.md) by a human

Importantly, steps are run in a specific order, like following a recipe. It would be dreadful if we tried to deploy a new version of a web site before running the database migrations, as an example. Steps can also be set to run [conditionally](/docs/deploying-applications/index.md), as part of a [rolling deployment](/docs/patterns/rolling-deployments.md), or even in parallel with each other.

When you define a project, you also select a [lifecycle](/docs/key-concepts/lifecycles.md). The lifecycle defines the rules around how releases of the project are allowed to be deployed between environments.

