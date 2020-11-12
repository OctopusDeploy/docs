It will be possible to run both the old and cloned instances side by side.  In fact, both of them can deploy to the same targets (assuming you are not using polling tentacles).  But there are a few items to keep in mind.

- The Octopus Server is tightly coupled with Calamari.  Deploying to the same target from both servers will result in Calamari getting upgraded/downgraded a lot.  
- The newer Octopus Server will prompt you to upgrade the tentacles.  While running both instances side by side you will want to avoid this.
- Unless the cloned instance has the same domain name, polling tentacles will not connect to the cloned instance.  A clone of the polling tentacles might need to be created.

### Drift Concerns

While it is possible to run two instances side by side, each minute that goes the two instances will drift further apart.  Changes to deployment process, new packages, new and releases deployments will be happening during this time.  

If you find yourself needing more time than a few days, a week tops, consider setting up a test instance.  Or using this newly cloned instance as a test instance.  Work out all the kinks on the test instance, then restart the cloning process on a fresh instance.

:::hint
If you are unsure how long the migration will take, consider setting up a test instance first.  Work out all the kinks then start the clone process.
:::

### Polling Tentacles

A polling tentacle can only connect to one Octopus Deploy instance.  It connects via DNS name or IP address.  If the new instance's DNS name changes - for example the old instance was https://octopusdeploy.mydomain.com with the new instance set to https://octopus.mydomain.com - you'll need to clone each polling tentacle instance.

Each polling tentacle will need to be cloned on each deployment target.  To make things easier, we have provided [this script](https://github.com/OctopusDeployLabs/SpaceCloner/blob/master/CloneTentacleInstance.ps1) to help clone a tentacle instance.  That script will look at the source instance, determine the roles, environments, and tenants, then create a cloned tentacle and register that cloned tentacle with your cloned instance.  

:::hint
Any script that clones a tentacle instance must be run on the deployment target.  It cannot be run on your development machine.  
:::

### Executing the cutover

After testing and verification comes the cutover.  

1. Enable maintenance mode on the old instance to put it into read-only mode.
1. Ensure all CI servers are pointing to the new instance (or change DNS).
1. You don't have to upgrade tentacles right away.  Newer versions of Octopus Deploy [can communicate with older versions of tentacles](/docs/support/compatibility).  You can upgrade a set at a time instead of upgrading everything.  Starting in 2020.x you can perform a search on the deployment target page and update only the returned tentacles.  Or, you can [upgrade tentacles per environment](https://www.youtube.com/watch?v=KVxdSdYAqQU&t=352s).  