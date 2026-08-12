---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Worker Pools
---

## Get a list of Worker Pools

`GET` `/api/{spaceId}/workerpools`

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools`, `/api/workerpools`.

Lists the name and ID of of the Worker Pools in the supplied Octopus Deploy Space. The results will be sorted by the `SortOrder` field on each Worker Pool.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — List of Worker Pool IDs which if specified, filters the result to only include Worker Pools with matching IDs.
- **`name`** <span class="type-label">string</span> — The exact name of a Worker Pool to be matched.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 10. Minimum `0`.

**Response**

`200` — The requested list of Worker Pools

`WorkerPoolResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`CanAddWorkers`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this pool that can be used to explain the purpose of the pool to other users. May describe the kinds of machines in the pool. This field may contain markdown.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDefault`** <span class="type-label">boolean</span> — Is this the default pool. The default pool is used for steps that don't specify a worker pool. The default pool, if empty, uses the builtin worker to run steps.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this pool. This should be short, preferably 5-20 characters.
  - **`Slug`** <span class="type-label">string</span>
  - **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this pool in sort order. Pools with a lower sort order will appear in the UI before items with a higher sort order.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`WorkerPoolType`** <span class="type-label">enum</span> — Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.
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
      "SpaceId": "string",
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
</div>

## Creates a new Worker Pool

`POST` `/api/{spaceId}/workerpools`

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools`, `/api/workerpools`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateWorkerPoolCommand`

- **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this pool that can be used to explain the purpose of the pool to other users. May describe the kinds of machines in the pool. This field may contain markdown.
- **`IsDefault`** <span class="type-label">boolean</span> — Is this the default pool. The default pool is used for steps that don't specify a worker pool. The default pool, if empty, uses the builtin worker to run steps.
- **`Name`** <span class="type-label">string</span> *(required)* — Gets or sets the name of this pool. This should be short, preferably 5-20 characters. Minimum length 1.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this pool in sort order. Pools with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`WorkerPoolType`** <span class="type-label">enum</span> *(required)* — Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.
- **`WorkerType`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "Description": "string",
  "IsDefault": true,
  "Name": "string",
  "Slug": "string",
  "SortOrder": 0,
  "SpaceId": "string",
  "WorkerPoolType": "StaticWorkerPool",
  "WorkerType": "string"
}
```
</div>

**Response**

`201` — Created

`WorkerPoolResource`.

- **`CanAddWorkers`** <span class="type-label">boolean</span>
- **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this pool that can be used to explain the purpose of the pool to other users. May describe the kinds of machines in the pool. This field may contain markdown.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span> — Is this the default pool. The default pool is used for steps that don't specify a worker pool. The default pool, if empty, uses the builtin worker to run steps.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this pool. This should be short, preferably 5-20 characters.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this pool in sort order. Pools with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** <span class="type-label">string</span>
- **`WorkerPoolType`** <span class="type-label">enum</span> — Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.

<div data-example="Response">

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
  "SpaceId": "string",
  "WorkerPoolType": "StaticWorkerPool"
}
```
</div>

## Get a list of Worker Pools

`GET` `/api/{spaceId}/workerpools/all`

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/all`, `/api/workerpools/all`.

Lists the name and ID of of the Worker Pools in the supplied Octopus Deploy Space. The results will be sorted by the `SortOrder` field on each Worker Pool.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — List of Worker Pool IDs which if specified, filters the result to only include Worker Pools with matching IDs.

**Response**

`200` — The list of requested Worker Pools

an array of `WorkerPoolResource`.

- **`CanAddWorkers`** <span class="type-label">boolean</span>
- **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this pool that can be used to explain the purpose of the pool to other users. May describe the kinds of machines in the pool. This field may contain markdown.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span> — Is this the default pool. The default pool is used for steps that don't specify a worker pool. The default pool, if empty, uses the builtin worker to run steps.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this pool. This should be short, preferably 5-20 characters.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this pool in sort order. Pools with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** <span class="type-label">string</span>
- **`WorkerPoolType`** <span class="type-label">enum</span> — Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.

<div data-example="Response">

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
    "SpaceId": "string",
    "WorkerPoolType": "StaticWorkerPool"
  }
]
```
</div>

## Lists the available Worker Types for the Dynamic Worker Pool

`GET` `/api/{spaceId}/workerpools/dynamicworkertypes`

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/dynamicworkertypes`, `/api/workerpools/dynamicworkertypes`.

