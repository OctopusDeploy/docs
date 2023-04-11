---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Preparing your Terraform environment
description: Configuring remote state, backends, and cloud accounts using Terraform with Octopus
navOrder: 10
---

When running Terraform on a local PC, the state of the resources managed by Terraform is saved in a local file. This state is queried to learn which resources already exist in order to properly apply updates and destroy resources.

When Terraform is run by Octopus, this state file is not preserved between executions. This means a remote backend must be configured for almost all practical applications of Terraform through Octopus, allowing the state information to be preserved between Terraform steps.

Refer to the [Terraform documentation](https://www.terraform.io/docs/backends/index.html) for more information on configuring backends.

## Terraform backends

Neither Octopus nor Terraform will generate errors if a remote backend is not configured, most attempts to update or delete existing resources will not work as expected without a remote backend. We therefore recommend using a remote backend when using terraform with Octopus. You can learn more about storing state remotely [here](/docs/deployments/terraform/preparing-your-terraform-environment/index.md#remote-state-terraform-cloud) and more general information
regarding backends in the [Terraform documentation](https://www.terraform.io/docs/backends/index.html).

## Managed Cloud Accounts

You can optionally prepare the environment that Terraform runs in using the details defined in accounts managed by Octopus. If an account is selected then those credentials do not need to be included in the Terraform template. Using credentials managed by Octopus is optional. These credentials can be saved directly into the Terraform template if that approach is preferable. Credentials defined in the Terraform template take precedence over any credentials defined in the step. The following pages provide instruction on creating cloud accounts:

- [Azure accounts](/docs/infrastructure/accounts/azure/index.md)
- [AWS accounts](/docs/infrastructure/accounts/aws/index.md)
- [Google cloud accounts](/docs/infrastructure/accounts/google-cloud/index.md)

## Remote state Terraform cloud

Using Terraform enterprise for remote state requires a data source using referencing the `remote` backend

```
variable "token" {
  type = "string"
}

variable "organization" {
  type = "string"
}

variable "workspace" {
  type = "string"
}

data "terraform_remote_state" "state" {
	backend = "remote"
  	config = {
    	organization = "${var.organization}"
		workspaces = {
  			name = "${var.workspace}"
		}
		token =  "${var.token}"
  }
}
```

As with any other data source, it must exist remotely first. To achieve this, you need an empty template as above which contains only the data source in question. You then need to run `terraform init` followed by
`terraform plan` to generate the empty state. The remote state can then be seeded using `terraform state push .\.terraform\terraform.tfstate`. This is necessary as including resources as part of the template will result in errors such as
`No stored state was found for the given workspace in the given backend.` as terraform tries to first read the remote state that doesn't exist.

## Enhanced backends

Terraform has the concept of enhanced backends which enable both storage and execution of remote operations such as plan and apply. Octopus does not prevent you from using backends such as these, however the execution of actions remotely may not
always work as intended. It is for this reason that we recommend using remote state and keep execution of actions local. Terraform Cloud / Enterprise provides an option as part of the workspace settings which makes this rather trivial.
![Terraform cloud execution mode](terraform-cloud-execution-mode.png "width=500")
