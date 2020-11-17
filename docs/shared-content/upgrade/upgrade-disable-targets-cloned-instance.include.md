### Disabling All Targets - Optional

A cloned instance is what it says on the tin, a cloned instance.  Assuming you are not using polling tentacles, all the deployments will "just work."  This is by design in the event the VM hosting Octopus Deploy is lost and you have to restore Octopus Deploy from a backup.  

This is a double edge sword as you might have triggers, auto release creation, and other items configured.  These items could potentially perform deployments.  The safest thing to do is to disable all the targets.  You can find a script on how to do that in the [API Examples section](docs/octopus-rest-api/examples/deployment-targets/enable-disable-machine).