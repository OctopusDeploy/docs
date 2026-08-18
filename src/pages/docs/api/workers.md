---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Workers
---

## List all of the registered worker machines in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name

:endpoint{method="GET" path="/api/\{spaceId\}/workers"}

Also reachable at `/api/spaces/{spaceIdentifier}/workers`, `/api/workers`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`commStyles`** :span[array of string]{.type-label}  
  List of communication styles which if specified, filters the result to only include Workers with matching communication styles.
- **`healthStatuses`** :span[array of string]{.type-label}  
  List of health statuses which if specified, filters the result to only include Deployment Targets with matching health statuses.
- **`ids`** :span[array of string]{.type-label}  
  List of Worker IDs which if specified, filters the result to only include Workers with matching IDs.
- **`isDisabled`** :span[boolean]{.type-label}  
  A filter to return only disabled/enabled Workers.
- **`name`** :span[string]{.type-label}  
  The exact name of a Worker to be matched.
- **`operatingSystemNames`** :span[array of string]{.type-label}  
  List of operating system names which if specified, filters the result to only include Workers with matching operating systems.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`shellNames`** :span[array of string]{.type-label}  
  List of shell names which if specified, filters the result to only include Workers with matching shells.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`workerPoolIds`** :span[array of string]{.type-label}  
  List of Worker Pool IDs which if specified, filters the result to only include Workers belonging to these Worker Pools.

**Response**

`200` — A paginated list of Workers

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
:::

## Create a new worker

:endpoint{method="POST" path="/api/\{spaceId\}/workers"}

Also reachable at `/api/spaces/{spaceIdentifier}/workers`, `/api/workers`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Endpoint`** :span[object]{.type-label} *(required)*
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`IsDisabled`** :span[boolean]{.type-label} *(required)*  
  Whether the worker is disabled or not.
- **`MachinePolicyId`** :span[string]{.type-label}  
  The policy the worker must adhere to.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the worker. Minimum length 1.
- **`SkipInitialHealthCheck`** :span[boolean]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`WorkerPoolIds`** :span[array of string]{.type-label} *(required)*  
  The worker pools the worker belongs to.

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`Architecture`** :span[string]{.type-label}
- **`Endpoint`** :span[object]{.type-label}
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

:::api-example{label="Response"}
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
:::

## Get a list of Workers

:endpoint{method="GET" path="/api/\{spaceId\}/workers/all"}

Also reachable at `/api/spaces/{spaceIdentifier}/workers/all`, `/api/workers/all`.

Lists all of the Workers in the supplied Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  A list of Worker resource IDs used to filter a query.
- **`thumbprint`** :span[string]{.type-label}  
  A thumbprint used to filter a query.

**Response**

`200` — The requested list of Workers

- **`Architecture`** :span[string]{.type-label}
- **`Endpoint`** :span[object]{.type-label}
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

:::api-example{label="Response"}
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
:::

## Interrogate a machine for communication details so that it may be added to the installation

:endpoint{method="GET" path="/api/\{spaceId\}/workers/discover"}

Also reachable at `/api/spaces/{spaceIdentifier}/workers/discover`, `/api/workers/discover`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`host`** :span[string]{.type-label} *(required)*  
  The hostname of the machine to discover.
- **`port`** :span[integer]{.type-label}  
  The port of the machine to discover.
- **`proxyId`** :span[string]{.type-label}  
  The ID of the proxy to go through.
- **`type`** :span[enum]{.type-label}  
  The type of endpoint on the machine.  
  Allowed values: `TentaclePassive`, `TentacleActive`, `Ssh`.

**Response**

`200` — The worker which was discovered

- **`Architecture`** :span[string]{.type-label}
- **`Endpoint`** :span[object]{.type-label}
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

:::api-example{label="Response"}
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
:::

## Get all operating system names for workers. The result will be a string array

:endpoint{method="GET" path="/api/\{spaceId\}/workers/operatingsystem/names/all"}

Also reachable at `/api/spaces/{spaceIdentifier}/workers/operatingsystem/names/all`, `/api/workers/operatingsystem/names/all`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The operating system names for workers.

:::api-example{label="Response"}
```json
[
  "string"
]
```
:::

## Get all operating system shell names for workers. The result will be a string array

:endpoint{method="GET" path="/api/\{spaceId\}/workers/operatingsystem/shells/all"}

Also reachable at `/api/spaces/{spaceIdentifier}/workers/operatingsystem/shells/all`, `/api/workers/operatingsystem/shells/all`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The operating system shell names for workers.

:::api-example{label="Response"}
```json
[
  "string"
]
```
:::

## List all of the registered worker machines in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name

:endpoint{method="GET" path="/api/\{spaceId\}/workers/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/workers/v2`, `/api/workers/v2`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`commStyles`** :span[array of string]{.type-label}  
  List of communication styles which if specified, filters the result to only include Workers with matching communication styles.
