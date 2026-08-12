---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Open ID Connect
---

## Gets OpenID Connect configuration

`GET` `/api/.well-known/openid-configuration`

**Response**

`200` — OpenID Configuration response

`GetOpenIdConfigurationResponse`.

- **`claims_supported`** <span class="type-label">array of string</span>
- **`id_token_signing_alg_values_supported`** <span class="type-label">array of string</span>
- **`issuer`** <span class="type-label">string</span> — Minimum length 1.
- **`jwks_uri`** <span class="type-label">string</span> — Minimum length 1.
- **`response_types_supported`** <span class="type-label">array of string</span>
- **`scopes_supported`** <span class="type-label">array of string</span>
- **`subject_types_supported`** <span class="type-label">array of string</span>
- **`token_endpoint`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

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
</div>

## POST /api/users/authenticate/AzureAD

`POST` `/api/users/authenticate/AzureAD`

**Response**

`200` — OK

## POST /api/users/authenticate/GenericOidc

`POST` `/api/users/authenticate/GenericOidc`

**Response**

`200` — OK

## POST /api/users/authenticate/GoogleApps

`POST` `/api/users/authenticate/GoogleApps`

**Response**

`200` — OK

## POST /api/users/authenticate/OctopusID

`POST` `/api/users/authenticate/OctopusID`

**Response**

`200` — OK

## POST /api/users/authenticate/Okta

`POST` `/api/users/authenticate/Okta`

**Response**

`200` — OK

## GET /api/users/authenticatedToken/AzureAD

`GET` `/api/users/authenticatedToken/AzureAD`

**Response**

`200` — OK

## POST /api/users/authenticatedToken/AzureAD

`POST` `/api/users/authenticatedToken/AzureAD`

**Response**

`200` — OK

## GET /api/users/authenticatedToken/GenericOidc

`GET` `/api/users/authenticatedToken/GenericOidc`

**Response**

`200` — OK

## POST /api/users/authenticatedToken/GenericOidc

`POST` `/api/users/authenticatedToken/GenericOidc`

**Response**

`200` — OK

## GET /api/users/authenticatedToken/GoogleApps

`GET` `/api/users/authenticatedToken/GoogleApps`

**Response**

`200` — OK

## POST /api/users/authenticatedToken/GoogleApps

`POST` `/api/users/authenticatedToken/GoogleApps`

**Response**

`200` — OK

## GET /api/users/authenticatedToken/OctopusID

`GET` `/api/users/authenticatedToken/OctopusID`

**Response**

`200` — OK

## POST /api/users/authenticatedToken/OctopusID

`POST` `/api/users/authenticatedToken/OctopusID`

**Response**

`200` — OK

## GET /api/users/authenticatedToken/Okta

`GET` `/api/users/authenticatedToken/Okta`

**Response**

`200` — OK

## POST /api/users/authenticatedToken/Okta

`POST` `/api/users/authenticatedToken/Okta`

**Response**

`200` — OK
