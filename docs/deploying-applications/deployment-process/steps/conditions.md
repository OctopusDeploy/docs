---
title: Conditions
description: Adding conditions to steps to define your project's deployment process.
position: 6
---

Steps and actions can also have conditions. You can restrict a step so that it only runs when deploying to specific [environments](/docs/infrastructure/environments/index.md) (e.g., an Email step that only runs on production deployments).

![](3277617.png "width=500")

If you have created some [channels](/docs/deploying-applications/deployment-process/projects/channels.md), you can also specify whether a step runs only when deploying a release through specific channels (e.g., a Script step that only runs for deployments through certain channels to configure extra telemetry). *This will only appear if you have created one or more non-default channels.*

![](3278573.png "width=500")

You can also specify whether a step runs only when previous steps are successful (default), when a previous step fails, or always.

![](3277616.png "width=500")
