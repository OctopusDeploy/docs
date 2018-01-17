The CloudFormation steps in Octopus require a number of basic permissions to be assigned to the AWS account that is used to run the steps. These permissions are used to watch the progress of stacks as they are created, updated and destroyed, query the output properties, determine the presence or absence of stacks, and to provide additional information about failures.

For stacks that are created, updated or deleted by Octopus, the following permissions should be assigned to the AWS account used to run the step.

* cloudformation:DescribeStacks
* cloudformation:DescribeStackEvents

:::hint
If these permissions are not available, Octopus will make some assumptions about the state of the CloudFormation stacks. However there are situations where these assumptions are not valid, so it is recommended that both the DescribeStacks and DescribeStackEvents permissions be assigned to the AWS account performing any CloudFormation steps.
:::

When creating new stacks, the following permissions are required:

* cloudformation:CreateStack

When updating existing stacks, the following permissions are required:

* cloudformation:UpdateStack

When deleting existing stacks, the following permissions are required:

* cloudformation:DeleteStack

:::hint
While the AWS cli makes a clear distinction between creating and updating CloudFormation stacks, Octopus hides this difference and determines if a stack is to be created or updated depending on whether or not it currently exists.

For this reason it is recommended that the AWS account used to deploy a CloudFormation template have the permissions for both creating and updating stacks.
:::
