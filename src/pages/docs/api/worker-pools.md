---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Worker Pools
---

## Get a list of Worker Pools

:endpoint{method="GET" path="/api/\{spaceId\}/workerpools"}

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools`, `/api/workerpools`.

Lists the name and ID of of the Worker Pools in the supplied Octopus Deploy Space. The results will be sorted by the `SortOrder` field on each Worker Pool.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  List of Worker Pool IDs which if specified, filters the result to only include Worker Pools with matching IDs.
- **`name`** :span[string]{.type-label}  
  The exact name of a Worker Pool to be matched.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 10. Minimum `0`.

**Response**

`200` — The requested list of Worker Pools

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`CanAddWorkers`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a short description of this pool that can be used to explain the purpose of the pool to other users. May describe the kinds of machines in the pool. This field may contain markdown.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDefault`** :span[boolean]{.type-label}  
    Is this the default pool. The default pool is used for steps that don't specify a worker pool. The default pool, if empty, uses the builtin worker to run steps.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this pool. This should be short, preferably 5-20 characters.
  - **`Slug`** :span[string]{.type-label}
  - **`SortOrder`** :span[integer]{.type-label}  
    Gets or sets a number indicating the priority of this pool in sort order. Pools with a lower sort order will appear in the UI before items with a higher sort order.
  - **`SpaceId`** :span[string]{.type-label}
  - **`WorkerPoolType`** :span[enum]{.type-label}  
    Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.
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
      "CanAddWorkers": true,
      "Description": "string",
      "Id": "string",
      "IsDefault": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "Slug": "string",
      "SortOrder": 0,
      "SpaceId": "Spaces-1",
      "WorkerPoolType": "StaticWorkerPool"
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

## Create a new Worker Pool

:endpoint{method="POST" path="/api/\{spaceId\}/workerpools"}

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools`, `/api/workerpools`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}  
  Gets or sets a short description of this pool that can be used to explain the purpose of the pool to other users. May describe the kinds of machines in the pool. This field may contain markdown.
- **`IsDefault`** :span[boolean]{.type-label}  
  Is this the default pool. The default pool is used for steps that don't specify a worker pool. The default pool, if empty, uses the builtin worker to run steps.
- **`Name`** :span[string]{.type-label} *(required)*  
  Gets or sets the name of this pool. This should be short, preferably 5-20 characters. Minimum length 1.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets a number indicating the priority of this pool in sort order. Pools with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`WorkerPoolType`** :span[enum]{.type-label} *(required)*  
  Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.
- **`WorkerType`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "IsDefault": true,
  "Name": "string",
  "Slug": "string",
  "SortOrder": 0,
  "SpaceId": "Spaces-1",
  "WorkerPoolType": "StaticWorkerPool",
  "WorkerType": "string"
}
```
:::

**Response**

`201` — Created

- **`CanAddWorkers`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short description of this pool that can be used to explain the purpose of the pool to other users. May describe the kinds of machines in the pool. This field may contain markdown.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}  
  Is this the default pool. The default pool is used for steps that don't specify a worker pool. The default pool, if empty, uses the builtin worker to run steps.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this pool. This should be short, preferably 5-20 characters.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets a number indicating the priority of this pool in sort order. Pools with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** :span[string]{.type-label}
- **`WorkerPoolType`** :span[enum]{.type-label}  
  Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.

:::api-example{label="Response"}
```json
{
  "CanAddWorkers": true,
  "Description": "string",
  "Id": "string",
  "IsDefault": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Slug": "string",
  "SortOrder": 0,
  "SpaceId": "Spaces-1",
  "WorkerPoolType": "StaticWorkerPool"
}
```
:::

## Get a list of Worker Pools

