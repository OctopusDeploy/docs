---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-11-23
title: AWS S3 Bucket feeds
description: Configuring AWS S3 buckets as Octopus Feeds
navOrder: 60
---

If you are deploying packages located in an S3 bucket you can register them with Octopus and use as part of your deployments. Go to **Deploy ➜ Manage ➜ External Feeds**.

You can add S3 feeds by clicking the **Add feed** button.

You will then need to select if you want to explicitly specify the key and secret to use to connect to your AWS account or to use the account implicitly defined on your Octopus worker (for example in environment variables). Provide a name for the feed then click **Save and test**.

![Creating an AWS S3 feed in Octopus](/docs/img/packaging-applications/package-repositories/images/s3-feed.png)

The AWS S3 feed will try to connect to the bucket specified as part of the package name. For example, `test-bucket/test-package` will search for the package `test-package` in the `test-bucket` bucket. The account provided as part of the feed configuration must have access to the bucket.

The AWS S3 Bucket feed follows the same [package versioning conventions](/docs/packaging-applications/create-packages/versioning) as other feeds.

On the test page, you can check whether the feed is working by searching for packages:

:::figure
![Searching for packages on the S3 feed test page](/docs/img/packaging-applications/package-repositories/images/s3-feed-test.png)
:::

## S3-compatible storage

:::div{.info}
Support for S3-compatible storage is available from Octopus **2027.1.231**.
:::

S3 feeds can use S3-compatible storage, such as MinIO, Ceph, or Garage, instead of AWS S3. Enter the URL of your storage in the **Endpoint** field, for example `https://s3.example.com`. Leave **Endpoint** blank to use AWS S3.

When you set an endpoint:

- Octopus connects using path-style addressing, for example `https://s3.example.com/test-bucket/test-package.1.0.0.zip`.
- Octopus signs requests with the **Region** you enter. If you leave **Region** blank, Octopus uses `us-east-1`. Check which region your provider expects.
- Octopus doesn't create the `Octopus.Action.Package[<name>].ARN` variable. ARNs only identify AWS resources.

## Troubleshooting AWS S3 Bucket feeds

- If you receive an error `Access Denied Exception of type 'Amazon.Runtime.Internal.HttpErrorResponseException' was thrown.` then either:
  - The bucket you are trying to access is not in your AWS account (note that bucket names are globally unique).
  - Your AWS account does not have sufficient permissions to access the bucket.

- Octopus will connect to the bucket via its regional endpoint. If you have a lot of packages in your bucket, consider moving it to the same region where your Octopus Server is located.
