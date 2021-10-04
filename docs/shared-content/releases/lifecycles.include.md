<iframe width="560" height="315" src="https://www.youtube.com/embed/ofc-u61ukRA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Lifecycles give you control over the way releases of your software are promoted between your environments. You can also use them to automate deployments and set retention policies.

Lifecycles are managed from the library page by navigating to **{{Library,Lifecycles}}**:

![The lifecyles area of the Octopus Web Portal](/docs/shared-content/releases/images/lifecycles.png "width=500")

Octopus automatically creates a [default lifecycle](/docs/releases/lifecycles/index.md#default-lifecycle) for you that contains a phase for each environment that you've created in Octopus Deploy. When you deploy your software it passes through the phases of the lifecycle in order.
