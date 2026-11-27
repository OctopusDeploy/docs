---
layout: src/layouts/Default.astro
pubDate: 2026-11-27
modDate: 2026-11-27
title: Finding where task time goes with the waterfall
navTitle: Task log waterfall
sidebarLabel: Task log waterfall
navOrder:
description: Use the task log waterfall to see which steps ran in parallel, which took longest, and where errors and warnings happened.
subject: task log, waterfall, timeline, deployment duration, slow steps, parallel steps
type: guide
audience: [devops-eng, app-dev, power-user]
image:
imageAlt:
---

The task log waterfall shows a deployment, runbook run, or other task as bars on a timeline. Use it to find the steps that took longest, see what ran in parallel, and spot where errors happened. This page covers opening the waterfall and zooming in on the part of a task you care about.

## The task log waterfall

The waterfall is a second view of the task log. The log tells you what happened. The waterfall shows when each part happened and how long each part took. A slow deployment is often slow for one or 2 reasons, like a step waiting on another step or one target taking longer than the rest. The timeline makes those reasons easy to see.

:::figure
![The task log waterfall for a deployment. An overview of the whole task sits above a tree of steps, with a bar and a duration for each step and target. Two steps run in parallel, and one target's bar carries a warning marker.](/docs/img/tasks/images/task-log-waterfall.png)
:::

To open the waterfall view:

1. Open the deployment, runbook run, or other task.
2. Select the **Task Log** tab.
3. Select **Waterfall** in the toolbar.

Each row is a step, an action, or a deployment target, nested the same way as in the log. Each row has a bar:

- An action or target bar runs from when that action or target started to when it ended.
- A step bar covers all the work inside the step, from its earliest child to its latest.
- A running bar keeps growing until the work finishes.
- A row that hasn't started yet has no bar.

The column on the right shows each row's duration. Hover over a bar to see its status, duration, start time, and end time.

Error, warning, and highlight lines from the log appear as markers on their bars. Hover over a marker to read the log line. When you collapse a step, its row shows the markers from everything inside it.

The timeline starts at `0:00` when the task starts. Turn on **Actual time** to show clock times instead. If a task ran more than once, for example after an automatic redeployment, each run gets its own timeline.

## Waterfall controls

You can also zoom and move with your mouse, trackpad, or keyboard. The keyboard controls work when the box in the overview has focus.

| Control | What it does |
| --- | --- |
| Drag the box in the overview | Moves along the timeline |
| Drag the box in the overview down | Zooms in |
| Drag the box in the overview up | Zooms out |
| Drag either edge of the box | Changes the visible time range |
| Double-click the overview | Fits the whole task |
| Ctrl + scroll, or pinch on a trackpad | Zooms in or out around the pointer |
| Left and Right arrow keys, Page Up and Page Down | Moves along the timeline |
| Home and End | Jumps to the start or end of the task |
| `+` and `-` | Zooms in or out |
| **Expand all**, **Collapse all** | Expands or collapses every step |

## Version notes

- The task log waterfall is available from Octopus Server 2027.0.

## Related links

- [Tasks](/docs/tasks)
- [Task log timestamps](/docs/tasks/task-log-timestamps)
- [Deployment performance](/docs/projects/deployment-process/performance)
- [Troubleshooting failed or hanging tasks](/docs/support/troubleshooting-failed-or-hanging-tasks)
