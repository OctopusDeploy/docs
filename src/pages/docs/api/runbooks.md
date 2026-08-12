---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Runbooks
---

## Retrieves a list of Runbooks that will be converted to Git, along with how many RunbookRun History records will be updated

`GET` `/api/{spaceId}/projects/{projectId}/git/migrate-runbooks`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/migrate-runbooks`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Returns as summary of the runbooks that will be converted to Git

`ConvertRunbookToGitSummaryResponse`.

- **`DraftRunbooks`** <span class="type-label">array of object</span>
  - **`RunbookId`** <span class="type-label">string</span>
  - **`RunbookName`** <span class="type-label">string</span>
- **`PublishedRunbooks`** <span class="type-label">array of object</span>
  - **`RunbookId`** <span class="type-label">string</span>
  - **`RunbookName`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "DraftRunbooks": [
    {
      "RunbookId": "string",
      "RunbookName": "string"
    }
  ],
  "PublishedRunbooks": [
    {
      "RunbookId": "string",
      "RunbookName": "string"
    }
  ]
}
```
</div>

## Get a paginated list of the Runbooks that belong to the given Project

`GET` `/api/{spaceId}/projects/{projectId}/runbooks`

Also reachable at `/api/projects/{projectId}/runbooks`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`excludedRunbookTags`** <span class="type-label">array of string</span> — A list of tag IDs to exclude runbooks by. Returns runbooks that have none of the specified tags.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`runbookTags`** <span class="type-label">array of string</span> — A list of tag IDs to filter runbooks by. Returns runbooks that have any of the specified tags.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

`RunbookResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`CancelQueuedTasks`** <span class="type-label">boolean</span>
  - **`CancelRunningTasks`** <span class="type-label">boolean</span>
  - **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
  - **`Description`** <span class="type-label">string</span>
  - **`EnvironmentScope`** <span class="type-label">enum</span> — Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
  - **`Environments`** <span class="type-label">array of string</span>
  - **`FailTargetDiscovery`** <span class="type-label">boolean</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MultiTenancyMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Name`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`PublishedRunbookSnapshotId`** <span class="type-label">string</span>
  - **`RunRetentionPolicy`** <span class="type-label">object</span>
  - **`RunbookProcessId`** <span class="type-label">string</span>
  - **`RunbookTags`** <span class="type-label">array of string</span> — List of tags assigned to this runbook.
  - **`Slug`** <span class="type-label">string</span>
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
      "CancelQueuedTasks": true,
      "CancelRunningTasks": true,
      "ConnectivityPolicy": {
        "AllowDeploymentsToNoTargets": true,
        "ExcludeUnhealthyTargets": true,
        "SkipMachineBehavior": "None",
        "TargetRoles": [
          "string"
        ]
      },
      "DefaultGuidedFailureMode": "EnvironmentDefault",
      "Description": "string",
      "EnvironmentScope": "All",
      "Environments": [
        "string"
      ],
      "FailTargetDiscovery": true,
      "ForcePackageDownload": true,
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "MultiTenancyMode": "Untenanted",
      "Name": "string",
      "ProjectId": "string",
      "PublishedRunbookSnapshotId": "string",
      "RunRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      },
      "RunbookProcessId": "string",
      "RunbookTags": [
        "string"
      ],
      "Slug": "string",
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

## Create a new Runbook or clone an existing Runbook

`POST` `/api/{spaceId}/projects/{projectId}/runbooks`

Also reachable at `/api/projects/{projectId}/runbooks`, `/api/runbooks`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks`, `/api/spaces/{spaceIdentifier}/runbooks`, `/api/{spaceId}/runbooks`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The Project that contains the Runbook.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`CreateOrCloneRunbookInDatabaseCommand`

- **`Clone`** <span class="type-label">string</span> — The ID of an existing database runbook to copy. Cloning brings across the source runbook's settings, its process and steps, and any project triggers that target it. The source runbook's tags come across too, unless you supply RunbookTags. Leave unset to create a runbook from scratch, which starts with an empty process.
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — What a run does when a step fails. One of 'EnvironmentDefault' (follow the target environment's setting), 'Off' (fail the run immediately, the default), or 'On' (pause the run and wait for someone to choose whether to retry, ignore or abort). Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** <span class="type-label">string</span> — The description of the Runbook to create.
- **`EnvironmentScope`** <span class="type-label">enum</span> — Which environments the runbook may be run in. One of 'All' (every environment in the space, the default), 'Specified' (only the environments listed in Environments), or 'FromProjectLifecycles' (only the environments used by the project's lifecycles). Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** <span class="type-label">array of string</span> — The environments the runbook may be run in. Only applies when EnvironmentScope is 'Specified'; ignored otherwise.
- **`ForcePackageDownload`** <span class="type-label">boolean</span> — Re-download every package on each run instead of reusing the copy already cached on the deployment target.
- **`MultiTenancyMode`** <span class="type-label">enum</span> — Whether the runbook can be run for tenants. One of 'Untenanted' (untenanted runs only, the default), 'Tenanted' (a tenant must be supplied for every run), or 'TenantedOrUntenanted' (either is allowed). Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the Runbook to create. Minimum length 1.
- **`ProjectId`** <span class="type-label">string</span> *(required)* — The ID of the project to create the runbook in. Must be a project that stores its runbooks in the Octopus database.
- **`PublishedRunbookSnapshotId`** <span class="type-label">string</span> — Leave unset. A snapshot can only be published after the runbook exists and has a process.
- **`RunRetentionPolicy`** <span class="type-label">object</span> *(required)*
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** <span class="type-label">string</span> — Leave unset. Octopus creates an empty runbook process for the new runbook and links it automatically.
- **`RunbookTags`** <span class="type-label">array of string</span> — Tags to apply to the runbook, each written as "TagSet/Tag" using either the names or the IDs of the tag set and tag (for example "Ops/Nightly"). Call find_tag_sets to discover which tag sets apply to runbooks and what tags they contain.
- **`Slug`** <span class="type-label">string</span> — A short URL-friendly identifier for the runbook, unique within the project. Generated from the name when omitted.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "Clone": "string",
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "Description": "string",
  "EnvironmentScope": "All",
  "Environments": [
    "string"
  ],
  "ForcePackageDownload": true,
  "MultiTenancyMode": "Untenanted",
  "Name": "string",
  "ProjectId": "string",
  "PublishedRunbookSnapshotId": "string",
  "RunRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "RunbookProcessId": "string",
  "RunbookTags": [
    "string"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`201` — Created

`RunbookResource`.

- **`CancelQueuedTasks`** <span class="type-label">boolean</span>
- **`CancelRunningTasks`** <span class="type-label">boolean</span>
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentScope`** <span class="type-label">enum</span> — Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** <span class="type-label">array of string</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`PublishedRunbookSnapshotId`** <span class="type-label">string</span>
- **`RunRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** <span class="type-label">string</span>
- **`RunbookTags`** <span class="type-label">array of string</span> — List of tags assigned to this runbook.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "Description": "string",
  "EnvironmentScope": "All",
  "Environments": [
    "string"
  ],
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MultiTenancyMode": "Untenanted",
  "Name": "string",
  "ProjectId": "string",
  "PublishedRunbookSnapshotId": "string",
  "RunRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "RunbookProcessId": "string",
  "RunbookTags": [
    "string"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Gets a list of Runbooks for a Project

`GET` `/api/{spaceId}/projects/{projectId}/runbooks/all/v2`

Also reachable at `/api/projects/{projectId}/runbooks/all/v2`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/all/v2`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project containing the resource(s).
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — A list of Runbook resource ids used to filter a query.

**Response**

`200` — Requested list of Runbooks

`GetAllRunbooksByProjectResponseV2`.

