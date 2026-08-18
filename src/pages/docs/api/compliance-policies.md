---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Compliance Policies
---

## Request the published versions for a policy

:span[GET]{.api-get} `/api/platformhub/policies/{slug}/versions`

**Path Parameters**

- **`slug`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested policy version

- **`Description`** :span[string]{.type-label}
- **`GitCommit`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label}  
  Minimum length 1.
- **`Id`** :span[string]{.type-label}  
  Minimum length 1.
- **`IsActive`** :span[boolean]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`PublishedDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`RegoConditions`** :span[string]{.type-label}  
  Minimum length 1.
- **`RegoScope`** :span[string]{.type-label}  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`Version`** :span[string]{.type-label}  
  Minimum length 1.
- **`ViolationAction`** :span[string]{.type-label}  
  Minimum length 1.
- **`ViolationReason`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
[
  {
    "Description": "string",
    "GitCommit": "string",
    "GitRef": "string",
    "Id": "string",
    "IsActive": true,
    "Name": "string",
    "PublishedDate": "2020-01-01T00:00:00.000Z",
    "RegoConditions": "string",
    "RegoScope": "string",
    "Slug": "string",
    "Version": "string",
    "ViolationAction": "string",
    "ViolationReason": "string"
  }
]
```
:::

## Request the published versions for a policy

:span[GET]{.api-get} `/api/platformhub/policies/{slug}/versions/v2`

**Path Parameters**

- **`slug`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`IsActive`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PublishedDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`RegoConditions`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RegoScope`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Version`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ViolationAction`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ViolationReason`** :span[string]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ItemType": "string",
  "Items": [
    {
      "Description": "string",
      "GitCommit": "string",
      "GitRef": "string",
      "Id": "string",
      "IsActive": true,
      "Name": "string",
      "PublishedDate": "2020-01-01T00:00:00.000Z",
      "RegoConditions": "string",
      "RegoScope": "string",
      "Slug": "string",
      "Version": "string",
      "ViolationAction": "string",
      "ViolationReason": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
:::

## Modify the activation status for a policy version

:span[POST]{.api-post} `/api/platformhub/policies/{slug}/versions/{version}/modify-status`

**Path Parameters**

- **`slug`** :span[string]{.type-label} *(required)*
- **`version`** :span[string]{.type-label} *(required)*

**Request Body**

- **`IsActive`** :span[boolean]{.type-label} *(required)*
- **`Slug`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Version`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
```json
{
  "IsActive": true,
  "Slug": "string",
  "Version": "string"
}
```
:::

**Response**

`200` — The requested policy version

- **`Description`** :span[string]{.type-label}
- **`GitCommit`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label}  
  Minimum length 1.
- **`Id`** :span[string]{.type-label}  
  Minimum length 1.
- **`IsActive`** :span[boolean]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`PublishedDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`RegoConditions`** :span[string]{.type-label}  
  Minimum length 1.
- **`RegoScope`** :span[string]{.type-label}  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`Version`** :span[string]{.type-label}  
  Minimum length 1.
- **`ViolationAction`** :span[string]{.type-label}  
  Minimum length 1.
- **`ViolationReason`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Description": "string",
  "GitCommit": "string",
  "GitRef": "string",
  "Id": "string",
  "IsActive": true,
  "Name": "string",
  "PublishedDate": "2020-01-01T00:00:00.000Z",
  "RegoConditions": "string",
  "RegoScope": "string",
  "Slug": "string",
  "Version": "string",
  "ViolationAction": "string",
  "ViolationReason": "string"
}
```
:::

## Request a paginated set of CompliancePolicyResource sorted by name

:span[GET]{.api-get} `/api/platformhub/{gitRef}/policies`

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`partialName`** :span[string]{.type-label}
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated set of CompliancePolicyResource sorted by name

- **`FilteredItemsCount`** :span[integer]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`Policies`** :span[array of object]{.type-label}
  - **`ConditionsRego`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Description`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ScopeRego`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ViolationAction`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ViolationReason`** :span[string]{.type-label}
- **`TotalItemsCount`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "FilteredItemsCount": 0,
  "ItemsPerPage": 0,
  "Policies": [
    {
      "ConditionsRego": "string",
      "Description": "string",
      "GitRef": "string",
      "Name": "string",
      "ScopeRego": "string",
      "Slug": "string",
      "ViolationAction": "string",
      "ViolationReason": "string"
    }
  ],
  "TotalItemsCount": 0
}
```
:::

## Create a new policy

:span[POST]{.api-post} `/api/platformhub/{gitRef}/policies`

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChangeDescription`** :span[string]{.type-label}
- **`ConditionsRego`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Description`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ScopeRego`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ViolationAction`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ViolationReason`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "ChangeDescription": "string",
  "ConditionsRego": "string",
  "Description": "string",
  "GitRef": "string",
  "Name": "string",
  "ScopeRego": "string",
  "Slug": "string",
  "ViolationAction": "string",
  "ViolationReason": "string"
}
```
:::

**Response**

`201` — Created

- **`ConditionsRego`** :span[string]{.type-label}  
  Minimum length 1.
- **`Description`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label}  
  Minimum length 1.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ScopeRego`** :span[string]{.type-label}  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`ViolationAction`** :span[string]{.type-label}  
  Minimum length 1.
- **`ViolationReason`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConditionsRego": "string",
  "Description": "string",
  "GitRef": "string",
  "Name": "string",
  "ScopeRego": "string",
  "Slug": "string",
  "ViolationAction": "string",
  "ViolationReason": "string"
}
```
:::

