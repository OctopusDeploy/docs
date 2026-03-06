---
layout: src/layouts/Default.astro
pubDate: 2026-03-05
modDate: 2026-03-05
title: Troubleshooting
subtitle: Known issues and limitations for project templates
icon: fa-solid fa-layer-group
navTitle: Troubleshooting
navSection: Project Templates
description: Known issues and limitations for project templates
navOrder: 171
---

## Alpha limitations

Project templates are in Alpha. The following features are not yet supported and are planned for future releases:

- Channels
- Lifecycles
- Environment templates
- Ephemeral environments
- Cloud target discovery on steps. Use project variables in the project instead
- Cloning a project template through the Octopus UI
- Creating and managing project templates through the REST API, CLI, or Terraform provider
- Feeds
- Project settings
- Runbooks
- Triggers
- Import and export of templated projects
- Inline variable and parameter configuration within the deployment process editor

This document will be updated as the feature evolves.

## Step support

Project templates support most Octopus steps. The following step package framework steps are not supported:

1. Deploy a Bicep Template
2. AWS S3 Create Bucket
3. AWS ECS

This list will be updated as additional step support is added.

## Parameters and variables

If you're migrating an existing project's deployment process into a project template, you'll need to convert project variable references to use parameters instead. System variables will continue to work as normal.

For example, a script that references project variables directly:

```powershell
$connectionString = $OctopusParameters["Project.Connection.String"]
$reportPath = $OctopusParameters["Project.Database.Report.Path"]
```

Should be updated to reference template parameters instead:

```powershell
$connectionString = $OctopusParameters["Template.Database.ConnectionString"]
$reportPath = $OctopusParameters["Template.Database.ChangeReportDirectory"]
```

## Parameter scoping

Project-supplied values for parameters always take precedence over template-supplied values.

A few scenarios that demonstrate the scoping precedence:

<br>

**1. Scoped value provided by both the project and the template.**

| Origin           | Name         | Value       | Scope       |
|------------------|--------------|-------------|-------------|
| Project Template | AzureAccount | Account-123 | Development |
| Project          | AzureAccount | Account-124 | Development |

When deploying to the **Development** environment, **Account-124** is used.

<br>

**2. Scoped template value and an unscoped project value.**

| Origin           | Name         | Value       | Scope       |
|------------------|--------------|-------------|-------------|
| Project Template | AzureAccount | Account-123 | Development |
| Project          | AzureAccount | Account-124 |             |

When deploying to the **Development** environment, **Account-124** is used.

<br>

**3. Scoped template value and scoped project value for different environments.**

| Origin           | Name         | Value       | Scope       |
|------------------|--------------|-------------|-------------|
| Project Template | AzureAccount | Account-123 | Development |
| Project          | AzureAccount | Account-124 | Staging     |

- When deploying to the **Development** environment, **Account-123** is used.
- When deploying to the **Staging** environment, **Account-124** is used.

<br>

## Cloning project templates

You can't clone a project template through the Octopus UI. To clone a template:

1. Copy the template's folder in the Platform Hub Git repository.
2. Rename the folder to the desired slug.
3. Update the template name inside `template.ocl`.
4. Commit and push the changes.
5. Refresh the project template list in the Octopus UI to find the newly created template.
6. Publish the template and configure the spaces that have access to it.

## Git connections

GitHub Connections are not supported in Platform Hub. Use a username and personal access token (PAT) instead.

## Public API

Creating and managing project templates through the REST API is not yet supported in the Alpha release. REST API support is planned for a future release.

- Each project template is stored as a folder in the configured Git repository, containing four OCL files: `template.ocl`, `deployment_process.ocl`, `parameters.ocl`, and `variables.ocl`.
- Published versions and space sharing configurations are stored in the database.

## Losing access to an Octopus Enterprise license

Project templates and all Platform Hub features require an Enterprise license. When you no longer have an Enterprise license, project templates behave differently.

### What will continue to work

- Existing deployments can be redeployed.
- New releases for projects created from a project template can still be created.
- Auto-scheduled deployments will continue to run.

### What will no longer work

- Users will lose access to Platform Hub, including the ability to create and manage project templates.
- Project templates cannot be modified inside a project.
- Projects created from a template will no longer receive automatic updates when a new template version is published.
- Projects that were created from a template cannot be cloned until the template reference is removed.
