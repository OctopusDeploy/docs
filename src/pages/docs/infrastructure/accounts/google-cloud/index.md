---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Google cloud accounts
description:  Configure your infrastructure so Octopus can deploy infrastructure to GCP and run scripts against the gcloud CLI.
navOrder: 30
---

:::hint
Google Cloud Accounts were added in Octopus **2021.2**.
:::

To deploy infrastructure to Google Cloud Platform, you can define a Google cloud account in Octopus.

Octopus manages the GCP credentials used by the Google cloud steps.

The Google cloud account is the JSON key file credentials that can be retrieved from the service account assigned to the instance that is executing the deployment.

## Create a Google cloud account

Google Cloud steps can use an Octopus managed account for authentication.

1. Navigate to **{{Infrastructure,Accounts}}**, click the **ADD ACCOUNT** and select **Google Cloud Account**.
1. Add a memorable name for the account.
1. Provide a description for the account.
1. Upload the JSON key file.

See the [Google cloud documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) for instructions to create a service account and download the key file.

5. Click the **SAVE AND TEST** to save the account and verify the credentials are valid.

:::hint
Google Cloud steps can also defer to the service account assigned to the instance/virtual machine that hosts the Octopus Tentacles for authentication. In this scenario there is no need to create a Google Cloud account in Octopus Deploy.
:::

## Google cloud account variables

You can access your Google cloud account from within projects through a variable of type **Google Cloud Account Variable**. Learn more about [Google Cloud Account Variables](/docs/projects/variables/google-cloud-account-variables.md)

## Learn more

- How to use the [Run gcloud in a Script](/docs/deployments/google-cloud/run-gcloud-script/index.md) step