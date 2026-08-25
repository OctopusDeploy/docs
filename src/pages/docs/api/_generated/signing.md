---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Signing
---

## Request the current signing key configuration

:endpoint{method="GET" path="/api/signingkeyconfiguration"}

**Response**

`200` — The current signing key configuration

- **`ExpireAfterDays`** :span[integer]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PublicKeyHostingLocation`** :span[enum]{.type-label}  
  Allowed values: `Internal`, `External`.
- **`RevokeAfterDays`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ExpireAfterDays": 0,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "PublicKeyHostingLocation": "Internal",
  "RevokeAfterDays": 0
}
```
:::

## Set the signing key configuration

:endpoint{method="PUT" path="/api/signingkeyconfiguration"}

**Request Body**

- **`ExpireAfterDays`** :span[integer]{.type-label} *(required)*  
  Minimum `1`. Maximum `365`.
- **`PublicKeyHostingLocation`** :span[enum]{.type-label}  
  Allowed values: `Internal`, `External`.
- **`RevokeAfterDays`** :span[integer]{.type-label} *(required)*  
  Minimum `1`. Maximum `365`.

:::api-example{label="Request"}
```json
{
  "ExpireAfterDays": 0,
  "PublicKeyHostingLocation": "Internal",
  "RevokeAfterDays": 0
}
```
:::

**Response**

`200` — The updated signing key configuration

- **`ExpireAfterDays`** :span[integer]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PublicKeyHostingLocation`** :span[enum]{.type-label}  
  Allowed values: `Internal`, `External`.
- **`RevokeAfterDays`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ExpireAfterDays": 0,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "PublicKeyHostingLocation": "Internal",
  "RevokeAfterDays": 0
}
```
:::

## Create a new key that is pending activation

:endpoint{method="POST" path="/api/signingkeys/pending/generate/v1"}

**Response**

`200` — Returns the Id of the generated signing key.

- **`Id`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string"
}
```
:::

## Activate an existing pending signing key, making it the active signing key for the system

:endpoint{method="POST" path="/api/signingkeys/pending/\{id\}/activate/v1"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Response**

`200` — Indicates the key was activated

:::api-example{label="Response"}
```json
{}
```
:::

## Validate that the public signing keys are valid and can be used to verify signatures. This is intended to be used as a health check for external key hosting, and will return an error if the keys are invalid or expired

:endpoint{method="POST" path="/api/signingkeys/verify/v1"}

**Request Body**

- **`IncludeExpiredKeys`** :span[boolean]{.type-label}
- **`Issuer`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "IncludeExpiredKeys": false,
  "Issuer": "string"
}
```
:::

**Response**

`200` — Response to VerifySigningKeysCommandV1. An empty response indicates that the signing keys are valid and can be used to verify signatures. If the signing keys are invalid or expired, an error will be returned instead of this response.

:::api-example{label="Response"}
```json
{}
```
:::
