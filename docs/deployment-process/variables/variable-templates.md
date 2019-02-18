---
title: Variable Templates
description: Variable templates can be defined in Octopus to indicate which variable values are required to successfully deploy a project.
position: 70
---

Working with [Multi-tenants](/docs/deployment-patterns/multi-tenant-deployments/index.md) in Octopus, allows you to deploy releases to multiple customers. As you work with multi-tenant releases there will be [variables](/docs/deployment-process/variables/index.md) that are common across all tenants but need a unique value per tenant, for instance, website names, titles, headers, images, logo, URLs, contact information, and technical details such as server names and database connection settings. The Variable Template feature lets you specify which variables are required to successfully deploy a project to a tenant, and then to provide those variables per tenant.

:::hint
For a working example see our multi-tenant deployments guide: [Working with tenant-specific variables](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-tenant-specific-variables.md).
:::

## Adding a Variable Template

1. Navigate to **{{Library,Variable Sets}}** and click **ADD VARIABLE SET**.
2. Give the variable set a name, description, and click **SAVE**.
3. Click **{{Variable Templates,ADD TEMPLATE}}**.
4. Add the details to your template and click **SAVE**:

|      | Description                              | Example |
| ---- | ---------------------------------------- | ------- |
| **Name** | The name of the variable template. This will also be the name given to the resulting variable value you can use in your deployment process. | `Tenant.Alias` |
| **Label**         | The label that will be displayed when prompting for the variable value. | Tenant alias                             |
| **Help text**     | The descriptive help text that will be displayed to provide the user with enough information to accurately provide the value. | A shortened, URL friendly, version of the tenant's name. |
| **Default value** | The value that will be given to the variable if an actual value is not provided. The default value can contain [variable binding expressions](/docs/deployment-process/variables/variable-substitutions.md). | `https://#{Tenant.Alias}.myapp.com`      |
| **Control type** | You can select one of several different data types. This controls the user interface provided to collect the variable value, and determines how the variable value is interpreted. Note the variable values will be stored and interpreted as text. | Single-line text box, Multi-line text box, Drop down, Checkbox, Sensitive/password box, Azure Account |
| **Options** | (Only applies when Data type: Drop down). This defines the list of options available for the user to select from the drop down list. Enter each option on a new line. Use `|` to separate values and display text. | `Value1|Display text 1` <br>`Value2|Display text 2`  |

:::success
**Which variable templates apply to each tenant?**
Good question! When you connect a tenant to a project, variable templates defined by the project itself, or by included library variable sets, will be required by the tenant.

1. Library variable templates will be collected once - they are considered to be constant for the tenant. Think of these like "custom fields" for your tenants.
2. Project variable templates will be collected once for each project/environment combination the tenant is connected to. Think of these like database connection settings for the specific tenant/project/environment combination.

By carefully designing your variable templates you can implement complex multi-tenant deployment scenarios.
:::
