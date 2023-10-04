---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-10-04
title: Projects and Project Groups Structure
description: Guidelines and recommendations for configuring projects and project groups in Octopus Deploy.
navOrder: 50
hideInThisSection: true
---

[Projects](/docs/projects) store the deployment configuration for an application.  For each project, you can define a deployment process and runbooks to manage your infrastructure, variables, the environments where the software is deployed, and your software releases.  Project groups allow you to group like projects together.  

## Project structure

We recommend thinking of projects and project groups this way:

- Project Group = Software Suite
- Project = Application

An application represents all the tightly coupled components required for the software to run.  Some examples of applications are:

- A microservice running in a container monitoring a queue for work.
- An N-Tier Web Application with a WebUI, WebAPI, back-end Service, and Database.
- A back-end service that processes files from a file share based on a schedule.
- A monolithic application with dozens of components.

All the components in a single "solution" or built in the same configuration should be deployed together.  The deployment process should always deploy all the components.  Trying to skip a component because it "didn't change" can reduce deployment time but increases the risk of bugs or failures because something was missed.  

If you want to have a project per component, you need to ensure each component is decoupled from one another and can be deployed on a separate schedule.  

:::div{.hint}
Previous versions of this guide recommended having a project per component.  Octopus Deploy now includes new features, including ITSM integration, Config as Code, and more options for variable run conditions.  There is also a logistical overhead with a project per component.  That recommendation was made in 2021.  At that time, a project per component made sense.  It is no longer applicable with the 2023 version of Octopus Deploy.
:::

## Anti-patterns to avoid

A project should deploy all the coupled components of an application (WebUI, WebAPI, Service, Database).  Some common anti-patterns we've seen you should avoid are:

- A project per component in an application.  If the components are referenced in the same "solution" or built in the same build configuration, they need to be deployed together.
- A project per application, per environment, such as `OctoPetShop_Dev`, `OctoPetShop_Test`, and so on.  That is impossible to maintain and track versions.
- A project per customer or physical location, such as `OctoPetShop_AustinEast`, `OctoPetShop_AustinWest`, and so on.  This is impossible to maintain, you'd need a syncing process for all projects.  Use [multi-tenancy](/docs/tenants) instead.

## Cumulative changes

Octopus Deploy expects any application component it deploys to contain everything that the component needs.  If you are deploying a web application, the deployment should include all the JavaScript, CSS, binaries, HTML files, etc., needed to run that web application.  It shouldn't just be a delta change of a few HTML files or binaries.  Octopus Deploy expects that for a variety of reasons.

- All releases will need to be deployed to all environments.  
- Deploying only delta changes requires you to always deploy all versions in a specific order.  
- If a new deployment target (webserver) is created, you will have to deploy all versions to that new target rather than the latest.
- You'll need a mechanism to create roll-up releases; otherwise, the list of versions to deploy when a new target is added will grow and become unwieldy.
- It'll be near impossible to roll back to a previous version of the code.

## Further reading

For further reading on projects and project groups in Octopus Deploy, please see:

- [Projects](/docs/projects)
- [Multi-Tenancy](/docs/tenants)
