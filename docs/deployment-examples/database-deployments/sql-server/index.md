---
title: SQL Server permissions
description: Permission recommendations for deployments to SQL Server.
position: 15
---

When you decided on the permissions required to automate your database deployments, you'll need to find the balance between functionality and security. Below are some considerations around permissions and a couple of recommendations.

## Application account permissions 

Applications should run under their own service accounts with the least amount of rights.  Each environment for each application should have its own service account.  

Having separate service accounts for each environment can make automated database deployments very tricky.  None of the service account should be stored in source control, instead, assign permissions to roles, and attach the correct user for the environment to that role.

## Deployment permission considerations

The account used to make schema changes requires elevated permissions.  Because of that, create a special service account to handle database deployments.  Do not use the same account used by an application.  If the application service account has permissions to modify the schema, and it was compromised, it could cause a lot of damage.

The level of elevated permissions is up to you.   More restrictions placed on the deployment account means more manual steps.  Deployments will fail due to missing or restricted permissions.  Octopus will provide the error message to fix the issue, but it will need manual intervention to resolve the issue.  It is up to you to decide which is best.

First, decide what the deployment account should have the ability to do at the server level.  From there, research which server roles are applicable.  Microsoft has provided a chart of the server roles and their specific permissions.

![](images/permissions-of-server-roles.png "width=500")

Next, decide what permissions the deployment account can have at the database level.  Again, Microsoft has provided a chart of the database roles and their specific permissions.   

![](images/permissions-of-database-roles.png "width=500")

With those two charts in mind, below are some recommended permissions sets.  

## Fully automated database deployments permission recommendation

Following DevOps principles, everything that can be automated should be automated.  This includes creating databases, user management, schema changes, and data changes.  Octopus Deploy plus the third-party tool of your choice can handle that. The deployment account should have these roles assigned:

- Server Permissions:
    - `dbcreator`: The ability to create new databases.
    - `securityadmin`: The ability to create new users and grant them permissions (you will need a check-in place to ensure it doesn't grant random people sysadmin roles).
- Database Permissions:
    - `db_ddladmin`: Can run any Data Definition Language (DDL) command in a database.
    - `db_datareader`: Can read all the data from all user tables.
    - `db_datawriter`: Can add, delete, or change data from all user tables.
    - `db_backupoperator`: Can backup the database.
    - `db_securityadmin`: Can modify role membership and manage permissions.
    - `db_accessadmin`: Can add or remove access to the database for logins.
    - Can View Any Definition.

Be sure to assign the deployment account those database roles in the model database.  That is the system database used by SQL Server as a base when a new database is created.  This means the deployment account will be assigned to those roles going forward.

## Fully automated database deployments permission recommendation {#SQLServerdatabases-ManualUsers}

Security admins should be treated the same as system admins, as they can grant permissions at the server level.  For security purposes, it is common to see that role restricted.  In that case, below are the recommended permissions.  It can do everything except create a new SQL Login.

- Server Permissions:
    - `dbcreator`: The ability to create new databases.
- Database Permissions:
    - `db_ddladmin`: Can run any Data Definition Language (DDL) command in a database.
    - `db_datareader`: Can read all the data from all user tables.
    - `db_datawriter`: Can add, delete, or change data from all user tables.
    - `db_backupoperator`: Can backup the database.
    - `db_securityadmin`: Can modify role membership and manage permissions.
    - `db_accessadmin`: Can add or remove access to the database for logins.
    - Can View Any Definition.

## No database creation or user creation, everything else automated permission recommendation

If granting that level of access is not workable or allowed, we recommend the following.  It requires SQL Users to be manually created and the database to already exist.  The process can add existing users to databases as well as deploy everything.

- Database Permissions:
    - `db_ddladmin`: Can run any Data Definition Language (DDL) command in a database.
    - `db_datareader`: Can read all the data from all user tables.
    - `db_datawriter`: Can add, delete, or change data from all user tables.
    - `db_backupoperator`: Can backup the database.
    - `db_securityadmin`: Can modify role membership and manage permissions.
    - `db_accessadmin`: Can add or remove access to the database for logins.
    - Can View Any Definition.

## Manual user creation both server and database permission recommendation

Here are the most restrictive permissions for automating database deployments.  No new database users can be created.  No new schemas can be created.  Users cannot be added to roles.  Table and stored procedure changes can be made.

- Database Permissions:
    - `db_ddladmin`: Can run any Data Definition Language (DDL) command in a database.
    - `db_datareader`: Can read all the data from all user tables.
    - `db_datawriter`: Can add, delete, or change data from all user tables.
    - `db_backupoperator`: Can backup the database.
    - Can View Any Definition.