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

:::div{.hint}
Using OIDC to access the Octopus API is used for machine-to-machine scenarios such as a automating release creation in CI servers.

See [authentication providers](/docs/security/authentication) for information on configuring user authentication into Octopus Deploy.
:::

## What is OpenID Connect and how is it used in Octopus?

OpenID Connect is a set of identity specifications that build on OAuth 2.0 to allow software systems to connect to each other in a way that promotes security best practices.

When using OIDC, Octopus will validate an identity token coming from a trusted external system using [public key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography) and issue a short-lived access token which can then be used to interact with the Octopus API.

Some of the benefits of using OIDC in Octopus include:

- API keys do not need to be provisioned and stored in external systems, reducing the risk of unauthorized access to the Octopus API from exposed keys.
- API keys do not need to be rotated manually by administrators, reducing the risk of disruption when updating to newer keys in external systems.
- Access tokens issued by Octopus are short-lived, reducing the risk of unauthorized access to the Octopus API.
- Access tokens are only issued for requests from trusted external systems, allowing for controlled access to service accounts and promoting using the principle of least access.

:::div{.hint}
Using OIDC to access the Octopus API is only supported for service accounts, to access the API for a user account please use [an API key](/docs/octopus-rest-api/how-to-create-an-api-key).
:::

Any issuer that can generate signed OIDC tokens which can be validated anonymously is supported, however first-class support for GitHub Actions is provided with the [`OctopusDeploy/login`](https://github.com/OctopusDeploy/login) action.

## Getting started with GitHub Actions

Follow the guide below to get started using OIDC with GitHub Actions. For more complex scenarios, or for a full list of available options, see [Using OpenID Connect with Octopus and GitHub Actions](/docs/octopus-rest-api/openid-connect/github-actions).

### Create an OIDC identity for a service account

The first step is to create an OIDC identity for your GitHub repository to allow workflow runs to access the Octopus API.

1. Go to Configuration -> Users and either create a new service account or locate an existing one.
2. Open the OpenID Connect section.
3. Click the New OIDC Identity button.
4. Select GitHub Actions as the issuer type.
5. Enter the details of your repository and how you want to filter the workflow runs that can authenticate using OIDC.
6. Click Save.

:::div{.hint}
Multiple OIDC identities can be added for a service account, these could be for workflow runs from the same repository, or separate repositories depending on your needs.
:::

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

:::div{.hint}
When `permissions` are specified on a workflow job, any built-in permissions for the job are reset. This means that some existing steps in your workflow may now require setting explicit permissions in order to work correctly.

For example to checkout source code using the `actions/checkout` action you will need to add `contents: read` to the permissions.

For more information see [Assigning permissions to jobs](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs/).
:::

4. Add any additional Octopus provided GitHub Actions that you require e.g. [`OctopusDeploy/create-release-action`](https://github.com/OctopusDeploy/create-release-action). These actions will automatically work with OIDC. Any script steps that use the `octopus` cli will also automatically work with OIDC.

When the workflow runs the `OctopusDeploy/login` action will authenticate with Octopus using OIDC and configure the remainder of the workflow job to work without needing to provide the `server` or `api_key` values.

```yaml
name: Create a release in Octopus
on:
  push:
    branches:
      - main

jobs:
  create_release:
    runs-on: ubuntu-latest
    name: Create a release in Octopus
    permissions:
      # Add any additional permissions your job requires here
      id-token: write # This is required to obtain the ID token from GitHub Actions
      contents: read # For example: this is required to check out code, remove if not needed
    steps:
      - name: Login to Octopus
        uses: OctopusDeploy/login@v1
        with:
          server: https://my.octopus.app
          service_account_id: 5be4ac10-2679-4041-a8b0-7b05b445e19e

      - name: Create Octopus release
        uses: OctopusDeploy/create-release-action@v3
        with:
          space: Default
          project: MyOctopusProject
```

## Getting started with other issuers

Follow the guide below to get started using OIDC with other issuers. For more complex scenarios, or for a full list of available options, see [Using OpenID Connect with Other Issuers](/docs/octopus-rest-api/openid-connect/other-issuers).

### Create an OIDC identity for a service account

The first step is to create an OIDC identity for your issuer to access the Octopus API. Multiple OIDC identities can be added for a service account.

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

## Validation of OIDC identity tokens

When an OIDC identity token from an external system is received as part of a token exchange request, Octopus will validate this token before issuing an access token. It does this by:

- Matches the details of the token to an OIDC identity on an Octopus [service account](/docs/security/users-and-teams/service-accounts) using the audience (`aud`), issuer (`iss`) and subject (`sub`).
- Obtains the public keys that can used to verify the signed token using the OIDC Discovery endpoint (`/.well-known/openid-configuration`) of the issuer. For example an issuer URL `https://my-oidc-issuer.com` will use the `https://my-oidc-issuer.com/.well-known/openid-configuration` endpoint to locate the URL for signing keys.
- Verifies the token is signed correctly using public key cryptography to ensure that it has not been tampered with in transit and comes from the expected issuer.

### Debugging validation issues

If you are encountering issues using OIDC validating identity tokens from your OIDC provider as part of a token exchange request, you can use the following to help diagnose the issue:

- Check the audience (`aud`), issuer (`iss`) and subject (`sub`) of the token match the configured OIDC identity on the Octopus service account.
  - The audience must be the id of the service account and will be a GUID.
  - The issuer must be a URL using the HTTPS scheme.
  - The subject must match configured subject on the OIDC identity and is _case-sensitive_. Support is available to include wildcard characters in the subject (`*` and `?` for multiple and single wildcard matches respectively).
- If you are making the token exchange request manually (e.g. using an [issuer other than GitHub Actions](/docs/octopus-rest-api/openid-connect/other-issuers)), check that the required fields are set correctly. See [Exchanging an OIDC token for an Octopus access token](/docs/octopus-rest-api/openid-connect/other-issuers#OidcOtherIssuers-TokenExchange) for more information on the request format.
- Check that the token has not expired (`exp`). Often identity tokens created by OIDC providers will have a short lifetime.
- Check that the token is signed by a valid key from the issuer. Signing keys may be invalidated by providers under some circumstances.
- Check that the public key used to sign the token are available using [OpenID discovery](https://openid.net/specs/openid-connect-discovery-1_0.html).
  - The OpenID discovery endpoint must be available at `{Issuer}/.well-known/openid-configuration`
  - This endpoint must return a `jwks_uri` property with a URL where the public key used to sign the token can be obtained. There could be multiple keys returned by this endpoint, each key can be identified using the `kid` property.
  - Both of these endpoints must be publicly accessible without requiring authorization.

::dic{.warning}
Although the subject field does support wildcards, we reccomend providing as explicit a value as possible to reduce the risk of malicious requests resulting in a subject match. 

For example, if you are generating OIDC tokens from GitHub Actions and want to match against any branch in your project repository, ensure your wildcard covers just the branch component of the subject `repo:AcmeOrg/MyRepo:ref:*`. Providing a single blanket `*` wildcard character otherwise means that any token request (with a matching `service_account_id`) from a GitHub Action from any organisation could result in a match and an Octopus Authentication Token issued.
:::

:::div{.hint}
Public sites such as [jwt.io](https://jwt.io/) can be used to inspect and validate identity tokens.

IMPORTANT: Identity tokens can be exchanged with your Octopus Server for an access token, be careful where you paste them!
:::

## Access tokens

When an OIDC token from a trusted external system is validated, Octopus will issue an access token. This token is a Json Web Token (JWT) which is cryptographically signed by the Octopus server, allowing it to be validated to ensure it is a legitimate token that was issued from the correct system and hasn't been tampered with. The token is short-lived (1 hour) and cannot be used after it has expired, reducing the impact that stolen credentials could have.

### How tokens are signed

Access tokens are signed using [public key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography). Octopus securely maintains a private and public key pair, and signs the token using the private key, which only the Octopus Server can use. The token can then be validated using the public key to ensure that it is legitimate.

Access tokens are signed with [RSA keys](<https://en.wikipedia.org/wiki/RSA_(cryptosystem)>) with a key length of 2048 bits, using the [RSASSA-PSS (PS256) algorithm](https://www.rfc-editor.org/rfc/rfc8017#section-8.1).

The keys used to sign access tokens are automatically rotated every 90 days, and a new key is used to sign tokens. Once a key has been rotated it is no longer used to sign new tokens, however continues to be used to validate existing tokens, in order to minimize disruption to the use of existing tokens. Keys will be removed after another 90 days and no longer used for validation.

### Validating tokens

Octopus Server exposes well-known endpoints from the [OpenID discovery specification](https://openid.net/specs/openid-connect-discovery-1_0.html) to make available the public keys that are used to sign access tokens, which can then be used to validate access tokens that the Octopus Server issues.

The discovery endpoint can be found at `{OctopusServerUrl}/.well-known/openid-configuration` e.g. `https://my.octopus.app/.well-known/openid-configuration`. The response from this endpoint will contain a `jwks_uri` property which contains the URL at which the public keys can be found. The jwks endpoint uses the [JWK specification](https://datatracker.ietf.org/doc/html/rfc7517).

:::div{.hint}
Public sites such as [jwt.io](https://jwt.io/) can be used to inspect and validate access tokens.

IMPORTANT: Access tokens are credentials to your Octopus Server in the same way that API keys are, be careful where you paste them!
:::
