:::hint
If your process creates dynamic deployment targets from a script, and then deploys to those targets in a subsequent step, make sure you add a full [health check](/docs/projects/built-in-step-templates/health-check/) step for the role of the newly created targets after the step that creates and registers the targets.

This allows Octopus to ensure the new targets are ready for deployment by staging packages required by subsequent steps that perform the deployment.
:::