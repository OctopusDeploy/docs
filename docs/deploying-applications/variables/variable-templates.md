---
title: Variable templates
position: 7
---


This page describes how variable templates can be defined in Octopus to indicate which variable values are required to successfully deploy a project.

:::hint
Variable templates were introduced in Octopus 3.4 and are currently able to be used to require variable values from [tenants](/docs/home/key-concepts/tenants.md). You can see a worked example of this in our multi-tenant deployments guide: [Working with tenant-specific variables](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-tenant-specific-variables.md)
:::


Variable templates let you configure variables that are required to successfully deploy a project.


![](/docs/images/5669366/5865564.png)


![](/docs/images/5669366/5865563.png?effects=drop-shadow)

|  | Description | Example |
| --- | --- | --- |
| Name | The name of the variable template. This will also be the name given to the resulting variable value you can use in your deployment process. | 

`Tenant.Alias`
 |
| --- | --- | --- |
| Label | The label that will be displayed when prompting for the variable value. | Tenant alias |
| --- | --- | --- |
| Help text | The descriptive help text that will be displayed to provide the user with enough information to accurately provide the value. | A shortened, URL friendly, version of the tenant's name. |
| --- | --- | --- |
| Default value | The value that will be given to the variable if an actual value is not provided. The default value can contain [variable binding expressions](/docs/home/deploying-applications/variables/binding-syntax.md). | `https://#{Tenant.Alias}.myapp.com` |
| --- | --- | --- |
| Data type | 

You can select one of several different data types. This controls the user interface provided to collect the variable value, and determines how the variable value is interpreted.


Note the variable values will be stored and interpreted as text.
 | 

Single-line text box
Multi-line text box
Drop down
Checkbox
Sensitive/password box
Azure Account
 |
| --- | --- | --- |
| Options | (Only applies when Data type: Drop down)
This defines the list of options available for the user to select from the drop down list. 

Enter each option on a new line. Use | to separate values and display text.
 | 
```
Value1|Display text 1
Value2|Display text 2
```
 |
| --- | --- | --- |

:::success
**Which variable templates apply to each tenant?**
Good question! When you connect a tenant to a project, variable templates defined by the project itself, or by included library variable sets, will be required by the tenant.

1. Library variable templates will be collected once - they are considered to be constant for the tenant. Think of these like "custom fields" for your tenants.
2. Project variable templates will be collected once for each project/environment combination the tenant is connected to. Think of these like database connection settings for the specific tenant/project/environment combination.



By carefully designing your variable templates you can implement complex multi-tenant deployment scenarios.
:::
