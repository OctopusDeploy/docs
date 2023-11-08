---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: What is platform engineering?
description: A brief overview of what platform engineering is.
navOrder: 1
---

Platform engineering is: 

* A central repository of architectural decisions made by DevOps teams
* An Internal Developer Platform (IDP) that allows those decisions to be implemented throughout DevOps teams at scale
* Feedback processes that allow architectural decisions to be improved over time

While platform engineering is not limited to CI/CD pipelines, CI/CD platforms provide a convenient foundation on which to implement an IDP because:

* They have already been deployed into enterprises on supported infrastructure
* DevOps teams already know how to use them
* They have rich CLIs and APIs to support automation
* They manage execution environments in which to run automated tasks
* They already have access to existing DevOps systems

Octopus can function as an IDP through a combination of IaC (with the [Terraform provider](https://registry.terraform.io/providers/OctopusDeployLabs/octopusdeploy/latest/docs)), Git based workflows (with [Config-as-code](/docs/projects/version-control)), and specially designed step templates to deploy and track changes to deployment projects and runbooks.