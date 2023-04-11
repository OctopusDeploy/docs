---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Publishing a runbook
description: Step by step guide on how to publish an Octopus Deploy Runbook to use with triggers.
navOrder: 90
hideInThisSection: true
---

Publishing a runbook will snapshot the runbook process and the associated assets (packages, scripts, variables) as they existed at that moment in time.  After publishing a runbook, any future edits made will be considered a "draft."  For a trigger to pick up those new changes, a new publish event will need to occur.

1. From the *Hello world* project you created earlier, click **Runbooks** in the left menu.
1. Click *Hello Runbook* in the list of runbooks.
1. Click **Publish...** in the runbook menu.
1. Provide some notes and click **PUBLISH**.

If anyone changes the runbook process or its associated assets after it has been published, you can either run the most recent published Runbook, or run the current draft.

![Running a runbook after it was published and changes were detected](images/run-runbook-post-publish-changes.png "width=500")

:::hint
The specific version of any packages used in a runbook process is included in the snapshot when it is published.  Updating a package requires you to republish the Runbook.  As such, it is not recommended to use runbooks to "stage" or "pre-deploy" an application package.
:::

You have now completed the tutorial for running your first runbook!

**Further Reading**

This tutorial is designed to cover the basics of how to configure runbooks and how they work.  For further reading please see:

- [Runbook Documentation](/docs/runbooks/index.md)
- [Runbook Publishing](/docs/runbooks/runbook-publishing/index.md)
- [Runbook Examples](/docs/runbooks/runbook-examples/index.md)
- [Scheduled Runbook Triggers](/docs/runbooks/scheduled-runbook-trigger/index.md)

<span><a class="btn btn-secondary" href="/docs/getting-started/first-runbook-run/define-the-runbook-process-for-targets">Previous</a></span>