### Disabling All Targets - Optional

Cloning an instance includes clonding all certificates.  Assuming you are not using polling Tentacles, all the deployments will "just work."  That is by design if the VM hosting Octopus Deploy is lost and you have to restore Octopus Deploy from a backup.  

Just working does have a downside, as you might have triggers, auto release creation, and other items configured.  These items could potentially perform deployments.  The safest thing to do is to disable all the targets.  You can find a script on how to do that in the [API Examples section](/docs/octopus-rest-api/examples/deployment-targets/enable-disable-machine.md).