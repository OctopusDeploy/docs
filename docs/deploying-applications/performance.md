---
title: Performance
description: Octopus is all about reliable and repeatable deployments, but that doesn't mean it has to be slow. This page will help you tune your deployments for the best performance in your scenario.
position: 1000
---

Over the years we have built Octopus to enable reliable and repeatable deployments, but that doesn't necessarily mean it has to be slow. In fact, Octopus can scale with you as you grow. Octopus is a complex system with a core component allowing you to run your own custom scripts. We work hard to ensure all the parts we control work quickly and efficiently leaving as many resources as possible for running your deployments. That being said, there are many things you can do to ensure your Octopus deployments execute efficiently.

This page is intended to help you tune and maintain your deployment processes and troubleshoot problems as they occur.

:::hint
Want to tune your Octopus Server for optimum performance? Read our [detailed guide](/docs/administration/performance.md).
:::

## Key considerations

By the time your deployment starts, the Octopus API and database are no longer the bottleneck. The key concerns are now:

- The throughput and reliability of the connection from Octopus Server to your deployment targets
- The speed and reliability of your deployment targets themselves
- The number of steps in your deployment process
- The size and number of packages you are deploying
- How your packages are acquired/transferred to your deployment targets
- How many deployment targets you deploy to in parallel
- Whether your steps run serially (one-after-the-other) or in parallel (at the same time)
- The amount and size of log messages you write during deployment
- The number and size of your variables
- Other processes on the deployment target interfering with your deployment

## Tips

We don't offer a one-size-fits-all approach to optimizing your deployments using Octopus: every deployment scenario is unique. Instead we recommend taking an experimental approach to optimization: measure-then-cut. Record your deployments, make an adjustment, then measure again, etc. These tips should give you enough information to get started.

### Optimize the connection to your deployment targets {#optimize-connection-to-targets}

If you have a reliable, high throughput connection between your Octopus Server and deployment targets, your deployments can go fast. Unfortunately the opposite is also true:

- Low throughput connections make package acquisition and deployment orchestration slow.
- An unreliable connection can make deployments slow through dropped connections and unnecessary retries.

A reliable connection to your deployment targets is the foundation of reliable and fast deployments. If bandwidth/throughput is genuinely an invariant, you may want to consider a way of acquiring your packages prior to the deployment starting, leaving the bandwidth available for deployment orchestration.

### Optimize your deployment targets {#optimize-targets}

Fast and reliable deployment targets are also a foundation for fast and reliable deployments. This is one area where every deployment is different, but the key considerations are similar:

- If your deployment does a lot of work on the disk(s) make sure your disks have sufficient throughput/IOPS
- If your deployment does a lot of work in the CPU make sure your CPU has enough throughput/cores
- If your deployment does anything, make sure your deployment target isn't already saturated running your applications, or choose a time of lower usage

:::hint
If a particular operation seems slow during deployment, test that single operation on your deployment target without Octopus in the mix. Octopus adds as little overhead as possible to your deployments, so there's a good chance that operation is slow because of some kind of bottleneck on the deployment target itself.
:::

### Optimize the size of your deployment process {#optimize-size-of-process}

By their very nature, each step in your deployment process comes with an overhead. On one hand a deployment process with more steps can be easier to understand at a high level, and easier to manage over time. On the other hand, more steps results in more system variables, more communication overhead, more startup/teardown cost, and more contention on Octopus Server resources.

A deployment process with a single giant step might be the most efficient approach in your scenario. Imagine a single complex step which deploys all the required packages, running a single hand-crafted script to complete your deployment all in one hit. This approach would eliminate a lot of the costs we discussed earlier, but at the cost of making your deployment process harder to understand and maintain over time.

There is typically a happy balance you can strike for each of your projects. The most common problem related to performance is having too many steps, where "too many" depends on your specific situation, but we typically consider an average project to use 10-20 steps, and we have many customers deploying projects with 50-80 steps. If your projects have hundreds of steps, perhaps you should consider modelling your deployments differently?

- If your project could be broken down into logical components which ship on their own cadence, do it! Make each component its own project.
- If your project could be broken down into logical components which ship at the same time, you can do that too! Consider breaking your deployment into multiple logical projects and [coordinate their deployments](/docs/guides/coordinating-multiple-projects/index.md).
- If your project cannot be broken down logically, consider combining some of your steps together into a single step. For example, you may be able to run your [custom scripts](/docs/deploying-applications/custom-scripts/index.md) as a pre- or post- activity.

**More tips coming soon!**