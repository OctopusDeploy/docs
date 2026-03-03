---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Bulk Operations
description: This section includes examples of how to use the REST API to perform a variety of bulk operations using the Octopus Deploy API.
navOrder: 400
hideInThisSectionHeader: true
---

You can use the Octopus Deploy REST API to perform a number of bulk operations.  

All the scripts in this section will include:
- A what-if parameter to let you run the script without worrying about saving any changes.
- A list of what would've changed (when what-if is `True`), or what just changed (when what-if is `False`).
- A "limiter" parameter that will limit the number of changes per run.  If you have 25 items to change, and the limit is set to 5, it will only change five items per run.  You'd need to run the script five times to change all 25 items.  This was added so you can do some test runs and spot-check the results.

Provided sample bulk operations are:

- [Bulk add a project to a list of tenants](/docs/octopus-rest-api/examples/bulk-operations/bulk-add-projects-to-tenants)
- [Rerun all canceled deployments and runbook runs after node shutdown](/docs/octopus-rest-api/examples/bulk-operations/rerun-deployments-and-runbooks-after-node-shutdown)
