---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Octopus Server Nodes
---

## Get a list of Octopus Server Nodes

:span[GET]{.api-get} `/api/octopusservernodes`

Lists all of the Octopus Server Nodes participating in the current Octopus Server cluster.

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  List of IDs.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Octopus Server Nodes

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsInMaintenanceMode`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MaxConcurrentTasks`** :span[integer]{.type-label}
  - **`Name`** :span[string]{.type-label}
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

<div data-example="Response">

```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "Id": "string",
      "IsInMaintenanceMode": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "MaxConcurrentTasks": 0,
      "Name": "string"
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

## Get all Octopus Server Nodes

:span[GET]{.api-get} `/api/octopusservernodes/all`

Lists the name and ID of all Octopus Server nodes

**Response**

`200` — The requested list of Octopus Server Nodes

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsInMaintenanceMode`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MaxConcurrentTasks`** :span[integer]{.type-label}
- **`Name`** :span[string]{.type-label}

<div data-example="Response">

```json
[
  {
    "Id": "string",
    "IsInMaintenanceMode": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "MaxConcurrentTasks": 0,
    "Name": "string"
  }
]
```
</div>

## Ping an octopus server node

:span[GET]{.api-get} `/api/octopusservernodes/ping`

Returns HTTP ImATeapot (418) when the Octopus Server node is draining or offline, otherwise HTTP OK (200). Always returns the node information in the body.

**Response**

`200` — Contains information about the octopus server node

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsInMaintenanceMode`** :span[boolean]{.type-label}
- **`IsOffline`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSeen`** :span[string]{.type-label}  
  Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MaxConcurrentTasks`** :span[integer]{.type-label}
- **`Name`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "Id": "string",
  "IsInMaintenanceMode": true,
  "IsOffline": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastSeen": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MaxConcurrentTasks": 0,
  "Name": "string",
  "Version": "string"
}
```
</div>

**Error Responses**

- **`418`** — Indicates that the node is draining or offline

## Return all octopus server nodes in the cluster including their status information

:span[GET]{.api-get} `/api/octopusservernodes/summary`

**Response**

`200` — The Octopus Server Nodes Summary

- **`Links`** :span[object]{.type-label}
- **`Nodes`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsInMaintenanceMode`** :span[boolean]{.type-label}
  - **`IsOffline`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastSeen`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MaxConcurrentTasks`** :span[integer]{.type-label}
  - **`MaxSqlConnectionPoolSize`** :span[integer]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`RecommendedMaxSqlConnectionPoolSize`** :span[integer]{.type-label}
  - **`RunningTaskCount`** :span[integer]{.type-label}
  - **`Version`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Nodes": [
    {
      "Id": "string",
      "IsInMaintenanceMode": true,
      "IsOffline": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "LastSeen": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "MaxConcurrentTasks": 0,
      "MaxSqlConnectionPoolSize": 0,
      "Name": "string",
      "RecommendedMaxSqlConnectionPoolSize": 0,
      "RunningTaskCount": 0,
      "Version": "string"
    }
  ]
}
```
</div>

## Get an Octopus Server Node by ID

:span[GET]{.api-get} `/api/octopusservernodes/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the OctopusServerNode to load.

**Response**

`200` — The requested Octopus Server Node

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsInMaintenanceMode`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MaxConcurrentTasks`** :span[integer]{.type-label}
- **`Name`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "Id": "string",
  "IsInMaintenanceMode": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MaxConcurrentTasks": 0,
  "Name": "string"
}
```
</div>

## Modify an existing OctopusServerNodeResource by ID

:span[PUT]{.api-put} `/api/octopusservernodes/{id}`

Modifies an existing Octopus Server node.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the OctopusServerNodeResource to modify.

**Request Body**

- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the OctopusServerNodeResource to modify.
- **`IsInMaintenanceMode`** :span[boolean]{.type-label}  
  The updated maintenance mode of the OctopusServerNodeResource to modify.
- **`MaxConcurrentTasks`** :span[integer]{.type-label}  
  The updated max concurrent tasks value of the OctopusServerNodeResource to modify.

<div data-example="Request">

```json
{
  "Id": "string",
  "IsInMaintenanceMode": true,
  "MaxConcurrentTasks": 0
}
```
</div>

**Response**

`200` — Confirmation that the Octopus Server Node was modified, containing the new Node

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsInMaintenanceMode`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MaxConcurrentTasks`** :span[integer]{.type-label}
- **`Name`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "Id": "string",
  "IsInMaintenanceMode": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MaxConcurrentTasks": 0,
  "Name": "string"
}
```
</div>

## Delete an existing Octopus Server Node

:span[DELETE]{.api-delete} `/api/octopusservernodes/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Octopus Server Node to delete.

**Response**

`200` — Confirmation that the Octopus Server Node was deleted

<div data-example="Response">

```json
{}
```
</div>

## Return a count of the running tasks on an octopus server node

:span[GET]{.api-get} `/api/octopusservernodes/{id}/details`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the OctopusServerNode to load details.

**Response**

`200` — Details about the requested Octopus Server Node

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`RunningTasks`** :span[integer]{.type-label}

<div data-example="Response">

```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "RunningTasks": 0
}
```
</div>
