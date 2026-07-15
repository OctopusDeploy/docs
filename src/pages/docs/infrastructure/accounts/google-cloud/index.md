---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-07-09
title: Google cloud accounts
description:  Configure your infrastructure so Octopus can deploy infrastructure to GCP and run scripts against the gcloud CLI.
navOrder: 30
---

:::div{.hint}
Google Cloud Accounts were added in Octopus **2021.2**, Generic OpenId Connect Accounts were added in **2025.1**, and the OpenID Connect authentication method for Google Cloud Accounts was added in **{RELEASE_VERSION}**
:::

To deploy infrastructure to Google Cloud Platform, you can define a Google Cloud account or a Generic OpenId Connect account in Octopus.

A Google Cloud account authenticates either with a JSON key file or with OpenID Connect, chosen via the account's authentication method. The OpenID Connect option and the Generic OpenId Connect account both generate a JWT that is used for [OpenID Connect](/docs/infrastructure/accounts/openid-connect) authentication against a Workload Identity Federation; the Google Cloud account's OpenID Connect option is the recommended choice for GCP as it exposes GCP-specific settings such as the token lifetime.

## Google Cloud OpenID Connect Account

Google Cloud steps can use OpenID Connect for authentication, configured on a **Google Cloud Account** by choosing the OpenID Connect authentication method. This is the recommended way to use OpenID Connect with Google Cloud.

1. Navigate to **Deploy ➜ Manage ➜ Accounts**, click **ADD ACCOUNT** and select **Google Cloud Account**.
1. Add a memorable name for the account.
1. Under **Authentication Method**, select **Use OpenID Connect**.
1. Set the [Deployments and Runbooks](/docs/infrastructure/accounts/openid-connect#subject-key-parts) subject generator.
1. Set an audience. This should match the audience set on the Workload Identity Federation. By default, this is `https://iam.googleapis.com/projects/{project-id}/locations/global/workloadIdentityPools/{pool-id}/providers/{provider-id}`.
1. Optionally set the **Token Lifetime** (see [Token lifetime](#token-lifetime)).
1. Click **SAVE**. To test the account, set it as the account on a gcloud script step.

### Token lifetime

**Token Lifetime** controls how long, in seconds, the federated Google Cloud access token is valid. Octopus passes it to gcloud as `--service-account-token-lifetime-seconds`. Valid values are **600 to 43200** seconds (10 minutes to 12 hours); the default is **3600** seconds (1 hour).

:::div{.hint}
Google Cloud rejects lifetimes longer than 1 hour (3600 seconds) unless the organization policy constraint `iam.allowServiceAccountCredentialLifetimeExtension` lists the impersonated service account. Without that policy, values above 3600 will fail when gcloud requests the token.
:::

## Generic OpenId Connect Account

Google Cloud steps can use a Generic OpenId Connect Account for authentication.

1. Navigate to **Deploy ➜ Manage ➜ Accounts**, click the **ADD ACCOUNT** and select **Generic Oidc Account**.
1. Add a memorable name for the account.
1. Set the [Deployments and Runbooks](/docs/infrastructure/accounts/openid-connect#subject-key-parts) subject generator
1. set an audience, this should match the audience set on the Workload Identity Federation. By default, this is `https://iam.googleapis.com/projects/{project-id}/locations/global/workloadIdentityPools/{pool-id}/providers/{provider-id}`
1. Click the **SAVE**, to test the account set it as the account on a gcloud script step.

See the [Google cloud documentation](https://cloud.google.com/iam/docs/workload-identity-federation-with-other-providers) for instructions on creating and configuring a Workload Identity Federation.

:::div{.hint}
The Generic OpenId Connect Account does not have a token lifetime setting. When it is used with Google Cloud the token lifetime defaults to 3600 seconds. To override it, add a project variable named `<account-variable>.OpenIdConnect.TokenLifetimeSeconds` (where `<account-variable>` is the name of the account variable the step references) set to a value between 600 and 43200. If you need a first-class token lifetime setting, use the Google Cloud OpenID Connect Account instead.
:::

Behind the scenes Octopus calls the gcloud cli with the following command to authenticate. For both OpenID Connect account types the `--service-account-token-lifetime-seconds` value comes from the account's **Token Lifetime** (or the project variable above for a Generic account), and defaults to 3600:

```bash
gcloud iam workload-identity-pools create-cred-config \
    <audience> \
    --service-account=<impersonationEmails> \
    --service-account-token-lifetime-seconds=<token-lifetime> \
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

1. Navigate to **Deploy ➜ Manage ➜ Accounts**, click the **ADD ACCOUNT** and select **Google Cloud Account**.
1. Add a memorable name for the account.
1. Provide a description for the account.
1. Upload the JSON key file.

See the [Google cloud documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) for instructions to create a service account and download the key file.

1. Click the **SAVE AND TEST** to save the account and verify the credentials are valid.

:::div{.hint}
Google Cloud steps can also defer to the service account assigned to the instance/virtual machine that hosts the Octopus Tentacles for authentication. In this scenario there is no need to create a Google Cloud account in Octopus Deploy.
:::

## Google cloud account variables

You can access your Google cloud account from within projects through a variable of type **Google Cloud Account Variable**. Learn more about [Google Cloud Account Variables](/docs/projects/variables/google-cloud-account-variables)

## Learn more

- How to use the [Run gcloud in a Script](/docs/deployments/google-cloud/run-gcloud-script) step
