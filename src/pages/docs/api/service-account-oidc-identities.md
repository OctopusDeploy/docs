---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Service Account Oidc Identities
---

## Create new OIDC Identity for a Service Account

`POST` `/api/serviceaccounts/{serviceAccountId}/oidcidentities/create/v1`

**Parameters**

- **`serviceAccountId`** <span class="type-label">string</span> *(required)* — The id of the service account that the identity belonds to.

**Request Body**

`CreateServiceAccountOidcIdentityCommandV1`

- **`Audience`** <span class="type-label">string</span> — The audience of tokens for the identity.
- **`Issuer`** <span class="type-label">string</span> *(required)* — Gets the issuer of tokens for the identity. Minimum length 1.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the ServiceAccountOidcIdentity. Minimum length 1. Maximum length 200.
- **`ServiceAccountId`** <span class="type-label">string</span> *(required)* — The id of the service account that the identity belonds to.
- **`Subject`** <span class="type-label">string</span> *(required)* — Gets the subject of tokens for the identity. Minimum length 1.

<div data-example="Request">

```json
{
  "Audience": "string",
  "Issuer": "string",
  "Name": "string",
  "ServiceAccountId": "string",
  "Subject": "string"
}
```
</div>

**Response**

`201` — Created

`CreateServiceAccountOidcIdentityResponseV1`.

- **`Id`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string"
}
```
</div>

## Get ServiceAccountOidcIdentities

`GET` `/api/serviceaccounts/{serviceAccountId}/oidcidentities/v1`

Gets a paginated set of ServiceAccountOidcIdentities.

**Parameters**

- **`serviceAccountId`** <span class="type-label">string</span> *(required)* — The id of the service account to get OIDC identities for.

- **`skip`** <span class="type-label">integer</span> *(required)* — Number of items to skip. Minimum `0`.
- **`take`** <span class="type-label">integer</span> *(required)* — Number of items to take. Minimum `0`.

**Response**

`200` — Rseponse to getting set of ServiceAccountOidcIdentities

`GetServiceAccountOidcIdentitiesResponseV1`.

- **`Count`** <span class="type-label">integer</span>
- **`ExternalId`** <span class="type-label">string</span> — Minimum length 1.
- **`OidcIdentities`** <span class="type-label">array of object</span>
  - **`Audience`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Issuer`** <span class="type-label">string</span> — Minimum length 1.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`ServiceAccountId`** <span class="type-label">string</span>
  - **`Subject`** <span class="type-label">string</span> — Minimum length 1.
- **`ServerUrl`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "Count": 0,
  "ExternalId": "string",
  "OidcIdentities": [
    {
      "Audience": "string",
      "Id": "string",
      "Issuer": "string",
      "Name": "string",
      "ServiceAccountId": "string",
      "Subject": "string"
    }
  ],
  "ServerUrl": "string"
}
```
</div>

## Get ServiceAccountOidcIdentity by id

`GET` `/api/serviceaccounts/{serviceAccountId}/oidcidentities/{id}/v1`

Gets a ServiceAccountOidcIdentity by its id.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the ServiceAccountOidcIdentity.
- **`serviceAccountId`** <span class="type-label">string</span> *(required)* — The id of the space for the ServiceAccountOidcIdentity.

**Response**

`200` — Response to getting a ServiceAccountOidcIdentity by id

`GetServiceAccountOidcIdentityByIdResponseV1`.

- **`Audience`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span>
- **`Issuer`** <span class="type-label">string</span> — Minimum length 1.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`ServiceAccountId`** <span class="type-label">string</span>
- **`Subject`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "Audience": "string",
  "Id": "string",
  "Issuer": "string",
  "Name": "string",
  "ServiceAccountId": "string",
  "Subject": "string"
}
```
</div>

## Modify ServiceAccountOidcIdentity

`PUT` `/api/serviceaccounts/{serviceAccountId}/oidcidentities/{id}/v1`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the ServiceAccountOidcIdentity.
- **`serviceAccountId`** <span class="type-label">string</span> *(required)* — The id of the space for the ServiceAccountOidcIdentity.

**Request Body**

`ModifyServiceAccountOidcIdentityCommandV1`

- **`Audience`** <span class="type-label">string</span> — The audience of tokens for the OIDC identity.
- **`Id`** <span class="type-label">string</span> *(required)* — The id of the ServiceAccountOidcIdentity.
- **`Issuer`** <span class="type-label">string</span> *(required)* — The issuer of tokens for the OIDC identity. Minimum length 1. Maximum length 200.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the ServiceAccountOidcIdentity. Minimum length 1. Maximum length 200.
- **`ServiceAccountId`** <span class="type-label">string</span> *(required)* — The id of the space for the ServiceAccountOidcIdentity.
- **`Subject`** <span class="type-label">string</span> *(required)* — The name of the ServiceAccountOidcIdentity. Minimum length 1. Maximum length 200.

<div data-example="Request">

```json
{
  "Audience": "string",
  "Id": "string",
  "Issuer": "string",
  "Name": "string",
  "ServiceAccountId": "string",
  "Subject": "string"
}
```
</div>

**Response**

`200` — Response to modifying a ServiceAccountOidcIdentity

`ModifyServiceAccountOidcIdentityResponseV1`.

<div data-example="Response">

```json
{}
```
</div>

## Delete ServiceAccountOidcIdentity

`DELETE` `/api/serviceaccounts/{serviceAccountId}/oidcidentities/{id}/v1`

Deletes a ServiceAccountOidcIdentity.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the ServiceAccountOidcIdentity.
- **`serviceAccountId`** <span class="type-label">string</span> *(required)* — The id of the service account that the identity belongs to.

**Response**

`200` — Response to deleting a ServiceAccountOidcIdentity

`DeleteServiceAccountOidcIdentityResponseV1`.

<div data-example="Response">

```json
{}
```
</div>
