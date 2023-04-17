---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Runbooks permissions
description: Permissions are available to help you manage access to Runbooks.
navOrder: 20

---

Permissions are available to help you manage access to Runbooks, these include:

| Permission  | Description |
| ------------- | ------------- |
| RunbookView  | You can view all things runbooks-related (from the runbooks themselves, to their process, runs and snapshots). |
| RunbookEdit  | You can edit all things runbooks-related. |
| RunbookRunView  | You can view runbook runs. |
| RunbookRunDelete  | You can delete runbook runs. |
| RunbookRunCreate  | You can create runbook runs (equivalent of `DeploymentCreate` in the deployment world). |

You can limit your teams ability to create runbooks by disabling these permissions.

There are roles we include out-of-the-box to encapsulate these new permissions:

| Role | Description |
| ------------- | ------------- |
| Runbook producer | Runbook producers can view, edit and execute runbooks. This is useful for authors of runbooks, who need to edit, iterate-on, publish and execute their runbooks. |
| Runbook consumer | Runbook consumers can view and execute runbooks. This is useful for users who are not authoring runbooks but need to view and run them. |

## Working with Runbooks via the Octopus API

Octopus Deploy is built API-first, which means everything you can do through the Octopus UI can be done with the API. In the API, we model the runbook and its process the same way, starting at the project:

- Project
- Runbooks _(a project can have many runbooks, with RunbookView/RunbookEdit permissions.)_
- RunbookProcess _(a runbook has one process / collection of steps, with ProcessEdit permissions.)_
- RunbookSnapshots _(a runbook can have many snapshots, each with a unique name, with RunbookEdit permissions.)_
- RunbookRuns _(a runbook snapshot will then be run/executed against an environment, with RunbookRunCreate permissions.)_

We have provided lots of helpful functions for building your runbook process in the [.NET SDK](/docs/octopus-rest-api/octopus.client/), or you can use the raw HTTP API if that suits your needs better.

Learn about using the [Octopus REST API](/docs/octopus-rest-api/).

:::success
Record the HTTP requests made by the Octopus UI to see how we build your runbook processes using the Octopus API. You can do this in the Chrome developer tools, or using a tool like Fiddler.
:::
