---
title: Lifecycles
description: Lifecycles give you control over the way releases are promoted between environments.
position: 110
---

!include <lifecycles>

## Create a new lifecycle

1. From the **Lifecycle** page, click on the **ADD LIFECYCLE** button.
1. Give the Lifecycle a name and add a description.
1. Click **ADD PHASE** to add a phase to the lifecycle.
1. Give the phase a name, for instance, **Development**.
1. Click **ADD ENVIRONMENT** and select the environment that will be deployed to during this phase of the lifecycle, for instance, the **Development** environment.
1. Click **ADD PHASE** again and add as many phases as you need.
1. Click **SAVE** to save your lifecycle.

## Change the lifecycle for a deployment process

By default, deployment processes will use the default lifecycle.

1. Navigate to **{{Projects}}** and select the project.
1. Click **Process** and you will see the current lifecycle.
1. Click **CHANGE** and select the required lifecycle and click **SAVE**.

:::success
To learn more about release management and lifecycles refer to [lifecycles documentation](/docs/managing-releases/lifecycles/index.md).
:::

Return to the [getting started guides](/docs/getting-started-guides/index.md).