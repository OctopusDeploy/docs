---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-06-06
title: Maintenance windows
navTitle: Maintenance windows
navOrder: 80
description: Octopus Cloud maintenance windows explained
---
<!--
After reading our public documentation, buyers may perceive maintenance windows as a significant disruption, potentially deterring them from adopting Octopus Cloud.  

Our public documentation is overly complex, making it difficult for buyers to understand the low actual impact of maintenance windows while obscuring their benefits.  

After this work, our documentation will be shorter and clearer about the key benefits of maintenance, helping buyers understand its necessity and minimal business impacts. 

There will be less operational detail as this is not relevant to customers.  
Prospective Octopus Cloud customers will have fewer concerns about maintenance-related disruptions, benefitting our Cloud-won ratio. 
-->

Octopus Cloud provides all the power of Octopus Server, but as a highly available, scalable, secure SaaS application maintained for you by the hosting experts at Octopus Deploy.

To keep Octopus Cloud optimized, on the latest version of Octopus Server, and appropriately resourced for your workloads, we need to perform occasional maintenance.

## The Octopus Cloud maintenance advantage

Octopus Cloud customers benefit from maintenance done for you by our expert team, at a time you choose.

You get:

- **Optimized performance** – regular database reindexing, compaction, and infrastructure improvements
- **Latest features** – timely Octopus Server upgrades with the latest features and improvements
- **Latest security** - patches and bug-fixes applied as soon as they become available
- **High availability** – maintenance procedures are designed to minimize downtime
- **User-controlled scheduling** – you choose a two‑hour maintenance window to reduce operational impact
- **Minimal service disruption** – most maintenance tasks run in the background, and outages are kept brief

## Minimal service disruption

We don’t need to maintain your instance daily, and most of our maintenance actions won’t take your instance offline at all. At most, you might notice a performance impact.

:::div{.hint}

In the 4 months up to and including October 2024, Octopus Cloud instances:

- Had an average downtime of fewer than 8 minutes per week
- Experienced any downtime on average fewer than 2 days a week

:::

## You’re in control of the schedule

You choose a two-hour time slot for maintenance, ideally outside your regular business hours to minimize potential impact. Many customers choose the early morning. You can adjust your time slot anytime.

## Managing maintenance outages

On rare occasions, a maintenance action will require an outage. During the two-hour maintenance window you have specified, we may briefly take your instance offline.

We follow this process to minimize impact:

- In-progress tasks have a few minutes to complete. Tasks still running after that are abandoned.
- Users are shown a maintenance page and API requests return a 503 Service Unavailable status code.
- The maintenance operations will be performed.
- Your instance will start up again and we confirm it is in a healthy state.
- The maintenance page is removed and your instance is accessible again.
- Tasks paused during shut down will be resumed.
- Tasks that were scheduled to start during the outage will be started.

We recommend avoiding non-idempotent deployments and runbook runs during maintenance windows.

:::div{.hint}
A noticeable impact of an outage is deployments and runbook runs may fail. We are actively working on [Resilient Scalable Deployments](https://roadmap.octopus.com/c/95-alpha-program-resilient-scalable-deployments-in-octopus-cloud) to allow deployments and runbook runs to resume post-outage.  
:::

## How to view or change your maintenance window

Setting up your maintenance window to suit your business needs is easy. Just follow these steps:

1. Log in to [Octopus.com](https://octopus.com).
2. Select your cloud instance.
3. Click **Configuration**.
4. Scroll down to the **Maintenance window** section.
5. Select the time in UTC, providing a window of at least two hours and click **Submit**.
<!-- 
## During a Maintenance Window

At the start of each window, an evaluation is performed to determine which maintenance operations need to be performed on each Octopus Cloud instance. There may be several operations that need to be performed in sequence on your instance during a single maintenance window.

Those tasks include (but are not limited to) the following:

- Database maintenance. This involves reindexing and compacting your Octopus Cloud instance database so that it can perform at its best.
- Performing any Octopus Server software upgrades.
- Moving your instance to new infrastructure. These operations don't happen as often, but are required when we roll out improvements to the underlying infrastructure.
- Processing any billing events, such as applying the latest license key to the instance or changing the task cap.

Most maintenance operations can be performed without taking the instance offline, such as database maintenance. Your instance may feel a little slower while any online maintenance operations are running.  For tasks that cause an outage, typically only a subset of steps require the instance to be offline. For all the other steps, we keep the instance online.

Many of those tasks have guard clauses. For example, we won't de-fragment a database that has 10% fragmentation. In addition, we would only attempt to upgrade an instance if a new version exists.

It is important to note that most maintenance tasks do not start at the beginning of your maintenance window. We host thousands of customer instances. Because of that, we perform maintenance tasks in bulk. When we run a maintenance task, your instance might be the first, somewhere in the middle, or at the end of the list of instances. In some cases, by the time we finish processing other instances, your maintenance window is about to end. When that happens, your instance is skipped and that task won't be processed until the next day. That typically happens when performing upgrades.
-->

## How we communicate maintenance windows

- **Routine maintenance:** During a regular maintenance window, a maintenance page will be displayed to users, and any requests to the API will return a 503 Service Unavailable status code
- **Other maintenance:** There may be rare occasions outside of your normal maintenance window where we need to perform maintenance on your instance. Our Support team will contact you in these scenarios to coordinate the work.
