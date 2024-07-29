---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-07-15
title: Changing the collation of the Octopus database
description: Information on changing the collation of the Octopus SQL Server Database.
navOrder: 20
---

By default, the Octopus database is created using `Latin1_General_CI_AS` collation.

You can change the collation or [create a database](/docs/installation/sql-server-database) with a different collation.

:::div{.warning}
You must use a case-insensitive collation (with a name containing '\_CI\_').
:::

Changing the collation must be done with care. Changing the collation of a SQL Server database does **not** change the collation of existing user-created objects within.

You must also change the collation of all objects in the Octopus Database. Otherwise, errors can occur when modifying the database during Octopus version upgrades.  New objects created will use the updated collation. When attempting to (for example) perform SQL joins between these and existing objects using the original collation, collation mismatch errors may occur.

For this reason, when modifying the SQL Server Database during Octopus upgrades, Octopus will verify that all columns use the same collation as the database itself.  If they do not, an error will be logged, and the upgrade will be blocked.  This is to ensure you can rollback or correct the issue and continue, without the database being left in an invalid state.

## Errors during Octopus Server upgrades {#errors-during-upgrades}

*Database update prevented: One or more columns in the database are not using the default collation*

If you have received the error above while upgrading your Octopus Server, it is likely that at some point the collation on your Octopus database was changed without changing the collation of the existing objects.

:::div{.success}
If you have received the error above, your database has not been modified, and you can safely revert by re-installing your previous version of Octopus Server.
:::

You can run the following SQL against your Octopus database to identify any columns that don't use the database's default collation:

**Identify columns with non-default collation**

```sql
DECLARE @DatabaseCollation VARCHAR(100)

SELECT
  @DatabaseCollation = collation_name
FROM
  sys.databases
WHERE
  database_id = DB_ID()

SELECT
  @DatabaseCollation 'Default database collation'

SELECT
  t.Name 'Table Name',
  c.name 'Col Name',
  ty.name 'Type Name',
  c.collation_name
FROM
  sys.columns c
INNER JOIN
  sys.tables t
  ON c.object_id = t.object_id
INNER JOIN
  sys.types ty
  ON c.system_type_id = ty.system_type_id    
WHERE
  t.is_ms_shipped = 0
  AND
  c.collation_name <> @DatabaseCollation
```

Script taken from [Stack Overflow](http://stackoverflow.com/a/8488567/249431).

To resolve the issue, either alter the columns reported by the script above to match the database's collation or alter the database's collation to match the existing columns (assuming all columns are listed).

Some of the issues in changing the collation of an entire database are discussed in [this Server Fault question](http://serverfault.com/questions/19577/how-do-i-change-the-collation-of-a-sql-server-database).
