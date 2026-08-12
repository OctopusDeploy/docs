---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Parent Environments
---

## Creates a new parent environment

`POST` `/api/{spaceId}/parentEnvironments`

Also reachable at `/api/spaces/{spaceIdentifier}/parentEnvironments`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateParentEnvironmentCommand`

- **`AutomaticDeprovisioningRule`** <span class="type-label">object</span>
  - **`ExpiryDays`** <span class="type-label">integer</span>
  - **`ExpiryHours`** <span class="type-label">integer</span>
- **`Description`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1. Maximum length 50.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`UseGuidedFailure`** <span class="type-label">boolean</span>

<div data-example="Request">

```json
{
  "AutomaticDeprovisioningRule": {
    "ExpiryDays": 0,
    "ExpiryHours": 0
  },
  "Description": "string",
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string",
  "UseGuidedFailure": true
}
```
</div>

**Response**

`201` — Created

`CreateParentEnvironmentResponse`.

- **`Id`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string"
}
```
</div>

## Modifies an existing parent environment

`PUT` `/api/{spaceId}/parentEnvironments/{environmentId}`

Also reachable at `/api/spaces/{spaceIdentifier}/parentEnvironments/{environmentId}`.

**Parameters**

- **`environmentId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyParentEnvironmentCommand`

- **`AutomaticDeprovisioningRule`** <span class="type-label">object</span>
  - **`ExpiryDays`** <span class="type-label">integer</span>
  - **`ExpiryHours`** <span class="type-label">integer</span>
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentId`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`UseGuidedFailure`** <span class="type-label">boolean</span>

<div data-example="Request">

```json
{
  "AutomaticDeprovisioningRule": {
    "ExpiryDays": 0,
    "ExpiryHours": 0
  },
  "Description": "string",
  "EnvironmentId": "string",
  "Name": "string",
  "Slug": "string",
  "SortOrder": 0,
  "SpaceId": "string",
  "UseGuidedFailure": true
}
```
</div>

**Response**

`200` — The parent environment after modifications have been applied.

`ModifyParentEnvironmentResponse`.

- **`AutomaticDeprovisioningRule`** <span class="type-label">object</span>
  - **`ExpiryDays`** <span class="type-label">integer</span>
  - **`ExpiryHours`** <span class="type-label">integer</span>
- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.
- **`SortOrder`** <span class="type-label">integer</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`UseGuidedFailure`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "AutomaticDeprovisioningRule": {
    "ExpiryDays": 0,
    "ExpiryHours": 0
  },
  "Description": "string",
  "Id": "string",
  "Name": "string",
  "Slug": "string",
  "SortOrder": 0,
  "SpaceId": "string",
  "UseGuidedFailure": true
}
```
</div>

## Gets a specific Parent Environment

`GET` `/api/{spaceId}/parentEnvironments/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/parentEnvironments/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Parent Environment to load.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested Parent Environment

`GetParentEnvironmentResponse`.

- **`AutomaticDeprovisioningRule`** <span class="type-label">object</span>
  - **`ExpiryDays`** <span class="type-label">integer</span>
  - **`ExpiryHours`** <span class="type-label">integer</span>
- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.
- **`SortOrder`** <span class="type-label">integer</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`UseGuidedFailure`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "AutomaticDeprovisioningRule": {
    "ExpiryDays": 0,
    "ExpiryHours": 0
  },
  "Description": "string",
  "Id": "string",
  "Name": "string",
  "Slug": "string",
  "SortOrder": 0,
  "SpaceId": "string",
  "UseGuidedFailure": true
}
```
</div>

## Deletes an existing Parent Environment

`DELETE` `/api/{spaceId}/parentEnvironments/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/parentEnvironments/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Parent Environment to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success
