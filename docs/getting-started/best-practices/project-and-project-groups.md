---
title: Projects and Project Groups
description: Guidelines and recommendations for configuring projects and project groups in Octopus Deploy.
position: 50
hideInThisSection: true
---

[Projects](/docs/projects/index.md) let you create and manage your deployment processes, releases, and runbooks from the Octopus REST API and Octopus Web Portal. For each project, you can define a deployment process, runbooks to manage your infrastructure, variables, the environments where the software will be deployed, and releases of your software.  Project groups allow you to group like projects together.  

## Recommended Structure

We recommend thinking of projects and project groups this way:

- Project Group = Application
- Project = Application Component

This screenshot represents the Octo Pet Shop application (project group) with all the various components (projects)
![project and project groups](images/projects-and-project-groups.png)

At first it makes sense to include all the necessary steps to deploy all the components in an application into one project.  This works fine when you change all the components for a release.  If you a release once a quarter, chances are high you are changing every component.

However, as you use Octopus Deploy, you will find yourself deploying more frequently with smaller change sets.  In the example of Octo Pet Shop, instead of all the components changing for a release, only the Database and Web API have changed.  Redeploying the Web UI and the Scheduling Service introduces an outage and risk.  

Each project should include:
- All the necessary steps (including approvals) to deploy that component.
- Any runbooks to specifically manage that component.  The Database project would have steps to back up and restore the database, while the Web UI project would have runbooks to restart the application.
- Variables specific to that component.  The scheduling service could have cron expression variables, while the Web UI would contain the public addresses.

Coordinating all those component projects can become quite tedious, this is why we recommend a [release orchestration](https://octopus.com/blog/release-management-with-octopus) project.  That project will:

- Select the correct version to deploy.
- Deploy the components in a specific order.
- Skip over components that haven't changed.
- Run components in parallel when allowed (for example the Web API and Scheduling Service).
- Handle approvals from the key individuals in your company.  The release orchestration project will send the approval information to the component project.
- Provide the ability to review changes prior to them being deployed.

## Deployment and Runbook Process Recommendations

How you deploy, or run your runbook, in **production** should be the exact same way you deploy, or run your runbook, in your testing environments.  It's okay to disable/enable extra steps, such as approvals, in specific environments, but the overall process should be the same.  This ensures there are no surprises when you deploy to a **production** environment as the deployment has already been tested at least once, if not multiple times.

The underlying infrastructure should be the same across all environments.  If you are deploying to Windows Servers in a **production** environment, then you should be deploying to Windows Servers in your testing environments.  Don't deploy to Azure Web Apps in a **development** or **testing** environment while deploying to Windows Servers in a **production** environment.  

<span><a class="btn btn-outline-dark" href="/docs/getting-started/best-practices/worker-configuration">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/best-practices/variables">Next</a></span>