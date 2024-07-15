---
layout: src/layouts/Default.astro
pubDate: 2099-01-01
modDate: 2099-01-01
title: Migrating spaces with octoterra
description: How to migrate spaces using the octoterra tool
navOrder: 100
hideInThisSection: true
navSearch: false
navSitemap: false
navMenu: false
robots: noindex, follow
---

[Octoterra](github.com/OctopusSolutionsEngineering/OctopusTerraformExport/actions) exports Octopus projects, runbooks, and spaces to a Terraform module. Octoterra can be used to migrate resources between spaces and instances.

## Limitations of octoterra and migrating projects between instances

There are limitations that must be accounted for as part of a migration.

### Sensitive values

Octoterra reads the state of a space via the Octopus API and the API does not expose sensitive values. This means that octoterra can not export:

* The value of sensitive variables associated with a project, tenant, or variable set 
* Credentials defined in feeds, accounts, or git credentials
* The contents of a certificate
* Sensitive values defined in steps

Octoterra creates Terraform variables to allow the value of these fields to be defined when the module is applied.

### Step templates

The Octopus Terraform provider does not yet support defining step templates. Because step templates are assigned a unique ID in each space, it is not possible to export a project or runbook that references a step template across spaces.

As a workaround, octoterra can detach step templates while exporting a project or runbook. Projects or runbooks with detached step templates can be recreated in a new space.

### New step framework

Some steps rely on a new framework. Steps that use the new framework are not currently supported by the Terraform provider. These steps can not be exported by octoterra.

Octoterra will display an error like this when an unsupported step is encountered:

```bash
Action <step name> has the "Items" property, which indicates that it is from the new step framework. These steps are not supported and are not exported.
```

### Config-as-Code (CaC) repositories

Two projects can not share the same CaC Git repository. When reimporting a CaC project, it must be configured with a new Git repo.

### CaC and step templates

CaC repositories reference step templates by ID. The ID of a step template is unique in each space and instance. If you create a new CaC project in a new space and point it to an existing CaC repository that references step templates, the project will fail to load.

## Teams and users

Octoterra does not currently export teams and users.

## Prerequisites

These are the prerequisites for migrating projects with octoterra:

