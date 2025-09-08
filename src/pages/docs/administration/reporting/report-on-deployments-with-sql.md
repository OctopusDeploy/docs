---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-06-27
title: Report on deployments using SQL
icon: fa-solid fa-database
description: How to report on deployments using SQL
navOrder: 15
---

If your reporting tool of choice can't consume the XML feed, you can query the SQL table directly. Octopus maintains a **DeploymentHistory** table, with the exact same information that the XML feed exposes. This may work better for tools like **SQL Server Reporting Services**. The main benefit of this approach is that it supports Spaces in reporting by default.

:::div{.warning}
This approach is only supported for self-hosted Octopus. For Octopus Cloud you'll need to use the API.
::::

:::figure
![](/docs/img/administration/reporting/images/sql.png)
:::

A few notes about accessing the table directly:

- We may add additional columns in the future.
- We'll try not to change existing columns, but just in case, you may wish to set up your own View in SQL server to provide an abstraction layer.
- Since you're accessing the data directly, be aware that Octopus team permissions won't apply.
- Don't join with any other tables - these are much more likely to change in future, so you're on your own if you do!

The table is completely denormalized, and should have any information that you might need to report on.

## How often is the data updated?

The data in the table (and exposed by the feed) updates every time any data related to deployments changes. This includes changes such as changing the name of a project or environment, or changing the version number of a release. The data should always be up-to-date, however if Octopus is performing many operations, data could be stale up to several minutes.

Also note that the data:

- Isn't deleted by retention policies, so you can report on historical deployments even if retention policies clean them up.
- Isn't deleted when a project/environment is deleted.

## What about information on concurrent users, web front-end performance, etc.?

You may want to look at [enabling HTTP logging](/docs/administration/managing-infrastructure/performance/enable-web-request-logging).

## Learn more

- [Reporting blog posts](https://octopus.com/blog/tag/reporting)
