---
title: Azure Deployments
description: Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Azure.
position: 20
---

Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Azure.

Out of the box, Octopus provides built-in steps to deploy to the following Azure products:

- [Azure Web applications](/docs/deployment-examples/azure-deployments/deploying-a-package-to-an-azure-web-app/index.md) and [web jobs](/docs/deployment-examples/azure-deployments/deploying-a-package-to-an-azure-web-app/deploying-web-jobs.md) (also works for [Azure Functions](https://octopus.com/blog/azure-functions))
- [Resource Group Templates](/docs/deployment-examples/azure-deployments/resource-groups/index.md).
- [Azure Cloud Services](/docs/deployment-examples/azure-deployments/cloud-services/index.md).
- [Service Fabric](/docs/deployment-examples/azure-deployments/deploying-to-service-fabric/index.md).
- [Executing PowerShell scripts using the Azure cmdlets](/docs/deployment-examples/custom-scripts/azure-powershell-scripts.md). Follow our guide on [running Azure PowerShell scripts](/docs/deployment-examples/azure-deployments/running-azure-powershell/index.md).
- The one you are looking for is not here? Leave us a feature request in [Uservoice](https://octopusdeploy.uservoice.com/)!

:::hint
**Where do Azure Steps execute?**
All steps that target an Azure deployment target (including script steps) execute on a worker.  By default, that will be the built-in worker in the Octopus Server. Learn about [workers](/docs/administration/workers/index.md) and the different configuration options.
:::
