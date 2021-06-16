---
title: Google Cloud account variables
description: Create a Google Cloud account variable to use it in Google Cloud deployment steps
position: 65
---

[Google Cloud accounts](/docs/infrastructure/accounts/google-cloud/index.md) are included in a project through a project [variable](/docs/projects/variables/index.md) of the type **Google Cloud Account**. Before you create a **Google Cloud account Variable**, you need to [create a Google Cloud account](/docs/infrastructure/accounts/google-cloud/index.md) in Octopus:

![Google Cloud account variable](images/google-cloud-account-variable.png "width=500")

The **Add Variable** window is then displayed and lists all the Google Cloud accounts.

Select the Google Cloud account you want to access from the project to assign it to the variable:

![Google Cloud account variable selection](images/google-cloud-account-variable-selection.png "width=500")

## Google Cloud account variable properties

The Google Cloud account variable also exposes the following properties that you can reference in a PowerShell script:

| Name and description | Example |
| -------------------- | ------------------------|
| **`JsonKey`** <br/> The JSON Key for the Google Cloud account| |

### Accessing the properties in a script

Each of the above properties can be referenced in PowerShell.

```powershell
# For an account with a variable name of 'google cloud account'

# Using $OctopusParameters
Write-Host 'GoogleCloudAccount.Id=' $OctopusParameters["google cloud account"]
Write-Host 'GoogleCloudAccount.JsonKey=' $OctopusParameters["google cloud account.AccessKey"]

# Directly as a variable
Write-Host 'GoogleCloudAccount.Id=' #{google cloud account}
Write-Host 'GoogleCloudAccount.JsonKey=' #{google cloud account.JsonKey}
```

## Add a Google Cloud account to Octopus

For instructions to set up a Google Cloud account in Octopus, see [Google Cloud accounts](/docs/infrastructure/accounts/google-cloud/index.md).

## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables)