---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: First Runbook Run
description: This section will walk you through how to configure your first runbook run in Octopus Deploy.
navOrder: 20
hideInThisSection: true
---

This tutorial will help you complete your first runbook run using a sample script on one or more of your servers.  The only prerequisite is a running Octopus Deploy instance, either in Octopus Cloud or self-hosted.  The tutorial will walk through configuring deployment targets.

This tutorial will take between **15-25 minutes** to complete, with each step taking between **2-3** minutes to complete.  

1. [Configure environments](docs/getting-started/first-runbook-run/configure-runbook-environments.md)
1. [Create a project](docs/getting-started/first-runbook-run/create-runbook-projects.md)
1. [Create a runbook](docs/getting-started/first-runbook-run/create-a-runbook.md)
1. [Define a runbook process to run on workers](docs/getting-started/first-runbook-run/define-the-runbook-process.md)
1. [Running a runbook](/docs/getting-started/first-runbook-run/running-a-runbook.md)
1. [Defining and using runbook variables](/docs/getting-started/first-runbook-run/runbook-specific-variables.md)
1. [Adding deployment targets](/docs/getting-started/first-runbook-run/add-runbook-deployment-targets.md)
1. [Update runbook process to run on deployment targets](docs/getting-started/first-runbook-run/define-the-runbook-process-for-targets.md)
1. [Publishing a runbook](/docs/getting-started/first-runbook-run/publishing-a-runbook.md)

Before starting the tutorial, if you haven't set up an Octopus Deploy instance, please do so by selecting one of the following options:

!include <octopus-deploy-setup-options>

When you have an instance running, go to the [configure runbook environments page](docs/getting-started/first-runbook-run/configure-runbook-environments.md) to get started.

**Further Reading**

This tutorial will run a sample script, first on the default worker or your server; then, it will move onto running that script on your servers.  If you prefer to skip that and start configuring Octopus Deploy runbooks to meet your requirements, please see:

- [Runbook Documentation](/docs/runbooks/index.md) 
- [Runbook Examples](/docs/runbooks/runbook-examples/index.md)

<span><a class="btn btn-success" href="/docs/getting-started/first-runbook-run/configure-runbook-environments">Get Started</a></span>
