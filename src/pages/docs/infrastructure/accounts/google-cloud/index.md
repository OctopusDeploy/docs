---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Google cloud accounts
description:  Configure your infrastructure so Octopus can deploy infrastructure to GCP and run scripts against the gcloud CLI.
navOrder: 30
---

:::div{.hint}
Google Cloud Accounts were added in Octopus **2021.2**, Generic OpenId Connect Accounts were added in **2025.1**
:::

To deploy infrastructure to Google Cloud Platform, you can define a Google cloud or Generic OpenId Connect account in Octopus.

The Generic OpenId Connect Account generates a JWT that can be used for [OpenID Connect](/docs/infrastructure/accounts/openid-connect) authentication. The Google cloud account uses the JSON key file credentials that can be retrieved from the service account assigned to the instance that is executing the deployment.

## Generic OpenId Connect Account
Google Cloud steps can use a Generic OpenId Connect Account for authentication.

1. Navigate to **Infrastructure ➜ Accounts**, click the **ADD ACCOUNT** and select **Generic Oidc Account**.
1. Add a memorable name for the account.
1. Set the [Deployments and Runbooks](/docs/infrastructure/accounts/openid-connect#subject-key-parts) subject generator
1. set an audience, this should match the audience set on the Workload Identity Federation. By default this is `https://iam.googleapis.com/projects/{project-id}/locations/global/workloadIdentityPools/{pool-id}/providers/{provider-id}`
1. Click the **SAVE**, to test the account set it as the account on a gcloud script step.

See the [Google cloud documentation](https://cloud.google.com/iam/docs/workload-identity-federation-with-other-providers) for instructions on creating and configuring a Workload Identity Federation.

Behind the scenes Octopus calls the gcloud cli with the following command to authenticate:

```bash
gcloud iam workload-identity-pools create-cred-config \
    <audience> \
    --service-account=<impersonationEmails> \
    --service-account-token-lifetime-seconds=3600 \
    --output-file=<jsonAuthFilePath> \
    --credential-source-file=<jwtFilePath> \
    --credential-source-type=text \
    --subject-token-type=urn:ietf:params:oauth:token-type:jwt \
    --app-id-uri=<serverUri>
```


:::div{.hint}
The default audience format is `https://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID` while `workload-identity-pools create-cred-config` command expects the audience without `https://iam.googleapis.com`. In this scenario Octopus expects the full audience value to be set on the account including `https://iam.googleapis.com` but will trim the `https://iam.googleapis.com` when running the create-cred-config command.  
:::

## Create a Google cloud account

Google Cloud steps can use a Google Cloud Account for authentication.

1. Navigate to **Infrastructure ➜ Accounts**, click the **ADD ACCOUNT** and select **Google Cloud Account**.
1. Add a memorable name for the account.
1. Provide a description for the account.
1. Upload the JSON key file.

See the [Google cloud documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) for instructions to create a service account and download the key file.

5. Click the **SAVE AND TEST** to save the account and verify the credentials are valid.

:::div{.hint}
Google Cloud steps can also defer to the service account assigned to the instance/virtual machine that hosts the Octopus Tentacles for authentication. In this scenario there is no need to create a Google Cloud account in Octopus Deploy.
:::

## Google cloud account variables

You can access your Google cloud account from within projects through a variable of type **Google Cloud Account Variable**. Learn more about [Google Cloud Account Variables](/docs/projects/variables/google-cloud-account-variables)

## Learn more

- How to use the [Run gcloud in a Script](/docs/deployments/google-cloud/run-gcloud-script) step