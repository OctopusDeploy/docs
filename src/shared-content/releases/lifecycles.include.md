[Getting Started - Lifecycles](https://www.youtube.com/watch?v=ofc-u61ukRA)

Lifecycles give you control over the way releases of your software are promoted between your environments. You can also use them to automate deployments and set retention policies.

Lifecycles are managed from the library page by navigating to **Library ➜ Lifecycles**:

:::figure
![The lifecycles area of the Octopus Web Portal](/docs/shared-content/releases/images/lifecycles.png)
:::

Octopus automatically creates a [default lifecycle](/docs/releases/lifecycles/#default-lifecycle) for you that contains a phase for each environment that you've created in Octopus Deploy. When you deploy your software it passes through the phases of the lifecycle in order.