* Download octoterra from [GitHub](https://github.com/OctopusSolutionsEngineering/OctopusTerraformExport)
* Install [Terraform](https://developer.hashicorp.com/terraform/install)
* An API key for the source Octopus instance
* An API key for the destination Octopus instance
* [Optional] A remote [Terraform backend](https://developer.hashicorp.com/terraform/language/settings/backends/configuration) is recommended to maintain the state of the Terraform resources

:::div{.warning}
You can use the Terraform local state, and the commands presented in this documentation assume the use of local state. However, the local state is hard to share and is easily lost as the files are stored on the local drive of whoever is executing `terraform`. If you lose the Terraform state, you must manually [import any existing Octopus resources into a new state](https://developer.hashicorp.com/terraform/language/state/import), which is time-consuming.
:::

## Migrating spaces and projects

Migrating a project involves:
* Migrating space level resources to the destination space
* Exporting the source project to a Terraform module
* Recreating the project in the destination space with Terraform

### Migrate the space

The first step is to export any space level resources. Space level resources include everything except the projects.

:::div{.hint}
Recreating the space level resources is optional if the destination space already exists and is populated with all the resources an exported project requires.
:::

To export the space level resources, run the following command in Linux and macOS:

```bash
./octoterra \
  -url https://yourinstance.octopus.app \
  -space Spaces-1234 \
  -apiKey API-XXXXXXXXXXXXXXXXXXX \
  -excludeAllProjects \
  -dest ~/Desktop/space
```

Here is the command for Windows and Powershell:

```powershell
./octoterra `
  -url https://yourinstance.octopus.app `
  -space Spaces-1234 `
  -apiKey API-XXXXXXXXXXXXXXXXXXX `
  -excludeAllProjects `
  -dest ~/Desktop/space
```

:::div{.hint}
Use the `-terraformBackend` option to define a custom remote backend. The following example defines the [s3](https://developer.hashicorp.com/terraform/language/settings/backends/s3) remote backend:

```bash
./octoterra \
  -url https://yourinstance.octopus.app \
  -space Spaces-1234 \
  -apiKey API-XXXXXXXXXXXXXXXXXXX \
  -excludeAllProjects \
  -terraformBackend s3 \
  -dest ~/Desktop/space
```
:::

In this example, the Terraform module is created in the directory `~/Desktop/space/space_population`.

To recreate the space, enter the directory:

```bash
cd ~/Desktop/space/space_population
```

Initialize the Terraform module:

```bash
terraform init
```

Then apply the module:

```bash
terraform apply
```

Terraform prompts you for the Octopus server URL, API Key, space ID, and for the value of any sensitive values for things like sensitive variables, feed passwords, account credentials, git credentials, and certificate data.

:::div{.hint}
If you would rather manually enter any sensitive values after the space has been imported, use the `-dummySecretVariableValues` option with octoterra, for example:

```bash
./octoterra \
  -url https://yourinstance.octopus.app \
  -space Spaces-1234 \
  -apiKey API-XXXXXXXXXXXXXXXXXXX \
  -excludeAllProjects \
  -dummySecretVariableValues \
  -dest ~/Desktop/space
```

The `dummySecretVariableValues` option defines a dummy value for any sensitive values in the Terraform module, which removes the need to provide a value when the module is applied. This is useful when you do not know the value of any sensitive values but wish to proceed with the migration anyway.

Any resources with a sensitive value must be manually updated after the module is applied as they will contain invalid credentials or invalid certificate data.
:::

### Migrating projects

Here is the command to export a project to a Terraform module for Linux and macOS:

```bash
./octoterra \
  -url https://yourinstance.octopus.app \
  -space Spaces-1234 \
  -apiKey API-XXXXXXXXXXXXXXXXXXX \
  -projectName "My Project" \
  -lookupProjectDependencies \
  -dest ~/Desktop/project
```

Here is the command for Windows and Powershell:

```powershell
./octoterra `
  -url https://yourinstance.octopus.app `
  -space Spaces-1234 `
  -apiKey API-XXXXXXXXXXXXXXXXXXX `
  -projectName "My Project" `
  -lookupProjectDependencies `
  -dest ~/Desktop/project
```

:::div{.hint}
If your project or runbooks include step templates and the project will be recreated in a new space, you must detach the step templates using the `-detachProjectTemplates` argument:

```bash
./octoterra \
  -url https://yourinstance.octopus.app \
  -space Spaces-1234 \
  -apiKey API-XXXXXXXXXXXXXXXXXXX \
  -projectName "My Project" \
  -lookupProjectDependencies \
  -detachProjectTemplates \
  -dummySecretVariableValues \
  -dest ~/Desktop/project
```

When the project is recreated, the step template steps will be recreated in a detached state.

If you get an error like this when applying a module, it can mean that a project or runbook is referencing a step template that does not exist in the target space, and you must use the `-detachProjectTemplates` argument:

```bash
Error: Octopus API error: Resource is not found or it doesn't exist in the current space context. Please contact your administrator for more information. [] 
```
:::

In this example, the Terraform module is created in the directory `~/Desktop/project/space_population`.

To recreate the project, enter the directory:

```bash
cd ~/Desktop/project/space_population
```

Initialize the Terraform module:

```bash
terraform init
```

Then apply the module:

```bash
terraform apply
```

Terraform will prompt you for the Octopus server URL, API Key, space ID, and for the value of any sensitive variables.

:::div{.hint}
The `-dummySecretVariableValues` option with can also be used when exporting projects to place a dummy value into any exported sensitive variables:

```bash
./octoterra \
  -url https://yourinstance.octopus.app \
  -space Spaces-1234 \
  -apiKey API-XXXXXXXXXXXXXXXXXXX \
  -projectName "My Project" \
  -lookupProjectDependencies \
  -detachProjectTemplates \
  -dummySecretVariableValues \
  -dest ~/Desktop/project
```

The values of sensitive variables must be manually updated after the module is applied.
:::

## Recreating Config-as-Code projects

CaC projects can not share a Git repository. When a CaC project is recreated, it must point to a new Git repository. This is done by overriding the default value of a Terraform variable in the exported module.

This is an example of an exported CaC project:

```hcl
resource "octopusdeploy_project" "project_my_project" {
  name                                 = "${var.project_my_project_name}"
  auto_create_release                  = false
  default_guided_failure_mode          = "EnvironmentDefault"
  default_to_skip_if_already_installed = false
  discrete_channel_release             = false
  is_disabled                          = false
  is_version_controlled                = true
  lifecycle_id                         = "${data.octopusdeploy_lifecycles.lifecycle_application.lifecycles[0].id}"
  project_group_id                     = "${data.octopusdeploy_project_groups.project_group_google_microservice_demo.project_groups[0].id}"
  included_library_variable_sets       = []
  tenanted_deployment_participation    = "${var.project_my_project_tenanted}"

  git_library_persistence_settings {
    git_credential_id  = "${data.octopusdeploy_git_credentials.gitcredential_github.git_credentials[0].id}"
    url                = "${var.project_my_project_git_url}"
    base_path          = "${var.project_my_project_git_base_path}"
    default_branch     = "main"
    protected_branches = "${jsondecode(var.project_my_project_git_protected_branches)}"
  }

  lifecycle {
    ignore_changes = ["connectivity_policy"]
  }
  description = "${var.project_my_project_description_prefix}${var.project_my_project_description}${var.project_my_project_description_suffix}"
}
```

The `git_library_persistence_settings` block defines the `url` attribute. The value of this attribute is set to the variable `project_my_project_git_url`:

```hcl
variable "project_my_project_git_url" {
  type        = string
  nullable    = false
  sensitive   = false
  description = "The git url for \"My Project\""
  default     = "https://github.com/organization/my_project.git"
}
```

The default value of this variable is the URL of the Git repo configured for the source project. To override this value when applying the module, pass the argument `-var=project_my_project_git_url=https://github.com/organization/new_repo_name.git`, for example:

```bash
terraform apply -var=project_my_project_git_url=https://github.com/organization/new_repo_name.git
```

## Converting a CaC project back to a database project

It may be useful to essentially convert a CaC enabled project into a regular database project by including CaC managed settings, such as the deployment process and project variables, in the exported module. 

The `-ignoreCacManagedValues=false` argument instructs octoterra to include CaC managed settings, such as the deployment process and project variables, in the exported module.

The `-excludeCaCProjectSettings=true` argument instructs octoterra to exclude CaC settings, such as the version control configuration, in the exported module.

The combination of these two arguments essentially exports a CaC project as if it were a regular database project. The exported module can then be reapplied without the limitations of a CaC enabled project.

This is an example command for Linux and macOS: 

```bash
./octoterra \
  -url https://yourinstance.octopus.app \
  -space Spaces-1234 \
  -apiKey API-XXXXXXXXXXXXXXXXXXX \
  -projectName "My Project" \
  -lookupProjectDependencies \
  -detachProjectTemplates \
  -ignoreCacManagedValues=false \
  -excludeCaCProjectSettings=true \
  -dest ~/Desktop/project
```

This is an example command for Windows Powershell:

```powershell
./octoterra `
  -url https://yourinstance.octopus.app `
  -space Spaces-1234 `
  -apiKey API-XXXXXXXXXXXXXXXXXXX `
  -projectName "My Project" `
  -lookupProjectDependencies `
  -detachProjectTemplates `
  -ignoreCacManagedValues=false `
  -excludeCaCProjectSettings=true `
  -dest ~/Desktop/project
```

## Migrating and customizing CaC projects

A common scenario is to have a template CaC project that you wish to recreate with a number of small tweaks to the deployment process or variables.

It can be difficult to tweak a deployment process by editing the OCL files committed to a Git repository. Unlike JSON or YAML, there are comparatively few tools that allow you to process and tweak a HCL (OCL is a subset of HCL) file programmatically. This means you are left with the less robust solution of using a find-and-replace style workflow to modify individual values in an OCL file.

A solution to this is to include the deployment process and variables of a CaC project in a Terraform module, expose individual settings in the Terraform module as Terraform variables, and then convert the project to CaC when the module is applied. This solves the problem of altering specific settings because Terraform modules can expose those settings as Terraform variables, making it very easy and reliable to make small changes to a module as it is applied.

The first step is to export a Terraform module that embeds the deployment process and variables. This is done by setting the `ignoreCacManagedValues` argument to `false`. You also need to set the `excludeCaCProjectSettings` argument to `false`, which ensures the exported project has the version control settings required to convert the project to CaC automatically when it is reapplied.

This is an example command for Linux and macOS:

```bash
./octoterra \
  -url https://yourinstance.octopus.app \
  -space Spaces-1234 \
  -apiKey API-XXXXXXXXXXXXXXXXXXX \
  -projectName "My Project" \
  -lookupProjectDependencies \
  -detachProjectTemplates \
  -ignoreCacManagedValues=false \
  -excludeCaCProjectSettings=false \
  -dest ~/Desktop/project
```

This is an example command for Windows Powershell:

```powershell
./octoterra `
  -url https://yourinstance.octopus.app `
  -space Spaces-1234 `
  -apiKey API-XXXXXXXXXXXXXXXXXXX `
  -projectName "My Project" `
  -lookupProjectDependencies `
  -detachProjectTemplates `
  -ignoreCacManagedValues=false `
  -excludeCaCProjectSettings=false `
  -dest ~/Desktop/project
```

When the module is applied, the Git repository URL needs to be set to the location of the target repository that the project will use once it is converted back to CaC:

```bash
terraform apply -var=project_my_project_git_url=https://github.com/organization/new_repo_name.git
```

Octoterra exposes many settings as Terraform variables by default. This allows you to tweak the settings of the project as it is recreated by defining new values for these automatically generated variables. If the setting you wish to modify is not exposed as a Terraform variable, you can edit the resulting Terraform module by hand to expose the setting as a Terraform variable.

## Excluding resource from the exported module

Octoterra has many options to allow resources to be excluded from the export. 

Run `./octoterra -help` to view the complete list. All the options to exclude resources start with the prefix `exclude`, e.g. `-excludeAllLibraryVariableSets`.

:::div{.warning}
Excluding a resource that another resource depends on can result in an invalid Terraform module. For example, excluding all environments can result in a target that is not assigned to any environments, which is not a valid configuration.
:::

## Editing the Terraform module

Unlike other tools used to export Octopus resources, such as the Import/Export tool or the migrator, you are free to edit the exported Terraform module. The exported files use the same publicly documented [Octopus Terraform provider](https://registry.terraform.io/providers/OctopusDeployLabs/octopusdeploy/latest/docs) resources. 