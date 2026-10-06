---
layout: src/layouts/Default.astro
pubDate: 2026-10-06
modDate: 2026-10-06
title: Pipeline explorer
description: The pipeline explorer gives you a single view of how a project's pipeline and deployment process work, including its dependencies and any issues that need attention.
navOrder: 3
---

The pipeline explorer brings a project’s configuration together in one place. It helps you understand how an Octopus project works, on one page.

It's built for anyone who's new to a project: joining a team, inheriting ownership, or exploring an unfamiliar corner of their own instance.

There are three key aspects to the pipeline explorer:

- [Pipeline visualization](#pipeline-visualization)
- [Process visualization](#process-visualization)
- [Configuration issues](#configuration-issues)

You'll find it from your project's navigation, under Pipeline Explorer.

## Pipeline visualization

The pipeline explorer presents your project's deployment pipeline and deployment process as workflow diagrams. Seeing them visually lets you understand how a release is triggered and how it moves through your environments, without piecing that together from separate tabs.

:::figure
![Pipeline visualization](/docs/img/projects/pipeline-explorer/pipeline-visualization.png)
:::

The pipeline is the sequence of environments a release progresses through, and how it gets there: automatically, manually, or gated by an approval. The deployment process is the sequence of steps that run within each environment, such as deploying a package or running a script. The pipeline explorer shows both together: the pipeline as the overall shape of how a release advances, and the process as what happens each time a project is deployed.

Pipelines can differ by channel, so the visualization reflects the channel you're viewing. This lets you see exactly which environments a given release will move through and what triggers that progression, before you commit to a deployment.

## Process visualization

A project's deployment process depends on resources that live outside its process, like lifecycles, deployment targets, credentials, and approvals. The pipeline explorer surfaces these connections directly, so you don't need to already know where each one lives.

:::figure
![Process visualization](/docs/img/projects/pipeline-explorer/process-visualization.png)
:::

Each of these is normally configured on its own page: lifecycles define which environments a release can reach and in what order, targets are the machines or services a step deploys to, credentials are the accounts a step authenticates with, and approvals gate progression into specific environments. None of them are visible from a single place unless you already know to look for them.

The pipeline explorer surfaces each connection against the part of the pipeline or process it affects, so you can see, for example, which credential a step uses or which lifecycle governs a channel's environments, without opening a separate page for each one. This is especially useful when you're getting oriented in a project you didn't build, or inheriting ownership of one from someone else.

## Configuration issues

The pipeline explorer flags conditions that could affect an upcoming deployment, directly in the view where you're already looking.

:::figure
![Configuration issues](/docs/img/projects/pipeline-explorer/configuration-issues.png)
:::

An issue here means something in the project's configuration needs attention before it causes a failed or delayed deployment, such as a deployment target that's currently unhealthy, or a credential or certificate that's nearing expiry. These are the kinds of problems that would otherwise surface only when a deployment fails or a certificate lapses unexpectedly. The pipeline explorer surfaces them here so you find out before you start a deployment, not during one.

## What it doesn't do

The pipeline explorer is a new view built on top of your project's existing configuration. It doesn't replace anything or change how you use it. You can still edit your configuration there exactly as you typically would.

Use the pipeline explorer to understand a project's shape and catch anything that needs attention.
