### Upgrade High Availability

In general, upgrading a high available instance of Octopus Deploy follows the same steps as a typical in-place upgrade.  Download the latest MSI and install that.  The key difference is to upgrade only one node first, as this will upgrade the database, then upgrade all the remaining nodes.  

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
1. Start all remaining stopped nodes.
1. Test upgraded instance.
1. Disable maintenance mode.

:::warning
A small outage window will occur when upgrading a highly available Octopus Deploy instance.  The outage window will happen between when you shut down all the nodes and upgrade the first node.  The window duration depends on the number of database changes, the size of the database, and compute resources.  It is highly recommended to [automate your upgrade process](/docs/administration/upgrading/guide/automate-upgrades) to reduce that outage window.
:::
