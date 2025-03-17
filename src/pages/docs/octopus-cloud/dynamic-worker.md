---
layout: src/layouts/Default.astro
pubDate: 2025-03-07
modDate: 2025-03-07
title: Dynamic workers
navOrder: 45
description: Describes what dynamic workers are, how they work, their limitations and other worker type options available for Octopus Cloud
---

[Workers](docs/infrastructure/workers) are machines that can execute tasks that don’t need to be run on the Octopus Server or individual deployment targets.

There are 2 types of worker you can use in Octopus Cloud - external workers and dynamic workers.

The most flexible type of worker are [external workers](docs/infrastructure/workers#external-workers), which are machines, provided by the customer, accessed from Octopus Cloud via Windows or Linux Tentacle, via SSH, or via [Kubernetes workers](/docs/infrastructure/workers/kubernetes-worker).

External workers are recommended when the customer needs full control of

- worker resourcing
- worker configuration
- worker life-cycle
- installed software
- the number of workers that are available

Our larger customers often prefer external workers for these reasons. We recommend customers consider [Kubernetes workers](https://octopus.com/blog/kubernetes-worker) particularly where workloads require flexible scalability of compute resources.

The other type of worker available on Octopus Cloud are dynamic workers.

:::div{.hint}
Self-hosted Octopus Server customers have access to a third type of worker, known as built-in workers. Built-in workers are processes that run on the same machine as Octopus Server. Built-in workers are **not** available to Octopus Cloud customers for security and performance reasons.
:::

## What you get with dynamic workers

Dynamic workers are isolated virtual machines, hosted and created on-demand by Octopus to run your deployments and runbook steps. Dynamic workers are provided as part of your Octopus Cloud subscription.

Customers may choose between Windows and Ubuntu virtual machine images for their dynamic workers. Octopus provides a [dynamic worker pool](/docs/infrastructure/workers/dynamic-worker-pools) of these virtual machines from which, as required, your Octopus Cloud will lease a freshly provisioned dynamic worker VM. Leases are held for a maximum of 72 hours.

## Limitations of dynamic workers

### Resourcing

Your Octopus Cloud [task cap](/docs/octopus-cloud/task-cap) determines the resources available to your dynamic worker. As at January 2025, dynamic worker virtual machines are resourced as follows. These specifications may be adjusted over time.

| Task cap  | vCPUs (Qty.) | Memory (GB) |
| -----: | ------: | ------: |
| 5 | 2 | 4 |
| 10 | 4 | 8 |
| 20 | 4 | 8 |
| 40 | 8 | 16 |
| 80 | 16 | 32 |
| 160 | 32 | 64 |

:::div{.hint}
We recommend customers who would benefit from scalable workers consider [Kubernetes workers](/docs/infrastructure/workers/kubernetes-worker) over dynamic workers. Kubernetes workers allow worker operations to be executed within a Kubernetes cluster in a scalable manner, allowing compute resources used during the execution of a Deployment process (or runbook) to be released when the Deployment completes.
:::

### Life-cycle

Dynamic workers are created on demand and leased to an Octopus Cloud instance for a limited time [before being destroyed](/docs/infrastructure/workers/dynamic-worker-pools#on-demand). Dynamic workers are destroyed when they have been idle for 60 minutes or when they reached 72 hours of existence. All data written to disk is lost upon worker destruction.

### Installed software

Dynamic workers come with a small number of [baseline tools](/docs/infrastructure/workers/dynamic-worker-pools#available-dynamic-worker-images) installed. The version of baseline tools may be updated between worker leases.

We do not recommend installing additional software on dynamic workers. Instead, we suggest you leverage [execution containers for workers](/docs/projects/steps/execution-containers-for-workers). Octopus provides execution containers with a baseline of tools pre-installed. Customers with specific software needs may also use [custom Docker images](/docs/projects/steps/execution-containers-for-workers/#custom-docker-images) to use as execution containers.

### IP addresses

Dynamic workers are assigned IP addresses outside the static IP range of your Octopus Cloud Server. If a known/static IP is required for your worker, please consider provisioning your own external worker.

## Let us know what you want for the future of dynamic workers

We are interested in hearing from customers who would value a higher specification of dynamic worker. Perhaps more highly resourced dynamic workers would be helpful, or workers with additional security features. If this interests you, please vote on our [Higher resourced, more secure dynamic workers](https://roadmap.octopus.com/c/189-higher-resourced-more-secure-dynamic-workers-for-octopus-cloud?&utm_medium=social&utm_source=starter_share) roadmap item and share with us how dynamic workers can better assist your deployment success.

## Learn more

- [Dynamic worker pools](/docs/infrastructure/workers/dynamic-worker-pools)
- [Execution containers](/docs/projects/steps/execution-containers-for-workers)
