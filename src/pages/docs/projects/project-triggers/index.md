---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-02-14
title: Project triggers
icon: fa-solid fa-flag
description: Project Triggers allow you to define unattended behavior for your project such as automatically deploying a release to an environment.
navOrder: 90
---

Project triggers allow you to automate your deployments by responding to events, for example, changes in your deployment targets or time-based schedules.

Choose from a subset of **events** that can occur in Octopus Deploy, apply a **filter** to those events, and decide what **action** you want performed after the trigger fires.

## Types of project triggers

- [Git repository triggers](/docs/projects/project-triggers/git-triggers): specify Git repositories to be monitored for new commits that will automatically trigger a release of your project.
- [Deployment target triggers](/docs/projects/project-triggers/deployment-target-triggers): specify which events on your deployment targets will automatically trigger a release of your project.
- [Scheduled deployment triggers](/docs/projects/project-triggers/scheduled-deployment-trigger): define a recurring time-based schedule to automate deploying releases for your project.
- [External feed triggers](/docs/projects/project-triggers/external-feed-triggers): specify container images or Helm charts that will automatically trigger a release of your project.
- [Built-in package repository triggers](/docs/projects/project-triggers/built-in-package-repository-triggers): specify which package updates from the built-in package repository will automatically trigger a release of your project.

## Example

The example below is a [deployment target trigger](/docs/projects/project-triggers/deployment-target-triggers) that fires when a [deployment target](/docs/infrastructure/) in the **Production** [environment](/docs/infrastructure/environments) becomes available and is tagged with the **web-server** [target tag](/docs/infrastructure/deployment-targets/target-tags).

:::figure
![](/docs/projects/project-triggers/images/octopus-triggers-diagram.png)
:::