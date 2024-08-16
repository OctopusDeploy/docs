---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-13
title: Canary deployments
description: Implementing canary deployments, i.e. rolling out releases to a subset of users or servers, with Octopus.
navOrder: 50
---

There are two ways to implement [canary deployments](https://octopus.com/devops/software-deployments/canary-deployment/) in Octopus. The first, and simplest, is to use the "Deploy to a subset of deployment targets" feature when deploying the release. This allows you to limit which deployment targets to deploy to.

First, you would deploy using just the canary servers, then after testing, you can deploy again using the remaining servers. This approach works well if you have a small number of servers and don't deploy to production too frequently.

The alternative approach is to build canary deployments into your deployment process.

1. Deploy the package to the canary server (one or more deployment targets may be associated with the *canary* [target tag](/docs/infrastructure/deployment-targets/target-tags)).
2. Have a [manual intervention](/docs/projects/built-in-step-templates/manual-intervention-and-approvals) step to wait until we are satisfied.
3. Deploy the package to the remaining deployment targets (the *web-server* target tag).

Note that the first two steps have been configured to only run for production deployments - in our pre-production environments, we can just deploy to all targets immediately. If we were performing fully automated tests, we could use a [PowerShell script step](/docs/deployments/custom-scripts) to invoke them rather than the manual intervention step.

A final variation is to set up a dedicated "Canary" environment to deploy to. The environment can contain a canary deployment target, with the same deployment target also belonging to the production environment.

:::div{.hint}
**Canary users**
Another variation of the canary deployment is to deploy the new version to all servers, but to selectively show the features to users, slowly increasing the number of users who experience the new features. Implementing such a system usually involves [feature toggles](http://martinfowler.com/bliki/FeatureToggle.html) and designing your application to work this way; it's really outside of the scope of a tool like Octopus.
:::

## Learn more

- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns).