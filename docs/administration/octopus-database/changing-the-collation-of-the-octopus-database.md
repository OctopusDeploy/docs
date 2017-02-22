---
title: Changing the Collation of the Octopus Database
description: Information on changing the collation of the Octopus SQL Server database.
---

By default, the Octopus database is created using `Latin1_General_CI_AS` collation.

You can change the collation, or [create a database](/docs/installation/installing-octopus/sql-server-database-requirements.md) initially with a different collation.

:::warning
A case-insensitive collation (one which has a name containing '\_CI\_') must be used.
:::

Changing the collation must be done with care.  Changing a SQL Server database's collation does **not** change the collation of existing user-created objects within.

You must ensure you also change the collation of all objects in the Octopus Database, otherwise errors can occur when modifying the database during Octopus version upgrades.  New objects created will use the updated collation, and when attempting to (for example) perform SQL joins between these and existing objects using the original collation, collation mis-match errors may occur.

For this reason, from Octopus version 3.8 on, when modifying the SQL Server database during Octopus upgrades, Octopus will verify that all columns in the database use the same collation as the database itself.  If they do not, an error will be logged and the upgrade will be prevented from taking place.  This is to ensure you can rollback, or correct the issue and continue, without the database being left in an invalid state.

## Errors during Octopus Server upgrades {#ChangingtheCollationoftheOctopusDatabase-ErrorsduringOctopusServerupgrades}

*Database update prevented: One or more columns in the database are not using the default collation*

If you have received the error above while upgrading your Octopus Server, it is likely that at some point the collation on your Octopus database was changed without changing the collation of the existing objects.

:::success
If you have received the error above, then your database has not been modified and you can safely revert by re-installing your previous version of Octopus Server.
:::

The following SQL can be executed against your Octopus database to identify any columns which do not use the database's default collation:

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
    sys.tables t ON c.object_id = t.object_id
INNER JOIN 
    sys.types ty ON c.system_type_id = ty.system_type_id    
WHERE 
    t.is_ms_shipped = 0
    AND 
    c.collation_name <> @DatabaseCollation
```

(script taken from [StackOverflow](http://stackoverflow.com/a/8488567/249431))

To resolve the issue, either alter the columns reported by the script above to match the database's collation, or alter the database's collation to match the existing columns (assuming all columns are listed).

Some of the issues in changing the collation of an entire database are discussed in [this question](http://serverfault.com/questions/19577/how-do-i-change-the-collation-of-a-sql-server-database).
