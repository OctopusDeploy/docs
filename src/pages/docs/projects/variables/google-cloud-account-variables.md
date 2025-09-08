---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-29
title: Google Cloud account variables
icon: fa-brands fa-google
description: Create a Google Cloud account variable to use it in Google Cloud deployment steps
navOrder: 65
---

[Google Cloud accounts](/docs/infrastructure/accounts/google-cloud/) are included in a project through a project [variable](/docs/projects/variables/) of the type **Google Cloud Account**. Before you create a **Google Cloud account variable**, you need to [create a Google Cloud account](/docs/infrastructure/accounts/google-cloud) in Octopus:

:::figure
![Google Cloud account variable](/docs/img/projects/variables/images/google-cloud-account-variable.png)
:::

The **Add Variable** window is then displayed and lists all the Google Cloud accounts.

Select the Google Cloud account you want to access from the project to assign it to the variable:

:::figure
![Google Cloud account variable selection](/docs/img/projects/variables/images/google-cloud-account-variable-selection.png)
:::

## Google Cloud account variable properties

The Google Cloud account variable also exposes the following properties that you can reference in a PowerShell script:

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

## Add a Google Cloud account to Octopus

For instructions to set up a Google Cloud account in Octopus, see [Google Cloud Accounts](/docs/infrastructure/accounts/google-cloud).

## Older versions
* Google Cloud accounts are available from Octopus Deploy **2021.3** onwards.

## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables)
- How to use the [Run gcloud in a Script](/docs/deployments/google-cloud/run-gcloud-script) step
- How to create [Google Cloud accounts](/docs/infrastructure/accounts/google-cloud)
