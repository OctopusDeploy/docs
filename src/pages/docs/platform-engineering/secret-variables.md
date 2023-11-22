---
layout: src/layouts/Default.astro
pubDate: 2023-11-09
modDate: 2023-11-09
title: Secret variables
description: Learn how to export projects with secret variables
navOrder: 11
---

Octoterra interacts with Octopus via the Octopus API. One of the security features built into the Octopus API is that it does not return secret values. This means Octoterra can not export the values of any secrets, such as the value assigned secret variables.

There are two ways to import projects that contain secret variables:

1. Define all the values as Terraform variables when calling `terraform apply`
2. Apply the Terraform module with Octopus and use variable substitution to inject secret variables during deployment

## Supplying space level resource secret values

Space level resources such as accounts, certificates, feeds, git credentials, and targets may include secret values. These values must be passed to the `terraform apply` command or set to dummy values to allow the resources to be created without knowing the secret values beforehand. Unlike project sensitive variables, it is not possible to have Octopus automatically inject these values during deployment.

Teams can choose to enable the `Default Secrets to Dummy Values` option in the `Octopus - Serialize Space to Terraform` step to export a Terraform module with all secret values set to a placeholder string. For example, this is an account exported with the `Default Secrets to Dummy Values` option enabled:

```hcl
resource "octopusdeploy_aws_account" "account_aws_account" {
  name                              = "AWS Account"
  description                       = ""
  environments                      = []
  tenant_tags                       = ["TenantType/InternalCustomer"]
  tenants                           = []
  tenanted_deployment_participation = "TenantedOrUntenanted"
  access_key                        = "ABCDEFGHIJKLMNOPQRS"
  secret_key                        = "${var.account_aws_account}"
  depends_on                        = [octopusdeploy_tag_set.tagset_tenanttype,octopusdeploy_tag.tag_internalcustomer]
  lifecycle {
    ignore_changes = [secret_key]
  }
}
variable "account_aws_account" {
  type        = string
  nullable    = false
  sensitive   = true
  description = "The AWS secret key associated with the account AWS Account"
  default     = "Change Me!"
}
```

Note the default value of the Terraform variable `account_aws_account` is `Change Me!`. All other secret values have similar placeholders. Also note that the `lifecycle` meta-argument on the account resource is set to `ignore_changes = [secret_key]`. This indicates that Terraform will not reapply the placeholder secret value if the target resource was manually updated after it was created.

This means that the space level resources exported by the `Octopus - Serialize Space to Terraform` step with the `Default Secrets to Dummy Values` option enabled can be applied without having to supply all the secret values. It is then expected that the newly created Octopus resources are updated manually with the correct values.

If the `Default Secrets to Dummy Values` option is disabled, no default value will be defined for the terraform variables, and you must pass values for these variables to `terraform apply`. For example:

```bash
-var=account_aws_account=TheAwsAccountSecretKey
```

:::div{.hint}
You may wish to define all space level secrets in a library variable set in the upstream space, exclude the library variable set from being exported, and pass the variable set values to the `terraform apply` argument when deploying a space level resources.
:::

## Supplying project secret variable values

Octoterra exposes every secret value it exports as a Terraform variable. These variables can then be defined when running `terraform apply`.

All project secret variables are defined in files with the prefix `project_variable_sensitive_`. These files then define a pair of Terraform blocks.

The first is a Terraform variable:

```hcl
variable "eks_octopub_frontend_secret_value_1" {
  type        = string
  nullable    = false
  sensitive   = true
  description = "The secret variable value associated with the variable Secret.Value"
  default     = "#{Secret.Value}"
}
```

The second is the Octopus variable:

```hcl
resource "octopusdeploy_variable" "eks_octopub_frontend_secret_value_1" {
  owner_id        = "${octopusdeploy_project.project_eks_octopub_frontend.id}"
  name            = "Secret.Value"
  type            = "Sensitive"
  sensitive_value = "${var.eks_octopub_frontend_secret_value_1}"
  is_sensitive    = true
  lifecycle {
    ignore_changes = all
  }
}
```

The value of the secret variable is then defined by passing the argument `-var=eks_octopub_frontend_secret_value_1=SecretValueGoesHere` to `terraform apply`.

## Injecting secret values during deployment

Octoterra formats the Terraform sensitive variable default values in such a way as they can be replaced by Octopus. If you look at the example sensitive variable resource listed in the previous section, you'll see the default value is set to `#{Secret.Value}`.

This Octostache template can be replaced by Octopus when the Terraform module is deployed with the `Apply a Terraform template` step. Note that the `Octopus - Populate Octoterra Space` step templates are based on the `Apply a Terraform template` step, and are configured to replace Octostache template syntax in files matching the pattern `**/project_variable_sensitive*.tf`.

There are, however, some special considerations that must be taken to ensure a project can inject all secret variables when deployed downstream:

1. A dedicated environment must be used for deploying downstream projects (this documentation and step templates assume an environment called `Sync`)
2. All sensitive variables must have a single value
3. All sensitive variables must be available to the `Sync` environment

Following these rules ensures the Octostache templates defining the default value of sensitive variables have a single, unambiguous value injected into them when they are deployed.

### The Sync environment

Dedicating an environment to the process of serializing and deploying downstream projects allows the upstream environment to scope sensitive variables such that:

* They are made available when deploying downstream projects
* They do no leak into any regular deployment environments

This documentation assumes this environment is called `Sync`. The `Sync` environment must not appear in the lifecycle of regular deployments, which ensures any variables scoped to the `Sync` environment do not leak into regular deployments.

Octoterra excludes the `Sync` environment from the scopes of exported projects. This ensures the downstream projects do not rely on the `Sync` environment.

### Sensitive variables with single values

Any sensitive values in the upstream project must have one value assigned to them. For example, if you had a sensitive variable for a database password, and the value was unique per environment. it must be captured as three variables e.g.:

* `Dev.Database.Password` scoped to the `Dev` and `Sync` environments
* `Test.Database.Password` scoped to the `Test` and `Sync` environments
* `Production.Database.Password` scoped to the `Production` and `Sync` environments

These three variables can then be referenced by a non-sensitive variable scoped to all three environments:

* `Database.Password` set to `#{Dev.Database.Password}` and scoped to the `Dev` environment
* `Database.Password` set to `#{Test.Database.Password}` and scoped to the `Test` environment
* `Database.Password` set to `#{Production.Database.Password}` and scoped to the `Production` environment

The deployment process can then reference `#{Database.Password}` to receive the environment scoped sensitive variable during deployment.

### Sensitive variables made available to the Sync environment

All sensitive variables must be available to the `Sync` environment. This means:

* Sensitive variables have no scope
* Sensitive variables scoped to any environments must also be scoped to the `Sync` environment

This ensures that the steps deploying downstream projects have access to all sensitive variables, and replace the Octostache template syntax in `project_variable_sensitive*.tf` with the correct value.