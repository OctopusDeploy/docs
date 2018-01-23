Octopus allows you to write custom Powershell scripts that have access to the AWS CLI via the `Run an AWS CLI Script` step. In addition, the script is run in an environment that handles authentication by creating the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION` environment variables based on the AWS account that was selected for the step.

The proceeding instructions can be followed to configure the `Run an AWS CLI Script` step.

## Create an AWS Account

The instructions at [Creating an AWS Account](/docs/infrastructure/aws/creating-an-aws-account/index.md) detail the procedure for creating an account in Octopus.

## Create a AWS Account Project Variable

AWS accounts are included in a project through a project variable of the type `Amazon Web Services Account`.

![AWS Account Variable](aws-account-variable.png "width=500")

The `Add Variable` window is then displayed and lists all the AWS accounts, as well as an account called `Role Assigned to the AWS Instance Executing the Deployment`.

The `Role Assigned to the AWS Instance Executing the Deployment` account can be selected to defer to the IAM role that is assigned to the AWS EC2 instance where the deployment is executed from. This means no AWS credentials need to be stored by Octopus.

The `Role Assigned to the AWS Instance Executing the Deployment` account always exists, meaning it does not need to be created like a `Amazon Web Services Account`.

Because AWS CLI scripts are run on the Octopus server today, the Octopus server must be installed on an EC2 instance that has an IAM role assigned to it in order to take advantage of the `Role Assigned to the AWS Instance Executing the Deployment` account.

:::hint
In future it is expected that AWS steps will be deployed from worker instances that can be hosted on separate EC2 instances with IAM roles assigned to them. This will make the `Role Assigned to the AWS Instance Executing the Deployment` account more flexible and powerful.
:::

Select the account that was created in the previous step to assign it to the variable.

![AWS Account Variable Selection](aws-account-variable-selection.png "width=500")

## Add AWS Script Step

Add the `Run an AWS CLI Script` step to the project, and provide it a name.

![Run AWS Script](run-aws-script-step.png "width=500")

### AWS Section

Select the variable that references the `Amazon Web Services Account` under the `AWS Account` section.

![AWS Account](step-aws-account.png "width=500")

The supplied account can optionally be used to assume a second role. This can be used to run the AWS commands with a role that limits the services that can be affected.

![AWS Role](step-aws-role.png "width=500")

The default AWS region in which to execute AWS CLI commands is defined in the `Region` section.

![AWS Region](step-aws-region.png "width=500")

## Script Section

PowerShell scripts run by the `Run an AWS CLI Script` step have access to the AWS CLI executable `aws` on the path. In addition the environment variables `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION` are configured. The `AWS_SESSION_TOKEN` environment variable is also configured if the script was run against an assumed role, or if the role assigned to the EC2 instance running the script (i.e. the Octopus server) was used.

Scripts can be run from two different locations: source code added to the step, or a script from a package.

### Source Code

The first option is to add the script source code to the step directly. This is done by selecting the `Source code` option, and entering the source code into the text box in the `Script Content` section.

![Source Code](step-aws-script.png "width=500")

### Package

The second option is to run a script from a package. This is done by selecting the `Script file inside a package` option, selecting the package, and entering the name of the file within the package to run as a PowerShell script.

![AWS Script Package](step-aws-package.png)
