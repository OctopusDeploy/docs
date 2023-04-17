---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Environments
description: Environments are how you group your deployment targets so you can promote your software through different phases, for instance, into Development, then Test, and finally into Production.
navOrder: 20
---

!include <environments>

## Environment configuration

Since environments are the phases that you move your code through, they form the backbone of your deployment pipeline. Before you configure anything else, you should configure your environments.

The most common setup is four environments. These are:

1. **Development** or **Dev** for short, is for developers to experiment on. It's generally in flux, and can often be expected to be unavailable.
1. **Test/QA** - Quality assurance teams test functionality in the Test environment.
1. **Staging/Pre-Production** - Staging is used as a final sanity check before deploying to Production.
1. **Production** is where your end users normally use your software outside of testing.

However, we didn't design Octopus Deploy to force people to use a set of predefined environments. Some companies only have three environments. Others have many more. Likewise, not everyone names their environments the same way. One person's Test is another person's QA. It's important that you can name your environments in the way that best supports your organization's needs.

Take a look at our [environment recommendations](/docs/infrastructure/environments/environment-recommendations/) section for more tips.

!include <add-new-environments>

## Edit your environments

To edit individual environments, click the overflow menu (...) for that environment. From here, it is possible to edit the environment, description, change the [guided failure mode](#guided-failure-mode), enable or disable [dynamic infrastructure](/docs/infrastructure/deployment-targets/dynamic-infrastructure/), or delete the environment.

## Environment permissions

You can control who has access to view, edit, and deploy to environments by assigning users to Teams and assigning roles to those teams. For more information, see the section on [managing users and teams](/docs/security/users-and-teams/).

## Manage your environments

If you're working with a large number of environments and deployment targets, the **Environments** page makes it easy to sort, filter, and view your environments and the deployment targets that belong to each environment.

## Sort your environments

Click the overflow menu (...) on the environments sections to reveal the **reorder** menu and access a drag and drop pane to sort your environments.

The order that environments are shown in the environments tab also affects:

- The order that they are shown in the Dashboard.
- The order that they are listed when choosing which environment to deploy a release to.

It's a good idea to put your least production-like environments first, and the most production-like environments last.

## Use advanced filters

You can use advanced filters to search your environments by clicking on **SHOW ADVANCED FILTERS** from the environment page.

This will let you search by:

- Name
- Deployment target
- Environment
- Target Roles
- Health Status
- Communication style

## Learn more

Learn how to add and manage your [deployment targets](/docs/infrastructure/deployment-targets/).
