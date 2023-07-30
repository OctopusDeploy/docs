### Octopus Deploy components

Before performing an in-place upgrade, it is essential to note the various components of Octopus Deploy.  Most in-place upgrades will only change the install location and the SQL Server database.  Very rarely will an in-place upgrade change the home folder or server folders.

The Windows Service is split across multiple folders to make upgrading easy and low risk.

- **Install Location**: By default, the install location for Octopus on Windows is `C:\Program Files\Octopus Deploy\Octopus`.  The install location contains the binaries for Octopus Deploy and is updated by the MSI.
- **SQL Server Database**: Since `Octopus Deploy 3.x`, the back-end database has been SQL Server.  Each update can contain 0 to N database scripts embedded in a .dll in the install location.  The `Octopus Manager` invokes those database scripts automatically.
- **Home Folder**: The home folder stores configuration, logs, and other items unique to your instance.  The home folder is separate from the install location to make it easier to upgrade, downgrade, uninstall/reinstall without affecting your instance.  The default location of the home folder is `C:\Octopus`.  Except in rare cases, this folder is left unchanged by the upgrade process.
- **Instance Information**: The Octopus Deploy Manager allows you to configure 1 to N instances per Windows Server.  The `Octopus Manager` stores a list of all the instances in the `C:\ProgramData\Octopus\OctopusServer\Instances` folder.   Except in rare cases, this folder is left unchanged by the upgrade process.  
- **Server Folders**: Logs, artifacts, packages, and event exports are too big for Octopus Deploy to store in a SQL Server database.  The server folders are subfolders in `C:\Octopus\`.  Except in rare cases, these folders are left unchanged by an upgrade.  
- **Tentacles**: Octopus Deploy connects to deployment targets via the Tentacle service.  Each version of Octopus Deploy includes a specific Tentacle version.  Tentacle upgrades do not occur until _after_ the Octopus Deploy server is upgraded.  Tentacle upgrades are optional; any Tentacle greater than 4.x will work [with any modern version of Octopus Deploy](/docs/support/compatibility).  We recommend you upgrade them to get the latest bug fixes and security patches when convenient.  
- **Calamari**: The Tentacles facilitate communication between Octopus Deploy and the deployment targets.  Calamari is the software that does the actual deployments.  Calamari and Octopus Deploy are coupled together.  Calamari is upgraded automatically during the first deployment to a target.components.

### Install the newer version of Octopus Deploy

Installing a newer version of Octopus Deploy is as simple as running MSI and following the wizard.  The MSI will copy all the binaries to the install location.  Once the MSI is complete, it will automatically launch the `Octopus Manager`.

### Validation Checks

Octopus Deploy will perform validation checks before upgrading the database.  These validation checks include (but are not limited to):

- Verify the current license will work with the upgraded version.
- Verify the current version of SQL Server is supported.

If the validation checks fail, don't worry, install the [previously installed version of Octopus Deploy](https://octopus.com/downloads/previous), and you will be back up and running quickly.

### Database Upgrades

Each release of Octopus Deploy contains 0 to N database scripts to upgrade the database.  The scripts are run in a transaction; when an error occurs, the transaction is rolled back.  If a rollback does happen, gather the logs and send them to [support@octopus.com](mailto:support@octopus.com) for troubleshooting.  You can install the previous version to get your CI/CD pipeline back up and running.