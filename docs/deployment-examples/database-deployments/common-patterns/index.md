---
title: Common Patterns
description: Common patterns in database deployments
position: 20
hideInThisSectionHeader: true
---

Databases are the lifeblood of most applications.  One missing column can bring down an entire application.  It is common for us to see comapanies approach database deployments with a crawl-walk-run thought process.  In doing so we have identified some common patterns that are detailed in this section.

## Manual Approvals

Most database tooling provides the ability to create a "what-if" report.  Octopus Deploy can take that report and upload it as an artifact which DBAs, Database Developers, or anyone else can review and approve.  This section will walk through some common techniques for notifications, approvals, and process in general.

Learn more about [manual approvals](/docs/deployment-examples/database-deployments/common-patterns/manual-approvals.md).

## Automatic Approvals

Manual approvals are a great starting out, when the number of projects required for approval is low.  The number of notifications will expotentially grow as time goes on.  It is common to the frequency of deployments go from once a quarter to once a week.  It is important for the signal to noise ratio to remain high.  Having a DBA spend time approving minor stored procedure changes is not productive.  This section will walk through how to take the manual approval process and add some logic for automated approvals.

Learn more about [automatic approvals](/docs/deployment-examples/database-deployments/common-patterns/automatic-approvals.md).

## AdHoc Data Change Scripts

Sometimes an application causes data to get into an odd state.  It is hard to reproduce that and it has happened once or twice.  The priority on the bug is low.  But the data needs to be fixed.  That is where an adhoc data change script comes in.  It will fix a specific record in a specific database in a specific environment.  It doesn't make sense to push it through all environments.  

Learn more about [adhoc Data Change Scripts](/docs/deployment-examples/database-deployments/common-patterns/adhoc-data-changes.md)

## Backups and Rollbacks

Most database deployment tooling wraps everything in a transaction.  The entire changeset goes or nothing goes.  However, we have encountered companies who also want to take a backup of the database prior to any changes.  If something goes wrong then the process should automatically roll everything back.  In our experience, that is very dangerous and rife a lot of "what-if" scenarios.

Our recommendation is to roll-forward.  Learn more about [automatic backups and rollbacks](/docs/deployment-examples/database-deployments/common-patterns/backups-rollbacks.md).