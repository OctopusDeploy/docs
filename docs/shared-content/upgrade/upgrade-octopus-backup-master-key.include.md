### Backup the Octopus Master Key

Octopus Deploy uses the master key to encrypt and decrypt sensitive values in the Octopus Deploy database.  The master key is securely stored on the server, not in the database.  If the VM hosting Octopus Deploy is somehow destroyed or deleted, the master key goes with it.  

To view the master key, you will need login permissions on the server hosting Octopus Deploy.  Once logged in, open up the Octopus Manager and click the view master key button on the left menu.

![](/docs/shared-content/upgrade/images/view-master-key.png)

Save the master key to a secure location, such as a password manager or a secret manager.  

An alternative means of accessing the master key is to run the `Octopus.Server.exe show-master-key` from the command line.  Please note: you will need to be running as an administrator to do that.

![](/docs/shared-content/upgrade/images/master-key-command-prompt.png)

### Backup the license key

Like the master key, the license key is necessary to restore an existing Octopus Deploy instance.  You can access the license key by going to **{{Configuration, License}}**.  If you cannot access your license key, please contact support@octopus.com and they can help you recover it.