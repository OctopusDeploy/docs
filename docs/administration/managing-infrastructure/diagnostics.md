---
title: Diagnostics
description: Octopus diagnostics includes a system integrity check to ensure the system's database schema and data are correct.
position: 2400
---

## System Integrity Check

The system integrity check performs several checks on the database and the data. Failure
of the checks may indicate an underlying problem in your data or database. If it is failing,
please contact [support](https://octopus.com/support) and provide the `raw` output of the task.

It runs at start up and then again every 24 hours. It can also be run on demand by going
to **{{Configuration,Diagnostics}}** and clicking the `Check System Integrity` button

### Schema
The schema integrity check compares the current schema of the database against what the application
expects it to be. If the schema differs, server version upgrades may fail. It will error if tables,
indexes or columns have been added, removed or altered. Items in the `sys` and `sysdiagram` schemas
are ignored.
