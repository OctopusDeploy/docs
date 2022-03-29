---
title: Amazon S3 Create Bucket
description: Create a new bucket in Amazon S3.
---

Octopus supports creating a new S3 bucket through the `Create an Amazon S3 Bucket` step.
This step provides a way to create or manage an arbitrary Amazon S3 Bucket. This could be especially useful in conjunction with AWS Lambda functions.

:::hint
The `Create an Amazon S3 Bucket` manages the S3 bucket via CloudFormation.
:::

The following instructions can be followed to configure the `Create an Amazon S3 Bucket` step.

## Add the "Create an Amazon S3 Bucket" step

Add the `Create an Amazon S3 Bucket` step to the project, and provide it a name.

![Create an Amazon S3 Bucket Step](images/create-an-amazon-s3-bucket-step.png "width=500")

## Provide the required configuration

Provide the information required to create the bucket.

![Create an Amazon S3 Bucket Configuration section](images/configuration-section.png "width=500")

The following settings will need to be configured:

* AWS Region
* AWS Account

The Bucket Name and the CloudFormationStack Name will be automatically generated if they are not provided.

### Tags section

Specify a list of tags and their values. These tags will be added to Bucket as well as the CloudFormation Stack.

![Create an Amazon S3 Bucket Tags section](images/tags-section.png "width=500")

## Output variables

Presently, the step does outputs the following variables.

BucketName
: The name of the bucket that was created

StackName
: The name of the CloudFormation stack

StackId
: The ID (ARN) of the CloudFormation stack

Region
: The AWS region in which the operations were executed

## Create S3 Bucket Validation Error

This error indicates that one or more of the step's inputs are invalid. Typically, this can happen when values are supplied as bound expressions and could not be resolved until a new release is deployed. The step will run an additional validation check before attempting to perform the deployment. Some examples of input values that can cause this error are:
* Non-unique tag and/or environment variable keys.
* Bound expressions resolving to empty values when the field is required.