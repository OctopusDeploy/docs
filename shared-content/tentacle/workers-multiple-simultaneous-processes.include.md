Many workers may be running in parallel and a single worker can run multiple actions in parallel.  

The [task cap](/docs/support/increase-the-octopus-server-task-cap/) determines how many tasks (deployments or system tasks) can run simultaneously.  The [system variable](/docs/projects/variables/system-variables/) `Octopus.Action.MaxParallelism` controls how much parallelism is allowed in executing a deployment action.  It applies the same to deployment targets as it does to workers.   For example, if `Octopus.Action.MaxParallelism` is set to its default value of 10, any one deployment action will:
- Deploy to at most 10 deployment targets simultaneously, or 
- Have no more than 10 concurrent worker invocations running. 

Parallel steps in a deployment can each reach their own `MaxParallelism`.  Coupled with multiple deployment tasks running, up to the task cap, you can see the number of concurrent worker invocations can grow quickly.

External workers and the built-in worker have the same behavior in this regard and in that Workers can run many actions simultaneously and can run actions from different projects simultaneously.  Note that this means the execution of an action doesn't have exclusive access to a worker, which could allow one project to access the working folder of another project.

Note that if external workers are added to the default pool, then the workload is shared across those workers: a single external worker will be asked to perform exactly the same load as the built-in worker would have been doing, two workers might get half each, etc.