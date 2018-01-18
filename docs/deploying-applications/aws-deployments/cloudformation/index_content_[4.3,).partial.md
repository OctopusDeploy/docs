Octopus supports the deployment of AWS CloudFormation templates through the `Deploy a CloudFormation Template` step. This step executes a CloudFormation template using AWS credentials managed by Octopus, and captures the CloudFormation outputs as Octopus output variables.

The proceeding instructions can be followed to configure the `Deploy a CloudFormation Template` step.

## Create an AWS Account

AWS steps can use an Octopus managed AWS account for authentication. This account must first be created under {{Infrastructure>Accounts}} by clicking the `ADD ACCOUNT` button in the `Amazon Web Services Account` section.

:::hint
AWS steps can also defer to the IAM role assigned to the instance that hosts the Octopus server for authentication. In this scenario there is no need to create the AWS account.
:::

![AWS Account](aws-accounts.png "width=500")

And AWS account requires a `Name`, the `Access Key` and the `Secret Key`.

![AWS Account](new-aws-account.png "width=500")

Clicking the `SAVE AND TEST` button will verify that the credentials are valid.

![Account Verification](account-verification.png "width=500")

## Create a AWS Account Project Variable

AWS accounts are included in a project through a project variable of the type `Amazon Web Services Account`.

![AWS Account Variable](aws-account-variable.png "width=500")

The `Add Variable` window is then displayed and lists all the AWS accounts, as well as an account called `Role Assigned to the AWS Instance Executing the Deployment`.

The `Role Assigned to the AWS Instance Executing the Deployment` account can be selected to defer to the IAM role that is assigned to the AWS EC2 instance where the deployment is executed from. This means no AWS credentials need to be stored by Octopus.

The `Role Assigned to the AWS Instance Executing the Deployment` account always exists, meaning it does not need to be created like a `Amazon Web Services Account`.

Because CloudFormation deployments are performed on the Octopus server today, the Octopus server must be installed on an EC2 instance that has an IAM role assigned to it in order to take advantage of the `Role Assigned to the AWS Instance Executing the Deployment` account.

:::hint
In future it is expected that AWS steps will be deployed from worker instances that can be hosted on separate EC2 instances with IAM roles assigned to them. This will make the `Role Assigned to the AWS Instance Executing the Deployment` account more flexible and powerful.
:::

Select the account that was created in the previous step to assign it to the variable.

![AWS Account Variable Selection](aws-account-variable-selection.png "width=500")

## Add the CloudFormation Step

Add the `Deploy a CloudFormation template` step to the project, and provide it a name.

![Deploy a CloudFormation Template Step](deploy-cloudformation-step.png "width=500")

### AWS Section

Select the variable that references the `Amazon Web Services Account` under the `AWS Account` section.

![AWS Account](step-aws-account.png "width=500")

The supplied account can optionally be used to assume a second role. This can be used to run the AWS commands with a role that limits the services that can be affected.

![AWS Role](step-aws-role.png "width=500")

### Template Section

Under the `CloudFormation` section, the AWS region and stack name need to be defined.

You can also optionally wait for the stack to complete before finishing the step by selecting the `Wait for completion` checkbox.

:::hint
Unselecting the `Wait for completion` checkbox will allow the step to complete once that CloudFormation process has been started. However unselecting the option does mean that the output variables may be missing or outdated, because they will be read before the stack has finished deploying. It also means that the step will not fail if the CloudFormation deployment fails.
:::

![AWS Region](step-aws-region.png "width=500")

### Template Section

The CloudFormation template can come from two sources: directly entered source code or from files in a package.

#### Source Code

The first option is to paste the template directly into the step. This is done by selecting the `Source code` option, and clicking the `ADD SOURCE CODE` button.

![Source Code](step-aws-sourcecode.png "width=500")

This will present a dialog in which the CloudFormation template can be pasted, in either JSON or YAML.

![Source Code Dialog](step-aws-code-dialog.png "width=500")

