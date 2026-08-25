---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Artifacts
---

## List all of the artifacts in the supplied Octopus Deploy Space, from all releases. The results will be sorted by date from most recently to least recently created

:endpoint{method="GET" path="/api/\{spaceId\}/artifacts"}

Also reachable at `/api/artifacts`, `/api/spaces/{spaceIdentifier}/artifacts`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  List of Artifact IDs which if specified, filters the result to only include Artifacts with matching IDs.
- **`order`** :span[string]{.type-label}  
  asc or desc.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`regarding`** :span[string]{.type-label}  
  An ID of a resource to filter on. Only artifacts related to this resource will be returned. It can be the ID of the following: Release, RunbookSnapshot, Deployment, Runbook Run, Server Task, Project, Environment or Tenant.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of Artifacts

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Gets or sets the time at which the artifact was created. Format `date-time`.
  - **`Filename`** :span[string]{.type-label}  
    Gets or sets the filename of the Artifact to create. Minimum length 1.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`LogCorrelationId`** :span[string]{.type-label}  
    Gets the correlationId of the log block in which the artifact was captured.
  - **`ServerTaskId`** :span[string]{.type-label}  
    Gets or sets the server task with which this artifact is associated.
  - **`Source`** :span[string]{.type-label}  
    Gets or sets a short summary of the source of this attachment. This will typically be the name of a step/machine, or "Uploaded by [username]" if the attachment was uploaded by a person.
  - **`SpaceId`** :span[string]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastPageNumber`** :span[integer]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "Created": "2020-01-01T00:00:00.000Z",
      "Filename": "Performance Test Results.csv",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "LogCorrelationId": "0c5a872485ac4b10857939a92d082e67",
      "ServerTaskId": "string",
      "Source": "string",
      "SpaceId": "Spaces-1"
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
:::

## Create a new artifact

:endpoint{method="POST" path="/api/\{spaceId\}/artifacts"}

Also reachable at `/api/artifacts`, `/api/spaces/{spaceIdentifier}/artifacts`.

Creates a new artifact.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the space.

**Request Body**

- **`Filename`** :span[string]{.type-label} *(required)*  
  The filename of the Artifact to create. Minimum length 1.
- **`LogCorrelationId`** :span[string]{.type-label}  
  Gets the correlationId of the log block in which the artifact was captured.
- **`ServerTaskId`** :span[string]{.type-label} *(required)*  
  The server task with which this artifact is associated.
- **`Source`** :span[string]{.type-label}  
  A short summary of the source of this attachment. This will typically be the name of a step/machine, or "Uploaded by [username]" if the attachment was uploaded by a person.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  ID of the space.

:::api-example{label="Request"}
```json
{
  "Filename": "Performance Test Results.csv",
  "LogCorrelationId": "0c5a872485ac4b10857939a92d082e67",
  "ServerTaskId": "ServerTasks-1",
  "Source": "string",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`201` — Created

- **`Created`** :span[string]{.type-label}  
  Gets or sets the time at which the artifact was created. Format `date-time`.
- **`Filename`** :span[string]{.type-label}  
  Gets or sets the filename of the Artifact to create. Minimum length 1.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`LogCorrelationId`** :span[string]{.type-label}  
  Gets the correlationId of the log block in which the artifact was captured.
- **`ServerTaskId`** :span[string]{.type-label}  
  Gets or sets the server task with which this artifact is associated.
- **`Source`** :span[string]{.type-label}  
  Gets or sets a short summary of the source of this attachment. This will typically be the name of a step/machine, or "Uploaded by [username]" if the attachment was uploaded by a person.
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Created": "2020-01-01T00:00:00.000Z",
  "Filename": "Performance Test Results.csv",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "LogCorrelationId": "0c5a872485ac4b10857939a92d082e67",
  "ServerTaskId": "string",
  "Source": "string",
  "SpaceId": "Spaces-1"
}
```
:::

## Get an Artifact by ID

:endpoint{method="GET" path="/api/\{spaceId\}/artifacts/\{id\}"}

Also reachable at `/api/artifacts/{id}`, `/api/spaces/{spaceIdentifier}/artifacts/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Artifact to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Gets a specific Artifact

- **`Created`** :span[string]{.type-label}  
  Gets or sets the time at which the artifact was created. Format `date-time`.
- **`Filename`** :span[string]{.type-label}  
  Gets or sets the filename of the Artifact to create. Minimum length 1.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`LogCorrelationId`** :span[string]{.type-label}  
  Gets the correlationId of the log block in which the artifact was captured.
- **`ServerTaskId`** :span[string]{.type-label}  
  Gets or sets the server task with which this artifact is associated.
- **`Source`** :span[string]{.type-label}  
  Gets or sets a short summary of the source of this attachment. This will typically be the name of a step/machine, or "Uploaded by [username]" if the attachment was uploaded by a person.
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Created": "2020-01-01T00:00:00.000Z",
  "Filename": "Performance Test Results.csv",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "LogCorrelationId": "0c5a872485ac4b10857939a92d082e67",
  "ServerTaskId": "string",
  "Source": "string",
  "SpaceId": "Spaces-1"
}
```
:::

## Modify an existing artifact

:endpoint{method="PUT" path="/api/\{spaceId\}/artifacts/\{id\}"}

Also reachable at `/api/artifacts/{id}`, `/api/spaces/{spaceIdentifier}/artifacts/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the artifact.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space.

**Response**

`200` — Artifacts are files like documents and test results that may be stored alongside a release.

- **`Created`** :span[string]{.type-label}  
  Gets or sets the time at which the artifact was created. Format `date-time`.
- **`Filename`** :span[string]{.type-label}  
  Gets or sets the filename of the Artifact to create. Minimum length 1.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`LogCorrelationId`** :span[string]{.type-label}  
  Gets the correlationId of the log block in which the artifact was captured.
- **`ServerTaskId`** :span[string]{.type-label}  
  Gets or sets the server task with which this artifact is associated.
- **`Source`** :span[string]{.type-label}  
  Gets or sets a short summary of the source of this attachment. This will typically be the name of a step/machine, or "Uploaded by [username]" if the attachment was uploaded by a person.
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Created": "2020-01-01T00:00:00.000Z",
  "Filename": "Performance Test Results.csv",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "LogCorrelationId": "0c5a872485ac4b10857939a92d082e67",
  "ServerTaskId": "string",
  "Source": "string",
  "SpaceId": "Spaces-1"
}
```
:::

## Delete an existing Artifact

:endpoint{method="DELETE" path="/api/\{spaceId\}/artifacts/\{id\}"}

Also reachable at `/api/artifacts/{id}`, `/api/spaces/{spaceIdentifier}/artifacts/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Artifact to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Get the content associated with an artifact

:endpoint{method="GET" path="/api/\{spaceId\}/artifacts/\{id\}/content"}

Also reachable at `/api/artifacts/{id}/content`, `/api/spaces/{spaceIdentifier}/artifacts/{id}/content`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the artifact.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space.

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## PUT /api/{spaceId}/artifacts/{id}/content

:endpoint{method="PUT" path="/api/\{spaceId\}/artifacts/\{id\}/content"}

Also reachable at `/api/artifacts/{id}/content`, `/api/spaces/{spaceIdentifier}/artifacts/{id}/content`.

Sets the content associated with an artifact.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the artifact.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`204` — The content was successfully uploaded.
