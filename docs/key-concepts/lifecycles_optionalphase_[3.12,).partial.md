### Optional Phases {#Lifecycles-OptionalPhases}

Introduced in `3.12.8`, Optional Phases allow you to configure a phase to be optionally skipped when it is reached in the Lifecycle. This allows you to release to environments in the next phase without deploying to _any_ in the optional phase. The standard Lifecycle progression and Automatic Deployment rules apply that determine when an optional phase is deployable. 

This feature may be useful for scenarios such as the provision of `Testing` phase that can optionally be deployed to, but isn't crucial to progressing on to `Production`. A previous work around for this feature would involve adding the `Testing` environment to the previous `Dev` phase with a specific minimum deployed environment count set, however this may result in the project being deployed to `Testing` _instead of_ the required `Dev` before progression.

![Optional LifeCycle](optional-lifecycle.png)