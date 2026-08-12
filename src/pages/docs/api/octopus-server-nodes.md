---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Octopus Server Nodes
---

## Get a list of Octopus Server Nodes

`GET` `/api/octopusservernodes`

Lists all of the Octopus Server Nodes participating in the current Octopus Server cluster.

**Parameters**

- **`ids`** <span class="type-label">array of string</span> — List of IDs.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Octopus Server Nodes

`OctopusServerNodeResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsInMaintenanceMode`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MaxConcurrentTasks`** <span class="type-label">integer</span>
  - **`Name`** <span class="type-label">string</span>
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

`GET` `/api/octopusservernodes/all`

Lists the name and ID of all Octopus Server nodes

**Response**

`200` — The requested list of Octopus Server Nodes

an array of `OctopusServerNodeResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsInMaintenanceMode`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MaxConcurrentTasks`** <span class="type-label">integer</span>
- **`Name`** <span class="type-label">string</span>

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

## Pings an octopus server node

`GET` `/api/octopusservernodes/ping`

Returns HTTP ImATeapot (418) when the Octopus Server node is draining or offline, otherwise HTTP OK (200). Always returns the node information in the body.

**Response**

`200` — Contains information about the octopus server node

`LoadBalancerPingResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsInMaintenanceMode`** <span class="type-label">boolean</span>
- **`IsOffline`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSeen`** <span class="type-label">string</span> — Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MaxConcurrentTasks`** <span class="type-label">integer</span>
- **`Name`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span>

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

## Returns all octopus server nodes in the cluster including their status information

`GET` `/api/octopusservernodes/summary`

**Response**

`200` — The Octopus Server Nodes Summary

`OctopusServerClusterSummaryResource`.

- **`Links`** <span class="type-label">object</span>
- **`Nodes`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsInMaintenanceMode`** <span class="type-label">boolean</span>
  - **`IsOffline`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastSeen`** <span class="type-label">string</span> — Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MaxConcurrentTasks`** <span class="type-label">integer</span>
  - **`MaxSqlConnectionPoolSize`** <span class="type-label">integer</span>
  - **`Name`** <span class="type-label">string</span>
  - **`RecommendedMaxSqlConnectionPoolSize`** <span class="type-label">integer</span>
  - **`RunningTaskCount`** <span class="type-label">integer</span>
  - **`Version`** <span class="type-label">string</span>

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

`GET` `/api/octopusservernodes/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the OctopusServerNode to load.

**Response**

`200` — The requested Octopus Server Node

`OctopusServerNodeResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsInMaintenanceMode`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MaxConcurrentTasks`** <span class="type-label">integer</span>
- **`Name`** <span class="type-label">string</span>

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

`PUT` `/api/octopusservernodes/{id}`

Modifies an existing Octopus Server node.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the OctopusServerNodeResource to modify.

**Request Body**

`ModifyOctopusServerNodeCommand`

- **`Id`** <span class="type-label">string</span> *(required)* — ID of the OctopusServerNodeResource to modify.
- **`IsInMaintenanceMode`** <span class="type-label">boolean</span> — The updated maintenance mode of the OctopusServerNodeResource to modify.
- **`MaxConcurrentTasks`** <span class="type-label">integer</span> — The updated max concurrent tasks value of the OctopusServerNodeResource to modify.

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

`OctopusServerNodeResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsInMaintenanceMode`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MaxConcurrentTasks`** <span class="type-label">integer</span>
- **`Name`** <span class="type-label">string</span>

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

## Deletes an existing Octopus Server Node

`DELETE` `/api/octopusservernodes/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Octopus Server Node to delete.

**Response**

`200` — Confirmation that the Octopus Server Node was deleted

`DeleteOctopusServerNodeResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Returns a count of the running tasks on an octopus server node

`GET` `/api/octopusservernodes/{id}/details`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the OctopusServerNode to load details.

**Response**

`200` — Details about the requested Octopus Server Node

`OctopusServerNodeDetailsResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`RunningTasks`** <span class="type-label">integer</span>

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
