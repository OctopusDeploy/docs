---
title: Publishing a runbook
description: Step by step guide on how publish a Octopus Deploy runbook to use with triggers.
position: 70
hideInThisSection: true
---

Publishing a runbook will snapshot the runbook process and the associated assets (packages, scripts, variables) as they existed at that moment in time.  After a runbook has been published any edits made will be done in "draft mode."  For those changes to be used in a trigger the runbook must be published again.

1. From the *Hello world* project you created earlier, click **Runbooks** in the left menu.
1. Click *Hello Runbook* in the list of runbooks.
1. Click **Publish...** in the runbook menu.
1. Provide some notes and click **PUBLISH**.

If anyone makes changes to the runbook process or its associated assets after it has been published you have the option to run the published runbook or the current draft.

![Running a runbook after it was published and changes were detected](images/run-runbook-post-publish-changes.png)

:::hint
The specific version of any packages used in a runbook process are included in the snapshot when it is published.  Updating a package requires you to republish the runbook.  As such, it is not recommended to use runbooks to "stage" or "pre-deploy" an application code base.
:::

You have now completed the tutorial for running your first runbook!  For further reading, please see our [runbook documentation](/docs/runbooks/index.md) and [runbook examples](/docs/runbooks/runbook-examples/index.md).