:endpoint{method="GET" path="/api/\{spaceId\}/workerpools/all"}

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/all`, `/api/workerpools/all`.

Lists the name and ID of of the Worker Pools in the supplied Octopus Deploy Space. The results will be sorted by the `SortOrder` field on each Worker Pool.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  List of Worker Pool IDs which if specified, filters the result to only include Worker Pools with matching IDs.

**Response**

`200` — The list of requested Worker Pools

- **`CanAddWorkers`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short description of this pool that can be used to explain the purpose of the pool to other users. May describe the kinds of machines in the pool. This field may contain markdown.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}  
  Is this the default pool. The default pool is used for steps that don't specify a worker pool. The default pool, if empty, uses the builtin worker to run steps.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this pool. This should be short, preferably 5-20 characters.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets a number indicating the priority of this pool in sort order. Pools with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** :span[string]{.type-label}
- **`WorkerPoolType`** :span[enum]{.type-label}  
  Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.

:::api-example{label="Response"}
```json
[
  {
    "CanAddWorkers": true,
    "Description": "string",
    "Id": "string",
    "IsDefault": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "Slug": "string",
    "SortOrder": 0,
    "SpaceId": "Spaces-1",
    "WorkerPoolType": "StaticWorkerPool"
  }
]
```
:::

## List the available Worker Types for the Dynamic Worker Pool

:endpoint{method="GET" path="/api/\{spaceId\}/workerpools/dynamicworkertypes"}

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/dynamicworkertypes`, `/api/workerpools/dynamicworkertypes`.

Returns a list of the available Worker Types for the Dynamic Worker Pool

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested Dynamic Worker Types

- **`Id`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}
- **`WorkerTypes`** :span[array of object]{.type-label}
  - **`DeprecationDateUtc`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Description`** :span[string]{.type-label}
  - **`EndOfLifeDateUtc`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Id`** :span[string]{.type-label}
  - **`StartDateUtc`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Type`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "WorkerTypes": [
    {
      "DeprecationDateUtc": "2020-01-01T00:00:00.000Z",
      "Description": "string",
      "EndOfLifeDateUtc": "2020-01-01T00:00:00.000Z",
      "Id": "string",
      "StartDateUtc": "2020-01-01T00:00:00.000Z",
      "Type": "string"
    }
  ]
}
```
:::

**Error Responses**

- **`500`** `internal_server_error` — Unable to connect to the Dynamic Worker service

## PUT /api/{spaceId}/workerpools/sortorder

:endpoint{method="PUT" path="/api/\{spaceId\}/workerpools/sortorder"}

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/sortorder`, `/api/workerpools/sortorder`.

Takes an array of work pool IDs as the request body, uses the order of items in the array to sort the worker pools on the server. The ID of every worker pool must be specified.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

A `array of string` payload.

:::api-example{label="Request"}
```json
[
  "string"
]
```
:::

**Response**

`200` — Success

## List all worker pools, including a summary of worker information

:endpoint{method="GET" path="/api/\{spaceId\}/workerpools/summary"}

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/summary`, `/api/workerpools/summary`.

Lists all worker pools, including a summary of machine information.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`commStyles`** :span[array of string]{.type-label}
- **`healthStatuses`** :span[array of string]{.type-label}
- **`hideEmptyWorkerPools`** :span[boolean]{.type-label}
- **`ids`** :span[array of string]{.type-label}
- **`isDisabled`** :span[boolean]{.type-label}
- **`machinePartialName`** :span[string]{.type-label}
- **`partialName`** :span[string]{.type-label}
- **`shellNames`** :span[array of string]{.type-label}

**Response**

`200` — The requested Worker Pool Summary

