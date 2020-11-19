### Octopus Deploy Components

Before performing an in-place upgrade, it is important to make note of the various components of Octopus Deploy.  Most in-place upgrades will only change the install location and the SQL Server database.  Very rarely will an in-place upgrade change the home folder or server folders.

- **Install Location** By default, Octopus Deploy is installed into the `C:\Program Files\Octopus Deploy\Octopus` folder.  This folder contains the binaries for Octopus Deploy.  This is what the Octopus Deploy installer updates by installing new binaries.
- **SQL Server Database** Since `Octopus Deploy 3.x` the backend database has been SQL Server.  A major or minor version change will result in 1 to N database scripts, which are embedded in a .dll in the install location.  The `Octopus Manager` invokes those database scripts.
- **Home Folder** The home folder stores configuration, logs, and other items unique to your instance.  The home folder is separate from the install location to make it easier to upgrade, downgrade, uninstall/reinstall without affecting your instance.  The default location of the home folder is `C:\Octopus`.  Except in rare cases, this folder is left unchanged by the upgrade process.
- **Instance Information** The Octopus Deploy Manager allows you to configure 1 to N instances per Windows Server.  The `Octopus Manager` stores a list of all the instances in the `C:\ProgramData\Octopus\OctopusServer\Instances` folder.   Except in rare cases, this folder is left unchanged by the upgrade proces..  
- **Server Folders** Some information, such as logs, artifacts, and packages that Octopus Deploy captures is too big to store in a SQL Server database.  The server folders are subfolders in `C:\Octopus\`.  Except in rare cases, these folders are left unchanged by an upgrade.  
- **Tentacles** Octopus Deploy connects to deployment targets via the Tentacle service.  Each version of Octopus Deploy includes a specific Tentacle version.  Upgrading Tentacles is done after the server is updated.  It is also optional.  Any Tentacle greater than 4.x will work [with any modern version of Octopus Deploy](/docs/support/compatibility.md).  We recommend you upgrade them to get the latest bug fixes and security patches.  That upgrade doesn't have to happen right away.
- **Calamari** The Tentacles facilite communication between Octopus Deploy and the deployment targets.  Calamari is the software that does the actual deployments.  A specific version Calamari is coupled with a specific version of Octopus Deploy.  Calamari is upgraded automatically during the first deployment to the target.

### Install the newer version of Octopus Deploy

Installing a newer version of Octopus Deploy is as simple as running MSI and following the wizard.  The MSI will copy all the binaries to the install location.  Once the MSI is complete it will automatically launch the `Octopus Manager`.

### Validation Checks

Octopus Deploy will perform validation checks prior to upgrading the database.  These validation checks include (but not limited to):

- Verify the current license will work with the upgraded version.
- Verify the current version of SQL Server is supported.

If the validation checks fail, don't worry, install the [previously installed version of Octopus Deploy](https://octopus.com/downloads/previous) and you will be back up and running quickly.

### Database Upgrades

Each release of Octopus Deploy contains 0 to N database scripts to upgrade the database.  The scripts are run in a transaction, when an error occurs, the transaction is rolled back.  If a rollback does happen, gather the logs and send them to support@octopus.com for troubleshooting.  You can install the previous version to get back up and running.