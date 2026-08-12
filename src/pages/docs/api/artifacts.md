---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Artifacts
---

## Lists all of the artifacts in the supplied Octopus Deploy Space, from all releases. The results will be sorted by date from most recently to least recently created

`GET` `/api/{spaceId}/artifacts`

Also reachable at `/api/artifacts`, `/api/spaces/{spaceIdentifier}/artifacts`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — List of Artifact IDs which if specified, filters the result to only include Artifacts with matching IDs.
- **`order`** <span class="type-label">string</span> — asc or desc.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`regarding`** <span class="type-label">string</span> — An ID of a resource to filter on. Only artifacts related to this resource will be returned. It can be the ID of the following: Release, RunbookSnapshot, Deployment, Runbook Run, Server Task, Project, Environment or Tenant.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of Artifacts

`ArtifactResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Created`** <span class="type-label">string</span> — Gets or sets the time at which the artifact was created. Format `date-time`.
  - **`Filename`** <span class="type-label">string</span> — Gets or sets the filename of the Artifact to create. An example might be "Performance Test Results.csv". Minimum length 1.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`LogCorrelationId`** <span class="type-label">string</span> — Gets the correlationId of the log block in which the artifact was captured.
  - **`ServerTaskId`** <span class="type-label">string</span> — Gets or sets the server task with which this artifact is associated.
  - **`Source`** <span class="type-label">string</span> — Gets or sets a short summary of the source of this attachment. This will typically be the name of a step/machine, or "Uploaded by [username]" if the attachment was uploaded by a person.
  - **`SpaceId`** <span class="type-label">string</span>
- **`ItemsPerPage`** <span class="type-label">integer</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastPageNumber`** <span class="type-label">integer</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NumberOfPages`** <span class="type-label">integer</span>
- **`TotalResults`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "Created": "2020-01-01T00:00:00.000Z",
      "Filename": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "LogCorrelationId": "string",
      "ServerTaskId": "string",
      "Source": "string",
      "SpaceId": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastPageNumber": 0,
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Create a new artifact

`POST` `/api/{spaceId}/artifacts`

Also reachable at `/api/artifacts`, `/api/spaces/{spaceIdentifier}/artifacts`.

Creates a new artifact.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the space.

**Request Body**

`CreateArtifactCommand`

- **`Filename`** <span class="type-label">string</span> *(required)* — The filename of the Artifact to create. An example might be "Performance Test Results.csv". Minimum length 1.
- **`LogCorrelationId`** <span class="type-label">string</span> — Gets the correlationId of the log block in which the artifact was captured.
- **`ServerTaskId`** <span class="type-label">string</span> *(required)* — The server task with which this artifact is associated.
- **`Source`** <span class="type-label">string</span> — A short summary of the source of this attachment. This will typically be the name of a step/machine, or "Uploaded by [username]" if the attachment was uploaded by a person.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — ID of the space.

<div data-example="Request">

```json
{
  "Filename": "string",
  "LogCorrelationId": "string",
  "ServerTaskId": "string",
  "Source": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`201` — Created

`ArtifactResource`.

- **`Created`** <span class="type-label">string</span> — Gets or sets the time at which the artifact was created. Format `date-time`.
- **`Filename`** <span class="type-label">string</span> — Gets or sets the filename of the Artifact to create. An example might be "Performance Test Results.csv". Minimum length 1.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`LogCorrelationId`** <span class="type-label">string</span> — Gets the correlationId of the log block in which the artifact was captured.
- **`ServerTaskId`** <span class="type-label">string</span> — Gets or sets the server task with which this artifact is associated.
- **`Source`** <span class="type-label">string</span> — Gets or sets a short summary of the source of this attachment. This will typically be the name of a step/machine, or "Uploaded by [username]" if the attachment was uploaded by a person.
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Created": "2020-01-01T00:00:00.000Z",
  "Filename": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "LogCorrelationId": "string",
  "ServerTaskId": "string",
  "Source": "string",
  "SpaceId": "string"
}
```
</div>

## Get an Artifact by ID

`GET` `/api/{spaceId}/artifacts/{id}`

Also reachable at `/api/artifacts/{id}`, `/api/spaces/{spaceIdentifier}/artifacts/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Artifact to load.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Gets a specific Artifact

`ArtifactResource`.

- **`Created`** <span class="type-label">string</span> — Gets or sets the time at which the artifact was created. Format `date-time`.
- **`Filename`** <span class="type-label">string</span> — Gets or sets the filename of the Artifact to create. An example might be "Performance Test Results.csv". Minimum length 1.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`LogCorrelationId`** <span class="type-label">string</span> — Gets the correlationId of the log block in which the artifact was captured.
- **`ServerTaskId`** <span class="type-label">string</span> — Gets or sets the server task with which this artifact is associated.
- **`Source`** <span class="type-label">string</span> — Gets or sets a short summary of the source of this attachment. This will typically be the name of a step/machine, or "Uploaded by [username]" if the attachment was uploaded by a person.
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Created": "2020-01-01T00:00:00.000Z",
  "Filename": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "LogCorrelationId": "string",
  "ServerTaskId": "string",
  "Source": "string",
  "SpaceId": "string"
}
```
</div>

## Modifies an existing artifact

`PUT` `/api/{spaceId}/artifacts/{id}`

Also reachable at `/api/artifacts/{id}`, `/api/spaces/{spaceIdentifier}/artifacts/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the artifact.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space.

**Response**

`200` — Artifacts are files like documents and test results that may be stored alongside a release.

`ArtifactResource`.

- **`Created`** <span class="type-label">string</span> — Gets or sets the time at which the artifact was created. Format `date-time`.
- **`Filename`** <span class="type-label">string</span> — Gets or sets the filename of the Artifact to create. An example might be "Performance Test Results.csv". Minimum length 1.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`LogCorrelationId`** <span class="type-label">string</span> — Gets the correlationId of the log block in which the artifact was captured.
- **`ServerTaskId`** <span class="type-label">string</span> — Gets or sets the server task with which this artifact is associated.
- **`Source`** <span class="type-label">string</span> — Gets or sets a short summary of the source of this attachment. This will typically be the name of a step/machine, or "Uploaded by [username]" if the attachment was uploaded by a person.
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Created": "2020-01-01T00:00:00.000Z",
  "Filename": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "LogCorrelationId": "string",
  "ServerTaskId": "string",
  "Source": "string",
  "SpaceId": "string"
}
```
</div>

## Deletes an existing Artifact

`DELETE` `/api/{spaceId}/artifacts/{id}`

Also reachable at `/api/artifacts/{id}`, `/api/spaces/{spaceIdentifier}/artifacts/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Artifact to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Gets the content associated with an artifact

`GET` `/api/{spaceId}/artifacts/{id}/content`

Also reachable at `/api/artifacts/{id}/content`, `/api/spaces/{spaceIdentifier}/artifacts/{id}/content`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the artifact.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space.

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## PUT /api/{spaceId}/artifacts/{id}/content

`PUT` `/api/{spaceId}/artifacts/{id}/content`

Also reachable at `/api/artifacts/{id}/content`, `/api/spaces/{spaceIdentifier}/artifacts/{id}/content`.

Sets the content associated with an artifact.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the artifact.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`204` — The content was successfully uploaded.
