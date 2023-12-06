---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Performance
description: Octopus is all about reliable and repeatable deployments, but that doesn't mean it has to be slow. This page will help you tune your deployments for the best performance in your scenario.
navOrder: 20
---

We've built Octopus to enable reliable and repeatable deployments, but that doesn’t mean it has to be slow. Octopus can scale with you as you grow. Octopus is a complex system with a core component allowing you to run your own custom scripts. We work hard to ensure that all the parts we control work efficiently, leaving as many resources as possible to run your deployments. That being said, there are many things you can do to ensure your Octopus deployments run quickly.

This page is intended to help you tune and maintain your deployment processes and troubleshoot problems as they occur.

:::div{.hint}
Want to tune your Octopus Server for optimum performance? Read our [detailed guide on optimizing your server](/docs/administration/managing-infrastructure/performance).
:::

## Considerations

By the time your deployment starts, the Octopus HTTP API and database are no longer the bottleneck. The key concerns are now:

- The throughput and reliability of the connection from Octopus Server to your deployment targets.
- The speed and reliability of your deployment targets.
- The load your deployment targets are under while the deployment is taking place.
- The number of steps in your deployment process.
- The size and number of packages you are deploying.
- How your packages are acquired/transferred to your deployment targets.
- How many packages you keep in your package feed and how you configure retention policies.
- The amount and size of log messages you write during deployment.
- How many deployment targets acquire packages in parallel.
- How many deployment targets you deploy to in parallel.
- Whether your steps run serially (one-after-the-other) or in parallel (at the same time).
- How much of the work in the deployment steps is done on the Octopus Server.
- The number and size of your variables.
- Other processes on the deployment target interfering with your deployment.

## Tips

We don't offer a one-size-fits-all approach to optimizing your deployments using Octopus; every deployment scenario is unique. Instead we recommend taking an experimental approach to optimization: measure-then-cut. Record your deployments, make an adjustment, then measure again, etc. These tips should give you enough information to get started.

### Optimize the connection to your deployment targets {#optimize-connection-to-targets}

If you have a reliable, high throughput connection between your Octopus Server and deployment targets, your deployments can go fast. Unfortunately, the opposite is also true:

- Low throughput connections make package acquisition and deployment orchestration slow.
- An unreliable connection can make deployments slow through dropped connections and unnecessary retries.

A reliable connection to your deployment targets is the foundation of reliable and fast deployments. If bandwidth/throughput is genuinely an invariant, you may want to consider a way of acquiring your packages prior to the deployment starting, leaving the bandwidth available for deployment orchestration.

### Optimize your deployment targets {#optimize-targets}

Fast and reliable deployment targets are also a foundation for fast and reliable deployments. This is one area where every deployment is different, but the key considerations are similar:

- If your deployment does a lot of work on the disk(s), make sure your disks have sufficient throughput/IOPS.
- If your deployment does a lot of work in the CPU, make sure your CPU has enough throughput/cores.
- If your deployment does anything, make sure your deployment target isn't already saturated running your applications, or choose a time of lower usage.

:::div{.hint}
If a particular operation seems slow during deployment, test that single operation on your deployment target without Octopus in the mix. Octopus adds as little overhead as possible to your deployments, so there's a good chance that operation is slow because of some kind of bottleneck on the deployment target itself.
:::

### Reduce load on your deployment targets during deployment {#reduce-target-load}

If the applications running on your deployment targets are busy, this will slow down your deployment. Similarly, when you run a deployment it will be taking resources from your running applications. Octopus does not perform any kind of throttling on the deployment target - it will attempt to run your deployment process on your targets as fast as possible.

One of the best ways to reduce load on your deployment targets is to temporarily remove them from the active pool of servers. For example, with web applications you can do this by removing the server from your load balancer, perhaps using a [rolling deployment](/docs/deployments/patterns/rolling-deployments).

If you don't want to take this kind of approach, you can safely deploy your application to an active server, but you should take some time to understand the impact this has on your running applications and the speed of your deployments.

### Optimize the size of your deployment process {#optimize-size-of-process}

By their very nature, each step in your deployment process comes with an overhead. A deployment process with more steps can be easier to understand at a high level and easier to manage over time. However, more steps will result in more:

- System variables
- Communication overhead
- Startup/teardown cost
- Contention on Octopus Server resources

A deployment process with a single giant step might be the most efficient approach in your scenario. Imagine a single complex step that deploys all the required packages, running a single hand-crafted script to complete your deployment all in one hit. This approach would eliminate many of the above costs but at the expense of making your deployment process harder to understand and maintain over time.

There is typically a happy balance you can strike for each of your projects. The most common problem related to performance is having too many steps, where "too many" depends on your specific situation. We typically consider an average project to use 10-20 steps. But many customers deploy projects with 50-80 steps. If your projects have hundreds of steps, you may want to consider adjusting your deployment processes.

- If your project could be broken down into logical components which ship on their own cadence, make each component its own project.
- If your project could be broken down into logical components which ship at the same time, consider breaking your deployment into multiple logical projects and [coordinate their deployments](/docs/projects/coordinating-multiple-projects).
- If your project cannot be broken down logically, consider combining some of your steps together into a single step. For example, you may be able to run your [custom scripts](/docs/deployments/custom-scripts) as a pre- or post- activity.

