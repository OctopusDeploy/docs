### Upgrade High Availability

In general, upgrading a high avalabile instance of Octopus Deploy follows the same steps as a typical in-place upgrade.  Download the latest MSI and install that.  The key difference is to upgrade only one node first, as this will upgrade the database, then upgrade all the remaining nodes.  

:::warning
Attempting to upgrade all nodes at the same time will most likely lead to deadlocks in the database.
:::

The process should look something like this:

1. Download the latest version of Octopus Deploy.
1. Enable maintenance mode.
1. Stop all the nodes.
1. Backup the database.
1. Select one node to upgrade, wait until finished.
1. Upgrade all remaining nodes.
1. Start all nodes (not started).
1. Test upgraded instance.
1. Disable maintenance mode.

Please see the documentation on [automating upgrades](/docs/administration/upgrading/guide/automate-upgrades.md) to make that process much easier.