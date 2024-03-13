---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Amazon S3 Create Bucket
description: Create a new bucket in Amazon S3.
---

Octopus supports creating a new S3 bucket through the `Create an Amazon S3 Bucket` step.
This step provides a way to create or manage an arbitrary Amazon S3 Bucket via CloudFormation. This could be especially useful in conjunction with AWS Lambda functions.

:::div{.hint}
The `Create an Amazon S3 Bucket` step was added in **Octopus 2022.1**. We'd love to hear [your feedback about this step](https://octopusdeploy.typeform.com/to/KwQXY2zv).
:::

The following instructions can be followed to configure the `Create an Amazon S3 Bucket` step.

## Add the Create an Amazon S3 Bucket step

Add the `Create an Amazon S3 Bucket` step to the project, and provide it a name.

:::figure
![Create an Amazon S3 Bucket Step](/docs/deployments/aws/aws-s3-create-bucket/images/create-an-amazon-s3-bucket-step.png)
:::

## Provide the required configuration

Provide the information required to create the bucket.

:::figure
![Create an Amazon S3 Bucket Configuration section](/docs/deployments/aws/aws-s3-create-bucket/images/configuration-section.png)
:::

The following settings will need to be configured:

* AWS Region
* AWS Account

:::div{.hint}
Note: The **S3 Bucket Name** will be automatically generated if not provided.
:::

### Tags section

Specify a list of tags and their values. These tags will be added to Bucket as well as the CloudFormation Stack.

:::figure
![Create an Amazon S3 Bucket Tags section](/docs/deployments/aws/aws-s3-create-bucket/images/tags-section.png)
:::

### Advanced section

The S3 bucket is created and managed through a CloudFormation stack. You can optionally specify a CloudFormation Stack Name to use, otherwise, one will be automatically generated.

:::figure
![Create an Amazon S3 Bucket Advanced section](/docs/deployments/aws/aws-s3-create-bucket/images/advanced-section.png)
:::

:::div{.warning}
In April 2023 Amazon is updating their security settings for newly created S3 Buckets. Buckets will now be created with Block all public access enabled and access control lists (ACLs) disabled. For more information on these changes see [the announcement](https://aws.amazon.com/blogs/aws/heads-up-amazon-s3-security-changes-are-coming-in-april-of-2023/). Octopus Deploy is updating our defaults in line with these changes and now offers the ability to override both of these settings. Existing projects that rely on creating publicly accessible S3 buckets will need to be updated with public access enabled and ACLs enabled.
:::

:::figure
![Create an Amazon S3 Bucket Advanced Security section](/docs/deployments/aws/aws-s3-create-bucket/images/advanced-section-security.png)
:::


## Output variables

Presently, the step outputs the following variables.

| Name        | Description |
| ------------| ----------- |
|`BucketName` | The name of the bucket that was created  |
|`StackName`  | The name of the CloudFormation stack     |
|`StackId`    | The ID (ARN) of the CloudFormation stack |
|`Region`     | The AWS region in which the operations were executed |

## Errors

If a deployment failure is detected, you may receive one of the following errors.

### Create S3 Bucket Validation Error

This error indicates that one or more of the step's inputs are invalid. Typically, this can happen when values are supplied as bound expressions and cannot be resolved until a new release is deployed. The step will run an additional validation check before attempting to perform the deployment. Some examples of input values that can cause this error are:
* Non-unique tag and/or environment variable keys.
* Bound expressions resolving to empty values when the field is required.