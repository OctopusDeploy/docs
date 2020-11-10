Creating a clone of an existing instance involves:

1. Restore the backup of the database as a new database on the desired SQL Server.  
2. Downloading the same version of Octopus Deploy as the source from the [previous downloads page](https://octopus.com/downloads).
3. Installing that version on a new server.
4. Configuring an instance to point to the existing database.
5. Copying all the files from the backed up folders from the source instance.
6. Optional: Disabling targets, triggers and subscriptions
7. Testing cloned instance.

### Configuring an instance to point to the existing database

After you install Octopus Deploy on the new server you will be prompted to create an instance.  Follow the wizard, and on the section where you configure the database, select the pre-existing database.

![](images/select-existing-database.png)

Selecting an existing database will ask you to enter the master key.

![](images/enter-master-key.png)

Enter the master key you backed up earlier and the manager will verify the connection works.

### Copy all the files from the backed up folders

After the instane has been created, copy all the contents from the following folders from either the backed up location or the source instance.

- Artifacts -> default is `C:\Octopus\Artificats`
- Packages -> default is `C:\Octopus\Packages`
- Tasklogs -> default is `C:\Octopus\Tasklogs`

Failure to copy over files will result in:
- Empty deployments
- Missing packages on the internal package feed
- Missing project or tenant images
- And more

### Disabling Triggers, Subscriptions, and Auto Deployments

A cloned instance is what it says on the tin, a cloned instance.  Assuming you are not using polling tentacles, all the deployments will "just work."  This is by design in the event the VM hosting Octopus Deploy is lost and you have to restore Octopus Deploy from a backup.  

This is a double edge sword as you might have triggers, auto release creation, and other items configured.  These items could potentially perform deployments.  The safest thing to do is to disable all the targets.  You can find a script on how to do that in the [API Examples section](docs/octopus-rest-api/examples/deployment-targets/enable-disable-machine).

### Testing the cloned instance

By this point you should have a fully functional cloned instance.  Before doing anything else, perform some tests to make sure you are in a known good state.

Here is a good set of baseline tests.
- If you disabled all targets, enable a couple and do a test deployment.
- Make sure a few other users can log in.  If you are using Active Directory, make sure that authentication is working.
- Are there project images, do they appear on the dashboard?
- Do old deployments show all the logs?  Can you download artifacts?