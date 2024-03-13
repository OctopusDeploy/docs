---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Google cloud account variables
description: Create a Google cloud account variable to use it in Google Cloud deployment steps
navOrder: 65
---

:::div{.hint}
Google Cloud Accounts were added in Octopus **2021.2**.
:::

[Google cloud accounts](/docs/infrastructure/accounts/google-cloud/) are included in a project through a project [variable](/docs/projects/variables/) of the type **Google Cloud Account**. Before you create a **Google cloud account Variable**, you need to [create a Google cloud account](/docs/infrastructure/accounts/google-cloud) in Octopus:

:::figure
![Google cloud account variable](/docs/projects/variables/images/google-cloud-account-variable.png)
:::

The **Add Variable** window is then displayed and lists all the Google cloud accounts.

Select the Google cloud account you want to access from the project to assign it to the variable:

:::figure
![Google Cloud account variable selection](/docs/projects/variables/images/google-cloud-account-variable-selection.png)
:::

## Google Cloud account variable properties

The Google cloud account variable also exposes the following properties that you can reference in a PowerShell script:

| Name and description |
| -------------------- | 
| **`JsonKey`** <br/> The JSON Key for the Google cloud account|

### Accessing the properties in a script

Each of the above properties can be referenced in PowerShell.

```powershell
# For an account with a variable name of 'google cloud account'

# Using $OctopusParameters
Write-Host 'GoogleCloudAccount.Id=' $OctopusParameters["google cloud account"]
Write-Host 'GoogleCloudAccount.JsonKey=' $OctopusParameters["google cloud account.JsonKey"]

# Directly as a variable
Write-Host 'GoogleCloudAccount.Id=' #{google cloud account}
Write-Host 'GoogleCloudAccount.JsonKey=' #{google cloud account.JsonKey}
```

## Add a Google cloud account to Octopus

For instructions to set up a Google cloud account in Octopus, see [Google Cloud Accounts](/docs/infrastructure/accounts/google-cloud).

## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables)
- How to use the [Run gcloud in a Script](/docs/deployments/google-cloud/run-gcloud-script) step
- How to create [Google cloud accounts](/docs/infrastructure/accounts/google-cloud)
