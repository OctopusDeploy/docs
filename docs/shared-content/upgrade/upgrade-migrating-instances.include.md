### Migrating to a new instance 

It will be possible to run both the old and cloned instances side by side.  Both of them can deploy to the same targets (assuming you are not using polling Tentacles).  But there are a few items to keep in mind.

- The Octopus Server is tightly coupled with Calamari.  Deploying to the same target from both servers will result in Calamari getting upgraded/downgraded a lot.  
- The newer Octopus Server will prompt you to upgrade the Tentacles.  While running both instances side by side, you will want to avoid this.
- Unless the cloned instance has the same domain name, polling Tentacles will not connect to the cloned instance.  A clone of the polling Tentacles might need to be created.
- The thumbprints for certificates and other sensitive items are stored in the Octopus Deploy database.  Cloning the database cloned those values.

### Considerations

As you migrate your instance, here are few items to consider.  

1. Will the new instance's domain name be the same, or will it change?  For example, will it change from https://octopusdeploy.mydomain.com to https://octopus.mydomain.com.  If it changes and you are using polling Tentacles, you will need to create new Tentacle instances for the new Octopus Deploy instance.
2. What CI, or build servers, integrate with Octopus Deploy?  Do those plug-ins need to be updated?  You can find several of the plug-ins on the [downloads page](https://octopus.com/downloads).
3. Do you have any internally developed tools or scripts that invoke the Octopus API?  We've done our best to maintain backward compatibility, but there might be some changes.  
4. What components do you use the most?  What does a testing plan look like? 
5. Chances are there are new features and functionality you haven't been exposed to.  How will you train people on the new functionality?  If unsure, please [contact us](https://octopus.com/support) to get pointed in the right direction.

### Drift concerns

While it is possible to run two instances side by side, each minute that passes, the two instances will drift further apart.  Changes to the deployment process, new packages, new and releases deployments will be happening during this time.  

If you find yourself needing more time than a few days, a week tops, consider setting up a test instance.  Or using this newly cloned instance as a test instance.  Work out all the kinks on the test instance, then restart the cloning process on a fresh instance.

:::hint
If you are unsure how long the migration will take, consider setting up a test instance first.  Work out all the kinks, then start the cloning process.
:::

### Polling Tentacles

A Polling Tentacle can only connect to one Octopus Deploy instance.  It connects via DNS name or IP address.  If the new instance's DNS name changes - for example, the old instance was https://octopusdeploy.mydomain.com with the new instance set to https://octopus.mydomain.com - you'll need to clone each Polling Tentacle instance.

Each Polling Tentacle will need to be cloned on each deployment target.  To make things easier, we have provided [this script](https://github.com/OctopusDeployLabs/SpaceCloner/blob/master/CloneTentacleInstance.ps1) to help clone a Tentacle instance.  That script will look at the source instance, determine the roles, environments, and tenants, then create a cloned Tentacle and register that cloned Tentacle with your cloned instance.  

:::hint
Any script that clones a Tentacle instance must be run on the deployment target.  It cannot be run on your development machine.  
:::

### Executing the cutover

Cutting over from the old instance to the new instance will require a bit of downtime and should be done off hours.

1. Enable maintenance mode on the old instance to put it into read-only mode.
1. Ensure all CI servers are pointing to the new instance (or change DNS).
1. You don't have to upgrade Tentacles right away.  Newer versions of Octopus Deploy [can communicate with older versions of Tentacles](/docs/support/compatibility.md).  You can upgrade a set at a time instead of upgrading everything, starting in 2020.x you can perform a search on the deployment target page and update only the returned Tentacles.  Or, you can [upgrade Tentacles per environment](https://www.youtube.com/watch?v=KVxdSdYAqQU&t=352s).  