---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Package deployment feature ordering
description: The order of actions executed when Octopus deploys a package.
navOrder: 200
---

When Octopus deploys packages, it runs a series of actions implementing the conventions or features enabled for that step.

:::div{.hint}
[Calamari](https://github.com/OctopusDeploy/Calamari) is the open source component that powers this feature.
:::

The order of evaluation once the package is extracted is:

1. **BeforePreDeploy.\* Feature Scripts** - runs matching scripts associated with any enabled features. These bootstrap scripts are created by Octopus and cannot be customized by the user.
2. **PreDeploy.\* Scripts** - runs matching [scripts included in the package](/docs/deployments/custom-scripts/scripts-in-packages) or defined using the [Custom PowerShell Scripts](/docs/deployments/custom-scripts/scripts-in-packages/#scripts-in-package-steps) feature.
3. **AfterPreDeploy.\* Feature Scripts** - runs matching scripts associated with any enabled features. These bootstrap scripts are created by Octopus and cannot be customized by the user.
4. **Delete temporary package files**
5. **Substitute Octopus Variables in templates**- if the variable substitution feature is enabled, [perform substitution in listed files](/docs/projects/steps/configuration-features/substitute-variables-in-templates).
6. **.NET XML Configuration Transforms**- if the feature is enabled, find and apply [matching XML transforms](/docs/projects/steps/configuration-features/configuration-transforms).
7. **.NET XML Configuration Variables** - if the feature is enabled, use Octopus variables to find and replace [matching appSettings, applicationSettings, and connectionStrings](/docs/projects/steps/configuration-features/xml-configuration-variables-feature) values.
8. **Structured Configuration Variables** - if the feature is enabled, use Octopus variables to find and replace [matching values in JSON, YAML, XML and Properties configuration files](/docs/projects/steps/configuration-features/structured-configuration-variables-feature).
9. **Custom Installation Folder copy**- if the custom installation folder feature is enabled, copy files to the folder.
10. **BeforeDeploy.\* Feature Scripts**- runs matching scripts associated with any enabled features. These bootstrap scripts are created by Octopus and cannot be customized by the user.
11. **Deploy.\* Scripts**- runs matching [scripts included in the package](/docs/deployments/custom-scripts/scripts-in-packages) or defined using the [Custom PowerShell Scripts](/docs/deployments/custom-scripts/scripts-in-packages/#scripts-in-package-steps) feature.
12. **AfterDeploy.\* Feature Scripts**- runs matching scripts associated with any enabled features. These bootstrap scripts are created by Octopus and cannot be customized by the user.
13. **IIS Home Directory** - sets the IIS web site's home directory to the new install location, if that feature is enabled.
14. **BeforePostDeploy.\* Feature Scripts**- runs matching scripts associated with any enabled features. These bootstrap scripts are created by Octopus and cannot be customized by the user.
15. **PostDeploy.\* Scripts**- runs matching [scripts included in the package](/docs/deployments/custom-scripts/scripts-in-packages) or defined using the [Custom PowerShell Scripts](/docs/deployments/custom-scripts/scripts-in-packages/#scripts-in-package-steps) feature.
16. **AfterPostDeploy.\* Feature Scripts**- runs matching scripts associated with any enabled features. These bootstrap scripts are created by Octopus and cannot be customized by the user.

If an item fails, the remaining items will not be executed, and instead **DeployFailed.\* Scripts** will be found and executed.

:::div{.success}
**Skipping conventions**
Any of the scripts run during deployment may set a variable to short-circuit the process and skip remaining items, as with this example in *PowerShell*:

`Set-OctopusVariable -name 'Octopus.Action.SkipRemainingConventions' -value 'True'`
:::
