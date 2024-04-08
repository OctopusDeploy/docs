---
layout: src/layouts/Default.astro
pubDate: 2023-09-27
modDate: 2023-09-27
title: Using OpenID Connect in Octopus with other issuers
description: How to use OpenID Connect to interact with Octopus using other issuers
navOrder: 30
hideInThisSection: true
---

Octopus supports using OpenID Connect for any external system that can issue a signed OIDC token which can be validated anonymously via an HTTPS endpoint.

:::div{.hint}
Using OIDC to access the Octopus API is only supported for service accounts, to access the API for a user account please use [an API key](/docs/octopus-rest-api/how-to-create-an-api-key).
:::

## Configuring an OIDC identity

The first step is to create an OIDC identity for your issuer to access the Octopus API.

1. Go to Configuration -> Users and either create a new service account or locate an existing one.
2. Open the OpenID Connect section.
3. Click the New OIDC Identity button.
4. Select Other Issuer as the issuer type.
5. Enter the URL of the identity. Octopus uses OpenID Configuration Discovery to validate the OIDC token provided by the issuer.
   1. The issuer URL must be HTTPS.
   2. The URL should be the base where the OIDC Discovery endpoint (`/.well-known/openid-configuration`) endpoint can be found. For example if the discovery endpoint is `https://my-oidc-issuer.com/.well-known/openid-configuration` then the issuer should be set to `https://my-oidc-issuer.com`.
6. Enter the subject of the identity. This must match the subject that is provided in the OIDC token and is _case-sensitive_, wildcards for matching multiple characters `*` and single characters `?` can be used. The format of the subject will differ by issuer, please consult your OIDC issuers documentation.
7. Click Save.

:::div{.hint}
Support for wildcards when matching a subject is available from Octopus 2024.1. To match multiple characters in a subject use `*`, and to match a single character use `?`.
:::

:::div{.hint}
Multiple OIDC identities can be added for a service account.
:::

:::figure
![OIDC Identity for other issuer](/docs/octopus-rest-api/images/oidc-identity-other-issuer.png "width=500")
:::

## OpenID discovery endpoints

Octopus uses [OpenID Configuration Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) to validate the OIDC token provided by the issuer.

The issuer must provide an anonymously accessible endpoint `/well-known/openid-configuration` which meets the following specifications:

- The URL must be secure i.e. it must use HTTPS.
- The response must contain the `jwks_uri` property, which must be a URL.

The `jwks_uri` endpoint must be an anonymously accessible endpoint which meets the following specifications:

- The URL must be secure i.e. it must use HTTPS.
- The response must contain a set of signing keys in the [JWK specification](https://datatracker.ietf.org/doc/html/rfc7517) which can be used to validate the OIDC token from the issuer.

## Exchanging an OIDC token for an Octopus access token {#OidcOtherIssuers-TokenExchange}

To exchange the issuers OIDC token for an Octopus access token, a request can be made to a anonymously accessible endpoint in the Octopus Server.

Octopus Server exposes a [OpenID Configuration Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) at `/.well-known/openid-configuration`. The response from this endpoint will contain a `token_endpoint` which can be used to perform the exchange.

The token exchange endpoint uses the [OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693) specification:

| Property       | Value                                                     |
| -------------- | --------------------------------------------------------- |
| HTTP Method    | POST                                                      |
| Authentication | N                                                         |
| Content-Type   | `application/x-www-form-urlencoded` or `application/json` |

A request to the endpoint requires the following properties:

| Property             | Value                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `grant_type`         | Must be set to `urn:ietf:params:oauth:grant-type:token-exchange`. |
| `audience`           | The id of the service account to exchange the OIDC token for.     |
| `subject_token_type` | Must be set to `urn:ietf:params:oauth:token-type:jwt`.            |
| `subject_token`      | The signed OIDC token from the issuer.                            |

If the request is successful, the response will contain the following properties:

| Property            | Value                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| `access_token`      | The Octopus access token which can be used to authenticate API requests.                                    |
| `token_type`        | A string representing how the token should be passed to API request. This will always be set to `Bearer`.   |
| `issued_token_type` | The type of token being issued. This will always be set to `urn:ietf:params:oauth:token-type:access_token`. |
| `expires_in`        | The number of seconds until the token expires.                                                              |

If the request is not successful, the response will contain the following properties:

| Property            | Value                                                            |
| ------------------- | ---------------------------------------------------------------- |
| `error`             | The type of error. This will always be set to `invalid_request`. |
| `error_description` | A description of the error.                                      |

### `subject_token`

The OIDC token must conform to the [JSON Web Token](https://datatracker.ietf.org/doc/html/rfc7519) standard and contain the following claims:

| Claim | Value                                                                               | Example                              |
| ----- | ----------------------------------------------------------------------------------- | ------------------------------------ |
| `iss` | The issuer of the token. This must match exactly the issuer on the OIDC identity.   | https://my-oidc.issuer.com           |
| `sub` | The subject of the token. This must match exactly the subject on the OIDC identity. | scope:a-scope-to-restrict-the-usage  |
| `aud` | The id of the service account to exchange the OIDC token for.                       | 863b4b7d-6308-456e-8375-8d9270e9be44 |
| `exp` | The expiration time of the token. The token must not be expired.                    | 1632493567                           |

The OIDC token must be signed by the issuer, with the signature included as part of the token payload.

## Using the access token in API requests

To use the access token as authentication for a request to the Octopus API, it must be included in the `Authorization` header using the `Bearer scheme`:

```
Authorization: Bearer {the-access-token-obtained-from-octopus}
```