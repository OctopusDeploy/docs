---
title: Create a runbook
description: Step by step guide on how to create a runbook in Octopus Deploy.
position: 30
hideInThisSection: true
---

A single Octopus Deploy Project can have multiple runbooks.  Each runbook has a unique runbook process, retention policy, and allowable environments to run in.  For example, a project might have a runbook to spin up additional infrastructure, or restart the server, or perform a daily backup.  

![example runbook](images/runbook-overview.png)

1. From the *Hello world* project you created in the previous page, click **OPERATIONS** the left menu to expand it (if it is not already expanded).
1. Click **GO TO RUNBOOKS**. 
1. Click **ADD RUNBOOK**.
1. Give the runbook a name, for example *Hello Runbook* and click **SAVE**.

Now that the runbook has been created, we can move onto to [defining the runbook process](/docs/getting-started/first-runbook-run/define-the-runbook-process.md).

