---
title: Compatibility
description: Backward compatibility between Octopus Server and related components
position: 190
---

The table below outlines the backward compatibility between Octopus Server and related components

| Octopus Server    | Octopus.Client & Octopus CLI (octo) | Calamari         | Tentacle      | TeamCity Plugin  |
| --------------    | ----------------------------------- | ------------     | ------------  | ---------------  |
| 3.2               | 3.2                                 | 3.0 ➜ latest    | 3.2           |                  |
| 3.3               | 3.3 ➜ 4.30.3                       | 3.3              | 3.0 ➜ latest | 3.3 ➜ latest    |
| 3.4               | 3.3 ➜ 4.30.3                       | 3.4              | 3.0 ➜ latest | 3.3 ➜ latest    |
| 3.5 ➜ 2018.2     | 3.3 ➜ 4.30.3                       | 3.5 ➜ latest    | 3.0 ➜ latest | 3.3 ➜ latest    |
| 2018.2 ➜ 2018.12 | 4.30.7 ➜ 4.47.0                    | 3.5 ➜ latest    | 3.0 ➜ latest | 3.3 ➜ latest    |
| 2019.1*           | 5.0.0 ➜ 5.2.7                      | 3.5 ➜ latest    | 4.0 ➜ latest | 5.0 ➜ latest    |
| 2019.2* ➜ 2022.1 | 6.0.0 ➜ latest                     | 3.5 ➜ latest    | 4.0 ➜ latest | 5.0 ➜ latest    |
| 2022.2** ➜ latest | 6.0.0 ➜ latest                     | 3.5 ➜ latest    | 6.2 ➜ latest | 5.0 ➜ latest    |

## &ast; Partial forwards compatibility

Older versions of some libraries and plugins _may_ work with **2019.1** and higher _only if_ the [default space](https://oc.to/default-space) is enabled and such integrations are only used against that space. To make use of other spaces, please upgrade.

However, **2019.1** also carries some breaking changes to the API so care must be taken when upgrading from a prior version that existing integrations are not affected. There is a comprehensive rundown of these changes available in our [downloads section](https://octopus.com/downloads/compare?from=2018.12.1&to=2019.1.0).

The table below outlines partially forwards compatible scenarios between Octopus Server and related components

| Octopus Server    | Octopus.Client & Octopus CLI (octo) | Calamari     | Tentacle    | TeamCity Plugin |
| --------------    | ----------------------------------- | --------     | --------    | --------------- |
| 2019.1  ➜ latest | 4.30.7 ➜ 4.47.0                    | 3.5 ➜ 4.12.0 | 3.0 ➜ 3.25 | 3.3 ➜ latest   |

### &ast;&ast; Partial forwards compatibility with older Tentacles

Versions of Tentacle older than **6.2** will still work with Octopus **2022.2** and higher. However, you may experience longer wait times when running tasks. We recommend upgrading all Tentacles to ensure your deployments run at optimum performance. 

For more information, see this [GitHub issue](https://github.com/OctopusDeploy/Issues/issues/6664).

## Operating System compatibility

We recommend using an up to date version of Windows Server for Octopus which is generally one of the last two versions of Windows Server. The table below outlines the backward compatibility of Octopus and Windows Server editions.

| Octopus Server    | Minimum Windows Server version
| --------------    | ----------------------------------- |
| 2020.1  ➜ latest  | Server 2012 R2+                     |
| 2019.4  ➜ 2019.13 | Server 2008 R2                       |
| 3.1  ➜ 2019.3     | Server 2008+                        |
| 1.0  ➜ 3.0        | Server 2003+                        |

## SQL Server compatibility

We recommend using an up to date version of SQL Server for Octopus which is generally one of the last versions of SQL Server for security, and performance benefits. The table below outlines the backward compatibility of Octopus and SQL Server editions.

| Octopus Server    | Minimum SQL Server version          | Azure SQL
| --------------    | ----------------------------------- |----------   |
| 2020.2.x ➜ latest  | SQL Server 2016+                    | Supported   |
| 3.0 ➜ 2019.13    | SQL Server 2008+                    | Supported   |

:::hint
The following versions of Octopus have a requirement for SQL Server 2017+.
- 2020.2.0 ➜ 2020.2.17
- 2020.3.0 ➜ 2020.3.5

This requirement has been relaxed to SQL Server 2016+ for any patch version **later** than specified in this note. Please see [this post](https://octopus.com/blog/raising-minimum-requirements-for-octopus-server) for further details.
:::

In **{{Octopus 1.0, 2.6.5}}** it used [RavenDB](https://ravendb.net/) and we switched to SQL in **Octopus 3.0**. You can read more about it in our [blog post](https://octopus.com/blog/3.0-switching-to-sql).
