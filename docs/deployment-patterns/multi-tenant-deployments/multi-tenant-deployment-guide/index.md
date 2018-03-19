---
title: Multi-tenant deployment guide
description: Introduce multi-tenant deployments in Octopus, starting with simple scenarios, then incorporating more complex capabilities over time.
position: 0
---

This guide will introduce you to multi-tenant deployments in Octopus, starting with simple scenarios, then incorporating more complex capabilities over time.

:::hint
Multi-tenant deployments are an advanced pattern, and this guide assumes you are already familiar with Octopus concepts like [projects](/docs/deployment-process/projects.md), [environments](/docs/infrastructure/environments/index.md), [lifecycles](/docs/deployment-process/lifecycles/index.md), [variables](/docs/deployment-process/variables/index.md) and [deploying applications](/docs/deploying-applications/index.md).
:::

:::hint
**Why use people in the samples? My tenants are businesses.**
Generally your customers will be other businesses instead of individual people. We used people in the samples for this guide because it's much easier to find anonymous sample data, like the one we used at [http://api.randomuser.me](http://api.randomuser.me) (#kudos), not to mention copyright infringements and the like! The sample data might be fake, but the scenarios are real, and we hope you find this guide really useful!
:::

:::success
Want to skip to the end of the guide and play with a fully-fledged sample? Here is a tool that will build up an entire multi-tenant scenario in your Octopus Server using the API with as many projects and tenants you would like.

Download: [Octopus.Sampler.1.0.0.zip](https://github.com/OctopusDeploy/Sampler/releases/tag/1.0.0)

![](sampler.png "width=500")
:::