- **`MachineEndpointSummaries`** :span[object]{.type-label}
- **`MachineHealthStatusSummaries`** :span[object]{.type-label}
- **`MachineIdsForCalamariUpgrade`** :span[array of string]{.type-label}
- **`MachineIdsForTentacleUpgrade`** :span[array of string]{.type-label}
- **`TentacleUpgradesRequired`** :span[boolean]{.type-label}
- **`TotalDisabledMachines`** :span[integer]{.type-label}
- **`TotalMachines`** :span[integer]{.type-label}
- **`WorkerPoolSummaries`** :span[array of object]{.type-label}
  - **`MachineEndpointSummaries`** :span[object]{.type-label}
  - **`MachineHealthStatusSummaries`** :span[object]{.type-label}
  - **`MachineIdsForCalamariUpgrade`** :span[array of string]{.type-label}
  - **`MachineIdsForTentacleUpgrade`** :span[array of string]{.type-label}
  - **`TentacleUpgradesRequired`** :span[boolean]{.type-label}
  - **`TotalDisabledMachines`** :span[integer]{.type-label}
  - **`TotalMachines`** :span[integer]{.type-label}
  - **`WorkerPool`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "MachineEndpointSummaries": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "MachineHealthStatusSummaries": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "MachineIdsForCalamariUpgrade": [
    "string"
  ],
  "MachineIdsForTentacleUpgrade": [
    "string"
  ],
  "TentacleUpgradesRequired": true,
  "TotalDisabledMachines": 0,
  "TotalMachines": 0,
  "WorkerPoolSummaries": [
    {
      "MachineEndpointSummaries": {
        "additionalProp1": 0,
        "additionalProp2": 0,
        "additionalProp3": 0
      },
      "MachineHealthStatusSummaries": {
        "additionalProp1": 0,
        "additionalProp2": 0,
        "additionalProp3": 0
      },
      "MachineIdsForCalamariUpgrade": [
        "string"
      ],
      "MachineIdsForTentacleUpgrade": [
        "string"
      ],
      "TentacleUpgradesRequired": true,
      "TotalDisabledMachines": 0,
      "TotalMachines": 0,
      "WorkerPool": {
        "CanAddWorkers": true,
        "Description": "string",
        "Id": "string",
        "IsDefault": true,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "Name": "string",
        "Slug": "string",
        "SortOrder": 0,
        "SpaceId": "Spaces-1",
        "WorkerPoolType": "StaticWorkerPool"
      }
    }
  ]
}
```
:::

## Get the available Worker Pool types

:endpoint{method="GET" path="/api/\{spaceId\}/workerpools/supportedtypes"}

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/supportedtypes`, `/api/workerpools/supportedtypes`.

Lists the available Worker Pool types.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The list of Supported Worker Pool Types

- **`Id`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}
- **`SupportedPoolTypes`** :span[array of enum]{.type-label}  
  Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "SupportedPoolTypes": [
    "StaticWorkerPool"
  ]
}
```
:::

## Get a Worker Pool by ID

:endpoint{method="GET" path="/api/\{spaceId\}/workerpools/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/{id}`, `/api/workerpools/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested Worker Pool.

- **`CanAddWorkers`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short description of this pool that can be used to explain the purpose of the pool to other users. May describe the kinds of machines in the pool. This field may contain markdown.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}  
  Is this the default pool. The default pool is used for steps that don't specify a worker pool. The default pool, if empty, uses the builtin worker to run steps.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this pool. This should be short, preferably 5-20 characters.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets a number indicating the priority of this pool in sort order. Pools with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** :span[string]{.type-label}
- **`WorkerPoolType`** :span[enum]{.type-label}  
  Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.

:::api-example{label="Response"}
```json
{
  "CanAddWorkers": true,
  "Description": "string",
  "Id": "string",
  "IsDefault": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Slug": "string",
  "SortOrder": 0,
  "SpaceId": "Spaces-1",
  "WorkerPoolType": "StaticWorkerPool"
}
```
:::

## Modify an existing worker pool

:endpoint{method="PUT" path="/api/\{spaceId\}/workerpools/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/{id}`, `/api/workerpools/{id}`.

Updates an existing worker pool.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the worker pool.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Description`** :span[string]{.type-label}  
  The description of the worker pool.
- **`Id`** :span[string]{.type-label} *(required)*  
  The ID of the worker pool.
- **`IsDefault`** :span[boolean]{.type-label} *(required)*  
  Whether the worker pool is the default or not.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the worker pool. Minimum length 1.
- **`Slug`** :span[string]{.type-label}  
  The slug of the worker pool.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`WorkerType`** :span[string]{.type-label}  
  The worker image.

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Id": "WorkerPools-1",
  "IsDefault": true,
  "Name": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "WorkerType": "string"
}
```
:::

