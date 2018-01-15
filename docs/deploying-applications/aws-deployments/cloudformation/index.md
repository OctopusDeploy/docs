---
title: Deploy Using an AWS CloudFormation
description:  Deploy Using an AWS CloudFormation.
---

## Error Messages

The AWS deployment steps include a number of unique error codes that may be displayed in the output if there was an error. Below is a list of the errors, along with any additional troubleshooting steps that can be taken to rectify them.

### AWS-CLOUDFORMATION-ERROR-0001
CloudFormation stack finished in a rollback state. Commonly this occurs because the AWS account configured to run the CloudFormation deployment did not have the correct permissions, or because some required variables were missing or invalid.

The last `Status Reason` from the stack events is displayed in the Octopus logs, but you can find more information about the error in the AWS CloudFormation console under the Events section for the stack.

In the screenshot below you can see that the specified instance type could only be used in a VPC, triggering the rollback.

![CloudFOrmation Events](cloud-formation-error.png "width=500")
