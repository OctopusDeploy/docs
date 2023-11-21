---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Managing Octopus with code
description: This section describes the levels of responsibility that define how projects are managed over time.
navOrder: 3
---

There are three levels of responsibility that platform engineering teams can implement when managing downstream projects and spaces:

* Customer responsibility (eventual inconsistency)
* Shared responsibility (eventual consistency)
* Centralized responsibility (enforced consistency)

## Customer responsibility model

The customer responsibility model allows platform engineering teams to provision a space or project, but once those resources are created, the customer assumes full control. The customer is free to edit these resources as they see fit, but the platform team will not push any further updates.

This responsibility model is like providing a template PowerPoint presentation. People can copy the template and build their own presentations, but any updates to the original template are not propagated to the copies.

This is also called the eventual inconsistency model because the upstream and downstream projects and spaces are expected to drift over time.

![Customer Responsibility model](/docs/platform-engineering/customer-responsibility-model.png "width=500")

## Shared responsibility model

The shared responsibility model relies on Git based workflows to merge changes between forked Git repositories backing Config-as-Code (CaC) projects.

Because the two CaC repos are forks of each other, they share the same Git history, and processes like Git merges can be used to synchronize changes between these repositories over time.

This is also called the eventual consistency model because the upstream and downstream artifacts are expected to drift but have the option to incorporate any important changes.

![Shared Responsibility model](/docs/platform-engineering/shared-responsibility-model.png "width=500")

## Centralized responsibility model

The centralized responsibility model provides mostly read-only projects and spaces to customers. Customers can create and deploy releases, but are restricted from editing any settings.

This model makes it easy to push out new changes because the platform team knows the state of all the downstream resources.

This is also called the enforced consistency model because customers have little ability to edit projects or spaces.

![Shared Responsibility model](/docs/platform-engineering/central-responsibility-model.png "width=500")

## Further reading

The chapter "Platform Engineering Responsibility Models" from the book [DevEx as a Service with Platform Engineering](https://github.com/OctopusSolutionsEngineering/PlatformEngineeringBook/) discusses the responsibility models in greater detail, with recommendations on when to use one model over another, and the advantages and disadvantages of each.