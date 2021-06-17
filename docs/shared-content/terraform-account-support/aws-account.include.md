## AWS Account Support

If you wish to use AWS credentials managed by Octopus when deploying Terraform templates, the AWS account will need to be added to Octopus, and a variable referencing the account configured in the project.

:::hint
Using AWS credentials managed by Octopus is optional. These credentials can be saved directly into the Terraform template if that approach is preferable.
:::

### Create an AWS account

The instructions at [Creating an AWS Account](/docs/infrastructure/accounts/aws/index.md#create-an-aws-account) detail the procedure for creating an account in Octopus.

#### Create a AWS account project variable

AWS accounts are included in a project through a project variable of the type `Amazon Web Services Account`.

![AWS Account Variable](/docs/shared-content/terraform-account-support/images/aws-account-variable.png "width=500")

The `Add Variable` window is then displayed and lists all the AWS accounts.

Select the account that was created in the previous step to assign it to the variable.

![AWS Account Variable Selection](/docs/shared-content/terraform-account-support/images/aws-account-variable-selection.png "width=500")

#### Selecting the account

Under the `Managed Account` section, select `AWS Account`. This will display two additional sections where the AWS account can be selected, and the default AWS region optionally defined.

#### AWS section

Select the variable that references the `Amazon Web Services Account` under the `AWS Account` section or select whether you wish to execute using the service role of an EC2 instance.

![AWS Account](/docs/shared-content/terraform-account-support/images/step-aws-account.png "width=500")

The supplied account can optionally be used to assume a different AWS service role. This can be used to run the AWS commands with a role that limits the services that can be affected.

![AWS Role](/docs/shared-content/terraform-account-support/images/step-aws-role.png "width=500")

:::hint
If you select `Yes` to `Execute using the AWS service role for an EC2 instance`, you do not need an AWS account or account variable. Instead the AWS service role for the EC2 instance executing the deployment will be used. See the [AWS documentation](https://g.octopushq.com/AwsDocsRolesTermsAndConcepts) for more information on service roles.
:::

:::hint
Credentials defined in the Terraform template take precedence over any credentials defined in the step.
:::

#### Region section

You can optionally define the default region to use when interacting with AWS in the `Region` section.

:::hint
Regions defined in the Terraform template take precedence over the default value defined in the step.
:::