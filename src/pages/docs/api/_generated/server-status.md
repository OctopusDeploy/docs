---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Server Status
---

## Get the status of Octopus Server

:endpoint{method="GET" path="/api/serverstatus"}

Shows information about the status of the Octopus Server.

**Response**

`200` — A snapshot of the server's current status

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDatabaseEncrypted`** :span[boolean]{.type-label}
- **`IsInMaintenanceMode`** :span[boolean]{.type-label}
- **`IsMajorMinorUpgrade`** :span[boolean]{.type-label}
- **`IsPotentialClone`** :span[boolean]{.type-label}
- **`IsUpgradeAvailable`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MaintenanceExpires`** :span[string]{.type-label}
- **`MaximumAvailableVersion`** :span[string]{.type-label}
- **`MaximumAvailableVersionCoveredByLicense`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "IsDatabaseEncrypted": false,
  "IsInMaintenanceMode": false,
  "IsMajorMinorUpgrade": false,
  "IsPotentialClone": false,
  "IsUpgradeAvailable": false,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MaintenanceExpires": "string",
  "MaximumAvailableVersion": "string",
  "MaximumAvailableVersionCoveredByLicense": "string"
}
```
:::

## Get counts of documents in the server

:endpoint{method="GET" path="/api/serverstatus/counts"}

List counts of various document types to assist in diagnosing issues with the server.

**Response**

`200` — The requested Server Document Counts

- **`Global`** :span[object]{.type-label}
  - **`Spaces`** :span[integer]{.type-label}
  - **`Teams`** :span[integer]{.type-label}
  - **`Users`** :span[integer]{.type-label}
- **`Infrastructure`** :span[object]{.type-label}
  - **`DeploymentTargets`** :span[integer]{.type-label}
  - **`Environments`** :span[integer]{.type-label}
  - **`Tenants`** :span[integer]{.type-label}
  - **`WorkerPools`** :span[integer]{.type-label}
  - **`Workers`** :span[integer]{.type-label}
- **`Library`** :span[object]{.type-label}
  - **`Certificates`** :span[integer]{.type-label}
  - **`Packages`** :span[integer]{.type-label}
  - **`VariableSets`** :span[integer]{.type-label}
- **`Project`** :span[object]{.type-label}
  - **`Deployments`** :span[integer]{.type-label}
  - **`Projects`** :span[integer]{.type-label}
  - **`Releases`** :span[integer]{.type-label}
  - **`RunbookRuns`** :span[integer]{.type-label}
  - **`Runbooks`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "Global": {
    "Spaces": 0,
    "Teams": 0,
    "Users": 0
  },
  "Infrastructure": {
    "DeploymentTargets": 0,
    "Environments": 0,
    "Tenants": 0,
    "WorkerPools": 0,
    "Workers": 0
  },
  "Library": {
    "Certificates": 0,
    "Packages": 0,
    "VariableSets": 0
  },
  "Project": {
    "Deployments": 0,
    "Projects": 0,
    "Releases": 0,
    "RunbookRuns": 0,
    "Runbooks": 0
  }
}
```
:::

## Force a GC collect

:endpoint{method="POST" path="/api/serverstatus/gc-collect"}

Triggers a garbage collection pass for all heap generations, including the large object heap.

**Response**

`200` — OK

## Force a GC collect

:endpoint{method="POST" path="/api/serverstatus/gc-collect/v1"}

Triggers a garbage collection pass for all heap generations, including the large object heap.

**Response**

`200` — Internal

:::api-example{label="Response"}
```json
{}
```
:::

## Get the general health of Octopus Server

:endpoint{method="GET" path="/api/serverstatus/health"}

Provides a super simple interface perfect for checking the general health of your entire Octopus Server cluster.

**Response**

`200` — A snapshot of the server or cluster's current health

- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsCompliantWithLicense`** :span[boolean]{.type-label}
- **`IsEntireClusterDrainingTasks`** :span[boolean]{.type-label}
- **`IsEntireClusterReadOnly`** :span[boolean]{.type-label}
- **`IsOperatingNormally`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

:::api-example{label="Response"}
```json
{
  "Description": "string",
  "Id": "string",
  "IsCompliantWithLicense": false,
  "IsEntireClusterDrainingTasks": false,
  "IsEntireClusterReadOnly": false,
  "IsOperatingNormally": false,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
:::

**Error Responses**

- **`418`** — Indicates that the server is not operating normally

## Retrieve the most recent high-priority log messages from this execution of the Octopus Server process

:endpoint{method="GET" path="/api/serverstatus/logs"}

**Query Parameters**

- **`includeDetail`** :span[boolean]{.type-label}
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The most recent high-priority log messages from this execution of the Octopus Server process

- **`Category`** :span[string]{.type-label}
- **`Detail`** :span[string]{.type-label}
- **`GapLastNumber`** :span[integer]{.type-label}
- **`MessageText`** :span[string]{.type-label}
- **`Number`** :span[integer]{.type-label}
- **`OccurredAt`** :span[string]{.type-label}  
  Format `date-time`.

:::api-example{label="Response"}
```json
[
  {
    "Category": "string",
    "Detail": "string",
    "GapLastNumber": 0,
    "MessageText": "string",
    "Number": 0,
    "OccurredAt": "2020-01-01T00:00:00.000Z"
  }
]
```
:::

## Provide information about the Octopus Server process and the machine on which it is running

:endpoint{method="GET" path="/api/serverstatus/system-info"}

**Response**

`200` — Information about the Octopus Server process and the machine on which it is running.

- **`ClrVersion`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MinThreadPoolCount`** :span[integer]{.type-label}
- **`OSVersion`** :span[string]{.type-label}
- **`ThreadCount`** :span[integer]{.type-label}
- **`Uptime`** :span[string]{.type-label}  
  Format `date-span`.
- **`Version`** :span[string]{.type-label}
- **`WorkingSetBytes`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ClrVersion": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MinThreadPoolCount": 0,
  "OSVersion": "string",
  "ThreadCount": 0,
  "Uptime": "string",
  "Version": "string",
  "WorkingSetBytes": 0
}
```
:::

## Create a .zip archive containing an aggregate of the other system information APIs

:endpoint{method="GET" path="/api/serverstatus/system-report"}

**Query Parameters**

- **`nodeSpecificOnly`** :span[boolean]{.type-label}  
  When true, only node-specific sections are included (recent logs, system info, filesystem logs). Defaults to false (full report) when not set.

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## List timezones supported by the server

:endpoint{method="GET" path="/api/serverstatus/timezones"}

**Response**

`200` — The requested list of timezones supported by the server.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsLocal`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
[
  {
    "Id": "string",
    "IsLocal": false,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string"
  }
]
```
:::