- **`Runbooks`** <span class="type-label">array of object</span>
  - **`CancelQueuedTasks`** <span class="type-label">boolean</span>
  - **`CancelRunningTasks`** <span class="type-label">boolean</span>
  - **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
  - **`Description`** <span class="type-label">string</span>
  - **`EnvironmentScope`** <span class="type-label">enum</span> — Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
  - **`Environments`** <span class="type-label">array of string</span>
  - **`FailTargetDiscovery`** <span class="type-label">boolean</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MultiTenancyMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Name`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`PublishedRunbookSnapshotId`** <span class="type-label">string</span>
  - **`RunRetentionPolicy`** <span class="type-label">object</span>
  - **`RunbookProcessId`** <span class="type-label">string</span>
  - **`RunbookTags`** <span class="type-label">array of string</span> — List of tags assigned to this runbook.
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Runbooks": [
    {
      "CancelQueuedTasks": true,
      "CancelRunningTasks": true,
      "ConnectivityPolicy": {
        "AllowDeploymentsToNoTargets": true,
        "ExcludeUnhealthyTargets": true,
        "SkipMachineBehavior": "None",
        "TargetRoles": [
          "string"
        ]
      },
      "DefaultGuidedFailureMode": "EnvironmentDefault",
      "Description": "string",
      "EnvironmentScope": "All",
      "Environments": [
        "string"
      ],
      "FailTargetDiscovery": true,
      "ForcePackageDownload": true,
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "MultiTenancyMode": "Untenanted",
      "Name": "string",
      "ProjectId": "string",
      "PublishedRunbookSnapshotId": "string",
      "RunRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      },
      "RunbookProcessId": "string",
      "RunbookTags": [
        "string"
      ],
      "Slug": "string",
      "SpaceId": "string"
    }
  ]
}
```
</div>

## Create a new Database Runbook

`POST` `/api/{spaceId}/projects/{projectId}/runbooks/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/v2`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateRunbookInDatabaseCommandV2`

- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentScope`** <span class="type-label">enum</span> — Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** <span class="type-label">array of string</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`MultiTenancyMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`RunRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`RunbookTags`** <span class="type-label">array of string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*

<div data-example="Request">

```json
{
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "Description": "string",
  "EnvironmentScope": "All",
  "Environments": [
    "string"
  ],
  "ForcePackageDownload": true,
  "MultiTenancyMode": "Untenanted",
  "Name": "string",
  "ProjectId": "string",
  "RunRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "RunbookTags": [
    "string"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`201` — Created

`CreateRunbookInDatabaseResponseV2`.

- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`ProjectId`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "Id": "string",
  "Name": "string",
  "ProjectId": "string",
  "Slug": "string"
}
```
</div>

## Get a Runbook by ID

`GET` `/api/{spaceId}/projects/{projectId}/runbooks/{id}`

Also reachable at `/api/projects/{projectId}/runbooks/{id}`, `/api/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/runbooks/{id}`, `/api/{spaceId}/runbooks/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook to retrieve.
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Returns a runbook

`RunbookResource`.

- **`CancelQueuedTasks`** <span class="type-label">boolean</span>
- **`CancelRunningTasks`** <span class="type-label">boolean</span>
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentScope`** <span class="type-label">enum</span> — Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** <span class="type-label">array of string</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`PublishedRunbookSnapshotId`** <span class="type-label">string</span>
- **`RunRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** <span class="type-label">string</span>
- **`RunbookTags`** <span class="type-label">array of string</span> — List of tags assigned to this runbook.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "Description": "string",
  "EnvironmentScope": "All",
  "Environments": [
    "string"
  ],
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MultiTenancyMode": "Untenanted",
  "Name": "string",
  "ProjectId": "string",
  "PublishedRunbookSnapshotId": "string",
  "RunRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "RunbookProcessId": "string",
  "RunbookTags": [
    "string"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Updates an existing Runbook

`PUT` `/api/{spaceId}/projects/{projectId}/runbooks/{id}`

Also reachable at `/api/projects/{projectId}/runbooks/{id}`, `/api/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/runbooks/{id}`, `/api/{spaceId}/runbooks/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the runbook to update, for example 'Runbooks-123'.
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project the runbook belongs to. Must be a project that stores its runbooks in the Octopus database.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyRunbookInDatabaseCommand`

- **`CancelQueuedTasks`** <span class="type-label">boolean</span> — When a new run of this runbook is queued, automatically cancel earlier runs of it that are still queued and now superseded. This is a standing setting on the runbook, not an instruction to cancel anything right now. Omit to leave the current setting unchanged.
- **`CancelRunningTasks`** <span class="type-label">boolean</span> — When a new run of this runbook is queued, automatically cancel an earlier run of it that is already executing and now superseded. This is a standing setting on the runbook, not an instruction to cancel anything right now. Omit to leave the current setting unchanged.
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — What a run does when a step fails. One of 'EnvironmentDefault' (follow the target environment's setting), 'Off' (fail the run immediately), or 'On' (pause the run and wait for someone to choose whether to retry, ignore or abort). Resets to 'Off' when omitted. Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentScope`** <span class="type-label">enum</span> — Which environments the runbook may be run in. One of 'All' (every environment in the space), 'Specified' (only the environments listed in Environments), or 'FromProjectLifecycles' (only the environments used by the project's lifecycles). Resets to 'All' when omitted. Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** <span class="type-label">array of string</span> — The runbook's complete environment list, used when EnvironmentScope is 'Specified'. This replaces the current list, so resubmit the existing environments you want to keep. The update is rejected if it would remove an environment that a project trigger still runs this runbook in.
- **`FailTargetDiscovery`** <span class="type-label">boolean</span> — Fail a run when one of its target discovery steps finds no matching deployment targets, instead of letting the step succeed. Resets to false when omitted.
- **`ForcePackageDownload`** <span class="type-label">boolean</span> — Re-download every package on each run instead of reusing the copy already cached on the deployment target. Resets to false when omitted.
- **`Id`** <span class="type-label">string</span> *(required)* — The ID of the runbook to update, for example 'Runbooks-123'.
- **`MultiTenancyMode`** <span class="type-label">enum</span> — Whether the runbook can be run for tenants. One of 'Untenanted' (untenanted runs only), 'Tenanted' (a tenant must be supplied for every run), or 'TenantedOrUntenanted' (either is allowed). Resets to 'Untenanted' when omitted. Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ProjectId`** <span class="type-label">string</span> *(required)* — The ID of the project the runbook belongs to. Must be a project that stores its runbooks in the Octopus database.
- **`PublishedRunbookSnapshotId`** <span class="type-label">string</span> — The ID of the runbook snapshot to publish. Setting this to a different snapshot publishes that snapshot, which is what subsequent runs execute. Resubmit the current value to leave the published snapshot alone.
- **`RunRetentionPolicy`** <span class="type-label">object</span> *(required)*
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** <span class="type-label">string</span> — Leave this as the value returned by get_runbook. Octopus manages the link between a runbook and its process.
- **`RunbookTags`** <span class="type-label">array of string</span> — The runbook's complete set of tags, each written as "TagSet/Tag" using either the names or the IDs of the tag set and tag (for example "Ops/Nightly"). This replaces the current tags, so resubmit the existing ones you want to keep. Call find_tag_sets to discover which tag sets apply to runbooks.
- **`Slug`** <span class="type-label">string</span> — A short URL-friendly identifier for the runbook, unique within the project. The current slug is kept when omitted.
- **`SpaceId`** <span class="type-label">string</span> *(required)*

<div data-example="Request">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "Description": "string",
  "EnvironmentScope": "All",
  "Environments": [
    "string"
  ],
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "Id": "string",
  "MultiTenancyMode": "Untenanted",
  "Name": "string",
  "ProjectId": "string",
  "PublishedRunbookSnapshotId": "string",
  "RunRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "RunbookProcessId": "string",
  "RunbookTags": [
    "string"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Runbook has been modified, containing the updated Runbook

`RunbookResource`.

- **`CancelQueuedTasks`** <span class="type-label">boolean</span>
- **`CancelRunningTasks`** <span class="type-label">boolean</span>
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentScope`** <span class="type-label">enum</span> — Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** <span class="type-label">array of string</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`PublishedRunbookSnapshotId`** <span class="type-label">string</span>
- **`RunRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** <span class="type-label">string</span>
- **`RunbookTags`** <span class="type-label">array of string</span> — List of tags assigned to this runbook.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "Description": "string",
  "EnvironmentScope": "All",
  "Environments": [
    "string"
  ],
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MultiTenancyMode": "Untenanted",
  "Name": "string",
  "ProjectId": "string",
  "PublishedRunbookSnapshotId": "string",
  "RunRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "RunbookProcessId": "string",
  "RunbookTags": [
    "string"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Deletes an existing Runbook

`DELETE` `/api/{spaceId}/projects/{projectId}/runbooks/{id}`

Also reachable at `/api/projects/{projectId}/runbooks/{id}`, `/api/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/runbooks/{id}`, `/api/{spaceId}/runbooks/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook to delete.
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

## Get a list of environments a Runbook can be run within, based on its EnvironmentScope

`GET` `/api/{spaceId}/projects/{projectId}/runbooks/{id}/environments`

Also reachable at `/api/projects/{projectId}/runbooks/{id}/environments`, `/api/runbooks/{id}/environments`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}/environments`, `/api/spaces/{spaceIdentifier}/runbooks/{id}/environments`, `/api/{spaceId}/runbooks/{id}/environments`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project containing this resource. Will be inferred if not provided.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Runbook Environments

an array of `EnvironmentResource`.

- **`AllowDynamicInfrastructure`** <span class="type-label">boolean</span> — If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
- **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** <span class="type-label">array of string</span> — List of tags assigned to this environment.
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** <span class="type-label">string</span>
- **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

<div data-example="Response">

```json
[
  {
    "AllowDynamicInfrastructure": true,
    "Description": "string",
    "EnvironmentTags": [
      "string"
    ],
    "ExtensionSettings": [
      {
        "ExtensionId": "string",
        "Values": "string"
      }
    ],
    "Id": "string",
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
    "UseGuidedFailure": true
  }
]
```
</div>

## Get a list of environments a Runbook can be run within, based on its EnvironmentScope

`GET` `/api/{spaceId}/projects/{projectId}/runbooks/{id}/environments/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}/environments/v2`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project containing this resource. Will be inferred if not provided.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Runbook Environments

`GetRunbookEnvironmentsInDatabaseResponseV2`.

- **`Environments`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
  - **`EnvironmentTags`** <span class="type-label">array of string</span> — List of tags assigned to this environment.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this environment. This should be short, preferably 5-20 characters. Minimum length 1.
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Type`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Environments": [
    {
      "Description": "string",
      "EnvironmentTags": [
        "string"
      ],
      "Id": "string",
      "Name": "string",
      "Slug": "string",
      "SpaceId": "string",
      "Type": "string"
    }
  ]
}
```
</div>

## Gets all of the information necessary for creating or editing a Runbook Run for this Runbook (when you do not have a snapshot)

`GET` `/api/{spaceId}/projects/{projectId}/runbooks/{id}/runbookRunTemplate`

Also reachable at `/api/projects/{projectId}/runbooks/{id}/runbookRunTemplate`, `/api/runbooks/{id}/runbookRunTemplate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}/runbookRunTemplate`, `/api/spaces/{spaceIdentifier}/runbooks/{id}/runbookRunTemplate`, `/api/{spaceId}/runbooks/{id}/runbookRunTemplate`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook to get a Runbook Run Template for.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the project the runbook belongs to.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Runbook Template

`RunbookRunTemplateResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsGitResourceModified`** <span class="type-label">boolean</span>
- **`IsLibraryVariableSetModified`** <span class="type-label">boolean</span>
- **`IsRunbookProcessModified`** <span class="type-label">boolean</span>
- **`IsVariableSetModified`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PromoteTo`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span>
  - **`Name`** <span class="type-label">string</span>
