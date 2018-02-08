Octopus manages the AWS credentials used by the AWS steps.

The AWS account is either a pair of access and secret keys, or the credentials are retrieved from the IAM role assigned to the instance that is executing the deployment.

## Create an AWS Account

AWS steps can use an Octopus managed AWS account for authentication. This account must first be created under {{Infrastructure>Accounts}} by clicking the `ADD ACCOUNT` button in the `Amazon Web Services Account` section.

:::hint
AWS steps can also defer to the IAM role assigned to the instance that hosts the Octopus server for authentication. In this scenario there is no need to create the AWS account.
:::

![AWS Account](aws-accounts.png "width=500")

And AWS account requires a `Name`, the `Access Key` and the `Secret Key`.

See the [AWS documentation](https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html) for details on how to create the access and secret keys.

![AWS Account](new-aws-account.png "width=500")

Clicking the `SAVE AND TEST` button will verify that the credentials are valid.

![Account Verification](account-verification.png "width=500")

## Using AWS service roles for an EC2 instances

AWS allows you to assign a role to an EC2 instance, referred to as an [AWS service role for an EC2 instance](https://g.octopushq.com/AwsDocsRolesTermsAndConcepts), and that role can be accessed to generate the credentials that are used to deploy AWS resources and run scripts.

Because the AWS steps run on the Octopus server, this means that Octopus itself needs to be running on an EC2 instance with an IAM role applied in order to take advantage of this feature.

:::hint
It is expected that in future these steps will be run on [worker instances](https://github.com/OctopusDeploy/Specs/blob/master/Workers/index.md), which can execute on their own EC2 instances with their own roles applies. This will make IAM roles much more useful and flexible.
:::

When using the IAM role assigned to the Octopus EC2 instance, there is no need to create an AWS account in Octopus.