Returns a list of the available Worker Types for the Dynamic Worker Pool

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested Dynamic Worker Types

`WorkerPoolDynamicWorkerTypesResource`.

- **`Id`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span>
- **`WorkerTypes`** <span class="type-label">array of object</span>
  - **`DeprecationDateUtc`** <span class="type-label">string</span> — Format `date-time`.
  - **`Description`** <span class="type-label">string</span>
  - **`EndOfLifeDateUtc`** <span class="type-label">string</span> — Format `date-time`.
  - **`Id`** <span class="type-label">string</span>
  - **`StartDateUtc`** <span class="type-label">string</span> — Format `date-time`.
  - **`Type`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

**Error Responses**

- **`500`** `internal_server_error` — Unable to connect to the Dynamic Worker service

## PUT /api/{spaceId}/workerpools/sortorder

`PUT` `/api/{spaceId}/workerpools/sortorder`

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/sortorder`, `/api/workerpools/sortorder`.

Takes an array of work pool IDs as the request body, uses the order of items in the array to sort the worker pools on the server. The ID of every worker pool must be specified.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

A `array of string` payload.

<div data-example="Request">

```json
[
  "string"
]
```
</div>

**Response**

`200` — Success

## Lists all worker pools, including a summary of worker information

`GET` `/api/{spaceId}/workerpools/summary`

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/summary`, `/api/workerpools/summary`.

Lists all worker pools, including a summary of machine information.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`commStyles`** <span class="type-label">array of string</span>
- **`healthStatuses`** <span class="type-label">array of string</span>
- **`hideEmptyWorkerPools`** <span class="type-label">boolean</span>
- **`ids`** <span class="type-label">array of string</span>
- **`isDisabled`** <span class="type-label">boolean</span>
- **`machinePartialName`** <span class="type-label">string</span>
- **`partialName`** <span class="type-label">string</span>
- **`shellNames`** <span class="type-label">array of string</span>

**Response**

`200` — The requested Worker Pool Summary

`WorkerPoolsSummaryResource`.

- **`MachineEndpointSummaries`** <span class="type-label">object</span>
- **`MachineHealthStatusSummaries`** <span class="type-label">object</span>
- **`MachineIdsForCalamariUpgrade`** <span class="type-label">array of string</span>
- **`MachineIdsForTentacleUpgrade`** <span class="type-label">array of string</span>
- **`TentacleUpgradesRequired`** <span class="type-label">boolean</span>
- **`TotalDisabledMachines`** <span class="type-label">integer</span>
- **`TotalMachines`** <span class="type-label">integer</span>
- **`WorkerPoolSummaries`** <span class="type-label">array of object</span>
  - **`MachineEndpointSummaries`** <span class="type-label">object</span>
  - **`MachineHealthStatusSummaries`** <span class="type-label">object</span>
  - **`MachineIdsForCalamariUpgrade`** <span class="type-label">array of string</span>
  - **`MachineIdsForTentacleUpgrade`** <span class="type-label">array of string</span>
  - **`TentacleUpgradesRequired`** <span class="type-label">boolean</span>
  - **`TotalDisabledMachines`** <span class="type-label">integer</span>
  - **`TotalMachines`** <span class="type-label">integer</span>
  - **`WorkerPool`** <span class="type-label">object</span>

<div data-example="Response">

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
        "SpaceId": "string",
        "WorkerPoolType": "StaticWorkerPool"
      }
    }
  ]
}
```
</div>

## Gets the available Worker Pool types

`GET` `/api/{spaceId}/workerpools/supportedtypes`

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/supportedtypes`, `/api/workerpools/supportedtypes`.

Lists the available Worker Pool types.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The list of Supported Worker Pool Types

`WorkerPoolSupportedTypesResource`.

- **`Id`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span>
- **`SupportedPoolTypes`** <span class="type-label">array of enum</span> — Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.

<div data-example="Response">

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
</div>

## Get a Worker Pool by ID

`GET` `/api/{spaceId}/workerpools/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/{id}`, `/api/workerpools/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested Worker Pool.

`WorkerPoolResource`.

- **`CanAddWorkers`** <span class="type-label">boolean</span>
- **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this pool that can be used to explain the purpose of the pool to other users. May describe the kinds of machines in the pool. This field may contain markdown.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span> — Is this the default pool. The default pool is used for steps that don't specify a worker pool. The default pool, if empty, uses the builtin worker to run steps.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this pool. This should be short, preferably 5-20 characters.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this pool in sort order. Pools with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** <span class="type-label">string</span>
- **`WorkerPoolType`** <span class="type-label">enum</span> — Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.

<div data-example="Response">

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
  "SpaceId": "string",
  "WorkerPoolType": "StaticWorkerPool"
}
```
</div>

