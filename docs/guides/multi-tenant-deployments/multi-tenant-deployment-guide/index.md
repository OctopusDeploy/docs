---
title: Multi-tenant deployment guide
position: 0
---


This guide will introduce you to multi-tenant deployments in Octopus, starting with simple scenarios, then incorporating more complex capabilities over time.

:::hint
Multi-tenant deployments are an advanced pattern, and this guide assumes you are already familiar with Octopus concepts like [projects](/docs/home/key-concepts/projects.md), [environments](/docs/home/key-concepts/environments.md), [lifecycles](/docs/home/key-concepts/lifecycles.md), [variables](/docs/home/deploying-applications/variables.md) and [deploying applications](/docs/home/deploying-applications.md).
:::

:::hint
**Why use people in the samples? My tenants are businesses.**
Generally your customers will be other businesses instead of individual people. We used people in the samples for this guide because it's much easier to find anonymous sample data, like the one we used at [http://api.randomuser.me](http://api.randomuser.me) (#kudos), not to mention copyright infringements and the like! The sample data might be fake, but the scenarios are real, and we hope you find this guide really useful!
:::

## In this guide


- [Creating your first tenant](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-tenant.md)
- [Creating your first multi-tenant project](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-multi-tenant-project.md)
- [Deploying a simple multi-tenant project](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md)
- [Working with tenant-specific variables](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-tenant-specific-variables.md)
- [Working with groups of tenants using tags](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-groups-of-tenants-using-tags.md)
- [Designing a multi-tenant hosting model](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md)
- [Designing a multi-tenant upgrade process](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md)
- [Multi-tenant roles and security](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/multi-tenant-roles-and-security.md)

:::success
Want to skip to the end of the guide and play with a fully-fledged sample? Here is a tool that will build up an entire multi-tenant scenario in your Octopus Server using the API with as many projects and tenants you would like.


Download: [Octopus.Sampler.3.4.0-beta.2.zip](/docs/attachments/Octopus.Sampler.3.4.0-beta.2.zip)


![](/docs/images/5669310/5865696.png)
:::
