---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Parent Environments
---

## Create a new parent environment

:span[POST]{.api-post} `/api/{spaceId}/parentEnvironments`

Also reachable at `/api/spaces/{spaceIdentifier}/parentEnvironments`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`AutomaticDeprovisioningRule`** :span[object]{.type-label}
  - **`ExpiryDays`** :span[integer]{.type-label}
  - **`ExpiryHours`** :span[integer]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 50.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`UseGuidedFailure`** :span[boolean]{.type-label}

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

- **`Id`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "Id": "string"
}
```
</div>

## Modify an existing parent environment

:span[PUT]{.api-put} `/api/{spaceId}/parentEnvironments/{environmentId}`

Also reachable at `/api/spaces/{spaceIdentifier}/parentEnvironments/{environmentId}`.

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`AutomaticDeprovisioningRule`** :span[object]{.type-label}
  - **`ExpiryDays`** :span[integer]{.type-label}
  - **`ExpiryHours`** :span[integer]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EnvironmentId`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`UseGuidedFailure`** :span[boolean]{.type-label}

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

- **`AutomaticDeprovisioningRule`** :span[object]{.type-label}
  - **`ExpiryDays`** :span[integer]{.type-label}
  - **`ExpiryHours`** :span[integer]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`SortOrder`** :span[integer]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`UseGuidedFailure`** :span[boolean]{.type-label}

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

## Get a specific Parent Environment

:span[GET]{.api-get} `/api/{spaceId}/parentEnvironments/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/parentEnvironments/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Parent Environment to load.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested Parent Environment

- **`AutomaticDeprovisioningRule`** :span[object]{.type-label}
  - **`ExpiryDays`** :span[integer]{.type-label}
  - **`ExpiryHours`** :span[integer]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`SortOrder`** :span[integer]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`UseGuidedFailure`** :span[boolean]{.type-label}

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

## Delete an existing Parent Environment

:span[DELETE]{.api-delete} `/api/{spaceId}/parentEnvironments/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/parentEnvironments/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Parent Environment to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success