- **`healthStatuses`** :span[array of string]{.type-label}  
  List of health statuses which if specified, filters the result to only include Workers with matching health statuses.
- **`ids`** :span[array of string]{.type-label}  
  List of Worker IDs which if specified, filters the result to only include Workers with matching IDs.
- **`isDisabled`** :span[boolean]{.type-label}  
  A filter to return only disabled/enabled Workers.
- **`name`** :span[string]{.type-label}  
  The exact name of a Worker to be matched.
- **`operatingSystemNames`** :span[array of string]{.type-label}  
  List of operating system names which if specified, filters the result to only include Workers with matching operating systems.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`shellNames`** :span[array of string]{.type-label}  
  List of shell names which if specified, filters the result to only include Workers with matching shells.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`workerPoolIds`** :span[array of string]{.type-label}  
  List of Worker Pool IDs which if specified, filters the result to only include Workers belonging to these Worker Pools.

**Response**

`200` — The list of alphabetically sorted workers that matched the request.

- **`WorkerCountPerHealthStatus`** :span[object]{.type-label}
- **`Workers`** :span[object]{.type-label}
  - **`ItemType`** :span[string]{.type-label}
  - **`Items`** :span[array of object]{.type-label}
  - **`ItemsPerPage`** :span[integer]{.type-label}
  - **`LastPageNumber`** :span[integer]{.type-label}
  - **`NumberOfPages`** :span[integer]{.type-label}
  - **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a Worker by ID

:endpoint{method="GET" path="/api/\{spaceId\}/workers/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/workers/{id}`, `/api/workers/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the Worker to retrieve.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Return the Worker Resource

- **`Architecture`** :span[string]{.type-label}
- **`Endpoint`** :span[object]{.type-label}
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

:::api-example{label="Response"}
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
:::

## Modify an existing worker machine

:endpoint{method="PUT" path="/api/\{spaceId\}/workers/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/workers/{id}`, `/api/workers/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the worker.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Endpoint`** :span[object]{.type-label} *(required)*
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Id`** :span[string]{.type-label} *(required)*  
  The ID of the worker.
- **`IsDisabled`** :span[boolean]{.type-label} *(required)*  
  Whether the worker is disabled or not.
- **`MachinePolicyId`** :span[string]{.type-label}  
  The policy the worker must adhere to.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the worker. Minimum length 1.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`WorkerPoolIds`** :span[array of string]{.type-label} *(required)*  
  The worker pools the worker belongs to.

:::api-example{label="Request"}
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
:::

**Response**

`200` — The modified worker

- **`Architecture`** :span[string]{.type-label}
- **`Endpoint`** :span[object]{.type-label}
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

:::api-example{label="Response"}
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
:::

## Delete an existing Worker

:endpoint{method="DELETE" path="/api/\{spaceId\}/workers/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/workers/{id}`, `/api/workers/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the Worker to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Get the status of the network connection between the Octopus server and a worker

:endpoint{method="GET" path="/api/\{spaceId\}/workers/\{id\}/connection"}

Also reachable at `/api/spaces/{spaceIdentifier}/workers/{id}/connection`, `/api/workers/{id}/connection`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the worker.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The connection status of the worker

- **`CurrentTentacleVersion`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastChecked`** :span[string]{.type-label}  
  Format `date-time`.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Logs`** :span[array of object]{.type-label}
  - **`Category`** :span[string]{.type-label}
  - **`Detail`** :span[string]{.type-label}
  - **`GapLastNumber`** :span[integer]{.type-label}
  - **`MessageText`** :span[string]{.type-label}
  - **`Number`** :span[integer]{.type-label}
  - **`OccurredAt`** :span[string]{.type-label}  
    Format `date-time`.
- **`MachineId`** :span[string]{.type-label}
- **`Status`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::
