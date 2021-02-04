---
title: Create a runbook
description: Step by step guide on how to create a runbook in Octopus Deploy.
position: 30
hideInThisSection: true
---

A single Octopus Deploy Project can have multiple Runbooks.  Each Runbook has a unique runbook process, retention policy, and allowable environments to run in.  For example, a project might have a runbook to spin up additional infrastructure, or restart the server, or perform a daily backup.  

![example runbook](images/runbook-overview.png)

1. From the *Hello world* project you created on the previous page, click **OPERATIONS** on the left menu to expand it (if it is not already expanded).
1. Click **GO TO RUNBOOKS**. 
1. Click **ADD RUNBOOK**.
1. Give the Runbook a name, for example, *Hello Runbook* and click **SAVE**.

The next step will [define a simple runbook process](/docs/getting-started/first-runbook-run/define-the-runbook-process.md) to run on either the Octopus Server or a worker (if you are using Octopus Cloud).

<span><a class="btn btn-outline-dark" href="/docs/getting-started/first-runbook-run/create-runbook-projects">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/first-runbook-run/define-the-runbook-process">Next</a></span>

### Further Reading

For further reading on Runbooks please see:

- [Runbook Documentation](/docs/runbooks/index.md)
- [Runbook Examples](/docs/runbooks/runbook-examples/index.md)