---
title: Google cloud accounts
description: Using Octopus managed Google cloud accounts with Terraform
---

## Google Cloud Account Support

:::hint
Google Cloud Accounts were added in Octopus **2021.2**.
:::

If you wish to use Google cloud credentials managed by Octopus when deploying Terraform templates, the Google cloud account will need to be added to Octopus, and a variable referencing the account configured in the project.

:::hint
Using Google cloud credentials managed by Octopus is optional. These credentials can be saved directly into the Terraform template if that approach is preferable.
:::

### Create a Google cloud account

The instructions at [Creating a Google Cloud Account](/docs/infrastructure/accounts/google-cloud/index.md#create-a-google-cloud-account) detail the procedure for creating an account in Octopus.

#### Create a Google cloud account project variable

Google cloud accounts are included in a project through a project variable of the type `Google Cloud Account`.

![Google Cloud Account Variable](/docs/deployments/terraform/managed-accounts/images/google-cloud-account-variable.png "width=500")

The `Add Variable` window is then displayed and lists all the Google cloud accounts.

Select the account that was created in the previous step to assign it to the variable.

![Google Cloud Account Variable Selection](/docs/deployments/terraform/managed-accounts/images/google-cloud-account-variable-selection.png "width=500")

#### Selecting the account

Under the `Managed Account` section, select `Google Cloud Account`. This will display additional sections related to Google cloud credentials.

#### Google Cloud section

![Google Cloud Account](/docs/deployments/terraform/managed-accounts/images/google-cloud-account-selection.png "width=500")

Select the variable that references the `Google Cloud Account` under the `Select Account variable` section or select whether you wish to use the associated service account in the target virtual machine.

:::hint
If you select `Yes` to `When running in a Compute Engine virtual machine, use the associated VM service account`, you do not need a Google cloud account or account variable. Instead, the associated service account of the virtual machine which runs the script will be used. 
:::

The supplied account can optionally impersonate other service accounts. This can be used to run the gcloud commands with another service account that have other permissions. See the [Google cloud documentation](https://cloud.google.com/iam/docs/impersonating-service-accounts) for more information on impersonating service accounts.

:::hint
Credentials defined in the Terraform template take precedence over any credentials defined in the step.
:::

#### Project section

You optionally define the project ID of the project in the Google Cloud Platform instance. This value will be set to the `GOOGLE_PROJECT` environment variable.

:::hint
ProjectId defined in the Terraform template take precedence over the default value defined in the step.
ProjectId is required for this step. You need to either define it in this field or in your Terraform template.
:::

#### Region section

You can optionally define the default region to use when interacting with Google Cloud Platform in the `Region` section. This value will be set to the `GOOGLE_REGION` environment variable. See the [Google cloud documentation](https://cloud.google.com/compute/docs/regions-zones#available) for a list of available regions.

:::hint
Regions defined in the Terraform template take precedence over the default value defined in the step.
:::

#### Zone section

You can optionally define the default zone to use when interacting with Google Cloud Platform in the `Zone` section. This value will be set to the `GOOGLE_ZONE` environment variable. See the [Google cloud documentation](https://cloud.google.com/compute/docs/regions-zones#available) for a list of available zones.

:::hint
Zones defined in the Terraform template take precedence over the default value defined in the step.
:::