---
title: Common Patterns
description: Common patterns in database deployments
position: 20
hideInThisSectionHeader: true
---

Databases are the lifeblood of most applications.  One missing column can bring down an entire application.  It is common for us to see comapanies approach database deployments with a crawl-walk-run thought process.  In doing so we have identified some common patterns that are detailed in this section.

## Manual Approvals

Most database tooling provides the ability to create a "what-if" report.  Octopus Deploy can take that report and upload it as an artifact which DBAs, Database Developers, or anyone else can review and approve.  This section will walk through some common techniques for notifications, approvals, and process in general.

See the [Manual Approvals documentation](/docs/deployment-examples/database-deployments/common-patterns/manual-approvals.md) for more details.

## Automatic Approvals

Manual approvals are a great starting out, when the number of projects required for approval is low.  The number of notifications will expotentially grow as time goes on.  It is common to the frequency of deployments go from once a quarter to once a week.  It is important for the signal to noise ratio to remain high.  Having a DBA spend time approving minor stored procedure changes is not productive.  This section will walk through how to take the manual approval process and add some logic for automated approvals.

See the [Automatic Approvals documentation](/docs/deployment-examples/database-deployments/common-patterns/automatic-approvals.md) for more details.

## Restore from Production to Test environments

Real-world test data is a common request we come across.  The natural inclination is to copy Production down to Test.  But doing so opens up a whole world of data compliance and privacy concerns.  This section will walk through recommendations and techniques on creating a process to successfully restore Production to Test environments.

TODO Add Link