---
title: Operations Runbooks
description: Runbooks can be used to automate routine or emergency operations-centric processes, for instance, disaster recovery and database backups.
position: 57
---

Runbooks were introduced in **Octopus 2019.11**

A deployment is only one phase in the life of an application. There are typically many other tasks that are performed to keep an application operating. A large part of DevOps is running operations separate from deploying applications, and this is where runbooks helps.

Runbooks are used to automate routine maintenance and emergency operations tasks like infrastructure provisioning, database management, and website failover and restoration.

![Runbooks](runbooks-list.png "width=500")

## Projects

Runbooks are contained in [projects](/docs/projects/index.md).

To create a runbook, navigate to {{Project, Operations, Runbooks, Add Runbook}}.

## Runbooks vs Deployments

For users familiar with Octopus prior to the introduction of runbooks, an obvious question may be _how are runbooks different to a deployment process?_  They are similar in many ways: a runbook process is a series of steps, which can reference packages and variables. The key differences are:

- No release needs to be created to execute a runbook.
- Lifecycles do not apply to runbooks.
- Runbook executions are not displayed on the deployment dashboards.
- Many runbooks can live in the same project, along with a deployment process.
- Runbooks have different roles and permissions to deployments.

## Variables

A [project's variables](/docs/projects/variables/index.md) are shared between the deployment process and any runbooks in the project (though specific values can be scoped exclusively to specific runbooks or to the deployment process). This means the following configurations can be shared between your deployment process and runbooks:
- Database connection strings
- Passwords
- Certificates
- Accounts

### Current Limitations

**Scoping to Steps/Actions**
- You cannot currently scope project variables to a deployment process step and a runbook process step, but we do aim to support this in the near future.

## Publishing {#Publishing}

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

## Environments

Runbooks can be executed against any environment for which the user has an appropriately scoped `RunbookRun` permission.

Lifecycles do not apply to runbooks (only deployments).

## Permissions and Roles

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

We have provided lots of helpful functions for building your runbook process in the [.NET SDK](/docs/octopus-rest-api/octopus.client.md), or you can use the raw HTTP API if that suits your needs better.

Learn about using the [Octopus REST API](/docs/octopus-rest-api/index.md).

:::success
Record the HTTP requests made by the Octopus UI to see how we build your runbook processes using the Octopus API. You can do this in the Chrome developer tools, or using a tool like Fiddler.
:::

## Learn more

 - [Runbook blog posts](http://octopus.com/blog/tag/runbooks).