- **`TenantPromotions`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`PromoteTo`** <span class="type-label">array of object</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "IsGitResourceModified": true,
  "IsLibraryVariableSetModified": true,
  "IsRunbookProcessModified": true,
  "IsVariableSetModified": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "PromoteTo": [
    {
      "Id": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
    }
  ],
  "TenantPromotions": [
    {
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "PromoteTo": [
        {}
      ]
    }
  ]
}
```
</div>

## Get a Runbook Run Preview for a Runbook

`GET` `/api/{spaceId}/projects/{projectId}/runbooks/{id}/runbookRuns/preview/{environment}`

Also reachable at `/api/projects/{projectId}/runbooks/{id}/runbookRuns/preview/{environment}`, `/api/runbooks/{id}/runbookRuns/preview/{environment}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}/runbookRuns/preview/{environment}`, `/api/spaces/{spaceIdentifier}/runbooks/{id}/runbookRuns/preview/{environment}`, `/api/{spaceId}/runbooks/{id}/runbookRuns/preview/{environment}`.

Gets a Runbook Run Preview that describes what steps will/won't be run during a Runbook Run on a given environment (and tenant if supplied) for a Runbook.

**Parameters**

- **`environment`** <span class="type-label">string</span> *(required)* — ID of the Environment.
- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`includeDisabledSteps`** <span class="type-label">boolean</span> — Boolean to include/exclude disabled steps from response.
- **`tenant`** <span class="type-label">string</span> — ID of the Tenant.

**Response**

`200` — Success

`RunbookRunPreviewResource`.

- **`Form`** <span class="type-label">object</span>
  - **`Elements`** <span class="type-label">array of object</span> — Elements of the form.
  - **`Values`** <span class="type-label">object</span> — Values supplied for the form elements.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** <span class="type-label">array of object</span>
  - **`ActionId`** <span class="type-label">string</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`ActionNumber`** <span class="type-label">string</span>
  - **`AvailableTagSets`** <span class="type-label">array of object</span>
  - **`CanBeSkipped`** <span class="type-label">boolean</span>
  - **`ExcludedMachines`** <span class="type-label">array of object</span>
  - **`HasNoApplicableMachines`** <span class="type-label">boolean</span>
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`MachineNames`** <span class="type-label">array of string</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of string</span>
  - **`UnavailableMachines`** <span class="type-label">array of object</span>
- **`UseGuidedFailureModeByDefault`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "Form": {
    "Elements": [
      {
        "Control": {},
        "IsValueRequired": true,
        "Name": "string"
      }
    ],
    "Values": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "StepsToExecute": [
    {
      "ActionId": "string",
      "ActionName": "string",
      "ActionNumber": "string",
      "AvailableTagSets": [
        {}
      ],
      "CanBeSkipped": true,
      "ExcludedMachines": [
        {}
      ],
      "HasNoApplicableMachines": true,
      "IsDisabled": true,
      "MachineNames": [
        "string"
      ],
      "Machines": [
        {}
      ],
      "Roles": [
        "string"
      ],
      "UnavailableMachines": [
        {}
      ]
    }
  ],
  "UseGuidedFailureModeByDefault": true
}
```
</div>

## Get a Runbook Run Preview for a Runbook

`GET` `/api/{spaceId}/projects/{projectId}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`

Also reachable at `/api/projects/{projectId}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`, `/api/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`, `/api/spaces/{spaceIdentifier}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`, `/api/{spaceId}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`.

Gets a Runbook Run Preview that describes what steps will/won't be run during a Runbook Run on a given environment (and tenant if supplied) for a Runbook.

**Parameters**

