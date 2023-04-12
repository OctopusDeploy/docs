---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Running a Runbook
description: Step by step guide on how to run a runbook in Octopus Deploy.
navOrder: 50
hideInThisSection: true
---

Unlike a deployment with a pre-defined lifecycle, Runbooks can run on any environment in any order.  Runbooks are designed to automate routine maintenance tasks.  Maintenance tasks might need to run on **Test** and **Production** but not on **Development** environments.

1. From the *Hello Runbook* runbook you created on the previous page, click **RUN...**.

This screen provides the details of the Runbook you are about to run.

![run runbook basic options](images/run-runbook-basic-options.png "width=500")

2. Select an environment.
3. Click **RUN**.

![run runbook results](images/run-hello-runbook-results.png "width=500")

Because we didn't define any deployment targets for the target environment, Octopus ran the script directly on the Octopus Server.  If you are on Octopus Cloud, Octopus Deploy leased a [dynamic worker](/docs/infrastructure/workers/dynamic-worker-pools.md#on-demand) (a machine that executes tasks on behalf of the Octopus Server) that was then used to execute the hello world script.

The next step will cover [how to configure and use variables in runbooks](/docs/getting-started/first-runbook-run/runbook-specific-variables.md).

**Further Reading**

For further reading on running a Runbook please see:

- [Runbook vs Deployments](/docs/runbooks/runbooks-vs-deployments/)
- [Runbook Documentation](/docs/runbooks/)
- [Runbook Examples](/docs/runbooks/runbook-examples/)

<span><a class="btn btn-secondary" href="/docs/getting-started/first-runbook-run/define-the-runbook-process">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/first-runbook-run/runbook-specific-variables">Next</a></span>