## Modifies an existing worker pool

`PUT` `/api/{spaceId}/workerpools/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/{id}`, `/api/workerpools/{id}`.

Updates an existing worker pool.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the worker pool.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyWorkerPoolCommand`

- **`Description`** <span class="type-label">string</span> — The description of the worker pool.
- **`Id`** <span class="type-label">string</span> *(required)* — The ID of the worker pool.
- **`IsDefault`** <span class="type-label">boolean</span> *(required)* — Whether the worker pool is the default or not.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the worker pool. Minimum length 1.
- **`Slug`** <span class="type-label">string</span> — The slug of the worker pool.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`WorkerType`** <span class="type-label">string</span> — The worker image.

<div data-example="Request">

```json
{
  "Description": "string",
  "Id": "string",
  "IsDefault": true,
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string",
  "WorkerType": "string"
}
```
</div>

**Response**

`200` — Confirms that a Worker Pool was modified, containing the updated Worker Pool

`WorkerPoolResource`.

- **`CanAddWorkers`** <span class="type-label">boolean</span>
- **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this pool that can be used to explain the purpose of the pool to other users. May describe the kinds of machines in the pool. This field may contain markdown.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span> — Is this the default pool. The default pool is used for steps that don't specify a worker pool. The default pool, if empty, uses the builtin worker to run steps.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this pool. This should be short, preferably 5-20 characters.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this pool in sort order. Pools with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** <span class="type-label">string</span>
- **`WorkerPoolType`** <span class="type-label">enum</span> — Allowed values: `StaticWorkerPool`, `DynamicWorkerPool`.

<div data-example="Response">

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
  "SpaceId": "string",
  "WorkerPoolType": "StaticWorkerPool"
}
```
</div>

## Deletes an existing Worker Pool

`DELETE` `/api/{spaceId}/workerpools/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/{id}`, `/api/workerpools/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Worker Pool to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

## Get a list of WorkerResources for the given WorkerPoolResource

`GET` `/api/{spaceId}/workerpools/{id}/workers`

Also reachable at `/api/spaces/{spaceIdentifier}/workerpools/{id}/workers`, `/api/workerpools/{id}/workers`.

Lists all of the machines that belong to the given worker pool.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the WorkerPool.
- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`commStyles`** <span class="type-label">array of string</span>
- **`deploymentTargetTypes`** <span class="type-label">array of string</span>
- **`healthStatuses`** <span class="type-label">array of string</span>
- **`isDisabled`** <span class="type-label">boolean</span>
- **`operatingSystemNames`** <span class="type-label">array of string</span>
- **`partialName`** <span class="type-label">string</span>
- **`shellNames`** <span class="type-label">array of string</span>
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 20. Minimum `0`.

**Response**

`200` — The requested list of Workers within a Worker Pool

`WorkerResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Architecture`** <span class="type-label">string</span>
  - **`Endpoint`** <span class="type-label">object</span>
  - **`HasLatestCalamari`** <span class="type-label">boolean</span>
  - **`HealthStatus`** <span class="type-label">enum</span> — Allowed values: `Healthy`, `Unavailable`, `Unknown`, `HasWarnings`, `Unhealthy`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`IsInProcess`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MachinePolicyId`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`OperatingSystem`** <span class="type-label">string</span>
  - **`OperatingSystemVersion`** <span class="type-label">string</span>
  - **`ShellName`** <span class="type-label">string</span>
  - **`ShellVersion`** <span class="type-label">string</span>
  - **`SkipInitialHealthCheck`** <span class="type-label">boolean</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`StatusSummary`** <span class="type-label">string</span>
  - **`Thumbprint`** <span class="type-label">string</span>
  - **`Uri`** <span class="type-label">string</span>
  - **`WorkerPoolIds`** <span class="type-label">array of string</span>
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
      "SpaceId": "string",
      "StatusSummary": "string",
      "Thumbprint": "string",
      "Uri": "string",
      "WorkerPoolIds": [
        "string"
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
</div>
