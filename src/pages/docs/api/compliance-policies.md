---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Compliance Policies
---

## Request the published versions for a policy

`GET` `/api/platformhub/policies/{slug}/versions`

**Parameters**

- **`slug`** <span class="type-label">string</span> *(required)*

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested policy version

an array of `CompliancePolicyVersionResource`.

- **`Description`** <span class="type-label">string</span>
- **`GitCommit`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
- **`Id`** <span class="type-label">string</span> — Minimum length 1.
- **`IsActive`** <span class="type-label">boolean</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`PublishedDate`** <span class="type-label">string</span> — Format `date-time`.
- **`RegoConditions`** <span class="type-label">string</span> — Minimum length 1.
- **`RegoScope`** <span class="type-label">string</span> — Minimum length 1.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.
- **`Version`** <span class="type-label">string</span> — Minimum length 1.
- **`ViolationAction`** <span class="type-label">string</span> — Minimum length 1.
- **`ViolationReason`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Request the published versions for a policy

`GET` `/api/platformhub/policies/{slug}/versions/v2`

**Parameters**

- **`slug`** <span class="type-label">string</span> *(required)*

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

`CompliancePolicyVersionResourcePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`GitCommit`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`IsActive`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PublishedDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`RegoConditions`** <span class="type-label">string</span> — Minimum length 1.
  - **`RegoScope`** <span class="type-label">string</span> — Minimum length 1.
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.
  - **`Version`** <span class="type-label">string</span> — Minimum length 1.
  - **`ViolationAction`** <span class="type-label">string</span> — Minimum length 1.
  - **`ViolationReason`** <span class="type-label">string</span>
- **`ItemsPerPage`** <span class="type-label">integer</span>
- **`LastPageNumber`** <span class="type-label">integer</span>
- **`NumberOfPages`** <span class="type-label">integer</span>
- **`TotalResults`** <span class="type-label">integer</span>

<div data-example="Response">

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
</div>

## Modify the activation status for a policy version

`POST` `/api/platformhub/policies/{slug}/versions/{version}/modify-status`

**Parameters**

- **`slug`** <span class="type-label">string</span> *(required)*
- **`version`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyCompliancePolicyVersionActivationStatusCommand`

- **`IsActive`** <span class="type-label">boolean</span> *(required)*
- **`Slug`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Version`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "IsActive": true,
  "Slug": "string",
  "Version": "string"
}
```
</div>

**Response**

`200` — The requested policy version

`CompliancePolicyVersionResource`.

- **`Description`** <span class="type-label">string</span>
- **`GitCommit`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
- **`Id`** <span class="type-label">string</span> — Minimum length 1.
- **`IsActive`** <span class="type-label">boolean</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`PublishedDate`** <span class="type-label">string</span> — Format `date-time`.
- **`RegoConditions`** <span class="type-label">string</span> — Minimum length 1.
- **`RegoScope`** <span class="type-label">string</span> — Minimum length 1.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.
- **`Version`** <span class="type-label">string</span> — Minimum length 1.
- **`ViolationAction`** <span class="type-label">string</span> — Minimum length 1.
- **`ViolationReason`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Requests a paginated set of CompliancePolicyResource sorted by name

`GET` `/api/platformhub/{gitRef}/policies`

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*

- **`partialName`** <span class="type-label">string</span>
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated set of CompliancePolicyResource sorted by name

`GetAllCompliancePoliciesResponse`.

- **`FilteredItemsCount`** <span class="type-label">integer</span>
- **`ItemsPerPage`** <span class="type-label">integer</span>
- **`Policies`** <span class="type-label">array of object</span>
  - **`ConditionsRego`** <span class="type-label">string</span> — Minimum length 1.
  - **`Description`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`ScopeRego`** <span class="type-label">string</span> — Minimum length 1.
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.
  - **`ViolationAction`** <span class="type-label">string</span> — Minimum length 1.
  - **`ViolationReason`** <span class="type-label">string</span>
- **`TotalItemsCount`** <span class="type-label">integer</span>

<div data-example="Response">

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
</div>

## Create a new policy

`POST` `/api/platformhub/{gitRef}/policies`

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateCompliancePolicyCommand`

- **`ChangeDescription`** <span class="type-label">string</span>
- **`ConditionsRego`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Description`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ScopeRego`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Slug`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ViolationAction`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ViolationReason`** <span class="type-label">string</span>

<div data-example="Request">

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
</div>

**Response**

`201` — Created

`CompliancePolicyResource`.

- **`ConditionsRego`** <span class="type-label">string</span> — Minimum length 1.
- **`Description`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`ScopeRego`** <span class="type-label">string</span> — Minimum length 1.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.
- **`ViolationAction`** <span class="type-label">string</span> — Minimum length 1.
- **`ViolationReason`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Requests a single CompliancePolicyResource by slug and git reference

`GET` `/api/platformhub/{gitRef}/policies/{slug}`

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`slug`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Represents a Compliance Policy

`CompliancePolicyResource`.

- **`ConditionsRego`** <span class="type-label">string</span> — Minimum length 1.
- **`Description`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`ScopeRego`** <span class="type-label">string</span> — Minimum length 1.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.
- **`ViolationAction`** <span class="type-label">string</span> — Minimum length 1.
- **`ViolationReason`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Modifies an existing policy

`PUT` `/api/platformhub/{gitRef}/policies/{slug}`

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`slug`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyCompliancePolicyCommand`

- **`ChangeDescription`** <span class="type-label">string</span>
- **`ConditionsRego`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Description`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ScopeRego`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Slug`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ViolationAction`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ViolationReason`** <span class="type-label">string</span>

<div data-example="Request">

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
</div>

**Response**

`200` — Represents a Compliance Policy

`CompliancePolicyResource`.

- **`ConditionsRego`** <span class="type-label">string</span> — Minimum length 1.
- **`Description`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`ScopeRego`** <span class="type-label">string</span> — Minimum length 1.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.
- **`ViolationAction`** <span class="type-label">string</span> — Minimum length 1.
- **`ViolationReason`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Create new version of policy

`POST` `/api/platformhub/{gitRef}/policies/{slug}/publish`

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`slug`** <span class="type-label">string</span> *(required)*

**Request Body**

`PublishCompliancePolicyCommand`

- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`Slug`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Version`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "GitRef": "string",
  "Slug": "string",
  "Version": "string"
}
```
</div>

**Response**

`200` — The requested policy version

`CompliancePolicyVersionResource`.

- **`Description`** <span class="type-label">string</span>
- **`GitCommit`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
- **`Id`** <span class="type-label">string</span> — Minimum length 1.
- **`IsActive`** <span class="type-label">boolean</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`PublishedDate`** <span class="type-label">string</span> — Format `date-time`.
- **`RegoConditions`** <span class="type-label">string</span> — Minimum length 1.
- **`RegoScope`** <span class="type-label">string</span> — Minimum length 1.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.
- **`Version`** <span class="type-label">string</span> — Minimum length 1.
- **`ViolationAction`** <span class="type-label">string</span> — Minimum length 1.
- **`ViolationReason`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>