**Response**

`200` — Confirms that a Worker Pool was modified, containing the updated Worker Pool

- **`CanAddWorkers`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short description of this pool that can be used to explain the purpose of the pool to other users. May describe the kinds of machines in the pool. This field may contain markdown.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}  
  Is this the default pool. The default pool is used for steps that don't specify a worker pool. The default pool, if empty, uses the builtin worker to run steps.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this pool. This should be short, preferably 5-20 characters.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets a number indicating the priority of this pool in sort order. Pools with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** :span[string]{.type-label}
- **`WorkerPoolType`** :span[enum]{.type-label}  
  Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.

:::api-example{label="Response"}
```json
{
  "CanAddWorkers": true,
  "Description": "string",
  "Id": "string",
  "IsDefault": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Slug": "string",
  "SortOrder": 0,
  "SpaceId": "Spaces-1",
  "WorkerPoolType": "StaticWorkerPool"
}
```
:::

## Delete an existing Worker Pool

:endpoint{method="DELETE" path="/api/\{spaceId\}/workerpools/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/{id}`, `/api/workerpools/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Worker Pool to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

## Get a list of WorkerResources for the given WorkerPoolResource

:endpoint{method="GET" path="/api/\{spaceId\}/workerpools/\{id\}/workers"}

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/{id}/workers`, `/api/workerpools/{id}/workers`.

Lists all of the machines that belong to the given worker pool.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the WorkerPool.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`commStyles`** :span[array of string]{.type-label}
- **`deploymentTargetTypes`** :span[array of string]{.type-label}
- **`healthStatuses`** :span[array of string]{.type-label}
- **`isDisabled`** :span[boolean]{.type-label}
- **`operatingSystemNames`** :span[array of string]{.type-label}
- **`partialName`** :span[string]{.type-label}
- **`shellNames`** :span[array of string]{.type-label}
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 20. Minimum `0`.

**Response**

`200` — The requested list of Workers within a Worker Pool

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Architecture`** :span[string]{.type-label}
  - **`Endpoint`** :span[object]{.type-label}
  - **`HasLatestCalamari`** :span[boolean]{.type-label}
  - **`HealthStatus`** :span[enum]{.type-label}  
    Allowed values: `Healthy`, `Unavailable`, `Unknown`, `HasWarnings`, `Unhealthy`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`IsInProcess`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MachinePolicyId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`OperatingSystem`** :span[string]{.type-label}
  - **`OperatingSystemVersion`** :span[string]{.type-label}
  - **`ShellName`** :span[string]{.type-label}
  - **`ShellVersion`** :span[string]{.type-label}
  - **`SkipInitialHealthCheck`** :span[boolean]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`StatusSummary`** :span[string]{.type-label}
  - **`Thumbprint`** :span[string]{.type-label}
  - **`Uri`** :span[string]{.type-label}
  - **`WorkerPoolIds`** :span[array of string]{.type-label}
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
      "Architecture": "string",
      "Endpoint": {
        "CommunicationStyle": "None",
        "Id": "string",
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {}
      },
      "HasLatestCalamari": true,
      "HealthStatus": "Healthy",
      "Id": "string",
      "IsDisabled": true,
      "IsInProcess": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "MachinePolicyId": "string",
      "Name": "string",
      "OperatingSystem": "string",
      "OperatingSystemVersion": "string",
      "ShellName": "string",
      "ShellVersion": "string",
      "SkipInitialHealthCheck": true,
      "Slug": "string",
      "SpaceId": "Spaces-1",
      "StatusSummary": "string",
      "Thumbprint": "string",
      "Uri": "string",
      "WorkerPoolIds": [
        "WorkerPools-1",
        "..."
      ]
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
