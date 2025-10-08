---
layout: src/layouts/Default.astro
pubDate: 2023-10-20
modDate: 2025-10-08
title: Prioritize Tasks
description: Tasks can be manually prioritized to run before other earlier queued tasks.
---

:::div{.info}
From version `2025.2.7584`, the following features require an **Enterprise** tier subscription:

- Priority lifecycle phases  
- Priority deployments  
- Priority runbooks  

:::

## Understanding task prioritization in Octopus

When Octopus runs many deployments or runbooks at the same time, tasks are placed into a queue and processed in the order they were created. This can delay critical work, such as a production hotfix.  

To help with urgent or important jobs, Octopus provides three ways to control task priority:  

1. **Task queue prioritization (Move to Top)**  
   - Best for unexpected, one-off situations.  
   - Use this when you need to run a queued task immediately, such as a hotfix.

2. **Priority deployments and runbooks**  
   - Best for proactive prioritization of important work.  
   - Use this when you want to prioritize a specific deployment or runbook.

3. **Priority lifecycle phases**  
   - Best for consistent, rules-based prioritization.  
   - Use this when you want deployments to an entire lifecycle phase (for example, Production) to always take precedence.  

:::div{.warning}
When prioritizing a deployment, cancel any other queued deployments to the same environment. Otherwise, another queued release could overwrite your prioritized deployment.  
:::  

### Task processing order

From version `2024.4`, tasks are processed in this order:  

1. Queued tasks that are moved to the top
2. Tasks from prioritized deployments, runbooks, or lifecycle phases  
3. Regular tasks  

Within each category, tasks run on a **first in, first out** basis.

## Task queue prioritization (Move to Top)

From version `2023.4.6612`, you can manually move a queued task to the top of the queue.  

This option is useful when you need to quickly prioritize a one-off task, such as a hotfix.

You can prioritize tasks in two ways:  

- **On the Tasks page**: Select the overflow menu `(...)` on a queued task, then choose **Move to Top**.  

:::figure
![Tasks page showing the 'Move to Top' button in a task's overflow menu.](/docs/img/tasks/images/tasks-move-to-top.png)
:::

- **On the Task details page**: Select **Move to Top**.  

:::figure
![Release page showing 'Move to top' button.](/docs/img/tasks/images/release-move-to-top.png)
:::

## Priority deployments and runbooks

From version `2025.2.7584`, you can prioritize an individual deployment or runbook.  

This option is useful for proactively prioritizing important tasks, such as production deployments or runbooks that manage critical infrastructure.

To prioritize a deployment or runbook:  

1. On the **Deploy release** or **Run snapshot** page, select the **Prioritize this (deployment/runbook)** checkbox.  
2. When the task is created, it runs before non-prioritized tasks.  

:::figure
![Deploy release page showing the selected 'Prioritize this deployment' checkbox.](/docs/img/tasks/images/deployment-priority.png)
:::

## Priority lifecycle phases

From version `2024.4`, you can prioritize a phase within a [lifecycle](/docs/releases/lifecycles).  

This option is useful when you want all deployments to an entire phase (for example, Production) to take precedence.  

To prioritize a lifecycle phase:  

1. When configuring a **Phase** within a **Lifecycle**, select the **Prioritize this phase** checkbox.  
2. When a deployment reaches this phase, it runs before non-prioritized tasks.

:::figure
![Lifecycle configuration page showing the selected 'Prioritize this phase' checkbox.](/docs/img/tasks/images/lifecycle-priority.png)
:::