- **`environment`** <span class="type-label">string</span> *(required)* — ID of the Environment.
- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`tenant`** <span class="type-label">string</span> *(required)* — ID of the Tenant.

- **`includeDisabledSteps`** <span class="type-label">boolean</span> — Boolean to include/exclude disabled steps from response.

**Response**

`200` — Success

`RunbookRunPreviewResource`.

- **`Form`** <span class="type-label">object</span>
  - **`Elements`** <span class="type-label">array of object</span> — Elements of the form.
  - **`Values`** <span class="type-label">object</span> — Values supplied for the form elements.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** <span class="type-label">array of object</span>
  - **`ActionId`** <span class="type-label">string</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`ActionNumber`** <span class="type-label">string</span>
  - **`AvailableTagSets`** <span class="type-label">array of object</span>
  - **`CanBeSkipped`** <span class="type-label">boolean</span>
  - **`ExcludedMachines`** <span class="type-label">array of object</span>
  - **`HasNoApplicableMachines`** <span class="type-label">boolean</span>
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`MachineNames`** <span class="type-label">array of string</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of string</span>
  - **`UnavailableMachines`** <span class="type-label">array of object</span>
- **`UseGuidedFailureModeByDefault`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "Form": {
    "Elements": [
      {
        "Control": {},
        "IsValueRequired": true,
        "Name": "string"
      }
    ],
    "Values": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "StepsToExecute": [
    {
      "ActionId": "string",
      "ActionName": "string",
      "ActionNumber": "string",
      "AvailableTagSets": [
        {}
      ],
      "CanBeSkipped": true,
      "ExcludedMachines": [
        {}
      ],
      "HasNoApplicableMachines": true,
      "IsDisabled": true,
      "MachineNames": [
        "string"
      ],
      "Machines": [
        {}
      ],
      "Roles": [
        "string"
      ],
      "UnavailableMachines": [
        {}
      ]
    }
  ],
  "UseGuidedFailureModeByDefault": true
}
```
</div>

## Runs the published version of this Runbook

`POST` `/api/{spaceId}/projects/{projectId}/runbooks/{runbookId}/run`

Also reachable at `/api/projects/{projectId}/runbooks/{runbookId}/run`, `/api/runbooks/{runbookId}/run`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{runbookId}/run`, `/api/spaces/{spaceIdentifier}/runbooks/{runbookId}/run`, `/api/{spaceId}/runbooks/{runbookId}/run`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the project that the runbook belongs to.
- **`runbookId`** <span class="type-label">string</span> *(required)* — ID of the runbook to run.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`RunRunbookCommandV1`

- **`ChangeRequestSettings`** <span class="type-label">array of object</span> — Change Request Settings.
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Comments`** <span class="type-label">string</span> — Any additional information/context.
- **`DebugMode`** <span class="type-label">string</span> — If set to true contributes the OctopusPrintVariables and OctopusPrintEvaluatedVariables variables to the runbook run.
- **`EnvironmentId`** <span class="type-label">string</span> — Legacy single-environment field; prefer EnvironmentIds. If set, this environment is added to the ones the runbook runs in. At least one of EnvironmentIds or EnvironmentId is required.
- **`EnvironmentIds`** <span class="type-label">array of string</span> — The environments to run the runbook in — the preferred way to specify targets, one run per environment. At least one of EnvironmentIds or EnvironmentId is required.
- **`ExcludedMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the runbook run.
- **`ExcludedTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`FailTargetDiscovery`** <span class="type-label">boolean</span> — Whether to skip or fail cloud discovery steps with no matching target (default false).
- **`ForcePackageDownload`** <span class="type-label">boolean</span> — Whether to force downloading of already installed packages (flag, default false).
- **`FormValues`** <span class="type-label">object</span> — Variables.
- **`Priority`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span> — ID of the project that the runbook belongs to.
- **`QueueTime`** <span class="type-label">string</span> — The time to execute the runbook run. Format `date-time`.
- **`QueueTimeExpiry`** <span class="type-label">string</span> — The time at which the runbook run will timeout if it has not started executing. Format `date-time`.
- **`RunbookId`** <span class="type-label">string</span> *(required)* — ID of the runbook to run.
- **`RunbookSnapshotNameOrId`** <span class="type-label">string</span> — Name or ID of a specific snapshot to run. Leave unset to run the published snapshot; when you set this, also set UseDefaultSnapshot to false.
- **`SkipActions`** <span class="type-label">array of string</span> — Actions that are to be skipped for this runbook.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`SpecificMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that the runbook should be run on. If the collection is empty, all enabled machines are used.
- **`SpecificTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`TenantId`** <span class="type-label">string</span> — Legacy single-tenant field; prefer TenantIds. If set, this tenant is added to the ones the runbook runs for.
- **`TenantIds`** <span class="type-label">array of string</span> — The tenants to run the runbook for — the preferred way to specify tenants, creating one run per environment/tenant combination. Leave empty for an untenanted run.
- **`TenantTagNames`** <span class="type-label">array of string</span> — The tenant tags to filter tenants to run the runbook.
- **`UseDefaultSnapshot`** <span class="type-label">boolean</span> — Whether to run the runbook's published (default) snapshot. Leave true to run the published snapshot; set to false when you name a specific snapshot in RunbookSnapshotNameOrId.
- **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, the runbook will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

<div data-example="Request">

```json
{
  "ChangeRequestSettings": [
    {
      "Type": "ServiceNow"
    }
  ],
  "Comments": "string",
  "DebugMode": "string",
  "EnvironmentId": "string",
  "EnvironmentIds": [
    "string"
  ],
  "ExcludedMachineIds": [
    "string"
  ],
  "ExcludedTargetTagIds": [
    "string"
  ],
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "FormValues": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Priority": "string",
  "ProjectId": "string",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "RunbookId": "string",
  "RunbookSnapshotNameOrId": "string",
  "SkipActions": [
    "string"
  ],
  "SpaceId": "string",
  "SpecificMachineIds": [
    "string"
  ],
  "SpecificTargetTagIds": [
    "string"
  ],
  "TenantId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTagNames": [
    "string"
  ],
  "UseDefaultSnapshot": true,
  "UseGuidedFailure": true
}
```
</div>

**Response**

`200` — OK

## Get a list of Runbook Run Previews for a Runbook

`POST` `/api/{spaceId}/projects/{projectId}/runbooks/{runbookId}/runbookRuns/previews`

Also reachable at `/api/projects/{projectId}/runbooks/{runbookId}/runbookRuns/previews`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{runbookId}/runbookRuns/previews`.

Gets a list of Runbook Run Previews that describes what steps will/won't be run during a Runbook Run on a given environment and tenant for a Runbook.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`runbookId`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`GetRunbookRunPreviewsInDatabaseRequest`

