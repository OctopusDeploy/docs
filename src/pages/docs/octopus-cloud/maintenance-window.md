---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-06-06
title: Maintenance windows
navTitle: Maintenance windows
navOrder: 80
description: Octopus Cloud maintenance windows explained
---

Octopus Cloud provides all the power of Octopus Server, but as a highly available, scalable, secure SaaS application maintained for you by the hosting experts at Octopus Deploy.

We need to perform occasional maintenance to keep Octopus Cloud optimized, on the latest version of Octopus Server, and appropriately resourced for your workloads.

## The Octopus Cloud maintenance advantage

Octopus Cloud customers benefit from regular maintenance by our expert team at a time you choose.

You get:

- **Optimized performance** – regular database reindexing, compaction, and infrastructure improvements
- **Latest features** – timely Octopus Server upgrades with the latest features and improvements
- **Latest security** - patches and bug fixes applied as soon as they become available
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

You choose a two-hour time slot for maintenance, ideally outside your regular business hours, to minimize potential impact. Many customers prefer the early morning. You can adjust your time slot anytime.

## Managing maintenance outages

On rare occasions, a maintenance action will require an outage. During the two-hour maintenance window you have specified, we may briefly take your instance offline.

We follow this process to minimize impact:

- In-progress tasks get a few minutes to complete before being abandoned
- Users receive a maintenance page, and API requests return a 503 Service Unavailable status code
- Maintenance operations occur
- Your instance will start up again, and we confirm it is in a healthy state
- The maintenance page is removed, and your instance is accessible again
- Tasks paused during shutdown will be resumed
- Tasks scheduled to start during the outage commence

We recommend avoiding non-idempotent deployments and runbook runs during maintenance windows.

:::div{.hint}
One impact of an outage is that deployments and runbook runs may fail. We are actively working on [Resilient Scalable Deployments](https://roadmap.octopus.com/c/95-alpha-program-resilient-scalable-deployments-in-octopus-cloud) to allow deployments and runbook runs to resume post-outage.  
:::

## How to view or change your maintenance window

Setting up your maintenance window to suit your business needs is easy. Just follow these steps:

1. Log in to [Octopus.com](https://octopus.com).
2. Select your cloud instance.
3. Click **Configuration**.
4. Scroll down to the **Maintenance window** section.
5. Select the time in UTC, providing a window of at least two hours, and click **Submit**.

## How we communicate maintenance windows

- **Routine maintenance:** During a regular maintenance window, users receive a maintenance page, and any requests to the API will return a 503 Service Unavailable status code
- **Other maintenance:** There may be rare occasions outside of your normal maintenance window where we need to perform maintenance on your instance. Our Support team will contact you in these scenarios to coordinate the work.
