---
layout: src/layouts/Default.astro
pubDate: 2023-09-27
modDate: 2023-09-27
title: Using OpenID Connect with the Octopus API
description: External systems can use OpenID Connect with service accounts to access the Octopus API without needing to provision API keys
navOrder: 30
hideInThisSection: true
---

Octopus supports using [OpenID Connect (OIDC)](https://openid.net/) to access the Octopus API without needing to provision API keys.

Some of the benefits of using OIDC include:

- API keys do not need to be provisioned and stored in external systems, reducing the risk of unauthorized access to the Octopus API from exposed keys.
- Access tokens granted by Octopus are short-lived, reducing the risk of unauthorized access to the Octopus API.
- API keys do not need to be rotated manually by administrators, reducing the risk of disruption when updating to newer keys in external systems.

:::div{.hint}
Using OIDC to access the Octopus API is only supported for service accounts, to access the API for a user account please use [an API key](/docs/octopus-rest-api/how-to-create-an-api-key).
:::

Any issuer that can generate signed OIDC tokens which can be validated anonymously is supported, however first-class support for GitHub Actions is provided with the [`OctopusDeploy/login`](https://github.com/OctopusDeploy/login) action.

## Getting started with GitHub Actions

To get started using OIDC with GitHub Actions use the below instructions. For more information see [Using OpenID Connect with Octopus and GitHub Actions](./github-actions.md).

### Create an OIDC identity for a service account

The first step is to create an OIDC identity for your GitHub repository to allow workflow runs to access the Octopus API.

1. Go to Configuration -> Users and either create a new service account or locate an existing one.
2. Open the OpenID Connect section.
3. Click the New OIDC Identity button.
4. Select GitHub Actions as the issuer type.
5. Enter the details of your repository and how you want to filter the workflow runs that can authenticate using OIDC.
6. Click Save.

:::figure
![OIDC Identity for GitHub Actions](/docs/octopus-rest-api/images/oidc-identity-github-actions.png "width=500")
:::

### Add the `OctopusDeploy/login` action to your workflow

After the OIDC identity for GitHub Actions has been created a snippet of the `OctopusDeploy/login` step will be provided which you can use in your workflow to configure the workflow run job to use OIDC authentication.

:::figure
!['OctopusDeploy/login' snippet](/docs/octopus-rest-api/images/oidc-github-actions-details.png "width=500")
:::

1. Click the Copy to clipboard to copy the `OctopusDeploy/login` step.
2. Paste the `OctopusDeploy/login` step into your workflow job.
3. Add `id-token: write` to the `permissions` on the workflow job. This is required to allow the `OctopusDeploy/login` action to request an OIDC token from GitHub to use.
   1. Depending on the other steps you have in your workflow, you may need to add additional permissions such as `contents: read`.
4. Add any additional Octopus provided GitHub Actions that you require e.g. [`OctopusDeploy/create-release-action`](https://github.com/OctopusDeploy/create-release-action). These actions will automatically work with OIDC. Any script steps that use the `octopus` cli will also automatically work with OIDC.

When the workflow runs the `OctopusDeploy/login` action will authenticate with Octopus using OIDC and configure the remainder of the workflow job to work without needing to provide the `server` or `api_key` values.

:::figure
![Using 'OctopusDeploy/login' in a workflow](/docs/octopus-rest-api/images/oidc-github-actions-example.png "width=500")
:::

## Getting started with other issuers

To get started using OIDC with other issuers use the below instructions. For more information see [Using OpenID Connect with Other Issuers](./other-issuers.md).

### Create an OIDC identity for a service account

The first step is to create an OIDC identity for your issuer to access the Octopus API.

1. Go to Configuration -> Users and either create a new service account or locate an existing one.
2. Open the OpenID Connect section.
3. Click the New OIDC Identity button.
4. Select Other Issuer as the issuer type.
5. Enter the URL of the identity. Octopus uses OpenID Configuration Discovery to validate the OIDC token provided by the issuer.
   1. The issuer URL must be HTTPS.
   2. The URL should be the base where the OIDC Discovery endpoint (`/.well-known/openid-configuration`) endpoint can be found. For example if the discovery endpoint is `https://my-oidc-issuer.com/.well-known/openid-configuration` then the issuer should be set to `https://my-oidc-issuer.com`.
6. Enter the subject of the identity. This must match exactly the subject that is provided in the OIDC token and is _case-sensitive_. The format of the subject will differ by issuer, please consult your OIDC issuers documentation.
7. Click Save.

:::figure
![OIDC Identity for other issuer](/docs/octopus-rest-api/images/oidc-identity-other-issuer.png "width=500")
:::

### Exchange an OIDC token for an Octopus access token

After the OIDC identity has been created it can be used as part of exchanging an OIDC token for an Octopus access token.

A Service Account Id will be shown, this will be a GUID which must be supplied as the `aud` of the ID token, as well as in the token exchange request.

:::figure
![Other issuer audience details](/docs/octopus-rest-api/images/oidc-other-issuer-details.png "width=500")
:::

1. Obtain an OIDC token from the issuer, the `aud` claim must be the Service Account Id. The process for obtaining the OIDC token from the issuer will differ by issuer, please consult your OIDC issuers documentation.
2. Get the token exchange endpoint for your Octopus server from the `token_endpoint` property of the OpenID Connect Discovery endpoint `https://my-octopus-server.com/.well-known/openid-configuration`.
3. Exchange the OIDC token for an Octopus access token, setting `audience` property to the Service Account Id from above. See [Exchanging an OIDC token for an Octopus access token](/docs/octopus-rest-api/openid-connect/other-issuers#OidcOtherIssuers-TokenExchange) for more details on the token exchange request.
4. Get the `access_token` from the token exchange response.

### Using the access token to access the Octopus API

The access token obtained from the token exchange must be supplied in the `Authorization` header of API requests, using the `Bearer` scheme, for example `Authorization: Bearer {the-access-token}`.

## What is OpenId Connect?

## Access tokens

### How tokens are signed

### Validating tokens
