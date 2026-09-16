---
layout: src/layouts/Default.astro
pubDate: 2026-09-17
modDate: 2026-09-17
title: Task Log Timestamps
description: Task log lines record both the time Octopus Server observed the output and the time the machine that produced it says it occurred.
---

Every line in a task log is stamped with two times:

- **Server** is when Octopus Server observed the output. Octopus has always recorded this time, the task log is always ordered by it, and it's what you see by default.
- **Remote** is when the deployment target or worker that produced the output says it occurred, measured on that machine's own clock.

:::div{.info}
Remote timestamps are available from version `TODO`.
:::

## Why the two times differ

Output from a step doesn't reach Octopus Server the instant a script writes it. A polling Tentacle only sends output when it next checks in, a slow network adds more delay, and a step that writes a burst of output can have Octopus catching up for a while afterwards. Every one of those delays lands on the server timestamp.

Comparing the two times tells you where the time went. If a long gap in the log closes up when you switch to remote timestamps, the target was producing output steadily and Octopus was waiting to hear about it. If the gap is still there, the target really was busy.

Remote timestamps come from Tentacle, including Kubernetes agents. Lines Octopus Server writes itself, and lines from targets that don't report a time, have no separate remote time to show.

## Choose which timestamps to show

1. Open the deployment, runbook run, or other task, and select the **Task Log** tab.
2. Open the view settings menu.
3. Under **Timestamps**, choose **Hide**, **Server**, or **Remote**.

Octopus remembers your choice and applies it to every task log you open.

In **Remote** mode, lines that carry a time reported by a target are marked **Remote**. The rest fall back to the server time, because that's the only time Octopus has for them. Hover over any timestamp to see the other time for that line.

:::div{.hint}
Remote times come from the clock on another machine, so a target with a clock that's out of step with your Octopus Server will report times that look wrong. The server timestamps, and the order of the log, are unaffected.
:::

## Downloading the raw log

The raw task log uses server timestamps. To get remote timestamps instead, add the `timestamps` query parameter to the [raw task log endpoint](/docs/api/tasks):

```
GET /api/{spaceId}/tasks/{id}/raw?timestamps=Remote
```

Valid values are `Server` (the default) and `Remote`.
