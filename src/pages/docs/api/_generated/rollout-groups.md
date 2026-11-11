---
layout: src/layouts/Api.astro
pubDate: 2026-10-28
modDate: 2026-10-28
title: Rollout Groups
---

## Lists rollout groups within a project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/featuretoggles/rollout-groups"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/featuretoggles/rollout-groups`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`partialName`** :span[string]{.type-label}  
  Filters results to rollout groups whose name contains this text (case-insensitive substring match).
- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}  
  The type of item in this list.
- **`Items`** :span[array of object]{.type-label}
  - **`FeatureToggleUsages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectId`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ItemType": "RolloutGroup",
  "Items": [
    {
      "FeatureToggleUsages": [
        {}
      ],
      "Id": "string",
      "Name": "string",
      "ProjectId": "Projects-1",
      "SpaceId": "Spaces-1"
    }
  ],
  "ItemsPerPage": 30,
  "LastPageNumber": 1,
  "NumberOfPages": 2,
  "TotalResults": 42
}
```
:::

## Creates a rollout group within a project

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/featuretoggles/rollout-groups"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/featuretoggles/rollout-groups`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 200.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "Name": "string",
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`201` — Created

- **`FeatureToggleUsages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "FeatureToggleUsages": [
    {
      "Id": "string",
      "Name": "string"
    }
  ],
  "Id": "string",
  "Name": "string",
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1"
}
```
:::

## Retrieves a rollout group by Id

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/featuretoggles/rollout-groups/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/featuretoggles/rollout-groups/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — A rollout group within a project, used to link rollout percentages between feature toggles.

- **`FeatureToggleUsages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "FeatureToggleUsages": [
    {
      "Id": "string",
      "Name": "string"
    }
  ],
  "Id": "string",
  "Name": "string",
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1"
}
```
:::

## Modifies a rollout group

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}/featuretoggles/rollout-groups/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/featuretoggles/rollout-groups/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Id`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 200.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "Id": "string",
  "Name": "string",
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — A rollout group within a project, used to link rollout percentages between feature toggles.

- **`FeatureToggleUsages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "FeatureToggleUsages": [
    {
      "Id": "string",
      "Name": "string"
    }
  ],
  "Id": "string",
  "Name": "string",
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1"
}
```
:::

## Deletes a rollout group

:endpoint{method="DELETE" path="/api/\{spaceId\}/projects/\{projectId\}/featuretoggles/rollout-groups/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/featuretoggles/rollout-groups/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Response from deleting a rollout group.

:::api-example{label="Response"}
```json
{}
```
:::
