---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Runbooks publishing
description: Publishing makes a runbook available to scheduled triggers and consumers.
navOrder: 30
---

Runbooks and deployments define their processes in exactly the same way. However, where a deployment has a [release](/docs/releases/), a runbook has what is called a Snapshot. 

## Snapshots

For a given runbook, you can have two snapshots:
- Draft
- Published

Similar to releases, the version of any packages that are used in the runbook are also snapshotted. This means if a newer version of the package is uploaded, and you wish to use it in your runbook, you need to create a new snapshot of the runbook.

## Draft snapshot

A draft snapshot of a runbook is exactly what it sounds like, a draft version of the currently published version. Drafts are meant to give you a place to work and save a runbook that is a work in progress or has not yet been approved for general use.

:::hint
Draft snapshots can't be used to create a [scheduled runbook trigger](/docs/runbooks/scheduled-runbook-trigger/), only published snapshots can. 
:::

## Published snapshot

The concept of a published snapshot is designed to help avoid confusion when selecting a version of the runbook you're supposed to run if you're not the author. You can think of it as the "Production" ready version of the runbook, which has been approved for general use.

Publishing makes a runbook available to scheduled triggers and consumers (anyone with an appropriately scoped `RunbookRunCreate` permission, but without the `RunbookEdit` permission).  Triggers and consumers will always execute the published snapshot.

The published snapshot contains the process, variables, and packages. This allows editing and testing the runbook without impacting the published version.   

### Publishing a snapshot

To publish a snapshot, click the publish button on the task page after executing a runbook, or click publish on the runbook's process page.

Publish from completed task:

![Publish runbook from task page](/docs/runbooks/runbook-publishing/runbook-publish-task.png "width=500")

Publish from process:

![Publish runbook from process page](/docs/runbooks/runbook-publishing/runbook-publish-process.png "width=500")

When a producer (anyone with an appropriately scoped `RunbookEdit` permission) executes a runbook, they will have the option between executing the published version or the current draft.

Running the current draft allows testing changes before publishing.  The latest version of the process and variables will be used and package versions will be prompted for.

![Run current draft](/docs/runbooks/runbook-publishing/runbook-run-draft.png "width=500")