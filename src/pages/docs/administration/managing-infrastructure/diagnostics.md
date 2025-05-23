---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-05-23
title: Diagnostics
description: Octopus diagnostics includes a series of reports that a user can generate to ensure the system is performing optimally.
navOrder: 2400
---

## System Diagnostics Report

The System Diagnostics report generates a compressed folder which includes a set of reports that capture specific system data, such as previous Octopus Server logs, a subset of recently run system tasks (for example, a System Integrity check), a short list of previous errors reported on the Octopus Server and installation history. Octopus Support may ask for this report to help diagnose common faults or for recommendations on customer queries. The report can be found by going to **Configuration ➜ Diagnostics** and clicking the `Download System Diagnostics Report` button:

:::figure
![](/docs/administration/managing-infrastructure/images/system-integrity-check.png)
:::

## System integrity check

The system integrity check performs several checks on the database and the data. Failure of the checks may indicate an underlying problem in your data or database. If it is failing, please contact [support](https://octopus.com/support) and provide the [raw output of the task](/docs/support/get-the-raw-output-from-a-task).

It runs at start up and then again every 24 hours. It can also be run on demand by going to **Configuration ➜ Diagnostics** and clicking the `Check System Integrity` button

:::figure
![](/docs/administration/managing-infrastructure/images/system-diag-report.png)
:::

### Schema
The schema integrity check compares the current schema of the database against what the application expects it to be. If the schema differs, server version upgrades may fail. It will error if tables, indexes or columns have been added, removed or altered. Items in the `sys` and `sys diagram` schemas are ignored.
