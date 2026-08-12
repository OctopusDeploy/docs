---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Workers
---

## Lists all of the registered worker machines in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name

`GET` `/api/{spaceId}/workers`

Also reachable at `/api/spaces/{spaceIdentifier}/workers`, `/api/workers`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`commStyles`** <span class="type-label">array of string</span> — List of communication styles which if specified, filters the result to only include Workers with matching communication styles.
- **`healthStatuses`** <span class="type-label">array of string</span> — List of health statuses which if specified, filters the result to only include Deployment Targets with matching health statuses.
- **`ids`** <span class="type-label">array of string</span> — List of Worker IDs which if specified, filters the result to only include Workers with matching IDs.
- **`isDisabled`** <span class="type-label">boolean</span> — A filter to return only disabled/enabled Workers.
- **`name`** <span class="type-label">string</span> — The exact name of a Worker to be matched.
- **`operatingSystemNames`** <span class="type-label">array of string</span> — List of operating system names which if specified, filters the result to only include Workers with matching operating systems.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`shellNames`** <span class="type-label">array of string</span> — List of shell names which if specified, filters the result to only include Workers with matching shells.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`workerPoolIds`** <span class="type-label">array of string</span> — List of Worker Pool IDs which if specified, filters the result to only include Workers belonging to these Worker Pools.

**Response**

`200` — A paginated list of Workers

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

## Create a new worker

`POST` `/api/{spaceId}/workers`

Also reachable at `/api/spaces/{spaceIdentifier}/workers`, `/api/workers`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`CreateWorkerCommand`

- **`Endpoint`** <span class="type-label">object</span> *(required)*
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`IsDisabled`** <span class="type-label">boolean</span> *(required)* — Whether the worker is disabled or not.
- **`MachinePolicyId`** <span class="type-label">string</span> — The policy the worker must adhere to.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the worker. Minimum length 1.
- **`SkipInitialHealthCheck`** <span class="type-label">boolean</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`WorkerPoolIds`** <span class="type-label">array of string</span> *(required)* — The worker pools the worker belongs to.

<div data-example="Request">

```json
{
  "Endpoint": {
    "CommunicationStyle": "None",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "IsDisabled": true,
  "MachinePolicyId": "string",
  "Name": "string",
  "SkipInitialHealthCheck": true,
  "Slug": "string",
  "SpaceId": "string",
  "WorkerPoolIds": [
    "string"
  ]
}
```
</div>

**Response**

`201` — Created

`WorkerResource`.

- **`Architecture`** <span class="type-label">string</span>
- **`Endpoint`** <span class="type-label">object</span>
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

<div data-example="Response">

```json
{
  "Architecture": "string",
  "Endpoint": {
    "CommunicationStyle": "None",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
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
```
</div>

## Get a list of Workers

`GET` `/api/{spaceId}/workers/all`

Also reachable at `/api/spaces/{spaceIdentifier}/workers/all`, `/api/workers/all`.

Lists all of the Workers in the supplied Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — A list of Worker resource IDs used to filter a query.
- **`thumbprint`** <span class="type-label">string</span> — A thumbprint used to filter a query.

**Response**

`200` — The requested list of Workers

an array of `WorkerResource`.

- **`Architecture`** <span class="type-label">string</span>
- **`Endpoint`** <span class="type-label">object</span>
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

<div data-example="Response">

```json
[
  {
    "Architecture": "string",
    "Endpoint": {
      "CommunicationStyle": "None",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      }
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
]
```
</div>

## Interrogate a machine for communication details so that it may be added to the installation

`GET` `/api/{spaceId}/workers/discover`

Also reachable at `/api/spaces/{spaceIdentifier}/workers/discover`, `/api/workers/discover`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`host`** <span class="type-label">string</span> *(required)* — The hostname of the machine to discover.
- **`port`** <span class="type-label">integer</span> — The port of the machine to discover.
- **`proxyId`** <span class="type-label">string</span> — The ID of the proxy to go through.
- **`type`** <span class="type-label">enum</span> — The type of endpoint on the machine. Allowed values: `TentaclePassive`, `TentacleActive`, `Ssh`.

**Response**

`200` — The worker which was discovered

`WorkerResource`.

- **`Architecture`** <span class="type-label">string</span>
- **`Endpoint`** <span class="type-label">object</span>
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

<div data-example="Response">

```json
{
  "Architecture": "string",
  "Endpoint": {
    "CommunicationStyle": "None",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
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
```
</div>

## Gets all operating system names for workers. The result will be a string array

`GET` `/api/{spaceId}/workers/operatingsystem/names/all`

Also reachable at `/api/spaces/{spaceIdentifier}/workers/operatingsystem/names/all`, `/api/workers/operatingsystem/names/all`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The operating system names for workers.

<div data-example="Response">

```json
[
  "string"
]
```
</div>

## Gets all operating system shell names for workers. The result will be a string array

`GET` `/api/{spaceId}/workers/operatingsystem/shells/all`

Also reachable at `/api/spaces/{spaceIdentifier}/workers/operatingsystem/shells/all`, `/api/workers/operatingsystem/shells/all`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The operating system shell names for workers.

<div data-example="Response">

```json
[
  "string"
]
```
</div>

## Lists all of the registered worker machines in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name

