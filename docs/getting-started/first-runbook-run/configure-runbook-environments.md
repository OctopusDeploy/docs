---
title: Configure Runbook Environments
description: Step by step guide on how to configure environments in Octopus Deploy.
position: 10
hideInThisSection: true
---

!include <creating-environments>

:::hint
Try to reuse the same environments as your deployments whenever possible.  You will often runbooks runbooks on the same deployment targets as your deployment process.  Creating runbook only environments can saturate your dashboards and lifecycles.  If you do need to have a environment specific to runbooks, we recommend limiting it to `Maintenance`.
:::

Now that you have configured your first set of environments, you can move on to [creating runbook projects](docs/getting-started/first-runbook-run/create-runbook-projects.md).