---
title: AWS Permissions Required by Octopus
description: Details of the AWS permissions required by the CloudFormation steps in Octopus.
---

This feature was introduced in **Octopus 2018.2**.

The CloudFormation steps in Octopus require a number of basic permissions to be assigned to the AWS account that is used to run the steps. These permissions are used to watch the progress of stacks as they are created, updated and destroyed, query the output properties, determine the presence or absence of stacks, and to provide additional information about failures.

For stacks that are created, updated or deleted by Octopus, the following permissions should be assigned to the AWS account used to run the step.

* `cloudformation:DescribeStacks`
* `cloudformation:DescribeStackEvents`

:::hint
If these permissions are not available, Octopus will make some assumptions about the state of the CloudFormation stacks. However there are situations where these assumptions are not valid. For example, if Octopus can't determine if a stack that it is trying to deploy exists due to the lack of the `cloudformation:DescribeStacks` permission, it will assume the stack does not exist and attempt to create the it. This may not work if the stack does in fact already exist, as in this case it must be updated instead of created.

For this reason it is recommended that both the `cloudformation:DescribeStacks` and `cloudformation:DescribeStackEvents` permissions be assigned to the AWS account performing any CloudFormation steps.
:::

When creating new stacks, the following permissions are required:

* `cloudformation:CreateStack`

When updating existing stacks, the following permissions are required:

* `cloudformation:UpdateStack`

When deleting existing stacks, the following permissions are required:

* `cloudformation:DeleteStack`

:::hint
While the AWS cli makes a clear distinction between creating and updating CloudFormation stacks, Octopus hides this difference and determines if a stack is to be created or updated depending on whether or not it currently exists.

For this reason it is recommended that the AWS account used to deploy a CloudFormation template have the permissions for both creating and updating stacks.
:::

In addition the AWS account used with the CloudFormation steps needs to have permissions to create, update and delete any of the resources referenced by the CloudFormation template. Refer to the [AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) for more information on which permissions are required and how to assign them.