`GET` `/api/{spaceId}/workers/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/workers/v2`, `/api/workers/v2`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`commStyles`** <span class="type-label">array of string</span> — List of communication styles which if specified, filters the result to only include Workers with matching communication styles.
- **`healthStatuses`** <span class="type-label">array of string</span> — List of health statuses which if specified, filters the result to only include Workers with matching health statuses.
- **`ids`** <span class="type-label">array of string</span> — List of Worker IDs which if specified, filters the result to only include Workers with matching IDs.
- **`isDisabled`** <span class="type-label">boolean</span> — A filter to return only disabled/enabled Workers.
- **`name`** <span class="type-label">string</span> — The exact name of a Worker to be matched.
- **`operatingSystemNames`** <span class="type-label">array of string</span> — List of operating system names which if specified, filters the result to only include Workers with matching operating systems.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`shellNames`** <span class="type-label">array of string</span> — List of shell names which if specified, filters the result to only include Workers with matching shells.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`workerPoolIds`** <span class="type-label">array of string</span> — List of Worker Pool IDs which if specified, filters the result to only include Workers belonging to these Worker Pools.

**Response**

`200` — The list of alphabetically sorted workers that matched the request.

`GetWorkersResponseV2`.

- **`WorkerCountPerHealthStatus`** <span class="type-label">object</span>
- **`Workers`** <span class="type-label">object</span>
  - **`ItemType`** <span class="type-label">string</span>
  - **`Items`** <span class="type-label">array of object</span>
  - **`ItemsPerPage`** <span class="type-label">integer</span>
  - **`LastPageNumber`** <span class="type-label">integer</span>
  - **`NumberOfPages`** <span class="type-label">integer</span>
  - **`TotalResults`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "WorkerCountPerHealthStatus": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "Workers": {
    "ItemType": "string",
    "Items": [
      {
        "Architecture": "string",
        "Endpoint": {},
        "HasLatestCalamari": true,
        "HealthStatus": "Healthy",
        "Id": "string",
        "IsDisabled": true,
        "IsInProcess": true,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {},
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
    "LastPageNumber": 0,
    "NumberOfPages": 0,
    "TotalResults": 0
  }
}
```
</div>

## Get a Worker by ID

`GET` `/api/{spaceId}/workers/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/workers/{id}`, `/api/workers/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the Worker to retrieve.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Return the Worker Resource

`WorkerResource`.

- **`Architecture`** <span class="type-label">string</span>
- **`Endpoint`** <span class="type-label">object</span>
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

<div data-example="Response">

```json
{
  "Architecture": "string",
  "Endpoint": {
    "CommunicationStyle": "None",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
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
```
</div>

## Modifies an existing worker machine

`PUT` `/api/{spaceId}/workers/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/workers/{id}`, `/api/workers/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the worker.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyWorkerCommand`

- **`Endpoint`** <span class="type-label">object</span> *(required)*
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Id`** <span class="type-label">string</span> *(required)* — The ID of the worker.
- **`IsDisabled`** <span class="type-label">boolean</span> *(required)* — Whether the worker is disabled or not.
- **`MachinePolicyId`** <span class="type-label">string</span> — The policy the worker must adhere to.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the worker. Minimum length 1.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`WorkerPoolIds`** <span class="type-label">array of string</span> *(required)* — The worker pools the worker belongs to.

<div data-example="Request">

```json
{
  "Endpoint": {
    "CommunicationStyle": "None",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Id": "string",
  "IsDisabled": true,
  "MachinePolicyId": "string",
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string",
  "WorkerPoolIds": [
    "string"
  ]
}
```
</div>

**Response**

`200` — The modified worker

`WorkerResource`.

- **`Architecture`** <span class="type-label">string</span>
- **`Endpoint`** <span class="type-label">object</span>
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

<div data-example="Response">

```json
{
  "Architecture": "string",
  "Endpoint": {
    "CommunicationStyle": "None",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
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
```
</div>

## Delete an existing Worker

`DELETE` `/api/{spaceId}/workers/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/workers/{id}`, `/api/workers/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the Worker to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Get the status of the network connection between the Octopus server and a worker

`GET` `/api/{spaceId}/workers/{id}/connection`

Also reachable at `/api/spaces/{spaceIdentifier}/workers/{id}/connection`, `/api/workers/{id}/connection`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the worker.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The connection status of the worker

`MachineConnectionStatus`.

- **`CurrentTentacleVersion`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastChecked`** <span class="type-label">string</span> — Format `date-time`.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Logs`** <span class="type-label">array of object</span>
  - **`Category`** <span class="type-label">string</span>
  - **`Detail`** <span class="type-label">string</span>
  - **`GapLastNumber`** <span class="type-label">integer</span>
  - **`MessageText`** <span class="type-label">string</span>
  - **`Number`** <span class="type-label">integer</span>
  - **`OccurredAt`** <span class="type-label">string</span> — Format `date-time`.
- **`MachineId`** <span class="type-label">string</span>
- **`Status`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CurrentTentacleVersion": "string",
  "Id": "string",
  "LastChecked": "2020-01-01T00:00:00.000Z",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Logs": [
    {
      "Category": "string",
      "Detail": "string",
      "GapLastNumber": 0,
      "MessageText": "string",
      "Number": 0,
      "OccurredAt": "2020-01-01T00:00:00.000Z"
    }
  ],
  "MachineId": "string",
  "Status": "string"
}
```
</div>
