## SQL Server Database

Octopus works with a wide range of versions and editions of SQL Server, from a local SQL Server Express instance, all the way to an Enterprise Edition [SQL Server Failover Cluster](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server) or [SQL Server AlwaysOn Availability Group](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server), or even one of the hosted database-as-a-service offerings.

The following versions of SQL Server Database are supported and automatically tested against every release of Octopus Server:

| Octopus Server    | Minimum SQL Server version          | Azure SQL
| --------------    | ----------------------------------- |----------   |
| 2020.2.x  ➜ latest  | SQL Server 2016+                    | Supported   |
| 3.0  ➜ 2019.13    | SQL Server 2008+                    | Supported   |

:::hint
The following versions of Octopus have a requirement for SQL Server 2017+.
- 2020.2.0 ➜ 2020.2.17
- 2020.3.0 ➜ 2020.3.5

This requirement has been relaxed to SQL Server 2016+ for any patch version **later** than specified in this note. Please see [this post](https://octopus.com/blog/raising-minimum-requirements-for-octopus-server) for further details.
:::

Supported editions:

- Express (free)
- Web
- Datacenter
- Standard
- Enterprise
- Microsoft Azure SQL Database
- AWS RDS SQL Database

:::warning
**Warning:** Octopus does not support database mirroring or SQL Server replication. Having these features turned on may cause errors during configuration. [More information](/docs/administration/data/octopus-database/index.md#Octopusdatabase-highavailability).
:::
