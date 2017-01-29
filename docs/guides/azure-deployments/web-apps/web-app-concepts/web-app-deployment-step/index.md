---
title: Web App deployment step
---

Octopus Deploy supports automated deployment of [Azure Web Apps](http://azure.microsoft.com/en-us/services/app-service/web/) (formerly known as Azure Web Sites).

## Deployment Step {#WebAppdeploymentstep-DeploymentStep}

Add a new 'Deploy an Azure Web App' step to your project. For information about adding a step to the deployment process, see the [add step](http://docs.octopusdeploy.com/display/OD/Add+step) section.

![](/docs/images/5671696/5865899.png "width=170")

![](/docs/images/3049430/3278562.png "width=500")

Once an Account is selected, the list of Azure Web Apps available to the subscription associated with the account will populate the 'Web App' select-list.

### Physical Path {#WebAppdeploymentstep-PhysicalPath}

Allows deployment to a physical sub-directory of the web-root.  This is useful when deploying to Virtual Directories or Web Jobs, and you don't want to deploy the root application at the same time.

### Remove additional files {#WebAppdeploymentstep-Removeadditionalfiles}

When set, deletes files from the destination that aren't in the source package.

**Preserve App\_Data**

When set, skip Delete operations in the **App\_Data** directory.

:::hint
**Preserve Specific Paths**
If you wish to set the "Remove additional files" option but preserve specific paths, see[ this document](/docs/guides/azure-deployments/web-apps/web-app-concepts/web-app-deployment-step/preserve-specific-paths-when-deploying-azure-web-app.md).
:::

**Enable AppOffline**

When set, this safely brings down a website with a blank app\_offline.htm file in the root.

:::hint
For more information, see [Taking an Application Offline before Publishing](https://www.iis.net/learn/publish/deploying-application-packages/taking-an-application-offline-before-publishing).
:::

**Variable-expressions**

Any of the fields above can be switched to use a custom expression.

## Features {#WebAppdeploymentstep-Features}

The following features are available when deploying a package to an Azure Web App.

- [Custom Scripts](/docs/deploying-applications/custom-scripts/index.md)
- [Configuration Variables](/docs/deploying-applications/configuration-files/index.md)
- [Configuration Transforms](/docs/deploying-applications/configuration-files/index.md)
- [Substitute variables in files](/docs/reference/variable-substitution-syntax.md)

### PowerShell {#WebAppdeploymentstep-PowerShell}

PowerShell custom scripts executed against an Azure Web App target will have the Azure PowerShell module loaded, and the subscription from the chosen account will be selected.
