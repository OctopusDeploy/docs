---
layout: src/layouts/Default.astro
pubDate: 2023-10-20
modDate: 2026-09-17
title: Tasks
subtitle: The task view shows waiting, running, and completed tasks
icon: fa-solid fa-list-check
navTitle: Overview
navSection: Tasks
description: Tasks are the primary way of getting work done in Octopus.
navOrder: 100
---

Many of the main operations Octopus performs are represented by Tasks. This includes all deployments and runbook runs, and system operations such as applying retention policies. Since Tasks consume resources on the Octopus Server while they are executing, the number of Tasks which can execute at the same time is limited by a task cap. See [increasing the task cap](/docs/support/increase-the-octopus-server-task-cap) for more information.

Each task has a task log recording what happened while it ran. Every log line carries both the time Octopus Server observed the output and the time the machine that produced it says it occurred. See [task log timestamps](/docs/tasks/task-log-timestamps) for how to switch between the two.
