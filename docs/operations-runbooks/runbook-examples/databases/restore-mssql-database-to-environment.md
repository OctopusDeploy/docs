---
title: Restore SQL database to another environment
description: With Octopus Deploy you can restore a MSSQL database to another environment with a Runbook.
position: 30
---
Restoring databases requires that the user have some elevated permissions.  These permissions are typically held by Database Administrators (DBA) and sometimes SQL developers.  The process of restoring a database often includes filling out a ticket and waiting for that ticket to be actioned.  With runbooks, the DBA team can configure a self-service method for standard developers to restore a Production database down to Test without a ticket or even a DBA being involved.

## Permissions
Using a runbook, a developer needs no permissions to the database server itself.  The permissions necessary to perform a restore are held either by the account the Tentacle is running as (in Active Directory enviroments) or the SQL Account that is configured to run the restore step.  The only permission that would be required is the ability to run the runbook itself.

## Variables
Variables can be used and scoped to control which environments the database is coming from and going to.