Once the `SAVE` button is clicked, the parameters defined in the template will be shown under the `Parameters` section.

![Parameters](step-parameters.png "width=500")

#### Package

The second option is to reference a CloudFormation template and properties file from a package. This is done by selecting the `File inside a package` option, specifying the package, and the supplying the name of the template file (which can be a JSON or YAML file), and optionally the path to the parameters file (which [only supports JSON](https://github.com/aws/aws-cli/issues/2275)).

![Package](step-aws-package.png "width=500")

## Error Messages

The AWS deployment steps include a number of unique error codes that may be displayed in the output if there was an error. Below is a list of the errors, along with any additional troubleshooting steps that can be taken to rectify them.

### AWS-CLOUDFORMATION-ERROR-0001
CloudFormation stack finished in a rollback state. Commonly this occurs because the AWS account configured to run the CloudFormation deployment did not have the correct permissions, or because some required variables were missing or invalid.

The last `Status Reason` from the stack events is displayed in the Octopus logs, but you can find more information about the error in the AWS CloudFormation console under the Events section for the stack.

In the screenshot below you can see that the specified instance type could only be used in a VPC, triggering the rollback.

![CloudFormation Events](cloud-formation-error.png "width=500")

### AWS-CLOUDFORMATION-ERROR-0002
The AWS account used to perform the operation does not have the required permissions to query the current state of the CloudFormation stack. This step will complete without waiting for the stack to complete, and will not fail if the stack finishes in an error state.

The error message will include the error from AWS, which looks like this:
```
User: arn:aws:iam::123456789012:user/TestUser is not authorized to perform: cloudformation:DescribeStackEvents on resource: arn:aws:cloudformation:us-east-1:123456789012:stack/MyStack/*
```

To resolve the error, ensure that the user has the appropriate permissions in AWS.

### AWS-CLOUDFORMATION-ERROR-0003
The AWS account used to perform the operation does not have the required permissions to describe the stack.

This is logged as a warning as Octopus will make some assumptions about the state of the stack and attempt to continue on:

* If the step was configured to create or update a stack, it is assumed that the stack does not exist and the stack will attempt to be created. In the event that the stack already exists, the step will fail as it will incorrectly attempt to create the stack instead of update it.
* If the step was configured to delete the stack, it is assumed that the stack does exist and it will attempt to be deleted.

The error message will include the error from AWS, which looks like this:
```
User: arn:aws:iam::123456789012:user/TestUser is not authorized to perform: cloudformation:DescribeStacks on resource: arn:aws:cloudformation:us-east-1:123456789012:stack/MyStack/*
```

To resolve the error, ensure that the user has the appropriate permissions in AWS.

### AWS-CLOUDFORMATION-ERROR-0004
The AWS account used to perform the operation does not have the required permissions to describe the CloudFormation stack. This means that the step is not able to generate any output variables.

The error message will include the error from AWS, which looks like this:
```
User: arn:aws:iam::123456789012:user/TestUser is not authorized to perform: cloudformation:DescribeStacks on resource: arn:aws:cloudformation:us-east-1:123456789012:stack/MyStack/*
```

To resolve the error, ensure that the user has the appropriate permissions in AWS.

### AWS-CLOUDFORMATION-ERROR-0005
An unrecognized exception was thrown while querying the CloudFormation stacks.

### AWS-CLOUDFORMATION-ERROR-0006
An unrecognized exception was thrown while checking to see if the CloudFormation stack exists.

### AWS-CLOUDFORMATION-ERROR-0007
The AWS account used to perform the operation does not have the required permissions to create the CloudFormation stack.

The error message will include the error from AWS, which looks like this:
```
User: arn:aws:iam::123456789012:user/TestUser is not authorized to perform: cloudformation:CreateStack on resource: arn:aws:cloudformation:us-east-1:123456789012:stack/MyStack/*
```

To resolve the error, ensure that the user has the appropriate permissions in AWS.

### AWS-CLOUDFORMATION-ERROR-0008
An unrecognized exception was thrown while creating a CloudFormation stack.

### AWS-CLOUDFORMATION-ERROR-0009
The AWS account used to perform the operation does not have the required permissions to delete the CloudFormation stack.

The error message will include the error from AWS, which looks like this:
```
User: arn:aws:iam::123456789012:user/TestUser is not authorized to perform: cloudformation:DeleteStack on resource: arn:aws:cloudformation:us-east-1:123456789012:stack/MyStack/*
```

To resolve the error, ensure that the user has the appropriate permissions in AWS.

### AWS-CLOUDFORMATION-ERROR-0010
An unrecognized exception was thrown while deleting a CloudFormation stack.

### AWS-CLOUDFORMATION-ERROR-0011
The AWS account used to perform the operation does not have the required permissions to update the CloudFormation stack.

The error message will include the error from AWS, which looks like this:
```
User: arn:aws:iam::123456789012:user/TestUser is not authorized to perform: cloudformation:UpdateStack on resource: arn:aws:cloudformation:us-east-1:123456789012:stack/MyStack/*
```

To resolve the error, ensure that the user has the appropriate permissions in AWS.

### AWS-CLOUDFORMATION-ERROR-0012
An unrecognized exception was thrown while updating a CloudFormation stack.

### AWS-CLOUDFORMATION-ERROR-0013

Failed to get the caller identity. This may be because the instance does not have a role assigned to it.

This typically occurs because the step has used the `Role Assigned to the AWS Instance Executing the Deployment` account, but the instance running the deployment does not have a role assigned to it. See the [AWS Documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html?icmpid=docs_ec2_console) for more details.

### AWS-LOGIN-ERROR-0001

Failed to access the metadata URI, or failed to parse the response. We are unable to generate keys from the metadata endpoint.

This can happen if the role that was assigned to the instance does not trust the instance it was assigned to. This can be verified by accesssing the URL [http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLENAME](http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLENAME) (replace `ROLENAME` with the name of the role assigned to the instance) from the Octopus server. If the response looks like:

```json
{
  "Code" : "AssumeRoleUnauthorizedAccess",
  "Message" : "EC2 cannot assume the role ROLENAME.  Please see documentation at http://docs.amazonwebservices.com/IAM/latest/UserGuide/RolesTroubleshooting.html.",
  "LastUpdated" : "2018-01-18T23:43:19Z"
}
```

then the role assigned to an EC2 instance needs to have a trust relationship policy something like this:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

See the [AWS documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) for more details.

### AWS-LOGIN-ERROR-0003

Failed to access the security credentials URI, or failed to parse the response. This may be because the instance does not have a role assigned to it.

You can confirm the roles assigned to the instance by performing a GET request on the URL [http://169.254.169.254/latest/meta-data/iam/security-credentials](http://169.254.169.254/latest/meta-data/iam/security-credentials) from the instance. This request will list the assigned roles.

You should then be able to perform a GET request on the URL [http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLENAME](http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLENAME) (replacing `ROLENAME` with the name of the role). This should return security keys in a JSON response.

Refer to the [AWS documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) for more information on assigning roles to EC2 instances.

### AWS-LOGIN-ERROR-0004

Failed to assume the role. Make sure the correct permissions have been enabled in AWS.

The role or user that is assuming the role need to have the `sts:AssumeRole` permission e.g.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1512947264000",
            "Effect": "Allow",
            "Action": [
                "sts:AssumeRole"
            ],
            "Resource": [
                "arn:aws:iam::123456789012:role/RoleBeingAssumed"
            ]
        }
    ]
}
```

The role being assumed then needs trust relationship with the role or user that is assuming it.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:user/RoleDoingTheAssuming"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

![Trust Relationships](trust-relationships.png "width=500")

### AWS-LOGIN-ERROR-0005

Failed to verify the credentials. Please check the keys assigned to the Amazon Web Services Account associated with this step.

This can be done by opening {{Infrastructure>Accounts}}, selecting the account, and clicking the `SAVE AND TEST` button. If the verification fails, it means the keys are not valid.
