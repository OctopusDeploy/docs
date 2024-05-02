---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-05-01
title: Canary deployments
description: Implementing canary deployments, i.e. rolling out releases to a subset of users or servers, with Octopus.
navOrder: 50
---

Canary deployments are a pattern for rolling out releases to a subset of users or servers. The idea is to first deploy the change to a small subset of servers, test it, and then roll the change out to the rest of the servers. The canary deployment serves as an early warning indicator with less impact on downtime: if the canary deployment fails, the rest of the servers aren't impacted.

> Canaries were once regularly used in [coal mining](http://en.wikipedia.org/wiki/Coal_mining "Coal mining") as an early warning system. [Toxic](http://en.wikipedia.org/wiki/Toxic "Toxic") [gases](http://en.wikipedia.org/wiki/Gas "Gas") such as [carbon monoxide](http://en.wikipedia.org/wiki/Carbon_monoxide "Carbon monoxide"), [methane](http://en.wikipedia.org/wiki/Methane "Methane") or [carbon dioxide](http://en.wikipedia.org/wiki/Carbon_dioxide "Carbon dioxide") in the mine would kill the bird before affecting the miners. Signs of distress from the bird indicated to the miners that conditions were unsafe. The use of miners' canaries in [British](http://en.wikipedia.org/wiki/Great_Britain "Great Britain") mines was phased out in 1987.
>
> - [Wikipedia](http://en.wikipedia.org/wiki/Domestic_Canary#Miner.27s_canary)

As an example, imagine an environment that has four web servers. Rather than simply deploying to all deployment targets in the environment, a canary deployment would look like this:

:::figure
![](/docs/deployments/patterns/images/3278255.png)
:::

The basic steps of a canary deployment are:

1. Deploy to one or more canary servers.
2. Test, or wait until satisfied.
3. Deploy to the remaining servers.

The test phase of the canary deployment can work in many ways. You could run some automated tests, perform manual testing yourself, or even leave the server live and wait to see if problems are encountered by end users. In fact, all three of these approaches might be used. Depending on how you plan to test, you might decide to remove the canary server from the production load balancer and return it only when rolling out the change to the rest of the servers.

:::div{.hint}
**Similar to staging**
Canary deployments are similar to using a staging environment. The difference is that staging environments are usually dedicated to the task; a staging web server doesn't become a production server. By contrast, in a canary deployment, the canary server remains part of the production fleet when the deployment is complete. Canary deployments may be worth considering if you do not have the resources to have a dedicated staging environment.
:::

## Canary deployments in Octopus {#canary-deployments-in-octopus}

There are two ways to implement canary deployments in Octopus. The first, and simplest, is to use the "Deploy to a subset of deployment targets" feature when deploying the release. This allows you to limit which deployment targets to deploy to.

First, you would deploy using just the canary servers, then after testing, you can deploy again using the remaining servers. This approach works well if you have a small number of servers and don't deploy to production too frequently.

The alternative approach is to build canary deployments into your deployment process.

1. Deploy the package to the canary server (one or more deployment targets may be associated with the *canary* [target tag](/docs/infrastructure/deployment-targets/#target-roles)).
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