## Request a single CompliancePolicyResource by slug and git reference

:span[GET]{.api-get} `/api/platformhub/{gitRef}/policies/{slug}`

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`slug`** :span[string]{.type-label} *(required)*

**Response**

`200` — Represents a Compliance Policy

- **`ConditionsRego`** :span[string]{.type-label}  
  Minimum length 1.
- **`Description`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label}  
  Minimum length 1.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ScopeRego`** :span[string]{.type-label}  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`ViolationAction`** :span[string]{.type-label}  
  Minimum length 1.
- **`ViolationReason`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConditionsRego": "string",
  "Description": "string",
  "GitRef": "string",
  "Name": "string",
  "ScopeRego": "string",
  "Slug": "string",
  "ViolationAction": "string",
  "ViolationReason": "string"
}
```
:::

## Modify an existing policy

:span[PUT]{.api-put} `/api/platformhub/{gitRef}/policies/{slug}`

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`slug`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChangeDescription`** :span[string]{.type-label}
- **`ConditionsRego`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Description`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ScopeRego`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ViolationAction`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ViolationReason`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "ChangeDescription": "string",
  "ConditionsRego": "string",
  "Description": "string",
  "GitRef": "string",
  "Name": "string",
  "ScopeRego": "string",
  "Slug": "string",
  "ViolationAction": "string",
  "ViolationReason": "string"
}
```
:::

**Response**

`200` — Represents a Compliance Policy

- **`ConditionsRego`** :span[string]{.type-label}  
  Minimum length 1.
- **`Description`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label}  
  Minimum length 1.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ScopeRego`** :span[string]{.type-label}  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`ViolationAction`** :span[string]{.type-label}  
  Minimum length 1.
- **`ViolationReason`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConditionsRego": "string",
  "Description": "string",
  "GitRef": "string",
  "Name": "string",
  "ScopeRego": "string",
  "Slug": "string",
  "ViolationAction": "string",
  "ViolationReason": "string"
}
```
:::

## Create new version of policy

:span[POST]{.api-post} `/api/platformhub/{gitRef}/policies/{slug}/publish`

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`slug`** :span[string]{.type-label} *(required)*

**Request Body**

- **`GitRef`** :span[string]{.type-label} *(required)*
- **`Slug`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Version`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
```json
{
  "GitRef": "string",
  "Slug": "string",
  "Version": "string"
}
```
:::

**Response**

`200` — The requested policy version

- **`Description`** :span[string]{.type-label}
- **`GitCommit`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label}  
  Minimum length 1.
- **`Id`** :span[string]{.type-label}  
  Minimum length 1.
- **`IsActive`** :span[boolean]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`PublishedDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`RegoConditions`** :span[string]{.type-label}  
  Minimum length 1.
- **`RegoScope`** :span[string]{.type-label}  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`Version`** :span[string]{.type-label}  
  Minimum length 1.
- **`ViolationAction`** :span[string]{.type-label}  
  Minimum length 1.
- **`ViolationReason`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Description": "string",
  "GitCommit": "string",
  "GitRef": "string",
  "Id": "string",
  "IsActive": true,
  "Name": "string",
  "PublishedDate": "2020-01-01T00:00:00.000Z",
  "RegoConditions": "string",
  "RegoScope": "string",
  "Slug": "string",
  "Version": "string",
  "ViolationAction": "string",
  "ViolationReason": "string"
}
```
:::
