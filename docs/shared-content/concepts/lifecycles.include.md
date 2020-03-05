Lifecycles give you control over the way releases of your software are promoted between your environments. Lifecycles enable a number of advanced deployment workflow features:

- **Control the order of promotion**: for example, to prevent a release being deployed to *production* if it hasn't been deployed to *staging*.
- **Automate deployment to specific environments**: for example, automatically deploy to *test* as soon as a release is created.
- **Retention policies**: specify the number of releases to keep depending on how far they have progressed through the lifecycle.

Lifecycles are defined by phases. A lifecycle can have one or many phases.

- Phases occur in order. One phase must have a complete, successful deployment before the release will be deployed to the next phase.
- Phases have one or more environments.
- Environments in a phase can be defined as automatic deployment environments or manual deployment environments.
- Phases can have a set number of environments that must be released to before the next phase is available for deployment.

You can specify multiple Lifecycles to control which projects are deployed to which environments.

Lifecycles are managed from the library page by navigating to **{{Library,Lifecyles}}**:

![The lifecyles area of the Octopus Web Portal](/docs/shared-content/concepts/images/lifecycles.png)
