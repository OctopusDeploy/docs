---
title: Upgrading host OS or .NET
description: A how-to guide on how to upgrade the host OS or .NET with Octopus Deploy.
position: 7
---

Eventually, the server hosting Octopus Deploy or the .NET version installed will reach the end of life.  From both a practical and security point of view, continuing to run Octopus Deploy on unsupported software is not recommended.  But upgrades take time, from configuring to testing.  And there is a risk of downtime.  

## Recommended approach - leverage high availability

If you have a Data Center or a Server license, it is possible to upgrade the host OS or .NET without downtime and with minimal risk.  Those licenses support an unlimited number of high availability (HA) nodes.  If you do not have HA configured, this is an excellent time to do it.  There are numerous benefits, including horizontal scaling, a more robust CI/CD pipeline, and low friction maintenance.

Please see our guide on [configuring high availability](/docs/administration/high-availability/configure/index.md).

Once high availability is configured, the process to upgrade the host OS will be:

1. Create a new VM with the desired OS or .NET installed.
2. Install Octopus Deploy on that new VM and add it as a new node.
3. In the Octopus UI, go to **{{Configuration, Nodes}}**, click the overflow menu (`...`) next to the new node you just created, and set the task cap to 0. 

The new node is now part of the HA cluster, but it isn't part of the load balancer, so it doesn't accept UI requests or processing tasks.  At this point, you can slowly bring this new node online.

### Test the Octopus UI on the new node

The first step is to test the Octopus UI to make sure it is responding correctly.  To do that, you can follow this process.  It is meant to take a little bit of time to reduce risk.  If at any point something isn't working, contact [support@octopus.com](mailto:support@octopus.com).

1. Navigate directly to the new VM and use Octopus Deploy as you'd regularly do for a few hours or days.
2. Assuming everything is working as expected, add the new node into the load balancer.  If possible, configure the load balancer to only use the new node for 10 or 20% of all requests.
3. Assuming everything is working as expected, and no one is complaining, configure the load balancer to send traffic equally to all nodes.  If you are unsure as to which node returned the UI request, you can check the network trace in your tooling; the node name is returned in the `Octopus-Node` response header.
4. If, at any point, something isn't working right, remove the new VM from the load balancer to investigate further.

### Have the new node process tasks

Now that the new node is hosting UI requests without issue, it is time to move onto processing tasks.  Just like with the UI, the idea is to ease the new VM into processing tasks.

1. Pick a time with minimal deployments.  Change the task cap on all the existing nodes to 0, change the task cap on the new node to 5.  Do a couple of test deployments and health checks.  
2. Assuming the new node had no problem processing tasks, change the task cap on the new node back to 1.  Change the task cap on all the other nodes back to the original value.  Wait a few days and keep an eye out for any failures.
3. Assuming all the tasks the new node picks up are processed successfully, change the task cap to match all the other nodes.  
4. If, at any point, something isn't working right, change the task cap back to zero to investigate further. 

### Removing older nodes

Wait a few days or weeks.  If no oddities come up, go through the decommissioning process of the old nodes.  

## Alternative approach - clone instance

Configuring High Availability can take time.  Or you might be on a license which doesn't support HA.  The other option is to clone the instance and migrate over.

### Process

Creating a clone of an existing instance involves:

1. Stop the current instance of Octopus Deploy.
1. Download the same version of Octopus Deploy as your current instance.
1. Installing that version on a new server and configure it to point to the existing database.
1. Copying all the files from the backed up folders from the source instance.
1. Test cloned instance.  Verify all API scripts, CI integrations, and deployments work.
1. Migrate over to using a new instance. 

If anything goes wrong, stop the cloned instance, and start the old instance back up.

!include <upgrade-download-same-version>
!include <upgrade-install-cloned-version>
!include <upgrade-copy-files-for-cloned-instance>
!include <upgrade-octopus-backup-folders>

### Migrating over to a new instance

All the sensitive variables, certificates, and other items required to connect to your deployment targets are stored in the database.  Assuming you are not using polling Tentacles (or if you are, the DNS name hasn't changed), everything should work out of the box.  Start running some tests on the new instance to make sure the new host OS or .NET version hasn't broken anything.

### Considerations

As you migrate your instance, here are few items to consider.  

1. Will the new instance's domain name be the same or will it change?  For example, will it change from https://octopusdeploy.mydomain.com to https://octopus.mydomain.com.  If it changes and you are using polling Tentacles, you will need to create new Tentacle instances for the new Octopus Deploy instance.
2. What CI, or build servers, integrate with Octopus Deploy?  Do those plug-ins need to be updated?  You can find several of the plug-ins on the [downloads page](https://octopus.com/downloads).
3. Do you have any internally developed tools or scripts that invoke the Octopus API?  We've done our best to maintain backward compatibility, but there might be some changes.  
4. What components do you use the most?  What does a testing plan look like? 
5. Chances are there are new features and functionality you haven't been exposed to.  How will you train people on the new functionality?  If unsure, please [contact us](https://octopus.com/support) to get pointed in the right direction.

### Polling Tentacles

A polling Tentacle can only connect to one Octopus Deploy instance.  It connects via DNS name or IP address.  If the new instance's DNS name changes - for example, the old instance was https://octopusdeploy.mydomain.com with the new instance set to https://octopus.mydomain.com - you'll need to clone each polling Tentacle instance.

Each polling Tentacle will need to be cloned on each deployment target.  To make things easier, we have provided [this script](https://github.com/OctopusDeployLabs/SpaceCloner/blob/master/CloneTentacleInstance.ps1) to help clone a Tentacle instance.  That script will look at the source instance, determine the roles, environments, and tenants, then create a cloned Tentacle and register that cloned Tentacle with your cloned instance.  

:::hint
Any script that clones a Tentacle instance must be run on the deployment target.  It cannot be run on your development machine.  
:::
