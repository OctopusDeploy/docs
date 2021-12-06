---
title: Azure accounts
description: Using Octopus managed Azure accounts with Terraform
---

## Azure Account Support

If you wish to use Azure credentials managed by Octopus when deploying Terraform templates, the Azure account will need to be added to Octopus, and a variable referencing the account configured in the project.

:::hint
Using Azure credentials managed by Octopus is optional. These credentials can be saved directly into the Terraform template if that approach is preferable.
:::

### Create an Azure account

The instructions at [Creating an Azure Account](/docs/infrastructure/accounts/azure/index.md) detail the procedure for creating an account in Octopus.

#### Create a Azure account project variable

[Azure accounts](/docs/infrastructure/accounts/azure/index.md) can be referenced in a project through a project [variable](/docs/projects/variables/index.md) of the type **Azure account**.

The [Azure PowerShell](/docs/deployments/azure/running-azure-powershell/index.md) step will allow you to bind the account to an **Azure account** variable, using the [binding syntax](/docs/projects/variables/index.md#Bindingsyntax-Referencingvariablesinstepdefinitions). By using an variable for the account, you can have different accounts used across different environments or regions using [scoping](/docs/projects/variables/index.md#Bindingsyntax-Referencingvariablesinstepdefinitions).

![Azure Account variable](/docs/deployments/terraform/managed-accounts/images/azure-account-variable.png "width=500")

The **Add Variable** window is then displayed and lists all the Azure accounts.

Select the account that was created in the previous step to assign it to the variable.

![Azure account variable selection](/docs/deployments/terraform/managed-accounts/images/azure-account-variable-selection.png "width=500")

#### Selecting the account

Under the `Managed Account` section, select `Azure Account`.

:::hint
Credentials defined in the Terraform template take precedence over any credentials defined in the step.
:::