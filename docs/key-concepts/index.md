---
title: Key Concepts
description: Key concepts to understanding how Octopus Deploy works.
position: 2
---

Words like "release" and "deployment" are no doubt terms that you've used in your organisation prior to using Octopus Deploy. Perhaps you use them interchangeably, or perhaps they have well defined meanings. As you begin to use and master Octopus, there's some potential for confusion - the concept of a Release as implemented in Octopus might be very different to the concept of a Release currently in use in your organization. This page provides a high-level overview of the various concepts that exist in Octopus, to help to eliminate that confusion.

## How to think like an Octopus {#KeyConcepts-HowtothinklikeanOctopus}

Like all software, Octopus is designed around model of a specific problem domain - in our case, the domain of deployment automation. In order to truly understand how Octopus works and how to get the best use out of it, it's helpful to take the time to understand our model and some of the terms that we use. It's helpful to think like an Octopus!

:::success
**Domain driven design**
If you are a fan of [Domain Driven Design](http://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215), think of this page as an outline of our domain model or Ubiquitous Language.
:::

## Environments, machines and roles {#KeyConcepts-Environments,machinesandroles}

Before you can deploy software, you need somewhere to deploy it *to*. Any non-trivial application is likely to run on more than one server - you might have Windows Services that run on application servers, or ASP.NET applications that run under IIS on web servers. Each of these servers, whether physical or virtual machines, would be a *machine* within Octopus. A group of these machines that are deployed to at the same time is called an *environment*. An environment is made up of multiple *machines*, and each machine is tagged with a set of *roles*.

![](/docs/images/3048100/3277804.png "width=500")

In production, your web sites and Windows Services might run on different physical servers - perhaps dozens of them. However, unless you are extremely lucky, it's unlikely that you have the budget to have an equal number of servers in any of your pre-production environments. When testing your software in a test environment, you might only have a single virtual machine which will run all of the web sites and services on the same machine.

Octopus handles these differences by introducing a layer of indirection: roles. Instead of saying:

> The trading website ASP.NET application should be deployed to PWEB01, PWEB02, ...

We say:

> The trading website ASP.NET application should be deployed to machines that are tagged with the **web-server** role.

In production, perhaps you have 10 machines with the web-server role. In staging, perhaps you have only 4. In test, perhaps there is a single machine. Roles make defining your deployment process much easier.

You can define as many roles, environments and machines as you like - it all depends on how your application is deployed. Throughout our documentation, you'll see us using Development, Test, Staging and Production environments, and *web-server* and *app-server* roles, as examples, but your Octopus configuration is likely to be very different. "Production" to you might consist of multiple environments which are actually in different data centres (for example, in London, New York and Tokyo) and deployed to at different times.

Machines can also belong to more than one environment, although this is not very common.

![](/docs/images/3048100/3277803.png "width=500")

:::success
**More information**
That is a summary of how Octopus models environments and machines, and what the terms mean. To actually deploy software to the remote machines, Octopus relies on agent software called Tentacle. You can read more about [installing Tentacle](/docs/installation/installing-tentacles/index.md) and [managing environments](/docs/key-concepts/environments/index.md).
:::

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

## Releases and deployments {#KeyConcepts-Releasesanddeployments}

The deployment process for a project specifies how the project will be deployed. But Octopus isn't designed to deploy something just once; it's designed to deploy the same project over, and over, and over, and over. It's designed for teams that follow agile software development methods, continuously deploying software to environments, getting feedback, making changes, and then deploying again.

We expect that beyond the initial setup and tweaking, your deployment process won't change between all of these deployments. But of course, the software that you are deploying will. You will make changes to code, commit them to source control, and have a [build server](/docs/api-and-integration/index.md) build them and run tests. Then the software will be [packaged](/docs/packaging-applications/index.md) and ready for deployment.

In Octopus, a release is a snapshot of the *deployment process*and*variables,* with a set of *packages* selected. That *release* is then *deployed* to multiple environments, typically to one, then promoted to the next environment if successful.

![](/docs/images/3048100/3277799.png "width=500")

Each time you have a new candidate build that is ready to test, you'll create a *release*. When you apply a release to an environment, that is a *deployment*.

## Channels {#KeyConcepts-Channels}

When you start working with Octopus you will typically be creating releases from your main source code branch that are considered to be release candidates for your final production environment. Over time you may find you want to start working on an experimental branch of code, perhaps to introduce a new feature, or an entirely new version of your software. In this case you can either create an entirely new project, or clone the existing project, to manage deployments of this experimental software - but that leads to a lot of possible duplication and rework. In Octopus 3.2 we introduced the concept of [*channels* ](/docs/key-concepts/projects/channels.md)which let you modify the entire deployment process on a per-release basis, all within the same project. For example, you can promote releases created from your main code branch through to your production environment, but restrict releases created from your experimental feature branch to a special test environment perhaps with extra steps and variables.

## Tenants {#KeyConcepts-Tenants}

Over time your software may become so successful that you on-sell it to some external customers, and due to the way the software is architected, you need to deploy a copy of the software once per customer. You could achieve this in Octopus by creating an environment-per-customer, or even a project-per-customer, but this leads to duplication and unnecessary complexity. In Octopus 3.4 we introduced the concept of [*tenants* ](/docs/key-concepts/tenants/index.md)that you can manage alongside your existing projects and environments.
