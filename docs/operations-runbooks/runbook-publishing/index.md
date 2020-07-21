---
title: Runbooks publishing
description: Publishing makes a runbook available to scheduled triggers and consumers.
position: 30
---

## Snapshots
Runbooks and deployments define their processes in exactly the same manor.  However, where a deployment has a Release, a Runbook has what is called a Snapshot.  For a given runbook, you can have two snapshots:
- Draft
- Published

Similar to releases, the version of any packages that are used in the runbook are also snapshotted.  This means if a newer version of the package is uploaded, you will need to create a new snapshot of the runbook.

### Draft snapshot
A draft snapshot of a Runbook is exactly what it sounds like, a draft version of the currently published version.  Drafts are meant to give you a place to work and save a Runbook that is a work in progress or has not yet been approved for general use.

### Published snapshot
A published snapshot is the "Production" ready version of the Runbook.  The concept of a `Published` snapshot was to help avoid confusion in what version of the Runbook you're supposed to run if you're not the author.

## Publishing a snapshot
Publishing makes a runbook available to scheduled triggers and consumers (anyone with an appropriately scoped `RunbookRun` permission, but without the `RunbookEdit` permission).  Triggers and consumers will always execute the published snapshot.

The published snapshot contains the process, variables, and packages. This allows editing and testing the runbook without impacting the published version.   

To publish a snapshot, click the publish button on the task page after executing a runbook, or click publish on the runbook's process page.

Publish from completed task:

![Publish runbook from task page](runbook-publish-task.png "width=500")

Publish from process:

![Publish runbook from process page](runbook-publish-process.png "width=500")

When a producer (anyone with an appropriately scoped `RunbookEdit` permission) executes a runbook, they will have the option between executing the published version or the current draft.

Running the current draft allows testing changes before publishing.  The latest version of the process and variables will be used and package versions will be prompted for.

![Run current draft](runbook-run-draft.png "width=500")