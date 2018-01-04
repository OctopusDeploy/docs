:::hint
**Max Parallelism**
When enabling **OctopusBypassDeploymentMutex** there are a couple of special variables that may impact the number of parallel tasks that are run.

* `Octopus.Acquire.MaxParallelism`
    * This variable limits the number of package acquisitions that can run simultaneously on the Tentacle
    *  By default, this is set to `10`
* `Octopus.Action.MaxParallelism`
    * This variable limits the maximum number of machines on which the action will concurrently execute
    * By default, this is set to `10`
:::