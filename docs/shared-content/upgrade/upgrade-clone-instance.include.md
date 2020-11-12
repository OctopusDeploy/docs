Cloning an instance is low-risk because:

- Modern versions of Octopus Deploy can communicate with [older tentacles](docs/support/compatibility).
- The thumbprints for certificates and other sensitive items are stored in the Octopus Deploy database.  

A high-level overview of the process is:

1. Backup the existing Octopus Deploy instance.
1. Create a clone of the existing Octopus Deploy instance.
2. Upgrade that cloned instance to a modern version of Octopus Deploy.
3. Test the upgraded instance.
4. Migrate from the old instance to the new instance.
5. Turn off the old instance.

Before diving into the upgrade, please take thet ime to answer these questions.

1. Will the new instance's domain name be the same or will it change?  For example, will it change from https://octopusdeploy.mydomain.com to https://octopus.mydomain.com.  If it changes and you are using polling tentacles you will need to create new tentacle instances for the new Octopus Deploy instance.
2. What CI, or build servers, integrate with Octopus Deploy?  Do those plug-ins need to be updated?  You can find several of the plug-ins on the [downloads page](https://octopus.com/downloads).
3. Do you have any internally developed tools or scripts that invoke the Octopus API?  We've done our best to maintain backward compatability, but there might be some changes.  
4. What components do you use the most?  What does a testing plan look like? 
5. Chances are there are new features and functionality you haven't been exposed to.  How will you train people on the new functionality?  If unsure, reach out to advice@octopus.com and to get pointed in the right direction.