---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Service Account Oidc Identities
---

## Create new OIDC Identity for a Service Account

:span[POST]{.api-post} `/api/serviceaccounts/{serviceAccountId}/oidcidentities/create/v1`

**Path Parameters**

- **`serviceAccountId`** :span[string]{.type-label} *(required)*  
  The id of the service account that the identity belonds to.

**Request Body**

- **`Audience`** :span[string]{.type-label}  
  The audience of tokens for the identity.
- **`Issuer`** :span[string]{.type-label} *(required)*  
  Gets the issuer of tokens for the identity. Minimum length 1.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the ServiceAccountOidcIdentity. Minimum length 1. Maximum length 200.
- **`ServiceAccountId`** :span[string]{.type-label} *(required)*  
  The id of the service account that the identity belonds to.
- **`Subject`** :span[string]{.type-label} *(required)*  
  Gets the subject of tokens for the identity. Minimum length 1.

:::api-example{label="Request"}
```json
{
  "Audience": "string",
  "Issuer": "string",
  "Name": "string",
  "ServiceAccountId": "string",
  "Subject": "string"
}
```
:::

**Response**

`201` — Created

- **`Id`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string"
}
```
:::

## Get ServiceAccountOidcIdentities

:span[GET]{.api-get} `/api/serviceaccounts/{serviceAccountId}/oidcidentities/v1`

Gets a paginated set of ServiceAccountOidcIdentities.

**Path Parameters**

- **`serviceAccountId`** :span[string]{.type-label} *(required)*  
  The id of the service account to get OIDC identities for.

**Query Parameters**

- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Minimum `0`.

**Response**

`200` — Rseponse to getting set of ServiceAccountOidcIdentities

- **`Count`** :span[integer]{.type-label}
- **`ExternalId`** :span[string]{.type-label}  
  Minimum length 1.
- **`OidcIdentities`** :span[array of object]{.type-label}
  - **`Audience`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Issuer`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ServiceAccountId`** :span[string]{.type-label}
  - **`Subject`** :span[string]{.type-label}  
    Minimum length 1.
- **`ServerUrl`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
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
:::

## Get ServiceAccountOidcIdentity by id

:span[GET]{.api-get} `/api/serviceaccounts/{serviceAccountId}/oidcidentities/{id}/v1`

Gets a ServiceAccountOidcIdentity by its id.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the ServiceAccountOidcIdentity.
- **`serviceAccountId`** :span[string]{.type-label} *(required)*  
  The id of the space for the ServiceAccountOidcIdentity.

**Response**

`200` — Response to getting a ServiceAccountOidcIdentity by id

- **`Audience`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`Issuer`** :span[string]{.type-label}  
  Minimum length 1.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ServiceAccountId`** :span[string]{.type-label}
- **`Subject`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
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
:::

## Modify ServiceAccountOidcIdentity

:span[PUT]{.api-put} `/api/serviceaccounts/{serviceAccountId}/oidcidentities/{id}/v1`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the ServiceAccountOidcIdentity.
- **`serviceAccountId`** :span[string]{.type-label} *(required)*  
  The id of the space for the ServiceAccountOidcIdentity.

**Request Body**

- **`Audience`** :span[string]{.type-label}  
  The audience of tokens for the OIDC identity.
- **`Id`** :span[string]{.type-label} *(required)*  
  The id of the ServiceAccountOidcIdentity.
- **`Issuer`** :span[string]{.type-label} *(required)*  
  The issuer of tokens for the OIDC identity. Minimum length 1. Maximum length 200.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the ServiceAccountOidcIdentity. Minimum length 1. Maximum length 200.
- **`ServiceAccountId`** :span[string]{.type-label} *(required)*  
  The id of the space for the ServiceAccountOidcIdentity.
- **`Subject`** :span[string]{.type-label} *(required)*  
  The name of the ServiceAccountOidcIdentity. Minimum length 1. Maximum length 200.

:::api-example{label="Request"}
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
:::

**Response**

`200` — Response to modifying a ServiceAccountOidcIdentity

:::api-example{label="Response"}
```json
{}
```
:::

## Delete ServiceAccountOidcIdentity

:span[DELETE]{.api-delete} `/api/serviceaccounts/{serviceAccountId}/oidcidentities/{id}/v1`

Deletes a ServiceAccountOidcIdentity.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the ServiceAccountOidcIdentity.
- **`serviceAccountId`** :span[string]{.type-label} *(required)*  
  The id of the service account that the identity belongs to.

**Response**

`200` — Response to deleting a ServiceAccountOidcIdentity

:::api-example{label="Response"}
```json
{}
```
:::
