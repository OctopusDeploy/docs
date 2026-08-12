---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Server Status
---

## Get the status of Octopus Server

`GET` `/api/serverstatus`

Shows information about the status of the Octopus Server.

**Response**

`200` — A snapshot of the server's current status

`ServerStatusResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDatabaseEncrypted`** <span class="type-label">boolean</span>
- **`IsInMaintenanceMode`** <span class="type-label">boolean</span>
- **`IsMajorMinorUpgrade`** <span class="type-label">boolean</span>
- **`IsPotentialClone`** <span class="type-label">boolean</span>
- **`IsUpgradeAvailable`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MaintenanceExpires`** <span class="type-label">string</span>
- **`MaximumAvailableVersion`** <span class="type-label">string</span>
- **`MaximumAvailableVersionCoveredByLicense`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "IsDatabaseEncrypted": true,
  "IsInMaintenanceMode": true,
  "IsMajorMinorUpgrade": true,
  "IsPotentialClone": true,
  "IsUpgradeAvailable": true,
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
</div>

## Get counts of documents in the server

`GET` `/api/serverstatus/counts`

List counts of various document types to assist in diagnosing issues with the server.

**Response**

`200` — The requested Server Document Counts

`ServerDocumentCounts`.

- **`Global`** <span class="type-label">object</span>
  - **`Spaces`** <span class="type-label">integer</span>
  - **`Teams`** <span class="type-label">integer</span>
  - **`Users`** <span class="type-label">integer</span>
- **`Infrastructure`** <span class="type-label">object</span>
  - **`DeploymentTargets`** <span class="type-label">integer</span>
  - **`Environments`** <span class="type-label">integer</span>
  - **`Tenants`** <span class="type-label">integer</span>
  - **`WorkerPools`** <span class="type-label">integer</span>
  - **`Workers`** <span class="type-label">integer</span>
- **`Library`** <span class="type-label">object</span>
  - **`Certificates`** <span class="type-label">integer</span>
  - **`Packages`** <span class="type-label">integer</span>
  - **`VariableSets`** <span class="type-label">integer</span>
- **`Project`** <span class="type-label">object</span>
  - **`Deployments`** <span class="type-label">integer</span>
  - **`Projects`** <span class="type-label">integer</span>
  - **`Releases`** <span class="type-label">integer</span>
  - **`RunbookRuns`** <span class="type-label">integer</span>
  - **`Runbooks`** <span class="type-label">integer</span>

<div data-example="Response">

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
</div>

## Forces a GC collect

`POST` `/api/serverstatus/gc-collect`

Triggers a garbage collection pass for all heap generations, including the large object heap.

**Response**

`200` — OK

## Forces a GC collect

`POST` `/api/serverstatus/gc-collect/v1`

Triggers a garbage collection pass for all heap generations, including the large object heap.

**Response**

`200` — Internal

`TriggerGarbageCollectionResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Get the general health of Octopus Server

`GET` `/api/serverstatus/health`

Provides a super simple interface perfect for checking the general health of your entire Octopus Server cluster.

**Response**

`200` — A snapshot of the server or cluster's current health

`ServerStatusHealthResource`.

- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsCompliantWithLicense`** <span class="type-label">boolean</span>
- **`IsEntireClusterDrainingTasks`** <span class="type-label">boolean</span>
- **`IsEntireClusterReadOnly`** <span class="type-label">boolean</span>
- **`IsOperatingNormally`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

<div data-example="Response">

```json
{
  "Description": "string",
  "Id": "string",
  "IsCompliantWithLicense": true,
  "IsEntireClusterDrainingTasks": true,
  "IsEntireClusterReadOnly": true,
  "IsOperatingNormally": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
</div>

**Error Responses**

- **`418`** — Indicates that the server is not operating normally

## Retrieves the most recent high-priority log messages from this execution of the Octopus Server process

`GET` `/api/serverstatus/logs`

**Parameters**

- **`includeDetail`** <span class="type-label">boolean</span>
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The most recent high-priority log messages from this execution of the Octopus Server process

an array of `ActivityLogElement`.

- **`Category`** <span class="type-label">string</span>
- **`Detail`** <span class="type-label">string</span>
- **`GapLastNumber`** <span class="type-label">integer</span>
- **`MessageText`** <span class="type-label">string</span>
- **`Number`** <span class="type-label">integer</span>
- **`OccurredAt`** <span class="type-label">string</span> — Format `date-time`.

<div data-example="Response">

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
</div>

## Provides information about the Octopus Server process and the machine on which it is running

`GET` `/api/serverstatus/system-info`

**Response**

`200` — Information about the Octopus Server process and the machine on which it is running.

`SystemInfoResource`.

- **`ClrVersion`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MinThreadPoolCount`** <span class="type-label">integer</span>
- **`OSVersion`** <span class="type-label">string</span>
- **`ThreadCount`** <span class="type-label">integer</span>
- **`Uptime`** <span class="type-label">string</span> — Format `date-span`.
- **`Version`** <span class="type-label">string</span>
- **`WorkingSetBytes`** <span class="type-label">integer</span>

<div data-example="Response">

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
</div>

## Creates a .zip archive containing an aggregate of the other system information APIs

`GET` `/api/serverstatus/system-report`

**Parameters**

- **`nodeSpecificOnly`** <span class="type-label">boolean</span> — When true, only node-specific sections are included (recent logs, system info, filesystem logs). Defaults to false (full report) when not set.

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Lists timezones supported by the server

`GET` `/api/serverstatus/timezones`

**Response**

`200` — The requested list of timezones supported by the server.

an array of `ServerTimezoneResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsLocal`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "Id": "string",
    "IsLocal": true,
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
</div>
