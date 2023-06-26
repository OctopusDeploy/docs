The size of your Octopus Deploy instance will be dependent on the number of users and concurrent tasks.  A task includes (but not limited to):

- Deployments
- Runbook run
- Retention Policies
- Health Checks
- Let's Encrypt
- Process triggers
- Process subscriptions
- Script console run
- Sync built-in package repository
- Sync community library step-templates
- Tentacle upgrade
- Upgrade calamari
- Active Directory sync

A good starting point is:

- Small teams/companies or customers doing a POC with 5-10 concurrent tasks:
    - 1 Octopus Server: 2 Cores / 4 GB of RAM
    - SQL Server Express: 2 Cores / 4 GB of RAM or Azure SQL with 25-50 DTUs
- Small-Medium companies or customers doing a pilot with 5-20 concurrent tasks:
    - 1-2 Octopus Servers: 2 Cores / 4 GB of RAM each
    - SQL Server Standard or Enterprise: 2 Cores / 8 GB of RAM or Azure SQL with 50-100 DTUs
- Large companies doing 20+ concurrent tasks:
    - 2+ Octopus Servers: 4 Cores / 8 GB of RAM each
    - SQL Server Standard or Enterprise: 4 Cores / 16 GB of RAM or Azure SQL with 200+ DTUs

:::div{.hint}
These suggestions are a baseline. Monitor your Octopus Server and SQL Server performance on all resources including CPU, memory, disk, and network, and increase resources when needed. 
:::

If you have a Server or Data Center license you can leverage [Octopus High Availability](/docs/administration/high-availability) to scale out your Octopus Deploy instance.  With that option we recommend adding more nodes with 4 cores / 8 GB of RAM instead of increasing resources on one single node.  Scaling vertically will only get you so far, at some point you run into underlying host limitations.
