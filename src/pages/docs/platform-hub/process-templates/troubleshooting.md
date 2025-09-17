---
layout: src/layouts/Default.astro
pubDate: 2025-09-23
modDate: 2025-09-23
title: Troubleshooting
subtitle: Common issues that you may run into
icon: fa-solid fa-layer-group
navTitle: Troubleshooting
navSection: Process Templates
description: Common issues and their fixes for process templates
navOrder: 106
---

## Troubleshooting common issues

You may run into a few issues when setting up your process templates. We've put together this page to help you diagnose and fix common issues.

### Step support

We have support for most Octopus steps, except for the following:

1. Deploy a Bicep Template
2. AWS S3 Create Bucket
3. AWS ECS
4. All Custom Step Templates
5. All Community Step Templates

### Parameters and Variables

If you are migrating an existing process to be used as a process template, you may run into a few issues when using parameters and variables in scripts. When copying a script from a step in a project into a process template step, you must convert project variables to use process template parameters. System variables will still work as normal.

### Parameter scoping

Project supplied values for parameters will always take precedence over process template supplied ones.

A couple scenarios that demonstrate the scoping precedence:

<br>

**1. Scoped value provided by the project and the process template.**

| Origin           | Name         | Value            | Scope       |
|------------------|--------------|------------------|-------------|
| Process Template | AzureAccount | Account-123 | Development |
| Project          | AzureAcc     | Account-124 | Development |

When deploying to the **Development** environment, **Account-124** would be used.

<br>

**2. Scoped value provided by the process template and an unscoped value provided by the project.**

| Origin           | Name         | Value            | Scope       |
|------------------|--------------|------------------|-------------|
| Process Template | AzureAccount | Account-123 | Development |
| Project          | AzureAcc     | Account-124 | |

When deploying to the **Development** environment, **Account-124** would be used.

<br>

**3. Scoped process template value and scoped project value for different environments.**

| Origin           | Name         | Value            | Scope       |
|------------------|--------------|------------------|-------------|
| Process Template | AzureAccount | Account-123 | Development |
| Project          | AzureAcc     | Account-124 | Staging |

- When deploying to the **Development** environment, **Account-123** would be used.
- When deploying to the **Staging** environment, **Account-124** would be used.

<br>

### Step specific issues

- You cannot configure **Edit YAML** on the **Configure and apply Kubernetes resource** step.
- You cannot configure cloud target discovery on steps. You must use project variables instead.

### Cloning process templates

You cannot clone a process template in Platform Hub through the Octopus UI. If you need to copy a deployment process from a process template, you can copy the OCL definition of the template, and use it in another file to copy an existing process.

### Platform Hub account limitations

The following account types are not supported:

1. Token
2. SSH

Platform Hub accounts cannot be used in the following situations:

- Cannot be used by targets
- Cannot be used in Cloud Target Discovery  

### Public API

We do not currently have support for creating or managing process templates through the API, CLI or the Terraform provider. You should use the Octopus UI as much as possible to create or manage your process templates.

### GitHub Connections

The GitHub Connection is not supported in Platform Hub. Only usernames and PATs.