- **`DeploymentPreviews`** <span class="type-label">array of object</span> *(required)* — A list of Tenant/Environment mappings to retrieve runbook run previews for.
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`IncludeDisabledSteps`** <span class="type-label">boolean</span> — Boolean to include/exclude disabled steps from response.
- **`ProjectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`RunbookId`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "DeploymentPreviews": [
    {
      "EnvironmentId": "string",
      "TenantId": "string"
    }
  ],
  "IncludeDisabledSteps": true,
  "ProjectId": "string",
  "RunbookId": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — The requested list of Runbook Run previews

an array of `RunbookRunPreviewResource`.

- **`Form`** <span class="type-label">object</span>
  - **`Elements`** <span class="type-label">array of object</span> — Elements of the form.
  - **`Values`** <span class="type-label">object</span> — Values supplied for the form elements.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** <span class="type-label">array of object</span>
  - **`ActionId`** <span class="type-label">string</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`ActionNumber`** <span class="type-label">string</span>
  - **`AvailableTagSets`** <span class="type-label">array of object</span>
  - **`CanBeSkipped`** <span class="type-label">boolean</span>
  - **`ExcludedMachines`** <span class="type-label">array of object</span>
  - **`HasNoApplicableMachines`** <span class="type-label">boolean</span>
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`MachineNames`** <span class="type-label">array of string</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of string</span>
  - **`UnavailableMachines`** <span class="type-label">array of object</span>
- **`UseGuidedFailureModeByDefault`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
[
  {
    "Form": {
      "Elements": [
        {}
      ],
      "Values": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      }
    },
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "StepsToExecute": [
      {
        "ActionId": "string",
        "ActionName": "string",
        "ActionNumber": "string",
        "AvailableTagSets": [
          {}
        ],
        "CanBeSkipped": true,
        "ExcludedMachines": [
          {}
        ],
        "HasNoApplicableMachines": true,
        "IsDisabled": true,
        "MachineNames": [
          "string"
        ],
        "Machines": [
          {}
        ],
        "Roles": [
          "string"
        ],
        "UnavailableMachines": [
          {}
        ]
      }
    ],
    "UseGuidedFailureModeByDefault": true
  }
]
```
</div>

## Gets all of the information necessary for creating or editing a Snapshot for a Runbook

`GET` `/api/{spaceId}/projects/{projectId}/runbooks/{runbookId}/runbookSnapshotTemplate`

Also reachable at `/api/projects/{projectId}/runbooks/{runbookId}/runbookSnapshotTemplate`, `/api/runbooks/{runbookId}/runbookSnapshotTemplate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{runbookId}/runbookSnapshotTemplate`, `/api/spaces/{spaceIdentifier}/runbooks/{runbookId}/runbookSnapshotTemplate`, `/api/{spaceId}/runbooks/{runbookId}/runbookSnapshotTemplate`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — Project Id of the project containing the runbook.
- **`runbookId`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Confirmation that a new Runbook Snapshot Template has been created, containing the template

`RunbookSnapshotTemplateResource`.

- **`GitResources`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span> — Minimum length 1.
  - **`DefaultBranch`** <span class="type-label">string</span> — Minimum length 1.
  - **`FilePathFilters`** <span class="type-label">array of string</span>
  - **`GitCredentialId`** <span class="type-label">string</span>
  - **`GitHubConnectionId`** <span class="type-label">string</span>
  - **`GitResourceSelectedLastRelease`** <span class="type-label">object</span>
  - **`IsResolvable`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`RepositoryUri`** <span class="type-label">string</span> — Minimum length 1.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NextNameIncrement`** <span class="type-label">string</span>
- **`Packages`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`FeedId`** <span class="type-label">string</span>
  - **`FeedName`** <span class="type-label">string</span>
  - **`FixedVersion`** <span class="type-label">string</span>
  - **`IsResolvable`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the PackageId or FeedId contain no references to other variables. Variables can be used to select different NuGet feeds or packages at deployment time, however, this means that it's not possible to resolve which feed/package to search when creating a release.
  - **`NuGetFeedId`** <span class="type-label">string</span>
  - **`NuGetFeedName`** <span class="type-label">string</span>
  - **`NuGetPackageId`** <span class="type-label">string</span>
  - **`PackageId`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`VersionSelectedLastRelease`** <span class="type-label">string</span>
- **`RunbookId`** <span class="type-label">string</span>
- **`RunbookProcessId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "GitResources": [
    {
      "ActionName": "string",
      "DefaultBranch": "string",
      "FilePathFilters": [
        "string"
      ],
      "GitCredentialId": "string",
      "GitHubConnectionId": "string",
      "GitResourceSelectedLastRelease": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "IsResolvable": true,
      "Name": "string",
      "RepositoryUri": "string"
    }
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NextNameIncrement": "string",
  "Packages": [
    {
      "ActionName": "string",
      "FeedId": "string",
      "FeedName": "string",
      "FixedVersion": "string",
      "IsResolvable": true,
      "NuGetFeedId": "string",
      "NuGetFeedName": "string",
      "NuGetPackageId": "string",
      "PackageId": "string",
      "PackageReferenceName": "string",
      "ProjectName": "string",
      "StepName": "string",
      "VersionSelectedLastRelease": "string"
    }
  ],
  "RunbookId": "string",
  "RunbookProcessId": "string"
}
```
</div>

## Get a paginated list of the Runbooks that belong to the given Project

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)* — The GitRef containing the resource(s).
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`excludedRunbookTags`** <span class="type-label">array of string</span> — A list of tag IDs to exclude runbooks by. Returns runbooks that have none of the specified tags.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`runbookTags`** <span class="type-label">array of string</span> — A list of tag IDs to filter runbooks by. Returns runbooks that have any of the specified tags.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

`RunbookResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`CancelQueuedTasks`** <span class="type-label">boolean</span>
  - **`CancelRunningTasks`** <span class="type-label">boolean</span>
  - **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
  - **`Description`** <span class="type-label">string</span>
  - **`EnvironmentScope`** <span class="type-label">enum</span> — Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
  - **`Environments`** <span class="type-label">array of string</span>
  - **`FailTargetDiscovery`** <span class="type-label">boolean</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MultiTenancyMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Name`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`PublishedRunbookSnapshotId`** <span class="type-label">string</span>
  - **`RunRetentionPolicy`** <span class="type-label">object</span>
  - **`RunbookProcessId`** <span class="type-label">string</span>
  - **`RunbookTags`** <span class="type-label">array of string</span> — List of tags assigned to this runbook.
  - **`Slug`** <span class="type-label">string</span>
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
      "CancelQueuedTasks": true,
      "CancelRunningTasks": true,
      "ConnectivityPolicy": {
        "AllowDeploymentsToNoTargets": true,
        "ExcludeUnhealthyTargets": true,
        "SkipMachineBehavior": "None",
        "TargetRoles": [
          "string"
        ]
      },
      "DefaultGuidedFailureMode": "EnvironmentDefault",
      "Description": "string",
      "EnvironmentScope": "All",
      "Environments": [
        "string"
      ],
      "FailTargetDiscovery": true,
      "ForcePackageDownload": true,
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "MultiTenancyMode": "Untenanted",
      "Name": "string",
      "ProjectId": "string",
      "PublishedRunbookSnapshotId": "string",
      "RunRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      },
      "RunbookProcessId": "string",
      "RunbookTags": [
        "string"
      ],
      "Slug": "string",
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

## Creates a new Git runbook

`POST` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/v2`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateRunbookInGitCommandV2`

- **`ChangeDescription`** <span class="type-label">string</span>
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentScope`** <span class="type-label">enum</span> — Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** <span class="type-label">array of string</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`MultiTenancyMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`RunRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`RunbookTags`** <span class="type-label">array of string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*

<div data-example="Request">

```json
{
  "ChangeDescription": "string",
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "Description": "string",
  "EnvironmentScope": "All",
  "Environments": [
    "string"
  ],
  "ForcePackageDownload": true,
  "GitRef": "string",
  "MultiTenancyMode": "Untenanted",
  "Name": "string",
  "ProjectId": "string",
  "RunRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "RunbookTags": [
    "string"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`201` — Created

`CreateRunbookInGitResponseV2`.

- **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`ProjectId`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "GitRef": "string",
  "Id": "string",
  "Name": "string",
  "ProjectId": "string",
  "Slug": "string"
}
```
</div>

## Get a Runbook by ID

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook to retrieve.
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Returns a runbook

`RunbookResource`.

