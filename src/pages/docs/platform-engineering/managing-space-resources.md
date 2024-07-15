---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-11-30
title: Managing space resources
description: This section documents how to manage space level resources as code.
navOrder: 4
---

[Serializing and deploying space level resources](https://www.youtube.com/watch?v=Hw4lnG7SqO8)

Octopus is conceptually split into two types of resources:

1. Space level resources such as environments, feeds, accounts, lifecycles, certificates, workers, worker pools, and variable sets
2. Project level resources such as the projects themselves, the project deployment process, runbooks, project variables, and project triggers

Space level resources are shared by projects and do not tend to change as frequently as projects.

Managed, or downstream, spaces (i.e. spaces with centrally managed resources) are implemented by deploying space and project level resources as separate processes:

* Space level resources are deployed first to support one or more projects
* Project level resources are deployed second referencing the space level resources

Space level resources are best managed with the [Octopus Terraform provider](https://registry.terraform.io/providers/OctopusDeployLabs/octopusdeploy/latest/docs).

:::div{.hint}
[Config-as-code](/docs/projects/version-control) only supports persisting a subset of project settings in a Git repository, and can not be used to define space level resources.
:::

Space level resources can be defined in a Terraform module in two ways:

* Write the module by hand
* Serialize an existing space to a Terraform module with [octoterra](https://github.com/OctopusSolutionsEngineering/OctopusTerraformExport)

## Writing by hand

You can write a Terraform module that manages Octopus space level resources by hand if you wish to do so. The Terraform provider source code contains a [suite of tests](https://github.com/OctopusDeployLabs/terraform-provider-octopusdeploy/tree/main/terraform) that can be used as examples for creating your own Terraform module.

## Serializing with octoterra

The second approach is to create a management, or upstream, space using the Octopus UI and then export the space to a Terraform module with [octoterra](https://github.com/OctopusSolutionsEngineering/OctopusTerraformExport). This allows you to rely on the UI for convenience and validation and then serialize the space to a Terraform module.

:::div{.hint}
You are free to edit the Terraform module created by octoterra as you see fit once it is exported.
:::

Octopus includes a number of steps to help you serialize a space with octoterra and apply the module to a new space.

:::div{.hint}
The steps documented below are best run on the `Hosted Ubuntu` worker pools for Octopus Cloud customers.
:::

### Exporting space level resources

The following process serializes a space to a Terraform module:

1. Create a project with a runbook called `__ 1. Serialize Space`. Runbooks with the prefix `__ ` (two underscores and a space) are automatically excluded when exporting projects, so this is a pattern we use to indicate runbooks that are involved in serializing Octopus resources but are not to be included in the exported module.
2. Add the `Octopus - Serialize Space to Terraform` step from the [community step template library](/docs/projects/community-step-templates).
   1. Set the `Terraform Backend` field to the [backend](https://developer.hashicorp.com/terraform/language/settings/backends/configuration) configured in the exported module. The step defaults to `s3`, which uses an S3 bucket to store Terraform state. However, any backend provider can be defined here.
   2. Set the `Octopus Server URL` field to the URL of the Octopus server to export a space from. The default value of `#{Octopus.Web.ServerUri}` references the URL of the current Octopus instance.
   3. Set the `Octopus API Key` field to the [API key](/docs/octopus-rest-api/how-to-create-an-api-key) used when accessing the instance defined in the `Octopus Server URL` field.
   4. Set the `Octopus Space ID` field to the ID of the space to be exported. The default value of `#{Octopus.Space.Id}` references the current space.
   5. Set the `Octopus Upload Space ID` field to the ID of another space to upload the resulting Terraform module zip file to the built-in feed of that space. Leave this field blank to upload the zip file to the built-in feed of the current space.
   6. Set the `Ignored Variables Sets` field to a comma separated list of variable sets to exclude from the Terraform module. Typically, this field is used when the values of the previous fields were sourced from a variable set that should not be exported.
   7. Set the `Ignored Tenants` field to a comma separated list of tenants to exclude from the Terraform module. Typically, this is used to exclude tenants that are used to run this export step but do not make sense to reimport in a new space.
   8. Tick the `Ignore All Targets` to exclude all [targets](/docs/infrastructure/deployment-targets) from the exported Terraform module. Targets are typically space specific and should not be shared between spaces.
   9. Tick the `Default Secrets to Dummy Values` to set all secret values, such as account and feed passwords, to dummy values. This setting allows you to apply the resulting Terraform module without specifying any secret values, after which you can manually update the values in the new space as needed. If this value is not ticked, the resulting Terraform module exposes Terraform variables for every Octopus secret, and you must supply the secret values when applying the Terraform module.
   10. Set the `Ignore Tenants with Tag` field to a tag, in the format `tag-set/tag-name`, which when applied to a tenant results in the tenant being excluded from the export. This is similar to the `Ignored Tenants` field, but allows you to ignore tenants based on their tags rather than by name.

Executing the runbook will:

* Export space level resources (i.e. everything but projects) to a Terraform module
* Zip the resulting Terraform module files into a package named after the current space
* Upload the zip file to the built-in feed of the current space, or the space defined in the `Octopus Upload Space ID` field

The package has two directories:
* `space_creation`, which contains a Terraform module to create a new space
* `space_population`, which contains a Terraform module to populate a space with the exported resources.

:::div{.hint}
Many of the exported resources expose values, like resource names, as Terraform variables with default values. You can override these variables when applying the module to customize the resources, or leave the Terraform variables with their default value to recreate the resources with their original names.
:::

### Importing space level resources

The following process creates and populates a space with the Terraform module exported using the process documented in the previous section:

1. Create a project with a runbook called `__ 2. Deploy Space`. Runbooks with the prefix `__ ` (two underscores and a space) are automatically excluded when exporting projects, so this is a pattern we use to indicate runbooks that are involved in serializing Octopus resources but are not to be included in the exported module.
2. Add one of the steps called `Octopus - Create Octoterra Space` from the [community step template library](/docs/projects/community-step-templates). Each step indicates the Terraform backend it supports. For example, the `Octopus - Create Octoterra Space (S3 Backend)` step configures a S3 Terraform backend.
   1. Configure the step to run on a worker with a recent version of Terraform installed, or use the `octopuslabs/terraform-workertools` [container image](/docs/projects/steps/execution-containers-for-workers).
   2. Set the `Octopus Space Name` field to the name of the new space. The default value of `#{Octopus.Deployment.Tenant.Name}` assumes the step is run against a tenant, and the name of the tenant is the name of the new space.
   3. Set the `Octopus Space Managers` field to a comma separated list of [team](/docs/security/users-and-teams) IDs to assign as space managers. Built-in teams like `Octopus Administrator` have named IDs like `teams-administrators`. Custom teams have IDs like `Teams-15`.
   4. Set the `Terraform Workspace` field to a [workspace](https://developer.hashicorp.com/terraform/language/state/workspaces) that tracks the new space. The default value of `#{OctoterraApply.Octopus.Space.NewName  | Replace "[^A-Za-z0-9]" "_"}` creates a workspace name based on the space name with all non-alphanumeric characters replaced with an underscore. Leave the default value unless you have a specific reason to change it.
   5. Select the package created by the export process in the previous section in the `Terraform Module Package` field. The package name is the same as the exported space name, with all non-alphanumeric characters replaced with an underscore.
   6. Set the `Octopus Server URL` field to the URL of the Octopus server to create the new space in. The default value of `#{Octopus.Web.ServerUri}` references the URL of the current Octopus instance.
   7. Set the `Octopus API Key` field to the [API key](/docs/octopus-rest-api/how-to-create-an-api-key) used when accessing the instance defined in the `Octopus Server URL` field.
   8. Set the `Terraform Additional Apply Params` field to a list of additional arguments to pass to the `terraform apply` command. This field is typically used to define the value of any Terraform variables. However, there are no variables that need to be defined when creating a space, so leave this field blank unless you have a specific reason to pass an argument to Terraform.
   9. Set the `Terraform Additional Init Params` field to a list of additional arguments to pass to the `terraform init` command. Leave this field blank unless you have a specific reason to pass an argument to Terraform.
   10. Each `Octopus - Create Octoterra Space` step exposes values relating to their specific Terraform backend that must be configured. For example, the `Octopus - Create Octoterra Space (S3 Backend)` step exposes fields to configure the S3 bucket, key, and region where the Terraform state is saved. Other steps have similar fields.
3. Add one of the steps called `Octopus - Populate Octoterra Space` from the [community step template library](/docs/projects/community-step-templates). Each step indicates the Terraform backend it supports. For example, the `Octopus - Populate Octoterra Space (S3 Backend)` step configures a S3 Terraform backend.
    1. Configure the step to run on a worker with a recent version of Terraform installed, or use the `octopuslabs/terraform-workertools` container image. 
    2. Set the `Terraform Workspace` field to a [workspace](https://developer.hashicorp.com/terraform/language/state/workspaces) that tracks the new space. The default value of `#{OctoterraApply.Octopus.SpaceID}` creates a workspace name based on the ID of the space that is being populated. Leave the default value unless you have a specific reason to change it.
    3. Select the package created by the export process in the previous section in the `Terraform Module Package` field. The package name is the same as the exported space name, with all non-alphanumeric characters replaced with an underscore.
    4. Set the `Octopus Server URL` field to the URL of the Octopus server to create the new space in. The default value of `#{Octopus.Web.ServerUri}` references the URL of the current Octopus instance.
    5. Set the `Octopus API Key` field to the [API key](/docs/octopus-rest-api/how-to-create-an-api-key) used when accessing the instance defined in the `Octopus Server URL` field.
    6. Set the `Octopus Space ID` field to the ID of the space created by the previous step. The ID is an output variable that can be access with an [octostache template](/docs/projects/variables/variable-substitutions) like `#{Octopus.Action[Octopus - Create Octoterra Space (S3 Backend)].Output.TerraformValueOutputs[octopus_space_id]}`. Note that the name of the previous step may need to be changed from `Octopus - Create Octoterra Space (S3 Backend)` if your step has a different name.
    7. Set the `Terraform Additional Apply Params` field to a list of additional arguments to pass to the `terraform apply` command. This field is typically used to define the value of secrets such as account or feed passwords e.g. `-var=account_aws_account=TheAwsSecretKey`.
    8. Set the `Terraform Additional Init Params` field to a list of additional arguments to pass to the `terraform init` command. Leave this field blank unless you have a specific reason to pass an argument to Terraform.
    9. Each `Octopus - Populate Octoterra Space` step exposes values relating to their specific Terraform backend that must be configured. For example, the `Octopus - Populate Octoterra Space (S3 Backend)` step exposes fields to configure the S3 bucket, key, and region where the Terraform state is saved. Other steps have similar fields.

Executing the runbook will create a new space and populate it with the space level resources defined in the Terraform module zip file created in the previous section.

Typically, downstream spaces are represented by tenants in the upstream space. For example, the space called `Acme` is represented by a tenant wth the same name. Configuring the `__ 2. Deploy Space` runbook to run against a tenant allows you to manage the creation and updates of downstream spaces with a typical tenant based deployment process. This is why the `Octopus - Create Octoterra Space` step defaults the `Octopus Space Name` field to the name of the current tenant.

:::div{.hint}
If you ticked the `Default Secrets to Dummy Values` option when exporting a space, all resources with secret values like accounts, feeds, certificates, variables sets, and git credentials will have dummy values set for the passwords or secret values. You must manually update these values after the new space has been created to allow deployments and runbooks to work correctly.
:::

### Updating space level resources

The runbooks `__ 1. Serialize Space` and `__ 2. Deploy Space` can be run as needed to serialize any changes to the upstream space and deploy the changes to downstream spaces. The Terraform module zip file pushed to the built-in feed is versioned with a unique value each time, so you can also revert changes by redeploying an older package.  In this way you can use Octopus to deploy Octopus spaces using the same processes you use Octopus to deploy applications.
