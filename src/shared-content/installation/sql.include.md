Octopus Deploy requires a Microsoft SQL Server database to store configuration and history.

Octopus works with a wide range of versions and editions of SQL Server, from a local SQL Server Express instance, all the way to an Enterprise Edition [SQL Server Failover Cluster](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server) or [SQL Server AlwaysOn Availability Group](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server), or even one of the hosted database-as-a-service offerings.

Octopus supports versions of SQL Server that have at least 2 years of active support remaining from Microsoft. Versions approaching or past end-of-support are not supported.

### SQL Server Hosting Options 

SQL Server can be hosted on [Linux](https://learn.microsoft.com/en-us/sql/linux/sql-server-linux-overview) (including in a [container](https://learn.microsoft.com/en-us/sql/linux/sql-server-linux-docker-container-deployment)), [Windows](https://learn.microsoft.com/en-us/sql/database-engine/install-windows/install-sql-server), or in one of many managed offerings from Cloud Providers.

The requirements are:

- Must be running SQL Server 2016+ or Azure SQL
- Be located in the same data center as the servers/container hosts that host Octopus Deploy.

Below are some configuration guidelines for various options:

- [Self-managed on Linux or Windows](/docs/installation/sql-database/self-managed-sql-server)
- [AWS RDS](/docs/installation/sql-database/aws-rds)
- [Azure SQL](/docs/installation/sql-database/azure-sql)
- [GCP SQL](/docs/installation/sql-database/gcp-cloud-sql)

Supported editions:

- Express (free)
- Web
- Datacenter
- Standard
- Enterprise
- Microsoft Azure SQL Database
- AWS RDS SQL Database

:::div{.warning}
**Warning:** Octopus does not support database mirroring or SQL Server replication. Having these features turned on may cause errors during configuration. [More information](/docs/administration/data#high-availability).
:::

### Legacy Octopus version requirements

The following table outlines the minimum SQL Server version required by older Octopus Server releases.

| Octopus Server    | Minimum SQL Server version          | Azure SQL   |
| --------------    | ----------------------------------- |----------   |
| 2020.2.x ➜ latest | SQL Server 2016+                    | Supported   |
| 3.0  ➜ 2019.13    | SQL Server 2008+                    | Supported   |