- **`CancelQueuedTasks`** <span class="type-label">boolean</span>
- **`CancelRunningTasks`** <span class="type-label">boolean</span>
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentScope`** <span class="type-label">enum</span> — Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** <span class="type-label">array of string</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`PublishedRunbookSnapshotId`** <span class="type-label">string</span>
- **`RunRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** <span class="type-label">string</span>
- **`RunbookTags`** <span class="type-label">array of string</span> — List of tags assigned to this runbook.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "Description": "string",
  "EnvironmentScope": "All",
  "Environments": [
    "string"
  ],
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MultiTenancyMode": "Untenanted",
  "Name": "string",
  "ProjectId": "string",
  "PublishedRunbookSnapshotId": "string",
  "RunRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "RunbookProcessId": "string",
  "RunbookTags": [
    "string"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Updates an existing Runbook

`PUT` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)* — The Git branch to commit the change to. This must be a branch — a tag or commit cannot be written to — and the branch must not be protected in the project's version control settings. Use get_branches to list the project's branches.
- **`id`** <span class="type-label">string</span> *(required)* — The ID of the runbook to update. A runbook stored in Git uses its slug as the ID, which is only unique within its project and Git ref.
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project the runbook belongs to. Must be a version-controlled project that stores its runbooks in Git.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyRunbookInGitCommand`

- **`CancelQueuedTasks`** <span class="type-label">boolean</span> — When a new run of this runbook is queued, automatically cancel earlier runs of it that are still queued and now superseded. This is a standing setting on the runbook, not an instruction to cancel anything right now. Omit to leave the current setting unchanged.
- **`CancelRunningTasks`** <span class="type-label">boolean</span> — When a new run of this runbook is queued, automatically cancel an earlier run of it that is already executing and now superseded. This is a standing setting on the runbook, not an instruction to cancel anything right now. Omit to leave the current setting unchanged.
- **`ChangeDescription`** <span class="type-label">string</span> — The commit message for the change. Defaults to 'Update runbook' when omitted.
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — What a run does when a step fails. One of 'EnvironmentDefault' (follow the target environment's setting), 'Off' (fail the run immediately), or 'On' (pause the run and wait for someone to choose whether to retry, ignore or abort). Resets to 'Off' when omitted. Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentScope`** <span class="type-label">enum</span> — Which environments the runbook may be run in. One of 'All' (every environment in the space), 'Specified' (only the environments listed in Environments), or 'FromProjectLifecycles' (only the environments used by the project's lifecycles). Resets to 'All' when omitted. Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** <span class="type-label">array of string</span> — The runbook's complete environment list, used when EnvironmentScope is 'Specified'. This replaces the current list, so resubmit the existing environments you want to keep. The update is rejected if it would remove an environment that a project trigger still runs this runbook in.
- **`FailTargetDiscovery`** <span class="type-label">boolean</span> — Fail a run when one of its target discovery steps finds no matching deployment targets, instead of letting the step succeed. Resets to false when omitted.
- **`ForcePackageDownload`** <span class="type-label">boolean</span> — Re-download every package on each run instead of reusing the copy already cached on the deployment target. Resets to false when omitted.
- **`GitRef`** <span class="type-label">string</span> *(required)* — The Git branch to commit the change to. This must be a branch — a tag or commit cannot be written to — and the branch must not be protected in the project's version control settings. Use get_branches to list the project's branches.
- **`Id`** <span class="type-label">string</span> *(required)* — The ID of the runbook to update. A runbook stored in Git uses its slug as the ID, which is only unique within its project and Git ref.
- **`MultiTenancyMode`** <span class="type-label">enum</span> — Whether the runbook can be run for tenants. One of 'Untenanted' (untenanted runs only), 'Tenanted' (a tenant must be supplied for every run), or 'TenantedOrUntenanted' (either is allowed). Resets to 'Untenanted' when omitted. Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ProjectId`** <span class="type-label">string</span> *(required)* — The ID of the project the runbook belongs to. Must be a version-controlled project that stores its runbooks in Git.
- **`PublishedRunbookSnapshotId`** <span class="type-label">string</span> — The ID of the runbook snapshot to publish. Resubmit the current value to leave the published snapshot alone.
- **`RunRetentionPolicy`** <span class="type-label">object</span> *(required)*
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** <span class="type-label">string</span> — Leave this as the value returned by get_runbook. Octopus manages the link between a runbook and its process.
- **`RunbookTags`** <span class="type-label">array of string</span> — The runbook's complete set of tags, each written as "TagSet/Tag" using either the names or the IDs of the tag set and tag (for example "Ops/Nightly"). This replaces the current tags, so resubmit the existing ones you want to keep. Call find_tag_sets to discover which tag sets apply to runbooks.
- **`Slug`** <span class="type-label">string</span> — A short URL-friendly identifier for the runbook, unique within the project. The current slug is kept when omitted.
- **`SpaceId`** <span class="type-label">string</span> *(required)*

<div data-example="Request">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ChangeDescription": "string",
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "Description": "string",
  "EnvironmentScope": "All",
  "Environments": [
    "string"
  ],
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "GitRef": "string",
  "Id": "string",
  "MultiTenancyMode": "Untenanted",
  "Name": "string",
  "ProjectId": "string",
  "PublishedRunbookSnapshotId": "string",
  "RunRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "RunbookProcessId": "string",
  "RunbookTags": [
    "string"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Runbook has been modified, containing the updated Runbook

`RunbookResource`.

- **`CancelQueuedTasks`** <span class="type-label">boolean</span>
- **`CancelRunningTasks`** <span class="type-label">boolean</span>
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentScope`** <span class="type-label">enum</span> — Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** <span class="type-label">array of string</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`PublishedRunbookSnapshotId`** <span class="type-label">string</span>
- **`RunRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** <span class="type-label">string</span>
- **`RunbookTags`** <span class="type-label">array of string</span> — List of tags assigned to this runbook.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "Description": "string",
  "EnvironmentScope": "All",
  "Environments": [
    "string"
  ],
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MultiTenancyMode": "Untenanted",
  "Name": "string",
  "ProjectId": "string",
  "PublishedRunbookSnapshotId": "string",
  "RunRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "RunbookProcessId": "string",
  "RunbookTags": [
    "string"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Deletes an existing Runbook

`DELETE` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)* — The GitRef containing the resource(s).
- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook to delete.
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`DeleteRunbookInGitCommand`

- **`ChangeDescription`** <span class="type-label">string</span> — The commit message for updating the Git repository.
- **`GitRef`** <span class="type-label">string</span> *(required)* — The GitRef containing the resource(s).
- **`Id`** <span class="type-label">string</span> *(required)* — ID of the Runbook to delete.
- **`ProjectId`** <span class="type-label">string</span> *(required)* — The ID of the project.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "ChangeDescription": "string",
  "GitRef": "string",
  "Id": "string",
  "ProjectId": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Success

## Get a list of environments a Runbook can be run within, based on its EnvironmentScope

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}/environments`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}/environments`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}/environments`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)* — The Git ref to read the runbook from.
- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project containing this resource.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Runbook Environments

an array of `EnvironmentResource`.

- **`AllowDynamicInfrastructure`** <span class="type-label">boolean</span> — If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
- **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** <span class="type-label">array of string</span> — List of tags assigned to this environment.
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** <span class="type-label">string</span>
- **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

<div data-example="Response">

```json
[
  {
    "AllowDynamicInfrastructure": true,
    "Description": "string",
    "EnvironmentTags": [
      "string"
    ],
    "ExtensionSettings": [
      {
        "ExtensionId": "string",
        "Values": "string"
      }
    ],
    "Id": "string",
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
    "UseGuidedFailure": true
  }
]
```
</div>

