---
title: Bulk Operations
description: This section includes examples of how to use the REST API to perform a variety of bulk operations using the Octopus Deploy API.
position: 160
hideInThisSectionHeader: true
---

You can use the Octopus Deploy REST API to perform a number of bulk operations.  

All the scripts in this section will include:
- A what if parameter to let you run the script without worrying about saving any changes.
- A list of what will would've changed (when what-if is `True`), or what just changed (when what-if is `False`).
- A "limiter" parameter that will limit the number of changes per run.  If you have 25 items to change, and the limit is set to 5, it will only change five items per run.  You'd need to run the script five times to change all 25 items.  This was added so you can do some test runs and spot check the results.

Provided sample bulk operations are are: