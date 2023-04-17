---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Blue-green deployments in Octopus using Environments
description: Implementing blue-green deployments in Octopus using Environments.
navOrder: 10
---

To implement blue-green deployments in Octopus using [Environments](/docs/infrastructure/environments/), create two environments - one for blue, and one for green:

![](/docs/deployments/patterns/blue-green-deployments/images/blue-green-create-envs.png "width=500")

When deploying, you can then choose which environment to deploy to - either blue or green. The dashboard will show which release is in each environment.

![](/docs/deployments/patterns/blue-green-deployments/images/blue-green-dashboard.png "width=500")

Configuring your [lifecycle](/docs/releases/lifecycles/) will need to be done accordingly. Typically you would have both your blue and green environments in a shared "Production/Staging" phase.

![](/docs/deployments/patterns/blue-green-deployments/images/blue-green-lifecycle.png "width=500")

## Learn more

- [View Blue/Green deployment examples on our samples instance](https://oc.to/PatternBlueGreenSamplesSpace).
- [Change load-balancer group Runbook example](/docs/runbooks/runbook-examples/aws/change-load-balancer-group/).
- [Blue/Green deployment knowledge base articles](https://oc.to/BlueGreenTaggedKBArticles).
- [Ask Octopus Episode: Blue/Green Deployments](https://www.youtube.com/watch?v=qFqoVwVzeo0)
- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns).