## Get a list of environments a Runbook can be run within, based on its EnvironmentScope

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}/environments/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}/environments/v2`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`id`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project containing this resource. Will be inferred if not provided.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Runbook Environments

`GetRunbookEnvironmentsInGitResponseV2`.

- **`Environments`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
  - **`EnvironmentTags`** <span class="type-label">array of string</span> — List of tags assigned to this environment.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this environment. This should be short, preferably 5-20 characters. Minimum length 1.
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Type`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Environments": [
    {
      "Description": "string",
      "EnvironmentTags": [
        "string"
      ],
      "Id": "string",
      "Name": "string",
      "Slug": "string",
      "SpaceId": "string",
      "Type": "string"
    }
  ]
}
```
</div>

## Gets all of the information necessary for creating or editing a Runbook Run for this Runbook (when you do not have a snapshot)

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRunTemplate`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRunTemplate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRunTemplate`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)* — Gitref to get the runbook template from.
- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook to get a Runbook Run Template for.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the project the runbook belongs to.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Runbook Template

`RunbookRunTemplateResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsGitResourceModified`** <span class="type-label">boolean</span>
- **`IsLibraryVariableSetModified`** <span class="type-label">boolean</span>
- **`IsRunbookProcessModified`** <span class="type-label">boolean</span>
- **`IsVariableSetModified`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PromoteTo`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span>
  - **`Name`** <span class="type-label">string</span>
- **`TenantPromotions`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`PromoteTo`** <span class="type-label">array of object</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "IsGitResourceModified": true,
  "IsLibraryVariableSetModified": true,
  "IsRunbookProcessModified": true,
  "IsVariableSetModified": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "PromoteTo": [
    {
      "Id": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
    }
  ],
  "TenantPromotions": [
    {
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "PromoteTo": [
        {}
      ]
    }
  ]
}
```
</div>

## Get a Runbook Run Preview for a Runbook

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRuns/preview/{environment}`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRuns/preview/{environment}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRuns/preview/{environment}`.

Gets a Runbook Run Preview that describes what steps will/won't be run during a Runbook Run on a given environment (and tenant if supplied) for a Runbook.

**Parameters**

- **`environment`** <span class="type-label">string</span> *(required)* — ID of the Environment.
- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`includeDisabledSteps`** <span class="type-label">boolean</span> — Boolean to include/exclude disabled steps from response.
- **`tenant`** <span class="type-label">string</span> — ID of the Tenant.

**Response**

`200` — Success

`RunbookRunPreviewResource`.

- **`Form`** <span class="type-label">object</span>
  - **`Elements`** <span class="type-label">array of object</span> — Elements of the form.
  - **`Values`** <span class="type-label">object</span> — Values supplied for the form elements.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** <span class="type-label">array of object</span>
  - **`ActionId`** <span class="type-label">string</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`ActionNumber`** <span class="type-label">string</span>
  - **`AvailableTagSets`** <span class="type-label">array of object</span>
  - **`CanBeSkipped`** <span class="type-label">boolean</span>
  - **`ExcludedMachines`** <span class="type-label">array of object</span>
  - **`HasNoApplicableMachines`** <span class="type-label">boolean</span>
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`MachineNames`** <span class="type-label">array of string</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of string</span>
  - **`UnavailableMachines`** <span class="type-label">array of object</span>
- **`UseGuidedFailureModeByDefault`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "Form": {
    "Elements": [
      {
        "Control": {},
        "IsValueRequired": true,
        "Name": "string"
      }
    ],
    "Values": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "StepsToExecute": [
    {
      "ActionId": "string",
      "ActionName": "string",
      "ActionNumber": "string",
      "AvailableTagSets": [
        {}
      ],
      "CanBeSkipped": true,
      "ExcludedMachines": [
        {}
      ],
      "HasNoApplicableMachines": true,
      "IsDisabled": true,
      "MachineNames": [
        "string"
      ],
      "Machines": [
        {}
      ],
      "Roles": [
        "string"
      ],
      "UnavailableMachines": [
        {}
      ]
    }
  ],
  "UseGuidedFailureModeByDefault": true
}
```
</div>

## Get a Runbook Run Preview for a Runbook

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`.

Gets a Runbook Run Preview that describes what steps will/won't be run during a Runbook Run on a given environment (and tenant if supplied) for a Runbook.

**Parameters**

- **`environment`** <span class="type-label">string</span> *(required)* — ID of the Environment.
- **`gitRef`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`tenant`** <span class="type-label">string</span> *(required)* — ID of the Tenant.

- **`includeDisabledSteps`** <span class="type-label">boolean</span> — Boolean to include/exclude disabled steps from response.

**Response**

`200` — Success

`RunbookRunPreviewResource`.

- **`Form`** <span class="type-label">object</span>
  - **`Elements`** <span class="type-label">array of object</span> — Elements of the form.
  - **`Values`** <span class="type-label">object</span> — Values supplied for the form elements.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** <span class="type-label">array of object</span>
  - **`ActionId`** <span class="type-label">string</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`ActionNumber`** <span class="type-label">string</span>
  - **`AvailableTagSets`** <span class="type-label">array of object</span>
  - **`CanBeSkipped`** <span class="type-label">boolean</span>
  - **`ExcludedMachines`** <span class="type-label">array of object</span>
  - **`HasNoApplicableMachines`** <span class="type-label">boolean</span>
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`MachineNames`** <span class="type-label">array of string</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of string</span>
  - **`UnavailableMachines`** <span class="type-label">array of object</span>
- **`UseGuidedFailureModeByDefault`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "Form": {
    "Elements": [
      {
        "Control": {},
        "IsValueRequired": true,
        "Name": "string"
      }
    ],
    "Values": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "StepsToExecute": [
    {
      "ActionId": "string",
      "ActionName": "string",
      "ActionNumber": "string",
      "AvailableTagSets": [
        {}
      ],
      "CanBeSkipped": true,
      "ExcludedMachines": [
        {}
      ],
      "HasNoApplicableMachines": true,
      "IsDisabled": true,
      "MachineNames": [
        "string"
      ],
      "Machines": [
        {}
      ],
      "Roles": [
        "string"
      ],
      "UnavailableMachines": [
        {}
      ]
    }
  ],
  "UseGuidedFailureModeByDefault": true
}
```
</div>

## Get a list of Runbook Run Previews for a Runbook

`POST` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{runbookId}/runbookRuns/previews`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{runbookId}/runbookRuns/previews`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{runbookId}/runbookRuns/previews`.

Gets a list of Runbook Run Previews that describes what steps will/won't be run during a Runbook Run on a given environment and tenant for a Runbook.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`runbookId`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`GetRunbookRunPreviewsInGitRequest`

- **`DeploymentPreviews`** <span class="type-label">array of object</span> *(required)* — A list of Tenant/Environment mappings to retrieve runbook run previews for.
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`IncludeDisabledSteps`** <span class="type-label">boolean</span> — Boolean to include/exclude disabled steps from response.
- **`ProjectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`RunbookId`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "DeploymentPreviews": [
    {
      "EnvironmentId": "string",
      "TenantId": "string"
    }
  ],
  "GitRef": "string",
  "IncludeDisabledSteps": true,
  "ProjectId": "string",
  "RunbookId": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — The requested list of Runbook Run previews

an array of `RunbookRunPreviewResource`.

- **`Form`** <span class="type-label">object</span>
  - **`Elements`** <span class="type-label">array of object</span> — Elements of the form.
  - **`Values`** <span class="type-label">object</span> — Values supplied for the form elements.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** <span class="type-label">array of object</span>
  - **`ActionId`** <span class="type-label">string</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`ActionNumber`** <span class="type-label">string</span>
  - **`AvailableTagSets`** <span class="type-label">array of object</span>
  - **`CanBeSkipped`** <span class="type-label">boolean</span>
  - **`ExcludedMachines`** <span class="type-label">array of object</span>
  - **`HasNoApplicableMachines`** <span class="type-label">boolean</span>
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`MachineNames`** <span class="type-label">array of string</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of string</span>
  - **`UnavailableMachines`** <span class="type-label">array of object</span>
