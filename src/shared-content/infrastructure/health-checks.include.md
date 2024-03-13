Octopus periodically runs health checks on deployment targets and workers to ensure that they are available and running the latest version of Calamari.  

The health status of a deployment target can be set by custom health check scripts. Deployment targets can have four health statuses:

- Healthy
- Healthy with warnings
- Unhealthy
- Unavailable

A *healthy* deployment target completes a health check without any errors or warnings.  A deployment target that is *healthy with warnings* completes a health check but encounters a non-critical failure during the health check.  An *unhealthy* deployment target completes a health check but encounters a critical failure while running the health check script.  An *unavailable* deployment target is not contactable by Octopus during a health check.

You can review the health status of you deployment targets by navigating to **Infrastructure ➜ Deployment Targets**.

![Health status of deployment targets](/docs/shared-content/concepts/images/health-status.png)
