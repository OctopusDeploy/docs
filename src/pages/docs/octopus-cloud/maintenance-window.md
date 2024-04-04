---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Octopus Cloud Maintenance Window
navOrder: 55
description: Details about the Octopus Cloud maintenance window
---

Each Octopus Cloud customer must set a two-hour daily maintenance window for their instance. The maintenance window is a daily period of two hours that allows you to nominate when maintenance operations can be performed on your Octopus Cloud instance. This window should be selected so that it is outside of your normal business hours and unlikely to include any scheduled deployments.  The daily two hour window provides some scheduling flexibility to ensure that all of our Cloud instances can be kept up-to-date and in good health by running a variety of maintenance tasks. 

:::div{.hint}
We DO NOT take your instance offline for two hours every day. Many, but not all, maintenance tasks are performed while the instance is online. At most, you might notice a performance impact.  Many maintenance tasks that require an outage can perform a significant number of steps while the instance is online.  The steps that require an outage typically only take a short time to complete.
:::

At a time of publishing this (April 2024), our maintenance tasks that require downtime average to 15 minutes per week. This is factored into our uptime [SLO](/docs/octopus-cloud/uptime-slo).

## During a Maintenance Window

At the start of each window, an evaluation is performed to determine which maintenance operations need to be performed on each Octopus Cloud instance. There may be several operations that need to be performed in sequence on your instance during a single maintenance window.

Those tasks include (but are not limited to) the following:
- Database maintenance. This involves reindexing and compacting your Octopus Cloud instance database so that it can perform at its best. 
- Performing any Octopus Server software upgrades. These require that your instance be taken offline for approximately 15 minutes.
- Moving your instance to new infrastructure. These operations don't happen as often, but are required when we roll out improvements to the underlying infrastructure. 
- Processing any billing events, such as apply the latest license key to the instance or changing the task cap.

Most of the maintenance operations can be performed without taking the instance offline, such as performing database maintenance. Your instance may feel a little slower while any online maintenance operations are running.  For tasks that cause an outage, the Octopus Cloud Platform runs as many steps as possible while the instance remains online.  Typically, only a subset of steps requiring the instance to be offline.

Many of those tasks have guard clauses. For example, the Octopus Cloud Platform won't de-fragment a database that has 10% fragmentation. In addition, it would only attempt to upgrade an instance if a new version exists. 

It is important to note that most maintenance tasks do not start at the beginning of your maintenance window. The Octopus Cloud Platform hosts thousands of customer instances. Because of that, it performs maintenance tasks in bulk. When the Octopus Cloud Platform runs a maintenance task, your instance might be the first, somewhere in the middle, or at the end of the list of instances. In some cases, by the time the Octopus Cloud Platform finishes processing other instances, your maintenance window is about to end. When that happens, your instance is skipped and that task won't be processed until the next day. That typically happens when performing upgrades. 

:::div{.hint}
Upgrading an instance is the primary cause of outages on the Octopus Cloud Platform. The most noticeable impact of an outage is deployments, and runbook runs will fail. We are actively working on [Resilient Scalable Deployments](https://roadmap.octopus.com/c/95-alpha-program-resilient-scalable-deployments-in-octopus-cloud). Once completed, deployments and runbook runs will no longer fail when an instance is upgraded.  
:::

## Taking your instance offline
If we need to take your instance offline to perform any maintenance:
- Your instance will be given a few minutes to shut down cleanly. This will allow any in-progress tasks to complete. Any tasks still running at the end of the timeout will be abandoned.
- A maintenance page will be displayed to users and any requests to the API will return a 503 Service Unavailable status code.
- The maintenance operations will be performed.
- Your instance will start up again and we will check that it is in a healthy state.
- The maintenance page is removed and your instance is accessible again. Any tasks that were paused during shut down will be resumed, and any tasks that were scheduled to start during the outage will be started.

## Set the Maintenance Window
You can let us know the best time for maintenance by setting the maintenance window. You can change this as often as you need to. If you change it during your current maintenance window, it will not stop any maintenance operations that are already underway, so be sure to change it before the maintenance window starts.

1. Log in to your Octopus account.
2. Select your cloud instance.
3. Click **Configuration.**
4. Scroll down to the **Outage Window** section.
5. Select the time in UTC, providing a window of at least two hours and click **Save Outage window.**
