---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Database backups and rollbacks
description: Recommendations on backing up and rolling back a database during a failed deployment.
navOrder: 25
---

A common question we get asked is, "how does Octopus Deploy handle rollbacks?"  For stateless components of your application, such as Web UIs, Web APIs, and services, rollbacks are accomplished by various means.  The most straightforward approach is to deploy the previous version of those components.  You can also leverage more advanced patterns such as [Blue/Green, Red/Black](/docs/deployments/patterns/blue-green-deployments/), or [Canary deployments](/docs/deployments/patterns/canary-deployments/).  

For stateful components, such as a relational database, rollbacks are much more complex.  This page focuses on database rollbacks.

:::hint
TL;DR; For stateful components, we recommend rolling forward and/or making any changes backward compatible with previous versions of your code.  The risk is much lower, and it is often quicker to fix.  
:::

## Database rollback pitfalls

Your application's users are why rollbacks are high risk.  Typically, applications aren't designed with a *read-only* or *maintenance mode* that is turned on during deployments.  It is common to have users attempting to use the application during a deployment or verification.  *Off-Hours* deployments are done as a way to reduce the chance that will happen. 

There are major pitfalls with rolling back databases:

1. Schema changes, adding a column, creating a table, updating a stored procedure, along with corresponding migration scripts, are common.  Unless tested, rollback scripts will result in data loss.  Thus a backup is needed.
2. The decision to rollback will come after a successful deployment.  Most, if not all, automated database deployment tooling use transactions to deploy changes, and they automatically rollback that transaction on failure.  A restore of the database backup is required after the successful deployment.  
3. Unless programmatically locked out, users will use the application during deployment verification.  After a user changes data, any database backup taken before deployment is worthless.  Rolling back to a database backup will result in data loss.

:::warning
A database backup has a very limited useful rollback lifespan.
:::

Rolling back changed data will require extensive analysis and testing.  As such, there cannot be an automated rollback process.  There are too many what-if scenarios, and risk exponentially increases as more records are changed.  As long as the application continues to run, the data will continue to change.  Any rollback scripts to move data around will have to keep hitting a moving target. 

:::hint
Prior to upgrading the Octopus Server we recommend putting your server into [maintenance mode](/docs/administration/managing-infrastructure/maintenance-mode/).  When in maintenance mode, only Octopus Administrators can kick off deployments.  This allows Octopus Administrators to test the upgrade without users changing data.  If anything goes wrong, a rollback can happen as the data changed was only test data.
:::

## Making database changes backwards compatible

Making database changes backward compatible is often the first step towards advanced deployment patterns such as blue/green, red/black, or canary.  In a nutshell, you will have two versions of code pointing to the same database.   

Many books exist on this subject; trying to distill it all down to a single section would be impossible. Some of the more common strategies for relational databases include:

1. Following the [expand/contract or parallel](https://www.martinfowler.com/bliki/ParallelChange.html) pattern when making changes.
2. All new columns are added as nullable.
3. Stored procedures are versioned or have parameters added with default values.
4. Relying on column names instead of column order in any code when performing queries.
5. Writing the code with the assumption any new columns will be null.

For example, moving a column from TableA to TableB would involve:

1. Add a new column to TableB as nullable.
2. Update the code to first pull from TableB; if not exists, then pull from TableA.
3. Update the code to save to both TableA and TableB.
4. Deploy the database changes and updated code.
5. Finish migrating all data from TableA to TableB.
6. Update the code to only save to TableB.
7. Add the suffix _ToRemove[Date] to the column in TableA.
8. Deploy the updated code and database.
9. Delete the column from TableA.
10. Deploy the updated database.

As you can see, making database changes backward compatible involves a disciplined and systematic approach.  The advantage to this is you can deploy your database changes independently of your code changes.  Because the database works with two (or more) versions of the code, rolling back any code is a trivial task.  Some of our customers who have adopted this approach deploy their database changes several days before the code.

## Database backup use cases

As stated earlier, most, if not all, rollback decisions occur _after_ the database changes have been deployed.  Database tooling wraps changes in transactions that are rolled back automatically on failure. This meaning all changes are deployed or none of the changes are deployed.  

Although database backups have a limited lifespan for rollbacks, they can still be useful in other use cases:

1. Backup the testing or QA database for developers after a deployment to restore to their local instances.
2. Backup prior to deploying a significant release to a *Production-Like* environment.  If a failure occurs, it will be easier to test the fix on a known state of data.
3. Periodically backup data and store in a secure location disaster recovery.
4. Backup a test database to spin up a new instance to test a feature branch.

## Backup recommendations

Databases often contain personally identifiable (PII) data, along with credit card data or health care data.  It impossible for us to be experts in every law and regulation.  As such, this section will only provide rules of thumb or recommendations for database backup recommendations.  To ensure you are in compliance with all laws and regulations, please consult legal and security experts in your jurisdiction.

1. Use a designated backup service account to perform backups.  That backup service account is different than the deployment service account.
2. At the very least, use a different backup service account per environment.  Ideally, use a different account per database per environment to reduce the attack surface area.
3. Store database backups in a secure file location.  Only the backup service account should have access to that file location.  
4. If you are storing credentials (username/password) in Octopus Deploy, mark the values as [sensitive](/docs/projects/variables/sensitive-variables/).  Sensitive variables are write-only through the Octopus Deploy API.  The only time they are decrypted is during a deployment.
5. If the database server supports it, use integrated security.  The Tentacles will [run as a specific user account](/docs/infrastructure/deployment-targets/tentacle/windows/running-tentacle-under-a-specific-user-account/).  

## Leveraging runbook for backup and restore

Runbooks were added to Octopus Deploy in version: **2019.11**.

Runbooks were designed for several use cases; one of them is for the backup and restore of a database.  There are several advantages in using runbook over the built-in database server's built-in job functionality:

1. Visibility. The status of a backup and restore can be seen by anyone with an Octopus Deploy login.  
2. Reduced access to the database. Fewer people need to log in to the database to check on the status of a job.
3. Auditing. Everything about the runbook, be it an update to the process or a run, is audited.  No more guesswork as to who last changed a job.
4. More complex processes, A runbook contains 1 to N steps, with the ability to disable/enable based on environment or via the use of a variable.
5. One process across all environments. Each environment has its own database server, each with its own set of jobs that may or may not run.  The same runbook can be applied to all environments.