### Consider the size of your packages {#package-size}

Size really does matter when it comes to your packages:

- Larger packages require more network bandwidth to transfer to your deployment targets.
- Larger packages take more resources to unpack on your deployment targets.
- When using [delta compression for package transfers](/docs/deployments/packages/delta-compression-for-package-transfers), larger packages require more CPU and disk IOPS on the Octopus Server to calculate deltas - this is a tradeoff you can determine through testing.
- Larger packages usually result in larger file systems on your deployment targets, making any steps which scan files much slower. For example, [substituting variables in templates](/docs/projects/steps/configuration-features/substitute-variables-in-templates) can be configured to scan every file extracted from your package.

Consider whether one large package is better in your scenario, or perhaps you could split your application into multiple smaller packages, one for each deployable component.

### Consider how you transfer your packages {#package-transfer}

Octopus provides two primary methods for transferring your packages to your deployment targets:

- Push from the Octopus Server to your targets.
- Pull from an external feed to your targets.

Each option provides different performance benefits, depending on your specific scenario:

- If network bandwidth is the limiting factor, consider:
  - pushing the package from the Octopus Server to your targets using [delta compression for package transfers](/docs/deployments/packages/delta-compression-for-package-transfers); or
  - using custom package feed in the same network as your deployment targets and download the packages directly on the agent.
- If network bandwidth is not a limiting factor, consider downloading the packages directly on the agent. This alleviates a lot of resource contention on the Octopus Server.
- If Octopus Server CPU and disk IOPS is a limiting factor, avoid using [delta compression for package transfers](/docs/deployments/packages/delta-compression-for-package-transfers). Instead, consider downloading the packages directly on the agent. This alleviates a lot of resource contention on the Octopus Server.

### Consider retention policies for your package feeds {#package-retention}

Imagine you keep every package you've ever built or deployed. Over time your package feed will get slower and slower to index, query, and stream packages for your deployments.

If you are using the [built-in feed](/docs/packaging-applications/package-repositories/#choose-right-repository), you can configure [retention policies](/docs/administration/retention-policies) to keep it running fast.

If you are using another feed, you should configure its retention policies yourself, making sure to cater for packages you may want to deploy.

### Consider the size of your task logs {#task-logs}

Larger task logs put the entire Octopus pipeline under more pressure. A good rule of thumb is to keep your log files under 20MB. We recommend printing messages required to understand progress and the reason for any deployment failures. The rest of the information should be streamed to a file, then published as a deployment [artifact](/docs/projects/deployment-process/artifacts).

### Consider how many targets acquire packages in parallel {#parallel-acquisition}

Imagine you have 1,000 deployment targets configured to stream packages from the Octopus Server and you configure your deployment so all of the packages are acquired across all of your deployment targets in parallel. This can put a lot of strain on your Octopus Server as the constraint in this mix.

Alternatively, imagine you have 1,000 deployment targets configured to download packages directly from a package feed or a file share. Now the package feed or file share becomes the constraint.

Firstly, [consider how you transfer your packages](#package-transfer). Then, consider the degree of parallelism that will suit your scenario best. Octopus ships with a sensible and stable default configuration of `10`, and you can tune the degree of parallelism by setting the `Octopus.Acquire.MaxParallelism` variable as an unscoped/global value in your project. Start by slowly increasing this number until you reach a constraint for your scenario, and continue to tune from there.

### Consider how many targets you deploy to in parallel {#parallel-targets}

Imagine you have a step in your deployment process that runs across all deployment targets with a specific role. If there are 1,000 deployment targets with the role, Octopus will attempt to run that step simultaneously across all 1,000 targets. This will cause your deployments to go slower since the Octopus Server spends most of its time managing concurrency.

Alternatively, if you constrain your process to a single deployment target at a time, the Octopus Server and your deployment targets will be inactive the majority of the time. This also results in your deployments taking longer.

Consider using a [rolling deployment](/docs/deployments/patterns/rolling-deployments) to deploy to a subset of these deployment targets at any one time. Rolling deployments allow you to define a "window" which is the maximum number of deployment targets that will run the step at any one time.

:::div{.info}
This default behavior is sensible for smaller installations, but is an unsafe default for larger installations. We are looking to [change this default behavior in a future version of Octopus](https://github.com/OctopusDeploy/Issues/issues/3305).
:::

### Consider how many steps you run in parallel {#parallel-steps}

Steps and actions in your deployment process can be configured to start after the previous step has succeeded (the default) or you can configure them to start at the same time (run in parallel).

Similarly to [parallel targets](#parallel-targets), running too many steps in parallel can cause your Octopus Server to become the bottleneck and make your deployments take longer overall.

### Consider how much deployment work the Octopus Server is doing {#server-work}

Some steps, like Azure deployments and AWS steps, [run on a worker](/docs/infrastructure/workers/#where-steps-run).  By default, that's the [built-in worker](/docs/infrastructure/workers/#built-in-worker) in the Octopus Server. That means the step will invoke Calamari processes on the server machine to do the deployment work. That workload can be shifted off the server and onto [workers](/docs/infrastructure/workers). See this [blog post](https://octopus.com/blog/workers-performance) for a way to begin looking at workers for performance.
