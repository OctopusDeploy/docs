---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Argo CD deployments with Octopus
navTitle: Overview
description: Octopus Deploy can help you manage your Argo CD applications navigate lifecycle promotion
navSection: Argo CD
navOrder: 28
hideInThisSectionHeader: true
---

Octopus makes it easy to improve your Argo CD deployments with environment modeling and deployment orchestration. Automate everything 
from environment promotion and compliance to tests and change management.

:::figure
![Argo in Octopus Overview](/docs/img/argo-cd/argo-cd-overview.png)
:::

Argo CD excels at synchronizing manifests to clusters and provides a powerful UI to verify and troubleshoot deployments.
However, it treats each of your applications as independent entities, meaning there's no `codified` relationship between staging 
and production installations of your applications. Because of this, you need to manage this staging/production relationship and promotion between them
through external mechanisms, eg:
* Manual file manipulations
* Custom scripts, run automatically or via Jenkins/CI tooling

The Octopus/Argo integration means your Argo Applications can be updated and deployed via an Octopus Deployment Process (or runbook).
Which in turn means your Applications can be safely promoted through a controlled lifecycle.

Octopus makes integrating and deploying with Argo CD simple:
1. Creating a connection to Argo CD instances and cross mapping Argo CD Applications to Octopus Projects
2. Deployment steps which can update the Git repositories backing the mapped Argo CD Applications
3. Dashboards and live status displays, showing the result of deployment, and the status of the deployed applications and resources

This section expands each of these areas, while also providing useful resources and tutorials to get you
up and running with Argo CD in Octopus faster.
