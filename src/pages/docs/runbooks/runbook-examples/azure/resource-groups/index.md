---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Deploy an Azure Resource Manager template
description: Deploy an Azure Resource Manager (ARM) template.
navOrder: 10
---

From [Authoring Azure Resource Manager Templates](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/overview):

> Azure applications typically require a combination of resources (such as a database server, database, or website) to meet the desired goals. Rather than deploying and managing each resource separately, you can create an Azure Resource Manager template that deploys and provisions all of the resources for your application in a single, coordinated operation.

Octopus Deploy supports deploying Azure Resource Manager (ARM) templates via the *Deploy an Azure Resource Manager template* step type. For information about adding a step to the deployment process, see the [add step](/docs/projects/steps) section. The instructions there apply equally to a runbook process too.

## Create Azure resources runbook

To create a runbook to deploy resources to Azure using the *Deploy an Azure Resource Manager template* step:

1. Navigate to your Project, then **Operations ➜ Runbooks ➜ Add Runbook**.
1. Give the runbook a name and click **SAVE**.

    :::div{.hint}
    Before creating the step, you must have created an [Azure Service Principal Account](/docs/infrastructure/accounts/azure/#azure-service-principal).
    :::

1. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
1. Add the step by clicking **Azure ➜ Deploy an Azure Resource Manager template**, or search for the step.

    ![Locate ARM step](/docs/runbooks/runbook-examples/azure/resource-groups/locate-arm-step.png)

1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Azure** section, choose the [Account](/docs/infrastructure/accounts/azure) to use.

    ![Azure Account variable](/docs/runbooks/runbook-examples/azure/resource-groups/azure-account.png)

    :::div{.hint}
    [Azure accounts](/docs/infrastructure/accounts/azure/) can be referenced in a project through a project [variable](/docs/projects/variables) of the type **Azure account**. 

    The step will allow you to bind the account to an **Azure account** variable, using the [binding syntax](/docs/projects/variables/#use-variables-in-step-definitions). By using a variable for the account, you can have different accounts used across different environments or regions using [scoping](/docs/projects/variables/#use-variables-in-step-definitions).
    :::

1. Select the **Resource Group** to place the created resources in. This can be selected from the drop-down of available resources or bound to a variable. The resource group must exist when the step is executed.

1. Set the **Deployment Mode**. It can be either [Incremental or Complete](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-to-resource-group?tabs=azure-cli).
1. Choose the **Template Source**. It can be either [JSON entered directly](#json-template) into the step, or a file [contained in a package](#packaged-template).
1. Enter any values for parameters if they are present.

Configure any other settings for the step such as Environment run conditions and click **SAVE**.

:::figure
![Azure ARM step](/docs/runbooks/runbook-examples/azure/resource-groups/azure-arm-process-step.png)
:::

### Template entered as JSON  {#json-template}

By selecting *Source Code* as the *Template Source*, you can enter your template directly as JSON.

The JSON will be parsed, and your parameters will appear dynamically as fields in the *Parameters* section.

The parameter fields will show text boxes or select-lists as appropriate.  You can enter values directly, or bind the parameters to Octopus Variables (e.g. see the *siteName* parameter in the image above).

:::div{.success}
Octopus will perform [variable-substitution](/docs/projects/variables/variable-substitutions) on the JSON template.

Although you can use variables directly in the template, it is more idiomatic to use parameters, and plug the variables into those (as seen above). This will allow you to use or test your template outside of Octopus Deploy.
:::

:::figure
![](/docs/runbooks/runbook-examples/azure/resource-groups/arm-json-template.png)
:::

### Sensitive data

:::div{.warning}
Parameters marked as [secure strings](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) represent sensitive data and it is important to make sure they aren't stored in plain text form.
:::

The field displayed when "From Octopus" option is selected stores data as plain text so sensitive data shouldn't be typed directly into it.  Instead, the value of the parameter should be provided either via a [Sensitive Variable](/docs/projects/variables/sensitive-variables/) if the value is stored in Octopus or via [Azure Key Vault](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/key-vault-parameter) if the value is stored outside of Octopus. Azure Resource Group Templates provide [out of the box integration with Azure Key Vault](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/key-vault-parameter?tabs=azure-cli).

:::figure
![](/docs/runbooks/runbook-examples/azure/resource-groups/arm-sensitive-data.png)
:::

### Template contained in a package {#packaged-template}

By selecting *Package* as the *Template Source*, you can select a package which will contain your template and parameter JSON files.

:::figure
![](/docs/runbooks/runbook-examples/azure/resource-groups/arm-package-source-template.png)
:::

The Template Path and Parameters Path fields should contain the relative path to these files within the package.

:::div{.success}
Octopus will perform [variable-substitution](/docs/projects/variables/variable-substitutions) on both the Template and Parameter files.
:::

#### Parameter file format

The Parameter JSON file can be in one of two formats:

- With Schema
- Without Schema

**Example with Schema**

```json
{
    "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "collation": {
            "value": "SQL_Latin1_General_CP1_CI_AS"
        },
        "administratorLoginPassword": {
            "value": "#{PasswordStoredAsSensitiveVariableInOctopus}"
        },
        "administratorLogin": {
            "value": "#{Login}"
        },
        "databaseName": {
            "value": "#{DatabaseName}"
        },
        "anotherSecretStoredInAzureKeyVault": {
            "reference": {
                "keyVault": {
                    "id": "#{KeyVaultResourceId}"
                },
                "secretName": "SecretName"
            }
        }
    }
}
```

**Example without Schema**

```json
{
    "collation": {
        "value": "SQL_Latin1_General_CP1_CI_AS"
    },
    "administratorLoginPassword": {
        "value": "#{PasswordStoredAsSensitiveVariable}"
    },
    "administratorLogin": {
        "value": "admin"
    },
    "databaseName": {
        "value": "#{DatabaseName}"
    },
    "anotherSecretStoredInAzureKeyVault": {
        "reference": {
            "keyVault": {
                "id": "#{KeyVaultResourceId}"
            },
            "secretName": "SecretName"
        }
    }
}

```

### Accessing ARM template output parameters {#arm-template-out-params}

Any outputs from the ARM template step are made available as [Octopus output-variables](/docs/projects/variables/output-variables) automatically. For example, an output `Foo` would be available as:

```powershell
Octopus.Action[Arm Template Step Name].Output.AzureRmOutputs[Foo]
```
Note, you need to replace **Arm Template Step Name** with the name of your ARM step template. 

### Using linked templates

Azure Resource Manager supports the concept of [linking templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-linked-templates). In this model you create a main template which links to other templates and parameters files via URI. This can be a really useful way to break your ARM templates into manageable components. In this case you would configure Octopus to deploy your main template, and the Azure Resource Manager will download any linked templates and parameters files as required to complete the deployment.

:::div{.hint}
**Linked templates must be publicly accessible via URI**
Please be aware that the URI you configure for the linked templates and parameters files must be publicly accessible by the Azure Resource Manager. For example: [http://www.contoso.com/AzureTemplates/newStorageAccount.json](http://www.contoso.com/AzureTemplates/newStorageAccount.json)

Learn more about [linked templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-linked-templates) and refer to [this discussion](https://help.octopus.com/t/azure-resource-management-templates/9654) for more details.
:::

## Learn more

- Generate an Octopus guide for [Azure and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Azure%20websites).

