## SQL Server Database

Octopus works with a wide range of versions and editions of SQL Server, from a local SQL Server Express instance, all the way to an Enterprise Edition [SQL Server Failover Cluster](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server) or [SQL Server AlwaysOn Availability Group](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server), or even one of the hosted database-as-a-service offerings.

Octopus supports versions of SQL Server that have at least 2 years of active support remaining from Microsoft. Versions approaching or past end-of-support are not supported.

### Legacy release requirements

The following table outlines the minimum SQL Server version required by older Octopus Server releases.

| Octopus Server    | Minimum SQL Server version          | Azure SQL   |
| --------------    | ----------------------------------- |----------   |
| 2020.2.x          | SQL Server 2016+                    | Supported   |
| 3.0  ➜ 2019.13    | SQL Server 2008+                    | Supported   |

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
