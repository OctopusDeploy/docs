### Backup the Octopus Master Key

Octopus Deploy uses the Master Key to encrypt and decrypt sensitive values in the Octopus Deploy database.  The Master Key is securely stored on the server, not in the database.  If the VM hosting Octopus Deploy is somehow destroyed or deleted, the Master Key goes with it.  

To view the Master Key, you will need login permissions on the server hosting Octopus Deploy.  Once logged in, open up the Octopus Manager and click the view master key button on the left menu.

:::figure
![](/docs/shared-content/upgrade/images/view-master-key.png)
:::

Save the Master Key to a secure location, such as a password manager or a secret manager.  

An alternative means of accessing the Master Key is to run the `Octopus.Server.exe show-master-key` from the command line.  Please note: you will need to be running as an administrator to do that.

:::figure
![](/docs/shared-content/upgrade/images/master-key-command-prompt.png)
:::

### Backup the License Key

Like the Master Key, the License Key is necessary to restore an existing Octopus Deploy instance.  You can access the License Key by going to **Configuration ➜ License**.  If you cannot access your License Key, please contact our [support team](https://octopus.com/support) and they can help you recover it.