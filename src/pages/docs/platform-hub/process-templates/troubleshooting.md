---
layout: src/layouts/Default.astro
pubDate: 2025-09-23
modDate: 2025-09-23
title: Troubleshooting
subtitle: Known issues that you may run into
icon: fa-solid fa-layer-group
navTitle: Troubleshooting
navSection: Process Templates
description: Known issues and limitations for process templates
navOrder: 151
---

## Troubleshooting common issues

You may run into a few issues when setting up your process templates. We've put together this page to help you diagnose and fix common issues.

:::div{.warning}
Process Templates is in Public Preview for all Enterprise Tier Customers. Below are known limitations with the public preview.
:::

### Step support

Process templates currently supports most Octopus steps.  It currently doesn't support the following:

1. Deploy a Bicep Template
2. AWS S3 Create Bucket
3. AWS ECS
4. All Custom Step Templates
5. All Community Step Templates

This document will be updated as additional step support is added.

### Parameters and Variables

If you are migrating an existing process to be used as a process template, you may run into a few issues when using parameters and variables in scripts. When copying a script from a step in a project into a process template step, you must convert project variables to use process template parameters. System variables will still work as normal.

For example, consider this script that directly references project and system variables via `OctopusParameters`.  

```
$packagePath = $OctopusParameters["Octopus.Action.Package[Trident.Database].ExtractedPath"]
$connectionString = $OctopusParameters["Project.Connection.String"]
$environmentName = $OctopusParameters["Octopus.Environment.Name"]
$reportPath = $OctopusParameters["Project.Database.Report.Path"]

cd $packagePath
$appToRun = ".\Octopus.Trident.Database.DbUp"
$generatedReport = "$reportPath\UpgradeReport.html"

& $appToRun --ConnectionString="$connectionString" --PreviewReportPath="$reportPath"

New-OctopusArtifact -Path "$generatedReport" -Name "$environmentName.UpgradeReport.html"
```

The following variables should be updated to reference process templates parameters instead of project variables:

1. `$packagePath`
2. `$connectionString`
3. `$reportPath`

The `$environmentName` variable is fine, as system variables will continue to work as normal.  The updated script will be:

```
$packagePath = $OctopusParameters["Octopus.Action.Package[Template.Database.Package].ExtractedPath"]
$connectionString = $OctopusParameters["Template.Database.ConnectionString"]
$environmentName = $OctopusParameters["Octopus.Environment.Name"]
$reportPath = $OctopusParameters["Template.Database.ChangeReportDirectory"]

cd $packagePath
$appToRun = ".\Octopus.Trident.Database.DbUp"
$generatedReport = "$reportPath\UpgradeReport.html"

& $appToRun --ConnectionString="$connectionString" --PreviewReportPath="$reportPath"

New-OctopusArtifact -Path "$generatedReport" -Name "$environmentName.UpgradeReport.html"
```

### Parameter scoping

Project supplied values for parameters will always take precedence over process template supplied ones.

A couple scenarios that demonstrate the scoping precedence:

<br>

**1. Scoped value provided by the project and the process template.**

| Origin           | Name         | Value            | Scope       |
|------------------|--------------|------------------|-------------|
| Process Template | AzureAccount | Account-123 | Development |
| Project          | AzureAccount     | Account-124 | Development |

When deploying to the **Development** environment, **Account-124** would be used.

<br>

**2. Scoped value provided by the process template and an unscoped value provided by the project.**

| Origin           | Name         | Value            | Scope       |
|------------------|--------------|------------------|-------------|
| Process Template | AzureAccount | Account-123 | Development |
| Project          | AzureAccount     | Account-124 | |

When deploying to the **Development** environment, **Account-124** would be used.

<br>

**3. Scoped process template value and scoped project value for different environments.**

| Origin           | Name         | Value            | Scope       |
|------------------|--------------|------------------|-------------|
| Process Template | AzureAccount | Account-123 | Development |
| Project          | AzureAccount     | Account-124 | Staging |

- When deploying to the **Development** environment, **Account-123** would be used.
- When deploying to the **Staging** environment, **Account-124** would be used.

<br>

### Step specific issues

- You cannot configure **Edit YAML** on the **Configure and apply Kubernetes resource** step.
- You cannot configure cloud target discovery on steps. You must use project variables when consuming a process template in a project instead.
- When referencing a file from a Git repo, for example, script, manifest, Kustomize, etc., you cannot pick the project Git repository as the source.  You must supply the Git repository URL.  The URL can be passed in via a parameter or hardcoded in the template itself.  Hardcoding is not recommended.

### Cloning process templates

You cannot clone a process template in Platform Hub through the Octopus UI.  The process for cloning a process template is:

1. Clone the process template OCL file in the Platform Hub Git repository.
2. Change the name of the cloned OCL file to the desired name.  
3. Change the name of the process template in the OCL file.
4. Commit and push the changes.
5. Refresh the process template list in the Octopus Deploy UI and find the newly created template.
6. Publish the template and configure the Spaces that have access to it.

### Platform Hub account limitations

The following account types are not supported:

1. Token
2. SSH

Platform Hub accounts cannot be used in the following situations:

- Cannot be used by targets.
- Cannot be used in Cloud Target Discovery.  

### Public API

We do not currently have support for creating or managing process templates through the API, CLI or the Terraform provider.  

- Process templates are stored as code in the configured Git repository.  The OCL files store all relevant information about the template - including the parameters, the steps, name, description and other settings.  
- The published versions and Spaces configured are stored and managed via the database.

We recommend all users use the Octopus Deploy UI to manage process templates during the public preview.  Any processes or workflows you build outside of the Octopus Deploy UI is subject to change and without warning.  

### GitHub Connections

The GitHub Connection is not supported in Platform Hub. Only usernames and PATs.

### Losing access to an Octopus Enterprise license

Process templates and all Platform Hub features are restricted to customers who have an Enterprise Tier license. When you no longer have an Enterprise license, process templates will work differently.

#### What will continue to work

- Existing deployments and runbook runs can be redeployed or rerun.
- New releases that have a process containing process templates can be created.
- New runbook runs that have a process containing process templates can be created.
- Auto-scheduled deployments or runbook runs will continue to work.

#### What will not work anymore

- Users will lose access to Platform Hub, including the ability to create and manage all Platform Hub features.
- Process templates cannot be modified inside a project.
- Process templates will no longer receive updates and automatically roll forward to a later version.
- Projects that contain process templates cannot be cloned until the process template is removed.