- **`UseGuidedFailureModeByDefault`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
[
  {
    "Form": {
      "Elements": [
        {}
      ],
      "Values": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      }
    },
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "StepsToExecute": [
      {
        "ActionId": "string",
        "ActionName": "string",
        "ActionNumber": "string",
        "AvailableTagSets": [
          {}
        ],
        "CanBeSkipped": true,
        "ExcludedMachines": [
          {}
        ],
        "HasNoApplicableMachines": true,
        "IsDisabled": true,
        "MachineNames": [
          "string"
        ],
        "Machines": [
          {}
        ],
        "Roles": [
          "string"
        ],
        "UnavailableMachines": [
          {}
        ]
      }
    ],
    "UseGuidedFailureModeByDefault": true
  }
]
```
</div>

## Gets all of the information necessary for creating or editing a Snapshot for a Runbook

`GET` `/api/{spaceId}/projects/{projectId}/{gitref}/runbooks/{runbookId}/runbookSnapshotTemplate`

Also reachable at `/api/projects/{projectId}/{gitref}/runbooks/{runbookId}/runbookSnapshotTemplate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitref}/runbooks/{runbookId}/runbookSnapshotTemplate`.

**Parameters**

- **`gitref`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)* — Project Id of the project containing the runbook.
- **`runbookId`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Confirmation that a new Runbook Snapshot Template has been created, containing the template

`RunbookSnapshotTemplateResource`.

- **`GitResources`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span> — Minimum length 1.
  - **`DefaultBranch`** <span class="type-label">string</span> — Minimum length 1.
  - **`FilePathFilters`** <span class="type-label">array of string</span>
  - **`GitCredentialId`** <span class="type-label">string</span>
  - **`GitHubConnectionId`** <span class="type-label">string</span>
  - **`GitResourceSelectedLastRelease`** <span class="type-label">object</span>
  - **`IsResolvable`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`RepositoryUri`** <span class="type-label">string</span> — Minimum length 1.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NextNameIncrement`** <span class="type-label">string</span>
- **`Packages`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`FeedId`** <span class="type-label">string</span>
  - **`FeedName`** <span class="type-label">string</span>
  - **`FixedVersion`** <span class="type-label">string</span>
  - **`IsResolvable`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the PackageId or FeedId contain no references to other variables. Variables can be used to select different NuGet feeds or packages at deployment time, however, this means that it's not possible to resolve which feed/package to search when creating a release.
  - **`NuGetFeedId`** <span class="type-label">string</span>
  - **`NuGetFeedName`** <span class="type-label">string</span>
  - **`NuGetPackageId`** <span class="type-label">string</span>
  - **`PackageId`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`VersionSelectedLastRelease`** <span class="type-label">string</span>
- **`RunbookId`** <span class="type-label">string</span>
- **`RunbookProcessId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "GitResources": [
    {
      "ActionName": "string",
      "DefaultBranch": "string",
      "FilePathFilters": [
        "string"
      ],
      "GitCredentialId": "string",
      "GitHubConnectionId": "string",
      "GitResourceSelectedLastRelease": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "IsResolvable": true,
      "Name": "string",
      "RepositoryUri": "string"
    }
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NextNameIncrement": "string",
  "Packages": [
    {
      "ActionName": "string",
      "FeedId": "string",
      "FeedName": "string",
      "FixedVersion": "string",
      "IsResolvable": true,
      "NuGetFeedId": "string",
      "NuGetFeedName": "string",
      "NuGetPackageId": "string",
      "PackageId": "string",
      "PackageReferenceName": "string",
      "ProjectName": "string",
      "StepName": "string",
      "VersionSelectedLastRelease": "string"
    }
  ],
  "RunbookId": "string",
  "RunbookProcessId": "string"
}
```
</div>

## Get a list of Runbooks

`GET` `/api/{spaceId}/runbooks`

Also reachable at `/api/runbooks`, `/api/spaces/{spaceIdentifier}/runbooks`.

Gets a paginated list of the Runbooks in the supplied Octopus Deploy Space (sorted by name).

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — List of Runbook IDs which if specified, filters the result to only include Runbooks with matching IDs.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of the Runbooks in the supplied Octopus Deploy Space (sorted by name).

`RunbookResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`CancelQueuedTasks`** <span class="type-label">boolean</span>
  - **`CancelRunningTasks`** <span class="type-label">boolean</span>
  - **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
  - **`Description`** <span class="type-label">string</span>
  - **`EnvironmentScope`** <span class="type-label">enum</span> — Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
  - **`Environments`** <span class="type-label">array of string</span>
  - **`FailTargetDiscovery`** <span class="type-label">boolean</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MultiTenancyMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Name`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`PublishedRunbookSnapshotId`** <span class="type-label">string</span>
  - **`RunRetentionPolicy`** <span class="type-label">object</span>
  - **`RunbookProcessId`** <span class="type-label">string</span>
  - **`RunbookTags`** <span class="type-label">array of string</span> — List of tags assigned to this runbook.
  - **`Slug`** <span class="type-label">string</span>
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
      "CancelQueuedTasks": true,
      "CancelRunningTasks": true,
      "ConnectivityPolicy": {
        "AllowDeploymentsToNoTargets": true,
        "ExcludeUnhealthyTargets": true,
        "SkipMachineBehavior": "None",
        "TargetRoles": [
          "string"
        ]
      },
      "DefaultGuidedFailureMode": "EnvironmentDefault",
      "Description": "string",
      "EnvironmentScope": "All",
      "Environments": [
        "string"
      ],
      "FailTargetDiscovery": true,
      "ForcePackageDownload": true,
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "MultiTenancyMode": "Untenanted",
      "Name": "string",
      "ProjectId": "string",
      "PublishedRunbookSnapshotId": "string",
      "RunRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      },
      "RunbookProcessId": "string",
      "RunbookTags": [
        "string"
      ],
      "Slug": "string",
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

## Get a list of Runbooks

`GET` `/api/{spaceId}/runbooks/all`

Also reachable at `/api/runbooks/all`, `/api/spaces/{spaceIdentifier}/runbooks/all`.

Lists all of the Runbooks in the supplied Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — A list of Runbook resource ids used to filter a query.
- **`projectIds`** <span class="type-label">array of string</span> — A list of Project ids used to filter a query.

**Response**

`200` — Requested list of Runbooks

an array of `RunbookResource`.

- **`CancelQueuedTasks`** <span class="type-label">boolean</span>
- **`CancelRunningTasks`** <span class="type-label">boolean</span>
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentScope`** <span class="type-label">enum</span> — Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** <span class="type-label">array of string</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`PublishedRunbookSnapshotId`** <span class="type-label">string</span>
- **`RunRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** <span class="type-label">string</span>
- **`RunbookTags`** <span class="type-label">array of string</span> — List of tags assigned to this runbook.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "CancelQueuedTasks": true,
    "CancelRunningTasks": true,
    "ConnectivityPolicy": {
      "AllowDeploymentsToNoTargets": true,
      "ExcludeUnhealthyTargets": true,
      "SkipMachineBehavior": "None",
      "TargetRoles": [
        "string"
      ]
    },
    "DefaultGuidedFailureMode": "EnvironmentDefault",
    "Description": "string",
    "EnvironmentScope": "All",
    "Environments": [
      "string"
    ],
    "FailTargetDiscovery": true,
    "ForcePackageDownload": true,
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "MultiTenancyMode": "Untenanted",
    "Name": "string",
    "ProjectId": "string",
    "PublishedRunbookSnapshotId": "string",
    "RunRetentionPolicy": {
      "QuantityToKeep": 0,
      "ShouldKeepForever": true,
      "Strategy": "string",
      "Unit": "Days"
    },
    "RunbookProcessId": "string",
    "RunbookTags": [
      "string"
    ],
    "Slug": "string",
    "SpaceId": "string"
  }
]
```
</div>
