## Direct table access {#Reporting-Directtableaccess}

If your reporting tool of choice can't consume the XML feed, you can query the SQL table directly. Octopus maintains a **DeploymentHistory** table, with the exact same information that the XML Feed exposes. This may work better for tools like **SQL Server Reporting Services**.

![](images/3278362.png "width=500")

A few notes about accessing the table directly:

- We may add additional columns in the future.
- We'll try not to change existing columns, but just in case, you may wish to set up your own View in SQL server to provide an abstraction layer.
- Since you're accessing the data directly, be aware that Octopus team permissions won't apply.
- Don't join with any other tables - these are much more likely to change in future, so you're on your own if you do!

The table is completely denormalized, and should have any information that you might need to report on.

## How often is the data updated? {#Reporting-Howoftenisthedataupdated?}

The data in the table (and exposed by the feed) updates every 30 seconds to add deployments that have recently completed.

Since the data is denormalized, changing the name of a project or environment, or changing the version number of a release, may result in stale data. Octopus corrects this every 24 hours on a schedule.

Also note that the data:

- Isn't deleted by retention policies, so you can report on historical deployments even if retention policies clean them up.
- Isn't deleted when a project/environment is deleted.

## What about information on concurrent users, web front-end performance, etc.? {#Reporting-Whataboutinformationonconcurrentusers,webfront-endperformance,etc.?}

You may want to look at [enabling HTTP logging](/docs/administration/managing-infrastructure/performance/enable-web-request-logging.md).
