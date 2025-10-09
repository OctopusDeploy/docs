---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Update Argo CD Application Manifests
description: Inject Octopus Variables into manifests to unlock lifecycle promotions
navOrder: 30
---

The Update Argo CD Application Manifests step is responsible for generating a set of Argo CD Application manifests from
a set of [Octostache](https://github.com/OctopusDeploy/Octostache) template files, which have been populated with Octopus variables.

The following provides instructions around how to configure an Update Manifests step, constraints on its usage and
how it executes.

## Add the Update Argo CD Application Manifests step
Add the `Update Argo CD Application Manifests` step to the project, and provide it a name.

## Provide the required configuration
1. Specify an execution location
  * This step will execute on a worker of your choosing, if required it can run within a container on the worker, though this should not be necessary.
### Inputs
1. Specify the set of input template files which can be sourced from either:
   * A git repository (requires URL, credentials and branch-name), or a
   * Package from a configured feed (eg a zip file, nuget package etc)
2. Specify the "Input Path"
   * A subfolder (or file) within the previously specified repository/package which contains the template files to be used
   * If the string entered is a directory, all files (recursively) within that directory are considered templates
   * If the string entered is a single file - only that file will be considered a template.
:::div{.info}
A single file will be copied into the _root_ directory of the Path defined in the mapped Argo CD Application.
When a directory is specified, the structure below the specified path is maintained when moving files into the Argo CD Application's repository.
:::
3. Container Images can be defined (but are optional) - these are included to allow External Feed Triggers to be attached to the project.

### Outputs
The output section allows you to configure how changes are to be merged into your repository.

1. Deployment Preview is an aid to help determine which instances, and which applications are going to be updated when executing this step
    * More information can be found [here](/docs/argo-cd/steps/deployment-preview)
2. Commit message allows you to specify the summary, and description of the change. The description will be automatically populated if left empty.
    * The content here will be reused for Pull Request messages if you have selected for the change to merge via Pull Request
:::div{.warning}
If the commit summary or description references a [Sensitive Variable](/docs/projects/variables/sensitive-variables) the deployment wil fail.
This ensures sensitive data is not leaked to Git via the commit/PR message.
:::
3. Git Commit Method specifies _how_ changes are merged - merging directly into the repo, or going via a PR.
    * A third option exists whereby you can specify which environments should use Pull Requests, with all others falling back to a direct commit
    * This is useful if your Production environment requires PRs, but early environments do not.

:::div{.warning}
Currently, Pull Requests can only be created for GitHub-based repositories. Please [let us know](https://oc.to/roadmap-argo-cd) which other providers you would like to see supported.
:::

4. Purge Output Folder allows you to clear the `Path` directory of the Argo CD Application's repository prior to adding newly templated files.
    * This can be useful when resources have been removed from your input-templates, but also need to be removed from the target repository.


## Creating and Deploying a Release
:::div{.info}
The step will fail to execute if no git credentials exist for repositories references by your Argo CD Applications.
As such, prior to execution, it is recommended to use the [Deployment Preview](/docs/argo-cd/steps/deployment-preview) to ensure
no outstanding configuration is required.
:::

When deploying a release containing an Update Argo CD Applications Manifest step, Octopus will:
* Collect input-templates configured in the step
* Populate the templates with Octopus [variables](/docs/best-practices/deployments/variables)
* For each mapped Argo CD Application
  * Clone each source repository
  * Copy populated templates into the source repository
  * Changed files are committed, and pushed back to the repo/branch as specified in the Argo CD Application
      * A PR will be created (rather than merging to the targetRevision branch) if configured in the step UI

::div{.warning}
If an input template references a [Sensitive Variable](/docs/projects/variables/sensitive-variables), the deployment will fail.
This ensures sensitive data is not persisted in the target Git repository in plain text.
:::