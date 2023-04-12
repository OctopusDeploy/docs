---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Azure
description: Octopus Deploy can help you automate the provisioning of infrastructure in Azure using runbooks.
navOrder: 50
hideInThisSectionHeader: true
---

Octopus is great for helping you perform repeatable and controlled deployments of your applications into [Azure](https://azure.microsoft.com/), but you can also use it to manage your infrastructure in Azure. Runbooks can be used to help automate this without having to create new deployment releases.

Typical routines could be:

- Creating a new [Resource group](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups).
- Spinning up a new Virtual Machine.
- Managing firewall rules.
- Tearing down a Resource group.

Out-of-the-box, Octopus provides built-in steps to help manage your infrastructure in Azure:
- [Resource Group Templates](/docs/runbooks/runbook-examples/azure/resource-groups/).
- [Executing PowerShell scripts using the Azure cmdlets](/docs/deployments/custom-scripts/azure-powershell-scripts.md). Follow our guide on [running Azure PowerShell scripts](/docs/deployments/azure/running-azure-powershell/).

## Learn more

- Generate an Octopus guide for [Azure and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Azure%20websites).
- [Azure blog posts](https://octopus.com/blog/tag/azure).
- [Azure deployment examples](/docs/deployments/azure/).
