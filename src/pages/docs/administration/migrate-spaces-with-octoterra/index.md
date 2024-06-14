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

Octoterra is a tool that exports Octopus projects, runbooks, and spaces to a Terraform module. Octoterra can be used to migrate resources between spaces and instances. However, there are limitations that must be accounted for as part of a migration. This documentation outlines a process for migrating projects from one space to another, highlighting the limitations and workaround of the octoterra tool.

## Limitations of octoterra and migrating projects between instances

### Sensitive values

Octoterra inspects the state of a space via the Octopus API and the API does not expose sensitive values. This means that octoterra can not export:

* The value of sensitive variables associated with a project, tenant, or library variable set 
* Credentials defined in feeds, accounts, or git credentials
* The contents of a certificate
* Sensitive values defined in steps

Octoterra defines Terraform variables to allow the value of these fields to be defined when the module is applied.

### Step templates

The Octopus Terraform provider does not yet support defining step templates. Because step templates are assigned a unique ID in each space, it is not possible to export a project or runbook that references a step template across spaces.

As a workaround, octoterra can detach step templates while exporting a project or runbook. Projects or runbooks with detached step templates can be recreated in a new space.

### New step framework

Some steps, such as the ECS deployment steps, rely on a new framework. Steps that use the new framework are not currently supported by the Terraform provider. These steps can not be exported by octoterra.

### Config-as-Code repositories

Two projects can not share the same CaC Git repository. When reimporting a CaC project, it must be configured with a new Git repo.

## Prerequisites

* Download octoterra from [GitHub](https://github.com/OctopusSolutionsEngineering/OctopusTerraformExport)
* Install [Terraform](https://developer.hashicorp.com/terraform/install)
* An API key for the source Octopus instance
* An API key for the destination Octopus instance
* [Optional] A remote [Terraform backend](https://developer.hashicorp.com/terraform/language/settings/backends/configuration) is recommended to maintain the state of the Terraform resources

:::div{.warning}
You can use the Terraform local state, and the commands presented in this documentation assume the use of local state. However, the local state is hard to share and is easily lost as the files are stored on the local drive of whoever is executing `terraform`. If you lose the Terraform state, you have to manually import any existing Octopus resources into a new state, which is time-consuming.
:::

## Exporting the space

The first step is to export any space level resources. Space level resources are everything except the projects.

To export the space level resources, run the following command in Linux and macOS:

```Bash
./octoterra \
  -url https://yourinstance.octopus.app \
  -space Spaces-1234 \
  -apiKey API-XXXXXXXXXXXXXXXXXXX \
  -excludeAllProjects \
  -dest ~/Desktop/space
```

Here is the command for Windows and Powershell:

```Powershell
./octoterra `
  -url https://yourinstance.octopus.app `
  -space Spaces-1234 `
  -apiKey API-XXXXXXXXXXXXXXXXXXX `
  -excludeAllProjects `
  -dest ~/Desktop/space
```

:::div{.hint}
Use the `-terraformBackend` option to define a custom remote backend. The following example defines the [s3](https://developer.hashicorp.com/terraform/language/settings/backends/s3) remote backend:

```Bash
./octoterra \
  -url https://yourinstance.octopus.app \
  -space Spaces-1234 \
  -apiKey API-XXXXXXXXXXXXXXXXXXX \
  -excludeAllProjects \
  -terraformBackend s3 \
  -dest ~/Desktop/space
```
:::

The Terraform module is created in the directory `~/Desktop/space/space_population`.

To recreate the space, enter the directory:

```Bash
cd ~/Desktop/space/space_population
```

Initialize the Terraform module:

```Bash
terraform init
```

Then apply the module:

```Bash
terraform apply
```

Terraform will prompt you for the Octopus server URL, API Key, space ID, and for the value of any sensitive values for things like sensitive variables, feed passwords, account credentials, git credentials, and certificate data.

:::div{.hint}
If you would rather manually enter any sensitives values after the space has been imported, use the `-dummySecretVariableValues` option with octoterra, for example:

```Bash
./octoterra \
  -url https://yourinstance.octopus.app \
  -space Spaces-1234 \
  -apiKey API-XXXXXXXXXXXXXXXXXXX \
  -excludeAllProjects \
  -dummySecretVariableValues \
  -dest ~/Desktop/space
```

The `dummySecretVariableValues` option defines a dummy value for any sensitive values in the Terraform module, which removes the need to provide a value when the module is applied. Any resources with a sensitive value must be manually updated after the module is applied as they will contain invalid credentials or invalid certificate data.
:::

## Migrating projects

Migrating a project involves:
* Exporting the source project to a Terraform module
* Recreating the project in the new space with Terraform

Here is the command to export a project to a Terraform module for Linux and macOS:

```Bash
./octoterra \
  -url https://yourinstance.octopus.app \
  -space Spaces-1234 \
  -apiKey API-XXXXXXXXXXXXXXXXXXX \
  -projectName "My Project" \
  -lookupProjectDependencies \
  -dest ~/Desktop/project
```

Here is the command for Windows and Powershell:

```Powershell
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

```Bash
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
:::

The Terraform module is created in the directory `~/Desktop/project/space_population`.

To recreate the project, enter the directory:

```Bash
cd ~/Desktop/project/space_population
```

Initialize the Terraform module:

```Bash
terraform init
```

Then apply the module:

```Bash
terraform apply
```

Terraform will prompt you for the Octopus server URL, API Key, space ID, and for the value of any sensitive variables.

:::div{.hint}
The `-dummySecretVariableValues` option with can also be used when exporting projects to place a dummy value into any exported sensitive variables:

```Bash
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

```Bash
terraform apply -var=project_my_project_git_url=https://github.com/organization/new_repo_name.git
```