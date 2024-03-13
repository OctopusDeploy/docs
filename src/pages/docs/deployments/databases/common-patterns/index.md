---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Common patterns
description: Common patterns in database deployments
navOrder: 20
hideInThisSectionHeader: true
---

Databases are the lifeblood of most applications.  One missing column can bring down an entire application.  It is common for us to see companies approach database deployments with a crawl-walk-run thought process.  In doing so we have identified some common patterns that are detailed in this section.

## Manual approvals

Most database tooling provides the ability to create a *what-if* report.  Octopus Deploy can take that report and upload it as an artifact that DBAs, database developers, or anyone else can review and approve.  This section walks through some common techniques for notifications, approvals, and process in general.

Learn more about [manual approvals](/docs/deployments/databases/common-patterns/manual-approvals).

## Automatic approvals

Manual approvals are a great starting point, when the number of projects that require approval is low.  The number of notifications will exponentially grow as time goes on.  It is common for the frequency of deployments to go from once a quarter to once a week, and it is important for the signal to noise ratio to remain high.  Having a DBA spend time approving minor stored procedure changes is not productive.  This section shows you how to take the manual approval process and add logic for automated approvals.

Learn more about [automatic approvals](/docs/deployments/databases/common-patterns/automatic-approvals).

## Ad-hoc data change scripts

Sometimes an application causes data to get into an odd state, but the bug can be hard to reproduce and the priority to fix the bug might be low. However, the data still needs to be fixed.  This is where an ad-hoc data change script can be used to fix a specific record in a specific database in a specific environment.

Learn more about [ad-hoc data change scripts](/docs/deployments/databases/common-patterns/adhoc-data-changes)

## Backups and rollbacks

Most database deployment tooling wraps everything in a transaction.  The entire changeset goes or nothing goes.  However, we have encountered companies who also want to take a backup of the database prior to any changes being applied.  If something goes wrong, then the process should automatically roll everything back.  In our experience, that is very dangerous and rife with a lot of *what-if* scenarios.

We recommend rolling forward or making your database changes backward compatible.  Learn more about [automatic backups and rollbacks](/docs/deployments/databases/common-patterns/backups-rollbacks).

## Learn more

- [Database blog posts](https://octopus.com/blog/tag/database%20deployments)