---
title: Tenant variables
description: Octopus provides two ways to specify which variables are required to deploy a project to a tenant successfully; Project variables are values that differ between projects and environments. Common variables are common across multiple tenants that require a unique value per tenant.
position: 10
---

Octopus provides two ways of to specify which variables are required to successfully deploy a project to a tenant; **Project variables** and **Common variables**.

Both of these methods use the [variable templates](/docs/projects/variables/variable-templates.md) feature.

## Project variables {#project-variables}

You often want to define variable values that are different for each tenant/environment combination. Some examples might be a database server or connection string, or a tenant-specific URL. If you were using an untenanted project, you would have previously defined these values in the project itself. With a tenanted project, you can set these values directly on the tenant for any connected projects.



## Common variables {#common-variables}

## Snapshots {#tenant-variables-and-snapshots}