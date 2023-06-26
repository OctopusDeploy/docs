Sometimes it's not desirable to run multiple deployments or runbooks on a Worker in parallel. Doing so can cause issues if one or more processes try to access a shared resource, such as a file.

By default, the [system variable](/docs/projects/variables/system-variables) `OctopusBypassDeploymentMutex` is set to `True` when deploying to a worker . If you want to prevent workers running tasks in parallel you can set `OctopusBypassDeploymentMutex` to `False`.
