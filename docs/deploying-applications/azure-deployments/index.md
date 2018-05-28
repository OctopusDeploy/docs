---
title: Azure Deployments
description: Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Azure.
position: 40
---

Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Azure.

Out of the box, Octopus provides built-in steps to deploy to the following Azure products:

- [Azure Web applications](/docs/deploying-applications/azure-deployments/deploying-a-package-to-an-azure-web-app/index.md) and [web jobs](also works for [Azure Functions](https://octopus.com/blog/azure-functions))
- [Resource Group Templates](/docs/deploying-applications/azure-deployments/resource-groups/index.md).
- [Azure Cloud Services](/docs/deploying-applications/azure-deployments/cloud-services/index.md).
- [Service Fabric](/docs/deploying-applications/azure-deployments/deploying-to-service-fabric/index.md).
- [Executing PowerShell scripts using the Azure cmdlets](/docs/deploying-applications/custom-scripts/azure-powershell-scripts.md). Follow our guide on [running Azure PowerShell scripts](/docs/deploying-applications/azure-deployments/running-azure-powershell/index.md).
- The one you are looking for is not here? Leave us a feature request in [Uservoice](https://octopusdeploy.uservoice.com/)!

:::hint
**Where do Azure Steps execute?**
All Azure Steps are executed on the `Octopus Server` instead of being ran on `Tentacles` . If you would like the ability to delegate Azure deployments to a Tentacle, there is a [UserVoice suggestion where you can vote and have your say on this kind of feature](https://octopusdeploy.uservoice.com/forums/170787-general/suggestions/6316906-support-run-on-any-tentacle-model-for-deployment).
:::
