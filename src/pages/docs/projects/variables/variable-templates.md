---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Variable templates
description: Variable templates can be defined in Octopus to indicate which variable values are required to successfully deploy a project.
navOrder: 100
---

Variable templates let you specify which [variables](/docs/projects/variables/) are required to successfully deploy a project to a [tenant](/docs/tenants/), and to provide those variables per tenant. 

Each variable template can define the data type, name, label, help text, and default value.

There are two types of variable templates:

- [Library variable set templates](#adding-a-variable-template) are variable values that are common across all tenants but need a unique value per tenant. For example, website names, titles, headers, images, logo, URLs, contact information. These values don't change across projects and environments for a tenant.
- [Project templates](#project-templates) are variable values that differ between projects and environments for a tenant. For example, server names or database connection settings. 

:::hint
View a working example on our [samples instance](https://samples.octopus.app/app#/Spaces-682/projects/vet-clinic-tenanted/variables).
:::

## Library variable set templates {#adding-a-variable-template}

To specify common variables that can be used across multiple tenants, you need to add a Variable template to either an existing or new Library variable set:

1. Navigate to **{{Library,Variable Sets}}** and click **ADD VARIABLE SET**.
2. Give the variable set a name, description, and click **SAVE**.
3. Click **{{Variable Templates,ADD TEMPLATE}}**.
4. Add the details to your template and click **SAVE**:

|      | Description                              | Example |
| ---- | ---------------------------------------- | ------- |
| **Name** | The name of the variable template. This will also be the name given to the resulting variable value you can use in your deployment process. | `Tenant.Alias` |
| **Label**         | The label that will be displayed when prompting for the variable value. | Tenant alias                             |
| **Help text**     | The descriptive help text that will be displayed to provide the user with enough information to accurately provide the value. | A shortened, URL friendly, version of the tenant's name. |
| **Default value** | The value that will be given to the variable if an actual value is not provided. The default value can contain [variable binding expressions](/docs/projects/variables/variable-substitutions/). | `https://#{Tenant.Alias}.myapp.com`      |
| **Control type** | You can select one of several different data types. This controls the user interface provided to collect the variable value, and determines how the variable value is interpreted. Note the variable values will be stored and interpreted as text. | Single-line text box, Multi-line text box, Drop down, Checkbox, Sensitive/password box, Azure Account |
| **Options** | (Only applies when Data type: Drop down). This defines the list of options available for the user to select from the drop down list. Enter each option on a new line. Use `|` to separate values and display text. | `Value1|Display text 1` <br>`Value2|Display text 2`  |

![](/docs/projects/variables/images/variable-templates-libraryset.png "width=500")

To set common variable values for a tenant:

1. Navigate to the **{{Variables,Common Variables}}** tab in the tenant screen:
1. Expand each connected environment and provide values for each project template:

    ![](/docs/projects/variables/images/variable-templates-common-value.png "width=500")

:::hint
If you can't see any variables in the Common Variables tab, ensure you have included the Library variable set in the connected project.
:::

## Project templates {#project-templates}

Project templates allow you to specify variables that can have different values per tenant/environment combination. A perfect example would be a connection string or a database server. With project templates, you define them at the project level.

To add a project template:

1. Navigate to the **{{Variables,Project Templates}}** tab in your tenant connected project.
1. Click **ADD TEMPLATE**.
1. Add the details to your template and click **ADD**:

    ![](/docs/projects/variables/images/variable-templates-project-template.png "width=500")

Then to set the variable values for a tenant:

1. Navigate to the **{{Variables,Project Variables}}** tab in the tenant screen:
1. Expand each connected environment and provide values for each project template:

    ![](/docs/projects/variables/images/variable-templates-project-value.png "width=500")
    
## Which variable templates apply to a tenant {#which-variable-templates-apply-tenants}

!include <tenants-which-variable-templates-apply>

## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables)