---
title: Preserve Specific Paths When Deploying Azure Web App

---


When configuring the[ Deploy an Azure Web App](/docs/home/guides/azure-deployments/web-apps/web-app-concepts/web-app-deployment-step.md) step, if you wish to set the "Remove additional files" option but preserve specific paths (i.e. other than App\_Data) you can create a variable named `Octopus.Action.Azure.PreservePaths`.


The value should be set to a list of regexes, delimeted by `;` that will be used to select directories and files to preserve.


For example, to preserve any paths beginning with `\Component` you could use:

```powershell
\\Component.*(\\.*|$)
```

:::hint
Note: Because of the way the rules work for [WebDeploy](https://www.iis.net/downloads/microsoft/web-deploy) (which is used internally by Octopus when deploying Azure Websites), your pattern must also match any parent directories of the path you wish to preserve.


For e.g. if you had the paths:

```powershell
\Components\ComponentA
\Components\ComponentB
```


and you wanted to preserve `ComponentA` but *not* `ComponentB`, then you would have to set the variable to:

```powershell
\\Components;\\Components\\ComponentA(\\.*|$)
```
:::
