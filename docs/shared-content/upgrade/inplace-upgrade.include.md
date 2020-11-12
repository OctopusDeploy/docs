An in-place upgrade does what it says on the tin, upgrades an existing instance of Octopus Deploy.  

The in-place upgrade process is:
1. Set the server into maintenance mode if it is not already in maintenance mode.
1. [Download the Octopus Deploy MSI](https://octopus.com/downloads) onto the host.
1. Run the MSI and follow the wizard.
1. Once the MSI is complete, the Octopus Manager will take over and upgrade the database.
1. Test the instance.
1. Disable maintenance mode.

On average, it takes between two and 20 minutes to complete the in-place upgrade.  This depends on the size of your instance, the number of scripts needing to run, and your hardware.    

### Maintenance Mode

Enabling [maintenance mode](/docs/administration/managing-infrastructure/maintenance-mode) will enable you to safely prepare your server for maintenance, allowing existing tasks to complete, and preventing changes you didn't expect.  Once enabled, only Octopus Administrators can make changes to the instance while maintenance mode is enabled.  

### Validation Checks

Octopus Deploy will perform validation checks prior to upgrading the database.  

These validation checks include (but not limited to):

- Verify the current license will work with the upgraded version.
- Verify the current version of SQL Server is supported.

If the validation checks fail, don't worry, install the [previously installed version of Octopus Deploy](https://octopus.com/downloads/previous) and you will be back up and running quickly.

### Database Upgrades

Each release of Octopus Deploy contains 0 to N database scripts to upgrade the database.  The scripts are run in a transaction, when an error occurs, the transaction is rolled back.  If a rollback does happen, gather the logs (default location is `C:\Octopus\Logs`) and send them to support@octopus.com for troubleshooting.

### High Availability

Each node in an high availablity Octopus Deploy cluster must run the same version.  Follow this process when upgrading an high availability cluster.

1. Set the server into maintenance mode if not already in maintenance mode.
1. Use the Octopus Manager to stop the service on each node.
1. [Download the Octopus Deploy MSI](https://octopus.com/downloads) onto the first node.
1. Run the MSI and follow the wizard.
1. Once the MSI is complete, the Octopus Manager will launch and upgrade the database.
1. Ensure that node is started up.
1. Download the Octopus Deploy MSI onto all the other nodes.
1. For each node run the MSI and follow the wizard.
1. Let the Octopus Manager complete it's tasks and ensure each node is running.
1. Disable maintenance mode.