---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-11-24
title: Preparing your Terraform environment
description: Configuring remote state, backends, and cloud accounts using Terraform with Octopus
navOrder: 10
---

When running Terraform on a local PC, the state of the resources managed by Terraform is saved in a local file. This state is queried to learn which resources already exist in order to properly apply updates and destroy resources.

When Terraform is run by Octopus, this state file is not preserved between executions. This means a remote backend must be configured for almost all practical applications of Terraform through Octopus, allowing the state information to be preserved between Terraform steps.

Refer to the [Terraform documentation](https://www.terraform.io/docs/backends/index.html) for more information on configuring backends.

## Caution on Terraform runs

By default, Terraform stores state files [locally](https://developer.hashicorp.com/terraform/language/backend/local). If a remote backend is not configured, attempts to update or delete existing resources will fail because the **state file is lost between deployments**. We therefore recommend using a remote backend, such as [HCP Terraform](#hcp-terraform), when using Terraform with Octopus. There are many options for storing state files, you can learn more about storing state remotely in the [Terraform documentation](https://www.terraform.io/docs/backends/index.html).

## HCP Terraform

[HCP Terraform](https://www.hashicorp.com/en/products/terraform) or Terraform Enterprise are Terraform execution platforms and remote backends. Using Terraform Enterprise or HCP Terraform for execution and/or state management can be achieved using the [Terraform cloud block](https://developer.hashicorp.com/terraform/language/block/terraform).

### Basic Example

```hcl
terraform {
  cloud {
    organization = "my-org" 
    workspaces {
      project = "Default Project"
      name = "base_layer"
    }
  }
}
```
### Common Example

A common setup will be use a combination of Octopus environment variables, Octopus Project Variables, and hardcoded values. The below example shows the `organization` is inherited from an ENV variable in Octopus, the HCP Terraform project is derived from the Octopus project name, and the workspace name is derived from the project, environment, and a unique string. 

```hcl
# organization is inherited from ENV variable TF_CLOUD_ORGANIZATION
terraform {
  cloud {
    workspaces {
      project = "#{Octopus.Project.Name}"
      # Workspace names must be unique across an entire HCP Terraform organization
      name = "#{Octopus.Project.Name}-base-layer-#{Octopus.Environment.Name}"
    }
  }
}
```

Cloud block settings can be set via [environment variable](https://developer.hashicorp.com/terraform/language/block/terraform#tf_cloud_organization) and omitted from HCL:
- `TF_CLOUD_ORGANIZATION`
- `TF_CLOUD_PROJECT`
- `TF_WORKSPACE`

_note: if you set all 3 environment variables, a empty cloud block **must** exist in the hcl root configuration (ex: `terraform { cloud {} }`)._

### Adding environment variables to Octopus Project

You can add environment Variables to your Octopus project like this:

:::figure
![setting environment variables in octopus project](/docs/img/deployments/terraform/preparing-your-terraform-environment/environment_variables.png)
:::

## Managed cloud accounts

You can optionally prepare the environment that Terraform runs in using the details defined in accounts managed by Octopus. If an account is selected then those credentials do not need to be included in the Terraform template. Using credentials managed by Octopus is optional. These credentials can be saved directly into the Terraform template if that approach is preferable. Credentials defined in the Terraform template take precedence over any credentials defined in the step. The following pages provide instruction on creating cloud accounts:

- [Azure accounts](/docs/infrastructure/accounts/azure)
- [AWS accounts](/docs/infrastructure/accounts/aws)
- [Google cloud accounts](/docs/infrastructure/accounts/google-cloud)

## Querying outputs from HCP Terraform

You can query Terraform Enterprise for values from a remote state file using a data source referencing the `tfe_outputs` backend. A token is required and should be set as an ENV variable (`TFE_TOKEN`)

```hcl
data "tfe_outputs" "previous_step_outputs" {
  organization = var.organization
  workspace    = var.workspace
}
```
