---
layout: src/layouts/Default.astro
pubDate: 2026-09-17
modDate: 2026-09-17
title: Task Log Timestamps
description: Task log lines record both the time Octopus Server observed the output and the time the machine that produced it says it occurred.
---

:::div{.info}
Remote timestamps are available from version `2026.4.3241`.
:::

Every line in a task log is stamped with two times:

- **Server** (or "Observed") is when Octopus Server observed the output. Octopus has always recorded this time, the task log is always ordered by it, and it's what you see by default.
- **Remote** (or "Occurred") is when the deployment target or worker that produced the output says it occurred, according to the remote machine's clock.

## Choose which timestamps to show

1. Open the deployment, runbook run, or other task, and select the **Task Log** tab.
2. Open the view settings menu.
3. Under **Timestamps**, choose **Hide**, **Server**, or **Remote**.

![Remote timestamps options with remote selected and highlighted in the task log](/docs/img/tasks/images/remote-timestamp.png)

In **Remote** mode, lines that carry a time reported by a target are marked **Remote**. The rest fall back to the server time, because that's the only time Octopus has for them. Hover over any timestamp to see the other time for that line.

:::div{.hint}
Remote times come from the clock on another machine, so a target with a clock that's out of step with your Octopus Server will report times that look wrong.
:::

## Why the two times differ

Output from a remote machine doesn't reach Octopus Server the instant a script writes it. A polling Tentacle only sends output when it next checks in, a slow network adds delay on the server-time of remote output.

## Downloading the raw log

The raw task log uses server timestamps by default. To get remote timestamps instead, add the `timestamps` query parameter to the [raw task log endpoint](/docs/api/tasks):

```
GET /api/{spaceId}/tasks/{id}/raw?timestamps=Remote
```

Valid values are `Server` (default) and `Remote`.
