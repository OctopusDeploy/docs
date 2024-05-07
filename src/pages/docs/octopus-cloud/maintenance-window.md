---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-04-05
title: Octopus Cloud Maintenance Window
navOrder: 55
description: Details about the Octopus Cloud maintenance window
---

We are dedicated to keeping Octopus Cloud running smoothly and providing a reliable, scalable, and secure service. In order to do that, we must perform occasional maintenance, including updates and optimizations on your instance.
Most of these won't affect your instance's availability, but occasionally, we might need to take it offline briefly for tasks like software upgrades or infrastructure improvements.


:::div{.hint}
We don’t need to perform actions on your instance daily, and most of our maintenance actions won’t take your instance offline. At most, you might notice a performance impact. The steps that require an outage typically only take a short time to complete.
:::

At the time of publishing this (April 2024), our maintenance tasks that require downtime average 15 minutes per week.



## You’re in control of the schedule
You get to choose a two-hour time slot for maintenance activities. Pick a time outside your regular business hours to minimize potential impact.
You can adjust your maintenance window anytime, but make sure to do it before your current window begins to avoid interrupting ongoing maintenance tasks. 


## View or change your maintenance window
Setting up your maintenance window to suit your business needs is easy. Just follow these steps:

1. Log in to your Octopus account.
2. Select your cloud instance.
3. Click **Configuration.**
4. Scroll down to the **Outage Window** section.
5. Select the time in UTC, providing a window of at least two hours and click **Save Outage window.**



## During a Maintenance Window

At the start of each window, an evaluation is performed to determine which maintenance operations need to be performed on each Octopus Cloud instance. There may be several operations that need to be performed in sequence on your instance during a single maintenance window.

Those tasks include (but are not limited to) the following:
- Database maintenance. This involves reindexing and compacting your Octopus Cloud instance database so that it can perform at its best. 
- Performing any Octopus Server software upgrades.
- Moving your instance to new infrastructure. These operations don't happen as often, but are required when we roll out improvements to the underlying infrastructure. 
- Processing any billing events, such as applying the latest license key to the instance or changing the task cap.

Most maintenance operations can be performed without taking the instance offline, such as database maintenance. Your instance may feel a little slower while any online maintenance operations are running.  For tasks that cause an outage, typically only a subset of steps requiring the instance to be offline. For all the other steps, we keep the instance online.

Many of those tasks have guard clauses. For example, we won't de-fragment a database that has 10% fragmentation. In addition, we would only attempt to upgrade an instance if a new version exists. 

It is important to note that most maintenance tasks do not start at the beginning of your maintenance window. We host thousands of customer instances. Because of that, we perform maintenance tasks in bulk. When we run a maintenance task, your instance might be the first, somewhere in the middle, or at the end of the list of instances. In some cases, by the time we finish processing other instances, your maintenance window is about to end. When that happens, your instance is skipped and that task won't be processed until the next day. That typically happens when performing upgrades. 

:::div{.hint}
Upgrading an instance is the primary cause of outages. The most noticeable impact of an outage is deployments and runbook runs will fail. We are actively working on [Resilient Scalable Deployments](https://roadmap.octopus.com/c/95-alpha-program-resilient-scalable-deployments-in-octopus-cloud) to allow the deployments and runbook runs to continue post-upgrade.  
:::

## Taking your instance offline
If we need to take your instance offline to perform any maintenance:
- Your instance will be given a few minutes to shut down cleanly. This will allow any in-progress tasks to complete. Any tasks still running at the end of the timeout will be abandoned.
- A maintenance page will be displayed to users and any requests to the API will return a 503 Service Unavailable status code.
- The maintenance operations will be performed.
- Your instance will start up again and we will check that it is in a healthy state.
- The maintenance page is removed and your instance is accessible again. Any tasks that were paused during shut down will be resumed, and any tasks that were scheduled to start during the outage will be started.


## How we communicate maintenance windows
- **Routine maintenance:** During a regular maintenance window, a maintenance page will be displayed to users, and any requests to the API will return a 503 Service Unavailable status code
- **Other maintenance:** There may be rare occasions outside of your normal maintenance window where we need to perform maintenance on your instance. Our Support team will contact you in these scenarios to coordinate the work.
