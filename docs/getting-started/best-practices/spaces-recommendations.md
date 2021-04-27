---
title: Spaces Recommendations
description: Guidelines and recommendations for configuring spaces in Octopus Deploy.
position: 20
hideInThisSection: true
---

Spaces were introduced in **Octopus Deploy 2019.1** as a way to isolate team / divisions / projects from one another.  Before configuring spaces there are a few important items to note.

- Spaces are "hard walls," each space has its own environments, lifecycles, projects, packages, step templates and targets.
- At the time of this writing, the only thing that can be shared between spaces is users and teams.
- A user can have full permissions in one space but read-only permissions in all other spaces.
- Listening tentacles can be registered to multiple spaces and only count against your license once.

## Recommendations

As spaces are "hard walls" you should consider how often your users will need to switch between spaces in their usual day to day work.  We've found customers have the most success when a spaces are decoupled from one another.  For example:

- A space containing all the projects that comprise an application suite.  For example, all the applications and projects for your CRM.
- A space for public facing applications with another space for all internal applications.
- A space for each division within your company.

Internally we have opted for a space per application suite.

- Octopus Server Space (includes the MSI, pushing to Chocolatey and Docker Hub)
- Octopus.com Space (and corresponding CMS)
- Integrations Space (build servers, issue trackers, etc)
- And so on

## Anti-Patterns

We've also found a number of anti-patterns with spaces you should avoid.

- A space per team (Team A Space, Team B space, etc.).  Typically in larger corporations applications move between teams, a space per team would require you to move projects between spaces all the time.
- A space per environment (Development Space, Production Space, Test Space, etc).  Spaces were not designed, nor do they support this scenario.  You would need a way to keep the deployment process in sync across multiple spaces.
- A space per tenant.  Just like environments, spacs were not designed, nor do they support this scenario.  You would need a way to keep the deployment process in sync across multiple spaces.
- A space per application component.  You would need to track a single application across multiple spaces.
- Sharing deployment targets across spaces.  It is possible to register the same listening tentacle, Azure Web App, or K8s cluster across spaces, but that indicates a space is too fine-grained.  Sharing deployment targets across spaces only leads to confusion as deployments in one space will appear "locked" because of a deployment in another space.

## Prevent Sharing of Deployment Targets

To prevent sharing of deployment targets and workers across spaces the easiest solution is to use [polling tentacles](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md).  A polling tentacle can only be registered to a single space.

For other deployment targets, such as Azure Web Apps, or K8s clusters, you would have to re-key the credentials in each space.  As such store those credentials in a secure location and limit access to them.

## Sharing Workers

Sharing workers configurated as listening tentacles is very easy to do.  In a lot of cases, the servers hosting the workers are under utilized.  Sharing workers between spaces can be beneficial from a cost and maintenance standpoint.

There are some considerations when sharing workers.
- The tentacle agent on the worker can be running as a specific Active Directory account.  If you need to limit access to that account, then you should use a polling tentacle and register it to one specific space.
- The tentacle agent could be running on an EC2 instance with a specific IAM role attached.  Just like above, to limit access to that IAM role, you should use a polling tentacle and register it to one specific space.
- When workers download packages they require a mutex.  This means no other task can be running on that worker.  99% of the time this isn't noticed.  However, if a worker is running a 10-hour integration test you run the risk of getting stuck behind that test waiting the mutex to be created.

<span><a class="btn btn-outline-dark" href="/docs/getting-started/best-practices/installation-guidelines">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/best-practices/environments-and-deployment-targets-and-roles">Next</a></span>