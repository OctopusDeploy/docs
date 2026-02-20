---
layout: src/layouts/Default.astro
pubDate: 2025-02-19
modDate: 2025-02-19
title: Google Cloud Storage feeds
description: Configuring Google Cloud Storage buckets as Octopus feeds
navOrder: 65
icon: fa-brands fa-google
---

If you're deploying packages located in a Google Cloud Storage bucket, you can register them with Octopus and use them as part of your deployments. This lets you store your deployment packages in Google Cloud Storage and deploy them through Octopus.

Go to **Deploy ➜ Manage ➜ External Feeds** to add a new feed.

## Adding a Google Cloud Storage feed

To add a Google Cloud Storage feed:

1. Go to **Deploy ➜ Manage ➜ External Feeds**.
2. Click **Add feed**.
3. Select **Google Cloud Storage** as the feed type.
4. Give your feed a name.
5. Choose your authentication method:
   - **Service Account JSON Key**: Upload your Google Cloud service account JSON key file
   - **OpenID Connect**: Use OIDC authentication for short-lived credentials
6. Click **Save and test**.

:::figure
![Google Cloud Storage feed configuration showing authentication options](/docs/img/packaging-applications/package-repositories/images/gcs-feed.png)
:::

## Authentication methods

### Service Account JSON Key

To use service account authentication, you'll need to create a JSON key file for a Google Cloud service account that has permission to read from your storage buckets.

1. In the Google Cloud Console, go to **IAM & Admin ➜ Service Accounts**.
2. Create a new service account or select an existing one.
3. Grant the service account the **Storage Object Viewer** role (or a custom role with `storage.objects.get` and `storage.objects.list` permissions).
4. Create and download a JSON key for the service account.
5. In Octopus, upload this JSON key file when configuring your feed.

### OpenID Connect

OpenID Connect authentication provides short-lived credentials that are more secure than long-lived service account keys.

To set up OIDC authentication:

1. Follow the [Google Cloud documentation](https://cloud.google.com/iam/docs/workload-identity-federation-with-other-providers) to create and configure a Workload Identity Federation.
2. Grant the Workload Identity Federation service account the **Storage Object Viewer** role on your storage buckets.
3. In Octopus, select **OpenID Connect** as your authentication method and configure:
   - **Subject**: See [OpenID Connect Subject Identifier](/docs/infrastructure/accounts/openid-connect#subject-keys) for how to customize the subject value
   - **Audience**: The audience value from your Workload Identity Federation (typically `https://iam.googleapis.com/projects/{project-id}/locations/global/workloadIdentityPools/{pool-id}/providers/{provider-id}`)

## Package naming

The Google Cloud Storage feed searches for packages using the format `bucket-name/path/to/package`. For example, `my-deployment-bucket/releases/myapp` will search for the package `myapp` in the `my-deployment-bucket` bucket under the `releases` folder.

The service account you provide must have access to the bucket.

The Google Cloud Storage feed follows the same [package versioning conventions](/docs/packaging-applications/create-packages/versioning) as other feeds. Octopus supports these file formats:

- `.zip`
- `.tar.gz`
- `.tar.bz2`
- `.tgz`
- `.tar.bz`

## Testing your feed

On the test page, you can check whether the feed is working by searching for packages. Enter the bucket name and package name in the format `bucket-name/package-name`:

:::figure
![Google Cloud Storage feed test page showing package search results](/docs/img/packaging-applications/package-repositories/images/gcs-feed-test.png)
:::

## Troubleshooting Google Cloud Storage feeds

### Access denied errors

If you receive an "Access Denied" or permission error:

- Check that your service account has the correct IAM permissions (at minimum `storage.objects.get` and `storage.objects.list`)
- Verify the bucket exists and the name is spelled correctly
- For OIDC authentication, ensure the Workload Identity Federation is configured correctly and the audience matches

### Bucket not found

If Octopus can't find your bucket:

- Verify you're using the correct bucket name in your package ID
- Ensure the bucket is in the same project as your service account or that cross-project access is configured

### Package not found

If Octopus can't find your package:

- Check the package path is correct (format: `bucket-name/path/to/package`)
- Verify the package file has one of the supported extensions
- Ensure the package follows [Octopus versioning conventions](/docs/packaging-applications/create-packages/versioning) (e.g., `myapp.1.0.0.zip`)

## Performance considerations

To reduce network latency, consider placing your Google Cloud Storage bucket in the same region as your Octopus Server. For deployments where Tentacles download packages directly (when `Octopus.Action.Package.DownloadOnTentacle` is set to `True`), consider placing the bucket close to your deployment targets.

## Learn more

- [Package repositories](/docs/packaging-applications/package-repositories)
- [Creating packages](/docs/packaging-applications/create-packages)
- [Package versioning](/docs/packaging-applications/create-packages/versioning)
- [OpenID Connect](/docs/infrastructure/accounts/openid-connect)
- [Google Cloud Storage documentation](https://cloud.google.com/storage/docs)
