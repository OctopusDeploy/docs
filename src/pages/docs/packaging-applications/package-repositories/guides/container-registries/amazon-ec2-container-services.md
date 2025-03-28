---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: AWS Elastic Container Registry (ECR)  
description: How to add an AWS Elastic Container Registry as an Octopus feed 
navOrder: 30
---

AWS provides a Docker Image registry, known as [Elastic Container Registry (ECR)](https://aws.amazon.com/ecr/) . Support for EC2 Container registries is provided as a special feed type itself.

:::div{.warning}
The credentials used for ECR feeds [only last 12 hours](http://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html). This may not be suitable for long lived container workloads.
:::

## Configuring an AWS Elastic Container Registry (ECR)
From the AWS Services dashboard go to `Elastic Container Registry`.

 ![AWS Services](/docs/packaging-applications/package-repositories/guides/container-registries/images/aws-services.png)

Under the `Repositories` area you need to create a repository to match the what in Octopus-speak would be the PackageId. This should map to your distinct application image. If you attempt to push an image during your build process to this registry without first creating the corresponding repository you will receive an error.

:::figure
![AWS Registries](/docs/packaging-applications/package-repositories/guides/container-registries/images/aws-registries.png)
:::

With the repository configured, ensure that you also have an [AWS IAM](https://aws.amazon.com/iam/) user available that has at a minimum the permissions `ecr:GetAuthorizationToken`, `ecr:DescribeRepositories`, `ecr:DescribeImages` and `ecr:ListImages`. This user is the account which Octopus will use to retrieve the docker login token which is then used to perform the appropriate docker commands.

Further links for getting your AWS registry set up are available in their [online docs](http://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html)

## Adding AWS ECR as an Octopus External Feed
Create a new Octopus Feed (**Library ➜ External Feeds**) and select the `AWS Elastic Container Registry` Feed type. With this selected you will need to provide the credentials configured above, as well as the region at which the registry was created. In AWS you are able to maintain separate repositories in each region.

:::figure
![AWS EC2 container service registry feed](/docs/packaging-applications/package-repositories/guides/container-registries/images/aws-ecr-feed.png)
:::

Save and test your registry to ensure that the connection is authorized successfully.

## Adding an AWS OpenID Connect ECR External feed
Octopus Server `2025.2` adds support for OpenID Connect to ECR feeds. To use OpenID Connect authentication you have to follow the [required minimum configuration](/docs/infrastructure/accounts/openid-connect#configuration). The configuration of 


1. Navigate to **Deploy ➜ External Feeds**, click the **Add Feed** and select **AWS Elastic Container Registry**.
2. Add a memorable name for the account.
3. Set the **Audience** to the audience of the identity provider in AWS.
4. Set the **Role ARN** to the ARN from the identity provider associated role.
5. Click **SAVE** to save the account.
6. Before you can test the account you need to add a condition to the identity provider in AWS under **IAM ➜ Roles ➜ {Your AWS Role} ➜ Trust Relationship** :
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
          "Federated": "arn:aws:iam::{aws-account}:oidc-provider/{your-identity-provider}"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "example.octopus.app:sub": "space:[space-slug]:feed:[slug-of-feed-created-above]",
          "example.octopus.app:aud": "example.octopus.app"
        }
      }
    }
  ]
}
```
7. Go back to the AWS feed in Octopus and click **TEST**, search for a package in any ECR feeds the role has access to.

Refer to the AWS docs for [more information on the role permissions required for ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/images.html).
Please read [OpenID Connect Subject Identifier](/docs/infrastructure/accounts/openid-connect#subject-keys) on how to customize the **Subject** value.

By default, the role trust policy does not have any conditions on the subject identifier. To lock the role down to particular usages you need to modify the [trust policy conditions](https://oc.to/aws-iam-policy-conditions) and add a condition for the `sub`.

For example, to lock an identity role to a specific Octopus environment, you can update the conditions:

```json
"Condition": {
  "StringEquals": {
        "example.octopus.app:sub": "space:default:feed:feed-slug",
        "example.octopus.app:aud": "example.octopus.app:"
  }
}
```

`default` and `feed-slug` are the slugs of their respective Octopus resources.

AWS policy conditions also support complex matching with wildcards and `StringLike` expressions. 
