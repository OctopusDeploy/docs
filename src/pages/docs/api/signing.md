---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Signing
---

## Requests the current signing key configuration

`GET` `/api/signingkeyconfiguration`

**Response**

`200` — The current signing key configuration

`SigningKeyConfigurationResource`.

- **`ExpireAfterDays`** <span class="type-label">integer</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PublicKeyHostingLocation`** <span class="type-label">enum</span> — Allowed values: `Internal`, `External`.
- **`RevokeAfterDays`** <span class="type-label">integer</span>

<div data-example="Response">

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
</div>

## Sets the signing key configuration

`PUT` `/api/signingkeyconfiguration`

**Request Body**

`SetSigningKeyConfigurationCommand`

- **`ExpireAfterDays`** <span class="type-label">integer</span> *(required)* — Minimum `1`. Maximum `365`.
- **`PublicKeyHostingLocation`** <span class="type-label">enum</span> — Allowed values: `Internal`, `External`.
- **`RevokeAfterDays`** <span class="type-label">integer</span> *(required)* — Minimum `1`. Maximum `365`.

<div data-example="Request">

```json
{
  "ExpireAfterDays": 0,
  "PublicKeyHostingLocation": "Internal",
  "RevokeAfterDays": 0
}
```
</div>

**Response**

`200` — The updated signing key configuration

`SigningKeyConfigurationResource`.

- **`ExpireAfterDays`** <span class="type-label">integer</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PublicKeyHostingLocation`** <span class="type-label">enum</span> — Allowed values: `Internal`, `External`.
- **`RevokeAfterDays`** <span class="type-label">integer</span>

<div data-example="Response">

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
</div>

## Create a new key that is pending activation

`POST` `/api/signingkeys/pending/generate/v1`

**Response**

`200` — Returns the Id of the generated signing key.

`GeneratePendingSigningKeyResponseV1`.

- **`Id`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string"
}
```
</div>

## Activate an existing pending signing key, making it the active signing key for the system

`POST` `/api/signingkeys/pending/{id}/activate/v1`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Indicates the key was activated

`ActivatePendingSigningKeyResponseV1`.

<div data-example="Response">

```json
{}
```
</div>

## Validates that the public signing keys are valid and can be used to verify signatures. This is intended to be used as a health check for external key hosting, and will return an error if the keys are invalid or expired

`POST` `/api/signingkeys/verify/v1`

**Request Body**

`VerifySigningKeysCommandV1`

- **`IncludeExpiredKeys`** <span class="type-label">boolean</span>
- **`Issuer`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "IncludeExpiredKeys": true,
  "Issuer": "string"
}
```
</div>

**Response**

`200` — Response to VerifySigningKeysCommandV1. An empty response indicates that the signing keys are valid and can be used to verify signatures. If the signing keys are invalid or expired, an error will be returned instead of this response.

`VerifySigningKeysResponseV1`.

<div data-example="Response">

```json
{}
```
</div>
