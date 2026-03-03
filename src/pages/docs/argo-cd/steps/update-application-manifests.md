---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2026-03-04
title: Update Argo CD Application Manifests
description: Inject Octopus Variables into manifests to unlock lifecycle promotions
navOrder: 30
---

The Update Argo CD Application Manifests step is responsible for generating a set of Argo CD Application manifests from
a set of [Octostache](https://github.com/OctopusDeploy/Octostache) template files, which have been populated with Octopus variables.

The following provides instructions around how to configure an Update Manifests step, constraints on its usage and
how it executes.

## Manifest Templates

1. Specify the set of input template files which can be sourced from either:
   - A git repository (requires URL, credentials and branch-name), or a
   - Package from a configured feed (eg a zip file, nuget package etc)
2. Specify the path to your templates
   - A subfolder (or file) within the previously specified repository/package which contains the template files to be used
   - If the string entered is a directory, all files (recursively) within that directory are considered templates
   - If the string entered is a single file - only that file will be considered a template.

    :::div{.info}
    A single file will be copied into the *root* directory of the path defined in the mapped Argo CD Application.
    When a directory is specified, the structure below the specified path is maintained when moving files into the Argo CD Application's repository.
    :::

3. Container images can be defined, but are optional. These are included to allow automations, such as external feed triggers, to be attached to the project.

## Git Commit Settings

In addition to the [common Git commit settings](/docs/argo-cd/steps#git-commit-settings), this step also provides the following option:

### Purge Argo CD Source Folder

Purging the source folder clears the `Path` directory of the Argo CD Application's repository prior to adding newly templated files.

- This can be useful when resources have been removed from your input templates, but also need to be removed from the target repository.

## Creating and Deploying a Release

:::div{.info}
The step will fail to execute if no git credentials exist for repositories referenced by your Argo CD Applications.
As such, prior to execution, it is recommended to use the [Argo CD Applications View](/docs/argo-cd/steps/argo-cd-applications-view) to ensure
no outstanding configuration is required.
:::

When deploying a release containing an Update Argo CD Applications Manifest step, Octopus will:

- Collect input-templates configured in the step
- Populate the templates with Octopus [variables](/docs/best-practices/deployments/variables)
- For each mapped Argo CD Application
  - Clone each source repository
  - Copy populated templates into the source repository
  - Changed files are committed, and pushed back to the repo/branch as specified in the Argo CD Application
    - A PR will be created (rather than merging to the targetRevision branch) if configured in the step UI

:::div{.warning}
If an input template references a [Sensitive Variable](/docs/projects/variables/sensitive-variables), the deployment will fail.
This ensures sensitive data is not persisted in the target Git repository in plain text.
:::

## Example Manifests

### Config Map

The following represents a template of a configmap.
The `database_url` is set via the user-specified project variable `DB_NAME`, whose value can change based on Octopus variable scoping mechanisms (e.g. via environment or tenant).

The time of the deployment, defined in the inbuilt `Octopus.Deployment.Created`, is written to the `deployment_created_at` field.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-app-config
data:
  # Key-value pairs for configuration data
  log_level: INFO
  directory: "#{Octopus.Environment.Name}"
  feature_flag_enabled: "true"
  database_url: "jdbc:postgresql://mydb.example.com:5432/#{DB_NAME}"
  deployment_created_at: "#{Octopus.Deployment.Created}"
```
