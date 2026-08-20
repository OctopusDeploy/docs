---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Parent Environments
---

## Create a new parent environment

:endpoint{method="POST" path="/api/\{spaceId\}/parentEnvironments"}

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

:::api-example{label="Request"}
```json
{
  "AutomaticDeprovisioningRule": {
    "ExpiryDays": 0,
    "ExpiryHours": 0
  },
  "Description": "string",
  "Name": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "UseGuidedFailure": true
}
```
:::

**Response**

`201` — Created

- **`Id`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "Environments-1"
}
```
:::

## Modify an existing parent environment

:endpoint{method="PUT" path="/api/\{spaceId\}/parentEnvironments/\{environmentId\}"}

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

:::api-example{label="Request"}
```json
{
  "AutomaticDeprovisioningRule": {
    "ExpiryDays": 0,
    "ExpiryHours": 0
  },
  "Description": "string",
  "EnvironmentId": "Environments-1",
  "Name": "string",
  "Slug": "string",
  "SortOrder": 0,
  "SpaceId": "Spaces-1",
  "UseGuidedFailure": true
}
```
:::

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

:::api-example{label="Response"}
```json
{
  "AutomaticDeprovisioningRule": {
    "ExpiryDays": 0,
    "ExpiryHours": 0
  },
  "Description": "string",
  "Id": "Environments-1",
  "Name": "string",
  "Slug": "string",
  "SortOrder": 0,
  "SpaceId": "Spaces-1",
  "UseGuidedFailure": true
}
```
:::

## Get a specific Parent Environment

:endpoint{method="GET" path="/api/\{spaceId\}/parentEnvironments/\{id\}"}

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

:::api-example{label="Response"}
```json
{
  "AutomaticDeprovisioningRule": {
    "ExpiryDays": 0,
    "ExpiryHours": 0
  },
  "Description": "string",
  "Id": "Environments-1",
  "Name": "string",
  "Slug": "string",
  "SortOrder": 0,
  "SpaceId": "Spaces-1",
  "UseGuidedFailure": true
}
```
:::

## Delete an existing Parent Environment

:endpoint{method="DELETE" path="/api/\{spaceId\}/parentEnvironments/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/parentEnvironments/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Parent Environment to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success
