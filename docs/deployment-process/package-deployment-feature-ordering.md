---
title: Package deployment feature ordering
description: The order of actions executed when Octopus deploys a package.
position: 200
---

When Octopus deploys packages, it runs a series of actions implementing the conventions or features enabled for that step.

:::hint
[Calamari](https://github.com/OctopusDeploy/Calamari) is the open source component that powers this feature.
:::

The order of evaluation once the package is extracted is:

1. **BeforePreDeploy.\* Feature Scripts** - runs matching scripts associated with any enabled features. These bootstrap scripts are created by Octopus and cannot be customized by the user.
2. **PreDeploy.\* Scripts** - runs matching [scripts included in the package](/docs/deploying-applications/custom-scripts/index.md#Customscripts-ScriptsinPackages) or defined using the *[Custom PowerShell Scripts](/docs/deploying-applications/custom-scripts/index.md#Customscripts-Scriptsinpackagesteps)* feature
3. **AfterPreDeploy.\* Feature Scripts** - runs matching scripts associated with any enabled features. These bootstrap scripts are created by Octopus and cannot be customized by the user.
4. **Delete temporary package files**
5. **Substitute Octopus Variables in files**- if the variable substitution feature is enabled, perform substitution in listed files
6. **XML Configuration Transforms**- if the feature is enabled, find and apply matching XML transforms
7. **XML Configuration Variables** - if the feature is enabled, find and replace matching *appSettings, applicationSettings,and connectionStrings* values
8. **Custom Installation Folder copy**- if the custom installation folder feature is enabled, copy files to the folder
9. **BeforeDeploy.\* Feature Scripts**- runs matching scripts associated with any enabled features. These bootstrap scripts are created by Octopus and cannot be customized by the user.
10. **Deploy.\* Scripts**- runs matching [scripts included in the package](/docs/deploying-applications/custom-scripts/index.md#Customscripts-ScriptsinPackages) or defined using the *[Custom PowerShell Scripts](/docs/deploying-applications/custom-scripts/index.md#Customscripts-Scriptsinpackagesteps)* feature
11. **AfterDeploy.\* Feature Scripts**- runs matching scripts associated with any enabled features. These bootstrap scripts are created by Octopus and cannot be customized by the user.
12. **IIS Home Directory** - sets the IIS web site's home directory to the new install location, if that feature is enabled
13. **BeforePostDeploy.\* Feature Scripts**- runs matching scripts associated with any enabled features. These bootstrap scripts are created by Octopus and cannot be customized by the user.
14. **PostDeploy.\* Scripts**- runs matching [scripts included in the package](/docs/deploying-applications/custom-scripts/index.md#Customscripts-ScriptsinPackages) or defined using the *[Custom PowerShell Scripts](/docs/deploying-applications/custom-scripts/index.md#Customscripts-Scriptsinpackagesteps)* feature
15. **AfterPostDeploy.\* Feature Scripts**- runs matching scripts associated with any enabled features. These bootstrap scripts are created by Octopus and cannot be customized by the user.

If an item fails, the remaining items will not be executed, and instead **DeployFailed.\* Scripts** will be found and executed.

:::success
**Skipping conventions**
Any of the scripts run during deployment may set a variable to short-circuit the process and skip remaining items, as with this example in *PowerShell*:

`Set-OctopusVariable -name 'Octopus.Action.SkipRemainingConventions' -value 'True'`
:::
