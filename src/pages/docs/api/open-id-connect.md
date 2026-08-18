---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Open ID Connect
---

## Get OpenID Connect configuration

:endpoint{method="GET" path="/api/.well-known/openid-configuration"}

**Response**

`200` — OpenID Configuration response

- **`claims_supported`** :span[array of string]{.type-label}
- **`id_token_signing_alg_values_supported`** :span[array of string]{.type-label}
- **`issuer`** :span[string]{.type-label}  
  Minimum length 1.
- **`jwks_uri`** :span[string]{.type-label}  
  Minimum length 1.
- **`response_types_supported`** :span[array of string]{.type-label}
- **`scopes_supported`** :span[array of string]{.type-label}
- **`subject_types_supported`** :span[array of string]{.type-label}
- **`token_endpoint`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
{
  "claims_supported": [
    "string"
  ],
  "id_token_signing_alg_values_supported": [
    "string"
  ],
  "issuer": "string",
  "jwks_uri": "string",
  "response_types_supported": [
    "string"
  ],
  "scopes_supported": [
    "string"
  ],
  "subject_types_supported": [
    "string"
  ],
  "token_endpoint": "string"
}
```
:::

## POST /api/users/authenticate/AzureAD

:endpoint{method="POST" path="/api/users/authenticate/AzureAD"}

**Response**

`200` — OK

## POST /api/users/authenticate/GenericOidc

:endpoint{method="POST" path="/api/users/authenticate/GenericOidc"}

**Response**

`200` — OK

## POST /api/users/authenticate/GoogleApps

:endpoint{method="POST" path="/api/users/authenticate/GoogleApps"}

**Response**

`200` — OK

## POST /api/users/authenticate/OctopusID

:endpoint{method="POST" path="/api/users/authenticate/OctopusID"}

**Response**

`200` — OK

## POST /api/users/authenticate/Okta

:endpoint{method="POST" path="/api/users/authenticate/Okta"}

**Response**

`200` — OK

## GET /api/users/authenticatedToken/AzureAD

:endpoint{method="GET" path="/api/users/authenticatedToken/AzureAD"}

**Response**

`200` — OK

## POST /api/users/authenticatedToken/AzureAD

:endpoint{method="POST" path="/api/users/authenticatedToken/AzureAD"}

**Response**

`200` — OK

## GET /api/users/authenticatedToken/GenericOidc

:endpoint{method="GET" path="/api/users/authenticatedToken/GenericOidc"}

**Response**

`200` — OK

## POST /api/users/authenticatedToken/GenericOidc

:endpoint{method="POST" path="/api/users/authenticatedToken/GenericOidc"}

**Response**

`200` — OK

## GET /api/users/authenticatedToken/GoogleApps

:endpoint{method="GET" path="/api/users/authenticatedToken/GoogleApps"}

**Response**

`200` — OK

## POST /api/users/authenticatedToken/GoogleApps

:endpoint{method="POST" path="/api/users/authenticatedToken/GoogleApps"}

**Response**

`200` — OK

## GET /api/users/authenticatedToken/OctopusID

:endpoint{method="GET" path="/api/users/authenticatedToken/OctopusID"}

**Response**

`200` — OK

## POST /api/users/authenticatedToken/OctopusID

:endpoint{method="POST" path="/api/users/authenticatedToken/OctopusID"}

**Response**

`200` — OK

## GET /api/users/authenticatedToken/Okta

:endpoint{method="GET" path="/api/users/authenticatedToken/Okta"}

**Response**

`200` — OK

## POST /api/users/authenticatedToken/Okta

:endpoint{method="POST" path="/api/users/authenticatedToken/Okta"}

**Response**

`200` — OK
