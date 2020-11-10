An in-place upgrade does what it says on the tin, upgrades an existing instance of Octopus Deploy.  

The in-place upgrade process is:
1. [Download the Octopus Deploy MSI](https://octopus.com/downloads) onto the host.
2. Run the MSI and follow the wizard.
3. Once the MSI is complete the Octopus Manager will take over and upgrade the database.

On average, depending on the size of the instance, the whole process will take anywhere from a few minutes to 20 minutes.  

### Validation Checks

Octopus Deploy will perform validation checks prior to upgrading the database.  

These validation checks include (but not limited to):

- Verify the current license will work with the upgraded version.
- Verify the current version of SQL Server is supported.

If the validation checks fail, don't worry, install the [previously installed version of Octopus Deploy](https://octopus.com/downloads/previous) and you will be back up and running quickly.

### Database Upgrades

Each release of Octopus Deploy contains 0 to N database scripts to upgrade the database.  The scripts are run in a transaction, when an error occurs, the transaction is rolled back.  If a rollback does happen, gather the logs (default location is `C:\Octopus\Logs`) and send them to support@octopus.com for troubleshooting.