---
title: Creating project template variables
description: Create varibales for each tenant used as part of a multi-tenant SaaS setup in Octopus Deploy.
position: 50
hideInThisSectionHeader: true
---

Each customer has there own database and a unique name for every environment. To make this manageable we can create [project template variables](/docs/tenants/tenant-variables.md#project-variables) for the database name.

You can specify the variable type for the project template, just like regular variables. You can also provide a default value which the tenant can overwrite.

To create a Project Template navigate to **{{Projects, Variables, Project Templates, ADD TEMPLATE }}**.

![](images/creating-new-project-variable-templates.png "width=500")

Next, add a variable name, label, help text, control type and an optional Default value.

![](images/add-new-project-variable-template.png "width=500")

The next step will define the [infrastructure](/docs/tenants/guides/multi-tenant-saas-application/creating-new-octopus-infrastructure.md) required to deploy our application.

<span><a class="btn btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application/creating-new-tenants">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/tenants/guides/multi-tenant-saas-application/creating-new-octopus-infrastructure">Next</a></span>