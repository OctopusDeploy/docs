---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Projects and Project Groups Structure
description: Guidelines and recommendations for configuring projects and project groups in Octopus Deploy.
navOrder: 50
hideInThisSection: true
---

[Projects](/docs/projects/) let you create and manage your deployment processes, releases, and runbooks from the Octopus REST API and Octopus Web Portal. For each project, you can define a deployment process, runbooks to manage your infrastructure, variables, the environments where the software will be deployed, and your software releases.  Project groups allow you to group like projects together.  

## Project Structure

We recommend thinking of projects and project groups this way:

- Project Group = Application
- Project = Application Component

This screenshot represents the Octo Pet Shop application (project group) with all the various components (projects)
![project and project groups](/docs/getting-started/best-practices/images/projects-and-project-groups.png "width=500")

At first, it makes sense to include all the necessary steps to deploy all the components in an application into one project.  A single process works fine when you change all the components for a release.  If you a release once a quarter, chances are high you are changing every component.

However, as you use Octopus Deploy, you will find yourself deploying more frequently with smaller changesets.  In the example of Octo Pet Shop, a release might only change the Database and Web API vs. all the components.  Redeploying the Web UI and the Scheduling Service introduces an outage and risk.  

Each component project should include:
- All the necessary steps (including approvals) to deploy that component.
- Any runbooks to specifically manage that component.  The Database project would have steps to back up and restore the database, while the Web UI project would have runbooks to restart the application.
- Variables specific to that component.  The scheduling service could have cron expression variables, while the Web UI would contain the public addresses.

Coordinating all those component projects can become quite tedious; this is why we recommend a [release orchestration](https://octopus.com/blog/release-management-with-octopus) project.  That project will:

- Select the correct version to deploy.
- Deploy the components in a specific order.
- Skip over components that haven't changed.
- Run components in parallel when allowed (for example, the Web API and Scheduling Service).
- Handle approvals from the key individuals in your company.  The release orchestration project will send the approval information to the component project.
- Provide the ability to review changes before they are deployed.

## Anti-patterns to avoid

A project should deploy one component of an application (WebUI, WebAPI, Service, Database) and do it well.  Some common anti-patterns we've seen you should avoid are:

- A project deploying all the components for an application.  A deployment process with more than 20 steps indicates that project is doing too much.
- A project per application, per environment, such as `OctoPetShop_Dev`, `OctoPetShop_Test`, and so on.  This is impossible to maintain and track versions.

## Cumulative Changes

Octopus Deploy expects any application component it deploys to contain everything that component needs.  If you are deploying a web application, the deployment should include all the JavaScript, CSS, binaries, HTML files, etc., that is needed to run that web application.  It shouldn't just be a delta change of a few HTML files or binaries.  Octopus Deploy expects that is for a variety of reasons.

- All releases will need to be deployed to all environments.  
- Deploying only delta changes requires you to always deploy all versions in a specific order.  
- If a new deployment target (webserver) is created, you will have to deploy all versions to that new target rather than the latest.
- You'll need a mechanism to create roll-up releases; otherwise, the list of versions to deploy when a new target is added will grow and become unwieldy.
- It'll be near impossible to roll back to a previous version of the code.

## Further reading

For further reading on projects and project groups in Octopus Deploy please see:

- [Projects](/docs/projects/)
- [Release Orchestration](https://octopus.com/blog/release-management-with-octopus)

<span><a class="btn btn-secondary" href="/docs/getting-started/best-practices/worker-configuration">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/best-practices/variables">Next</a></span>
