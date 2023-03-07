---
title: Azure
description: Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Azure.
position: 30
hideInThisSectionHeader: true
---

Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Azure.

Out-of-the-box, Octopus provides built-in steps to deploy to the following Azure products:

- [Azure Web applications](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app/index.md) and [web jobs](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app/deploying-web-jobs.md) (also works for [Azure Functions](https://octopus.com/blog/azure-functions)).
- [Resource Group Templates](/docs/runbooks/runbook-examples/azure/resource-groups/index.md).
- [Azure Cloud Services](/docs/deployments/azure/cloud-services/index.md).
- [Service Fabric](/docs/deployments/azure/service-fabric/index.md).
- [Executing PowerShell scripts using the Azure cmdlets](/docs/deployments/custom-scripts/azure-powershell-scripts.md). Follow our guide on [running Azure PowerShell scripts](/docs/deployments/azure/running-azure-powershell/index.md).
- The one you are looking for is not here? [Share your product feedback](https://roadmap.octopus.com/submit-idea) to let us know how we can help you have happy deployments.


With [runbooks](/docs/runbooks/index.md), Octopus provides built-in steps to help manage your infrastructure in Azure:
- [Resource Group Templates](/docs/runbooks/runbook-examples/azure/resource-groups/index.md).

:::hint
**Where do Azure steps execute?**
All steps that target an Azure deployment target (including script steps) execute on a worker.  By default, that will be the built-in worker in the Octopus Server. Learn about [workers](/docs/infrastructure/workers/index.md) and the different configuration options.
:::

## Learn more

- Generate an Octopus guide for [Azure and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Azure%20websites).
- [Azure blog posts](https://octopus.com/blog/tag/azure).
- [Azure runbook examples](/docs/runbooks/runbook-examples/azure/index.md).
