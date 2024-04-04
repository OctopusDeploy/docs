---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Octopus Cloud Maintenance Window
navOrder: 55
description: Details about the Octopus Cloud maintenance window
---

Each Octopus Cloud customer must set a two-hour daily maintenance window for their instance. The Octopus Cloud platform uses the maintenance window to determine when it can perform maintenance tasks on your instance.  

:::div{.hint}
We DO NOT take your instance offline for two hours every day. Many, but not all, maintenance tasks are performed while the instance is online. Most maintenance tasks that require an outage are completed in less than 5 minutes.
:::

The Octopus Cloud Platform performs a variety of maintenance tasks on your instance. Those tasks include (but are not limited to) the following:

- Back up the file share.
- Back up the database.
- Database maintenance such as de-fragmenting indexes.
- Upgrade an instance to the latest version.
- Re-provision an instance to adjust compute (CPU/RAM/Database) resources.
- Move an instance to a different Kubernetes cluster in the same region.
- Apply the latest license key to the instance.
- Changing the task cap.

Many of those tasks have guard clauses. For example, the Octopus Cloud Platform won't de-fragment a database that has 10% fragmentation. In addition, it would only attempt to upgrade an instance if a new version exists. For tasks that cause an outage, the instance is down for a small duration of the task.  Most instances experience an outage during their maintenance window around 5 to 10 times a month, typically lasting less than 5 minutes.  

:::div{.hint}
Upgrading an instance is the primary cause of outages on the Octopus Cloud Platform. The most noticeable impact of an outage is deployments, and runbook runs will fail. We are actively working on [Resilient Scalable Deployments](https://roadmap.octopus.com/c/95-alpha-program-resilient-scalable-deployments-in-octopus-cloud). Once completed, deployments and runbook runs will no longer fail when an instance is upgraded.  
:::

Most maintenance tasks do not start at the beginning of your maintenance window. They can start at any time during those two hours. The Octopus Cloud Platform hosts thousands of customer instances. Because of that, it performs maintenance tasks in bulk. When the Octopus Cloud Platform runs a maintenance task, your instance might be the first, somewhere in the middle, or at the end of the list of instances. In some cases, by the time the Octopus Cloud Platform finishes processing other instances, your maintenance window is about to end. When that happens, your instance is skipped and is added to the list to be processed the next day. That typically happens when performing upgrades. 