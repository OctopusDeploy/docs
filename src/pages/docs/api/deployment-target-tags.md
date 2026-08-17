---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deployment Target Tags
---

## Get a DeploymentTargetTag by ID or Slug

:span[GET]{.api-get} `/api/{spaceId}/deploymentTargetTags/{tag}`

Also reachable at `/api/deploymentTargetTags/{tag}`, `/api/spaces/{spaceIdentifier}/deploymentTargetTags/{tag}`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`tag`** :span[string]{.type-label} *(required)*  
  ID or Slug of the DeploymentTargetTag.

**Response**

`200` — The requested DeploymentTargetTag

- **`SpaceId`** :span[string]{.type-label}
- **`Tag`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "SpaceId": "string",
  "Tag": "string"
}
```
</div>

## Get DeploymentTargetTags by DeploymentTargetTag IDs and Machine ID (deployment target ID)

:span[GET]{.api-get} `/api/{spaceId}/deploymenttargettags`

Also reachable at `/api/deploymenttargettags`, `/api/spaces/{spaceIdentifier}/deploymenttargettags`.

Gets a paginated list of DeploymentTargetTag.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the Space to which the DeploymentTargetTags belong.

**Query Parameters**

- **`machineIds`** :span[array of string]{.type-label}  
  The Machine ID to filter by.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`tags`** :span[array of string]{.type-label}  
  The DeploymentTargetTag IDs to filter by.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested DeploymentTargetTags.

- **`Count`** :span[integer]{.type-label}
- **`DeploymentTargetTags`** :span[array of object]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`Tag`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "Count": 0,
  "DeploymentTargetTags": [
    {
      "SpaceId": "string",
      "Tag": "string"
    }
  ]
}
```
</div>

## Create a new DeploymentTargetTag

:span[POST]{.api-post} `/api/{spaceId}/deploymenttargettags`

Also reachable at `/api/deploymenttargettags`, `/api/spaces/{spaceIdentifier}/deploymenttargettags`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space for the DeploymentTargetTag.

**Request Body**

- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space for the DeploymentTargetTag.
- **`Tag`** :span[string]{.type-label} *(required)*  
  The name or tag of the DeploymentTargetTag. Minimum length 1. Maximum length 200.

<div data-example="Request">

```json
{
  "SpaceId": "string",
  "Tag": "string"
}
```
</div>

**Response**

`201` — Created

- **`SpaceId`** :span[string]{.type-label}
- **`Tag`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "SpaceId": "string",
  "Tag": "string"
}
```
</div>

## Delete a DeploymentTargetTag

:span[DELETE]{.api-delete} `/api/{spaceId}/deploymenttargettags/{tag}`

Also reachable at `/api/deploymenttargettags/{tag}`, `/api/spaces/{spaceIdentifier}/deploymenttargettags/{tag}`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`tag`** :span[string]{.type-label} *(required)*  
  The Tag of the DeploymentTargetTag to delete.

**Response**

`200` — Success
