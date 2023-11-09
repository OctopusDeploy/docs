---
layout: src/layouts/Default.astro
pubDate: 2023-11-09
modDate: 2023-11-09
title: Managing runbook resources
description: This section documents how to manage runbooks as code.
navOrder: 6
---

[Runbooks](/docs/runbooks) are a component of a project, sharing or referencing much of the project's configuration such as variables, connected library variable sets, tenants, and lifecycles.

However, it can be useful to treat runbooks as an independently deployable artifact. This allows a common runbook to be shared across many projects.

Runbooks can be defined as a Terraform module and applied to an existing project, effectively "deploying" the runbook into the project.

:::div{.hint}
Runbooks are not managed by Config-as-code.
:::

Runbooks can be defined in a Terraform module in two ways:

* Write the module by hand
* Serialize an existing project to a Terraform module with [octoterra](https://github.com/OctopusSolutionsEngineering/OctopusTerraformExport)

## Writing by hand

The process of defining a runbook in Terraform is much the same as defining a project. Both a runbook and a project have the concept of a deployment process that defines the steps to be run. See the [Managing project resources](managing-project-resources) section for more information on defining steps in Terraform by hand.

## Serializing with octoterra

The second approach is to create a management, or upstream, runbook using the Octopus UI and then export the runbook to Terraform modules with [octoterra](https://github.com/OctopusSolutionsEngineering/OctopusTerraformExport). This allows you to rely on the UI for convenience and validation and then serialize the runbook to a Terraform module.

:::div{.hint}
You are free to edit the Terraform module created by octoterra as you see fit once it is exported.
:::

Octopus includes a number of steps to help you serialize a runbook with octoterra and apply the module to a new space.

:::div{.hint}
The steps documented below are best run on the `Hosted Ubuntu` worker pools for Octopus Cloud customers.
:::

1. Create a project with a runbook called `__ Serialize Runbook`. Runbooks with the prefix `__ ` (two underscores and a space) are automatically excluded when exporting projects, so this is a pattern we use to indicate runbooks that are involved in serializing Octopus resources but are not to be included in the exported module.
2. Add the `Octopus - Serialize Runbook to Terraform` step from the [community step template library](/docs/projects/community-step-templates).
    1. Tick the `Ignore All Changes` option to instruct Terraform to ignore any changes made to a project through the UI using the [lifecycle meta-argument](https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle). This option is most useful when [RBAC controls](/docs/getting-started/best-practices/users-roles-and-teams) allow customers to edit the variables of a project managed by Terraform but not edit the project steps or other settings. This allows platform teams to treat entire projects much like [step templates](/docs/projects/custom-step-templates), where end users can edit parameters but not touch the configuration of the steps, but in this case the project variables can be edited but the project steps can not.
    2. Set the `Terraform Backend` field to the [backend](https://developer.hashicorp.com/terraform/language/settings/backends/configuration) configured in the exported module. The step defaults to `s3`, which uses an S3 bucket to store Terraform state. However, any backend provider can be defined here.
    3. Set the `Octopus Server URL` field to the URL of the Octopus server to export a space from. The default value of `#{Octopus.Web.ServerUri}` references the URL of the current Octopus instance.
    4. Set the `Octopus API Key` field to the [API key](/docs/octopus-rest-api/how-to-create-an-api-key) used to access the instance defined in the `Octopus Server URL` field.
    5. Set the `Octopus Space ID` field to the ID of the space to be exported. The default value of `#{Octopus.Space.Id}` references the current space.
    6. Set the `Octopus Project Name` field to the name of the project that contains the runbook to be exported. The default value of `#{Octopus.Project.Name}` references the current project.
    7. Set the `Octopus Runbook Name` field to the name of the runbook to serialize.
    8. Set the `Octopus Upload Space ID` field to the ID of another space to upload the resulting Terraform module zip file to the built-in feed of that space. Leave this field blank to upload the zip file to the built-in feed of the current space.

Executing the runbook will:

* Export the runbook to a Terraform module
* Zip the resulting files
* Upload the zip file to the built-in feed of the current space or the space defined in the `Octopus Upload Space ID` field

The zip file has one directory called `space_population` which contains a Terraform module to populate a space with the exported resources.

:::div{.hint}
Many of the exported resources expose values, like resource names, as Terraform variables with default values. You can override these variables when applying the module to customize the resources, or leave the Terraform variables with their default value to recreate the resources with their original names.
:::

## Dealing with project variables

The exported module defines only the runbook and the runbook deployment process. It does not define other project level resources like project variables or library variable sets. Any project that the exported runbook is added to is expected to define all the variables referenced by the runbook.

Any project level variables required by the runbook can be defined as Terraform resources and deployed alongside the exported runbook module. The instructions documented in the [Managing project resources](managing-project-resources) section can be used to export a project to a Terraform module. The project level variables can be copied from the exported project module and placed in their own module as needed. 

## Importing a runbook

The following steps create a runbook in an existing project with the Terraform module exported using the instructions from the previous step:

1. Create a project with a runbook called `__ Deploy Runbook`. Runbooks with the prefix `__ ` (two underscores and a space) are automatically excluded when exporting projects, so this is a pattern we use to indicate runbooks that are involved in serializing Octopus resources but are not to be included in the exported module.
2. Add one of the steps called `Octopus - Add Runbook to Project` from the [community step template library](/docs/projects/community-step-templates). Each step indicates the Terraform backend it supports. For example, the `Octopus - Add Runbook to Project (S3 Backend)` step configures a S3 Terraform backend.
    1. Configure the step to run on a worker with a recent version of Terraform installed, or use the `octopuslabs/terraform-workertools` container image.
    2. Set the `Terraform Workspace` field to a [workspace](https://developer.hashicorp.com/terraform/language/state/workspaces) that maintains the state of Octopus resources created by Terraform. The default value of `#{OctoterraApply.Octopus.SpaceID}_#{OctoterraApply.Octopus.Project | Replace "[^A-Za-z0-9]" "_"}` uses a workspace based on the ID of the space and the name of the project that is being populated. Leave the default value unless you have a specific reason to change it.
    3. Select the package created by the export process in the previous section in the `Terraform Module Package` field. The package name is the same as the exported runbook name, with all non-alphanumeric characters replaced with an underscore.
    4. Set the `Octopus Server URL` field to the URL of the Octopus server to create the new project in. The default value of `#{Octopus.Web.ServerUri}` references the URL of the current Octopus instance.
    5. Set the `Octopus API Key` field to the [API key](/docs/octopus-rest-api/how-to-create-an-api-key) used when accessing the instance defined in the `Octopus Server URL` field.
    6. Set the `Octopus Space ID` field to the ID of an existing space where the project will be created.
    7. Set the `Octopus Project Name` field to the name of the project to deploy the runbook into.
    7. Set the `Terraform Additional Apply Params` field to a list of additional arguments to pass to the `terraform apply` command. This field is typically used to override the name of the runbook e.g. `"-var=runbook_eks_octopub_audits____describe_pods_name=The New Runbook Name"`. Leave this field blank if you do not wish to customize the deployed runbook.
    8. Set the `Terraform Additional Init Params` field to a list of additional arguments to pass to the `terraform init` command. Leave this field blank unless you have a specific reason to pass an argument to Terraform.
    9. Each `Octopus - Add Runbook to Project` step exposes values relating to their specific Terraform backend that must be configured. For example, the `Octopus - Octopus - Add Runbook to Project (S3 Backend)` step exposes fields to configure the S3 bucket, key, and region where the Terraform state is saved. Other steps have similar fields.
       Typically, downstream spaces are represented by tenants in the upstream space. For example, the space called `Acme` is represented by a tenant wth the same name. Configuring the `__ 2. Deploy Project` runbook to run against a tenant allows you to manage the creation and updates of downstream projects with a typical tenant based deployment process.

To resolve a downstream space with the name of a tenant to its ID, as required by the `Octopus - Populate Octoterra Space` step, you can use the `Octopus - Lookup Space ID` step from the [community step template library](/docs/projects/community-step-templates). To use the `Octopus - Lookup Space ID` step, add it before the `Octopus - Populate Octoterra Space` step and then reference the space ID as an output variable with an octostache template like `#{Octopus.Action[Lookup Space Id].Output.SpaceID}`.

Executing the runbook will create a new runbook in an existing project. Any space level resources referenced by the project are resolved by the resource name using Terraform [data sources](https://developer.hashicorp.com/terraform/language/data-sources), so the runbook can be imported into any space with the correctly named space level resources.

### Updating project resources

The runbooks `__ Serialize Runbook` and `__ Deploy Runbook` can be run as needed to serialize any changes to the upstream runbook and deploy the changes to downstream runbooks. The Terraform module zip file pushed to the built-in feed is versioned with a unique value each time, so you can also revert changes by redeploying an older package.  In this way, you can use Octopus to deploy Octopus runbooks using the same processes you use Octopus to deploy applications. 