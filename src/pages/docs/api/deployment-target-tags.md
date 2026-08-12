---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deployment Target Tags
---

## Get a DeploymentTargetTag by ID or Slug

`GET` `/api/{spaceId}/deploymentTargetTags/{tag}`

Also reachable at `/api/deploymentTargetTags/{tag}`, `/api/spaces/{spaceIdentifier}/deploymentTargetTags/{tag}`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`tag`** <span class="type-label">string</span> *(required)* — ID or Slug of the DeploymentTargetTag.

**Response**

`200` — The requested DeploymentTargetTag

`GetDeploymentTargetTagByTagResponse`.

- **`SpaceId`** <span class="type-label">string</span>
- **`Tag`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "SpaceId": "string",
  "Tag": "string"
}
```
</div>

## Get DeploymentTargetTags by DeploymentTargetTag IDs and Machine ID (deployment target ID)

`GET` `/api/{spaceId}/deploymenttargettags`

Also reachable at `/api/deploymenttargettags`, `/api/spaces/{spaceIdentifier}/deploymenttargettags`.

Gets a paginated list of DeploymentTargetTag.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the Space to which the DeploymentTargetTags belong.

- **`machineIds`** <span class="type-label">array of string</span> — The Machine ID to filter by.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`tags`** <span class="type-label">array of string</span> — The DeploymentTargetTag IDs to filter by.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested DeploymentTargetTags.

`GetDeploymentTargetTagsResponse`.

- **`Count`** <span class="type-label">integer</span>
- **`DeploymentTargetTags`** <span class="type-label">array of object</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Tag`** <span class="type-label">string</span>

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

`POST` `/api/{spaceId}/deploymenttargettags`

Also reachable at `/api/deploymenttargettags`, `/api/spaces/{spaceIdentifier}/deploymenttargettags`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space for the DeploymentTargetTag.

**Request Body**

`CreateDeploymentTargetTagCommand`

- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space for the DeploymentTargetTag.
- **`Tag`** <span class="type-label">string</span> *(required)* — The name or tag of the DeploymentTargetTag. Minimum length 1. Maximum length 200.

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

`CreateDeploymentTargetTagResponse`.

- **`SpaceId`** <span class="type-label">string</span>
- **`Tag`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "SpaceId": "string",
  "Tag": "string"
}
```
</div>

## Delete a DeploymentTargetTag

`DELETE` `/api/{spaceId}/deploymenttargettags/{tag}`

Also reachable at `/api/deploymenttargettags/{tag}`, `/api/spaces/{spaceIdentifier}/deploymenttargettags/{tag}`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`tag`** <span class="type-label">string</span> *(required)* — The Tag of the DeploymentTargetTag to delete.

**Response**

`200` — Success
