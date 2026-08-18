---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Runbooks
---

## Retrieve a list of Runbooks that will be converted to Git, along with how many RunbookRun History records will be updated

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/git/migrate-runbooks`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/migrate-runbooks`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Returns as summary of the runbooks that will be converted to Git

- **`DraftRunbooks`** :span[array of object]{.type-label}
  - **`RunbookId`** :span[string]{.type-label}
  - **`RunbookName`** :span[string]{.type-label}
- **`PublishedRunbooks`** :span[array of object]{.type-label}
  - **`RunbookId`** :span[string]{.type-label}
  - **`RunbookName`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a paginated list of the Runbooks that belong to the given Project

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/runbooks`

Also reachable at `/api/projects/{projectId}/runbooks`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`excludedRunbookTags`** :span[array of string]{.type-label}  
  A list of tag IDs to exclude runbooks by. Returns runbooks that have none of the specified tags.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`runbookTags`** :span[array of string]{.type-label}  
  A list of tag IDs to filter runbooks by. Returns runbooks that have any of the specified tags.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`CancelQueuedTasks`** :span[boolean]{.type-label}
  - **`CancelRunningTasks`** :span[boolean]{.type-label}
  - **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
    Allowed values: `EnvironmentDefault`, `Off`, `On`.
  - **`Description`** :span[string]{.type-label}
  - **`EnvironmentScope`** :span[enum]{.type-label}  
    Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
  - **`Environments`** :span[array of string]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MultiTenancyMode`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Name`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`PublishedRunbookSnapshotId`** :span[string]{.type-label}
  - **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`RunbookProcessId`** :span[string]{.type-label}
  - **`RunbookTags`** :span[array of string]{.type-label}  
    List of tags assigned to this runbook.
  - **`Slug`** :span[string]{.type-label}
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
:::

## Create a new Runbook or clone an existing Runbook

:span[POST]{.api-post} `/api/{spaceId}/projects/{projectId}/runbooks`

Also reachable at `/api/projects/{projectId}/runbooks`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The Project that contains the Runbook.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Clone`** :span[string]{.type-label}  
  The ID of an existing database runbook to copy. Cloning brings across the source runbook's settings, its process and steps, and any project triggers that target it. The source runbook's tags come across too, unless you supply RunbookTags. Leave unset to create a runbook from scratch, which starts with an empty process.
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  What a run does when a step fails. One of 'EnvironmentDefault' (follow the target environment's setting), 'Off' (fail the run immediately, the default), or 'On' (pause the run and wait for someone to choose whether to retry, ignore or abort).  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}  
  The description of the Runbook to create.
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Which environments the runbook may be run in. One of 'All' (every environment in the space, the default), 'Specified' (only the environments listed in Environments), or 'FromProjectLifecycles' (only the environments used by the project's lifecycles).  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}  
  The environments the runbook may be run in. Only applies when EnvironmentScope is 'Specified'; ignored otherwise.
- **`ForcePackageDownload`** :span[boolean]{.type-label}  
  Re-download every package on each run instead of reusing the copy already cached on the deployment target.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Whether the runbook can be run for tenants. One of 'Untenanted' (untenanted runs only, the default), 'Tenanted' (a tenant must be supplied for every run), or 'TenantedOrUntenanted' (either is allowed).  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the Runbook to create. Minimum length 1.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  The ID of the project to create the runbook in. Must be a project that stores its runbooks in the Octopus database.
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}  
  Leave unset. A snapshot can only be published after the runbook exists and has a process.
- **`RunRetentionPolicy`** :span[object]{.type-label} *(required)*
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}  
  Leave unset. Octopus creates an empty runbook process for the new runbook and links it automatically.
- **`RunbookTags`** :span[array of string]{.type-label}  
  Tags to apply to the runbook, each written as "TagSet/Tag" using either the names or the IDs of the tag set and tag (for example "Ops/Nightly"). Call find_tag_sets to discover which tag sets apply to runbooks and what tags they contain.
- **`Slug`** :span[string]{.type-label}  
  A short URL-friendly identifier for the runbook, unique within the project. Generated from the name when omitted.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}
- **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}
- **`RunbookTags`** :span[array of string]{.type-label}  
  List of tags assigned to this runbook.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a list of Runbooks for a Project

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/runbooks/all/v2`

Also reachable at `/api/projects/{projectId}/runbooks/all/v2`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/all/v2`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project containing the resource(s).
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  A list of Runbook resource ids used to filter a query.

**Response**

`200` — Requested list of Runbooks

- **`Runbooks`** :span[array of object]{.type-label}
  - **`CancelQueuedTasks`** :span[boolean]{.type-label}
  - **`CancelRunningTasks`** :span[boolean]{.type-label}
  - **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
    Allowed values: `EnvironmentDefault`, `Off`, `On`.
  - **`Description`** :span[string]{.type-label}
  - **`EnvironmentScope`** :span[enum]{.type-label}  
    Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
  - **`Environments`** :span[array of string]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MultiTenancyMode`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Name`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`PublishedRunbookSnapshotId`** :span[string]{.type-label}
  - **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`RunbookProcessId`** :span[string]{.type-label}
  - **`RunbookTags`** :span[array of string]{.type-label}  
    List of tags assigned to this runbook.
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Create a new Database Runbook

:span[POST]{.api-post} `/api/{spaceId}/projects/{projectId}/runbooks/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/v2`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookTags`** :span[array of string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "Name": "string",
  "ProjectId": "string",
  "Slug": "string"
}
```
:::

## Get a Runbook by ID

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/runbooks/{id}`

Also reachable at `/api/projects/{projectId}/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook to retrieve.
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Returns a runbook

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}
- **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}
- **`RunbookTags`** :span[array of string]{.type-label}  
  List of tags assigned to this runbook.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Update an existing Runbook

:span[PUT]{.api-put} `/api/{spaceId}/projects/{projectId}/runbooks/{id}`

Also reachable at `/api/projects/{projectId}/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the runbook to update, for example 'Runbooks-123'.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project the runbook belongs to. Must be a project that stores its runbooks in the Octopus database.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`CancelQueuedTasks`** :span[boolean]{.type-label}  
  When a new run of this runbook is queued, automatically cancel earlier runs of it that are still queued and now superseded. This is a standing setting on the runbook, not an instruction to cancel anything right now. Omit to leave the current setting unchanged.
- **`CancelRunningTasks`** :span[boolean]{.type-label}  
  When a new run of this runbook is queued, automatically cancel an earlier run of it that is already executing and now superseded. This is a standing setting on the runbook, not an instruction to cancel anything right now. Omit to leave the current setting unchanged.
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  What a run does when a step fails. One of 'EnvironmentDefault' (follow the target environment's setting), 'Off' (fail the run immediately), or 'On' (pause the run and wait for someone to choose whether to retry, ignore or abort). Resets to 'Off' when omitted.  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Which environments the runbook may be run in. One of 'All' (every environment in the space), 'Specified' (only the environments listed in Environments), or 'FromProjectLifecycles' (only the environments used by the project's lifecycles). Resets to 'All' when omitted.  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}  
  The runbook's complete environment list, used when EnvironmentScope is 'Specified'. This replaces the current list, so resubmit the existing environments you want to keep. The update is rejected if it would remove an environment that a project trigger still runs this runbook in.
- **`FailTargetDiscovery`** :span[boolean]{.type-label}  
  Fail a run when one of its target discovery steps finds no matching deployment targets, instead of letting the step succeed. Resets to false when omitted.
- **`ForcePackageDownload`** :span[boolean]{.type-label}  
  Re-download every package on each run instead of reusing the copy already cached on the deployment target. Resets to false when omitted.
- **`Id`** :span[string]{.type-label} *(required)*  
  The ID of the runbook to update, for example 'Runbooks-123'.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Whether the runbook can be run for tenants. One of 'Untenanted' (untenanted runs only), 'Tenanted' (a tenant must be supplied for every run), or 'TenantedOrUntenanted' (either is allowed). Resets to 'Untenanted' when omitted.  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  The ID of the project the runbook belongs to. Must be a project that stores its runbooks in the Octopus database.
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}  
  The ID of the runbook snapshot to publish. Setting this to a different snapshot publishes that snapshot, which is what subsequent runs execute. Resubmit the current value to leave the published snapshot alone.
- **`RunRetentionPolicy`** :span[object]{.type-label} *(required)*
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}  
  Leave this as the value returned by get_runbook. Octopus manages the link between a runbook and its process.
- **`RunbookTags`** :span[array of string]{.type-label}  
  The runbook's complete set of tags, each written as "TagSet/Tag" using either the names or the IDs of the tag set and tag (for example "Ops/Nightly"). This replaces the current tags, so resubmit the existing ones you want to keep. Call find_tag_sets to discover which tag sets apply to runbooks.
- **`Slug`** :span[string]{.type-label}  
  A short URL-friendly identifier for the runbook, unique within the project. The current slug is kept when omitted.
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
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
:::

**Response**

`200` — Confirmation that the Runbook has been modified, containing the updated Runbook

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}
- **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}
- **`RunbookTags`** :span[array of string]{.type-label}  
  List of tags assigned to this runbook.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Delete an existing Runbook

:span[DELETE]{.api-delete} `/api/{spaceId}/projects/{projectId}/runbooks/{id}`

Also reachable at `/api/projects/{projectId}/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook to delete.
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

## Get a list of environments a Runbook can be run within, based on its EnvironmentScope

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/runbooks/{id}/environments`

Also reachable at `/api/projects/{projectId}/runbooks/{id}/environments`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}/environments`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project containing this resource. Will be inferred if not provided.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Runbook Environments

- **`AllowDynamicInfrastructure`** :span[boolean]{.type-label}  
  If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** :span[array of string]{.type-label}  
  List of tags assigned to this environment.
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** :span[string]{.type-label}
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

:::api-example{label="Response"}
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
:::

## Get a list of environments a Runbook can be run within, based on its EnvironmentScope

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/runbooks/{id}/environments/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}/environments/v2`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project containing this resource. Will be inferred if not provided.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Runbook Environments

- **`Environments`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
  - **`EnvironmentTags`** :span[array of string]{.type-label}  
    List of tags assigned to this environment.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this environment. This should be short, preferably 5-20 characters. Minimum length 1.
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.
  - **`SpaceId`** :span[string]{.type-label}
  - **`Type`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get all of the information necessary for creating or editing a Runbook Run for this Runbook (when you do not have a snapshot)

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/runbooks/{id}/runbookRunTemplate`

Also reachable at `/api/projects/{projectId}/runbooks/{id}/runbookRunTemplate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}/runbookRunTemplate`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook to get a Runbook Run Template for.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the project the runbook belongs to.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Runbook Template

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsGitResourceModified`** :span[boolean]{.type-label}
- **`IsLibraryVariableSetModified`** :span[boolean]{.type-label}
- **`IsRunbookProcessModified`** :span[boolean]{.type-label}
- **`IsVariableSetModified`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PromoteTo`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`TenantPromotions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`PromoteTo`** :span[array of object]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a Runbook Run Preview for a Runbook

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/runbooks/{id}/runbookRuns/preview/{environment}`

Also reachable at `/api/projects/{projectId}/runbooks/{id}/runbookRuns/preview/{environment}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}/runbookRuns/preview/{environment}`.

Gets a Runbook Run Preview that describes what steps will/won't be run during a Runbook Run on a given environment (and tenant if supplied) for a Runbook.

**Path Parameters**

- **`environment`** :span[string]{.type-label} *(required)*  
  ID of the Environment.
- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`includeDisabledSteps`** :span[boolean]{.type-label}  
  Boolean to include/exclude disabled steps from response.
- **`tenant`** :span[string]{.type-label}  
  ID of the Tenant.

**Response**

`200` — Success

- **`Form`** :span[object]{.type-label}
  - **`Elements`** :span[array of object]{.type-label}  
    Elements of the form.
  - **`Values`** :span[object]{.type-label}  
    Values supplied for the form elements.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** :span[array of object]{.type-label}
  - **`ActionId`** :span[string]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`ActionNumber`** :span[string]{.type-label}
  - **`AvailableTagSets`** :span[array of object]{.type-label}
  - **`CanBeSkipped`** :span[boolean]{.type-label}
  - **`ExcludedMachines`** :span[array of object]{.type-label}
  - **`HasNoApplicableMachines`** :span[boolean]{.type-label}
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`MachineNames`** :span[array of string]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of string]{.type-label}
  - **`UnavailableMachines`** :span[array of object]{.type-label}
- **`UseGuidedFailureModeByDefault`** :span[boolean]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a Runbook Run Preview for a Runbook

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`

Also reachable at `/api/projects/{projectId}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`.

Gets a Runbook Run Preview that describes what steps will/won't be run during a Runbook Run on a given environment (and tenant if supplied) for a Runbook.

**Path Parameters**

- **`environment`** :span[string]{.type-label} *(required)*  
  ID of the Environment.
- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`tenant`** :span[string]{.type-label} *(required)*  
  ID of the Tenant.

**Query Parameters**

- **`includeDisabledSteps`** :span[boolean]{.type-label}  
  Boolean to include/exclude disabled steps from response.

**Response**

`200` — Success

- **`Form`** :span[object]{.type-label}
  - **`Elements`** :span[array of object]{.type-label}  
    Elements of the form.
  - **`Values`** :span[object]{.type-label}  
    Values supplied for the form elements.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** :span[array of object]{.type-label}
  - **`ActionId`** :span[string]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`ActionNumber`** :span[string]{.type-label}
  - **`AvailableTagSets`** :span[array of object]{.type-label}
  - **`CanBeSkipped`** :span[boolean]{.type-label}
  - **`ExcludedMachines`** :span[array of object]{.type-label}
  - **`HasNoApplicableMachines`** :span[boolean]{.type-label}
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`MachineNames`** :span[array of string]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of string]{.type-label}
  - **`UnavailableMachines`** :span[array of object]{.type-label}
- **`UseGuidedFailureModeByDefault`** :span[boolean]{.type-label}

:::api-example{label="Response"}
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
:::

## Run the published version of this Runbook

:span[POST]{.api-post} `/api/{spaceId}/projects/{projectId}/runbooks/{runbookId}/run`

Also reachable at `/api/projects/{projectId}/runbooks/{runbookId}/run`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{runbookId}/run`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the project that the runbook belongs to.
- **`runbookId`** :span[string]{.type-label} *(required)*  
  ID of the runbook to run.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`ChangeRequestSettings`** :span[array of object]{.type-label}  
  Change Request Settings.
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Comments`** :span[string]{.type-label}  
  Any additional information/context.
- **`DebugMode`** :span[string]{.type-label}  
  If set to true contributes the OctopusPrintVariables and OctopusPrintEvaluatedVariables variables to the runbook run.
- **`EnvironmentId`** :span[string]{.type-label}  
  Legacy single-environment field; prefer EnvironmentIds. If set, this environment is added to the ones the runbook runs in. At least one of EnvironmentIds or EnvironmentId is required.
- **`EnvironmentIds`** :span[array of string]{.type-label}  
  The environments to run the runbook in — the preferred way to specify targets, one run per environment. At least one of EnvironmentIds or EnvironmentId is required.
- **`ExcludedMachineIds`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be excluded from the runbook run.
- **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
  A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`FailTargetDiscovery`** :span[boolean]{.type-label}  
  Whether to skip or fail cloud discovery steps with no matching target (default false).
- **`ForcePackageDownload`** :span[boolean]{.type-label}  
  Whether to force downloading of already installed packages (flag, default false).
- **`FormValues`** :span[object]{.type-label}  
  Variables.
- **`Priority`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}  
  ID of the project that the runbook belongs to.
- **`QueueTime`** :span[string]{.type-label}  
  The time to execute the runbook run. Format `date-time`.
- **`QueueTimeExpiry`** :span[string]{.type-label}  
  The time at which the runbook run will timeout if it has not started executing. Format `date-time`.
- **`RunbookId`** :span[string]{.type-label} *(required)*  
  ID of the runbook to run.
- **`RunbookSnapshotNameOrId`** :span[string]{.type-label}  
  Name or ID of a specific snapshot to run. Leave unset to run the published snapshot; when you set this, also set UseDefaultSnapshot to false.
- **`SkipActions`** :span[array of string]{.type-label}  
  Actions that are to be skipped for this runbook.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`SpecificMachineIds`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that the runbook should be run on. If the collection is empty, all enabled machines are used.
- **`SpecificTargetTagIds`** :span[array of string]{.type-label}  
  A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`TenantId`** :span[string]{.type-label}  
  Legacy single-tenant field; prefer TenantIds. If set, this tenant is added to the ones the runbook runs for.
- **`TenantIds`** :span[array of string]{.type-label}  
  The tenants to run the runbook for — the preferred way to specify tenants, creating one run per environment/tenant combination. Leave empty for an untenanted run.
- **`TenantTagNames`** :span[array of string]{.type-label}  
  The tenant tags to filter tenants to run the runbook.
- **`UseDefaultSnapshot`** :span[boolean]{.type-label}  
  Whether to run the runbook's published (default) snapshot. Leave true to run the published snapshot; set to false when you name a specific snapshot in RunbookSnapshotNameOrId.
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, the runbook will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

:::api-example{label="Request"}
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
:::

**Response**

`200` — OK

## Get a list of Runbook Run Previews for a Runbook

:span[POST]{.api-post} `/api/{spaceId}/projects/{projectId}/runbooks/{runbookId}/runbookRuns/previews`

Also reachable at `/api/projects/{projectId}/runbooks/{runbookId}/runbookRuns/previews`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{runbookId}/runbookRuns/previews`.

Gets a list of Runbook Run Previews that describes what steps will/won't be run during a Runbook Run on a given environment and tenant for a Runbook.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`runbookId`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`DeploymentPreviews`** :span[array of object]{.type-label} *(required)*  
  A list of Tenant/Environment mappings to retrieve runbook run previews for.
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`IncludeDisabledSteps`** :span[boolean]{.type-label}  
  Boolean to include/exclude disabled steps from response.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`RunbookId`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
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
:::

**Response**

`200` — The requested list of Runbook Run previews

- **`Form`** :span[object]{.type-label}
  - **`Elements`** :span[array of object]{.type-label}  
    Elements of the form.
  - **`Values`** :span[object]{.type-label}  
    Values supplied for the form elements.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** :span[array of object]{.type-label}
  - **`ActionId`** :span[string]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`ActionNumber`** :span[string]{.type-label}
  - **`AvailableTagSets`** :span[array of object]{.type-label}
  - **`CanBeSkipped`** :span[boolean]{.type-label}
  - **`ExcludedMachines`** :span[array of object]{.type-label}
  - **`HasNoApplicableMachines`** :span[boolean]{.type-label}
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`MachineNames`** :span[array of string]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of string]{.type-label}
  - **`UnavailableMachines`** :span[array of object]{.type-label}
- **`UseGuidedFailureModeByDefault`** :span[boolean]{.type-label}

:::api-example{label="Response"}
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
:::

## Get all of the information necessary for creating or editing a Snapshot for a Runbook

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/runbooks/{runbookId}/runbookSnapshotTemplate`

Also reachable at `/api/projects/{projectId}/runbooks/{runbookId}/runbookSnapshotTemplate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{runbookId}/runbookSnapshotTemplate`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  Project Id of the project containing the runbook.
- **`runbookId`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Confirmation that a new Runbook Snapshot Template has been created, containing the template

- **`GitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`DefaultBranch`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FilePathFilters`** :span[array of string]{.type-label}
  - **`GitCredentialId`** :span[string]{.type-label}
  - **`GitHubConnectionId`** :span[string]{.type-label}
  - **`GitResourceSelectedLastRelease`** :span[object]{.type-label}
  - **`IsResolvable`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`RepositoryUri`** :span[string]{.type-label}  
    Minimum length 1.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NextNameIncrement`** :span[string]{.type-label}
- **`Packages`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`FeedId`** :span[string]{.type-label}
  - **`FeedName`** :span[string]{.type-label}
  - **`FixedVersion`** :span[string]{.type-label}
  - **`IsResolvable`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the PackageId or FeedId contain no references to other variables. Variables can be used to select different NuGet feeds or packages at deployment time, however, this means that it's not possible to resolve which feed/package to search when creating a release.
  - **`NuGetFeedId`** :span[string]{.type-label}
  - **`NuGetFeedName`** :span[string]{.type-label}
  - **`NuGetPackageId`** :span[string]{.type-label}
  - **`PackageId`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`VersionSelectedLastRelease`** :span[string]{.type-label}
- **`RunbookId`** :span[string]{.type-label}
- **`RunbookProcessId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a paginated list of the Runbooks that belong to the given Project

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*  
  The GitRef containing the resource(s).
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`excludedRunbookTags`** :span[array of string]{.type-label}  
  A list of tag IDs to exclude runbooks by. Returns runbooks that have none of the specified tags.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`runbookTags`** :span[array of string]{.type-label}  
  A list of tag IDs to filter runbooks by. Returns runbooks that have any of the specified tags.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`CancelQueuedTasks`** :span[boolean]{.type-label}
  - **`CancelRunningTasks`** :span[boolean]{.type-label}
  - **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
    Allowed values: `EnvironmentDefault`, `Off`, `On`.
  - **`Description`** :span[string]{.type-label}
  - **`EnvironmentScope`** :span[enum]{.type-label}  
    Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
  - **`Environments`** :span[array of string]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MultiTenancyMode`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Name`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`PublishedRunbookSnapshotId`** :span[string]{.type-label}
  - **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`RunbookProcessId`** :span[string]{.type-label}
  - **`RunbookTags`** :span[array of string]{.type-label}  
    List of tags assigned to this runbook.
  - **`Slug`** :span[string]{.type-label}
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
:::

## Create a new Git runbook

:span[POST]{.api-post} `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/v2`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChangeDescription`** :span[string]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`GitRef`** :span[string]{.type-label} *(required)*
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookTags`** :span[array of string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`GitRef`** :span[string]{.type-label}  
  Minimum length 1.
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
{
  "GitRef": "string",
  "Id": "string",
  "Name": "string",
  "ProjectId": "string",
  "Slug": "string"
}
```
:::

## Get a Runbook by ID

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook to retrieve.
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Returns a runbook

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}
- **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}
- **`RunbookTags`** :span[array of string]{.type-label}  
  List of tags assigned to this runbook.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Update an existing Runbook

:span[PUT]{.api-put} `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*  
  The Git branch to commit the change to. This must be a branch — a tag or commit cannot be written to — and the branch must not be protected in the project's version control settings. Use get_branches to list the project's branches.
- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the runbook to update. A runbook stored in Git uses its slug as the ID, which is only unique within its project and Git ref.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project the runbook belongs to. Must be a version-controlled project that stores its runbooks in Git.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`CancelQueuedTasks`** :span[boolean]{.type-label}  
  When a new run of this runbook is queued, automatically cancel earlier runs of it that are still queued and now superseded. This is a standing setting on the runbook, not an instruction to cancel anything right now. Omit to leave the current setting unchanged.
- **`CancelRunningTasks`** :span[boolean]{.type-label}  
  When a new run of this runbook is queued, automatically cancel an earlier run of it that is already executing and now superseded. This is a standing setting on the runbook, not an instruction to cancel anything right now. Omit to leave the current setting unchanged.
- **`ChangeDescription`** :span[string]{.type-label}  
  The commit message for the change. Defaults to 'Update runbook' when omitted.
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  What a run does when a step fails. One of 'EnvironmentDefault' (follow the target environment's setting), 'Off' (fail the run immediately), or 'On' (pause the run and wait for someone to choose whether to retry, ignore or abort). Resets to 'Off' when omitted.  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Which environments the runbook may be run in. One of 'All' (every environment in the space), 'Specified' (only the environments listed in Environments), or 'FromProjectLifecycles' (only the environments used by the project's lifecycles). Resets to 'All' when omitted.  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}  
  The runbook's complete environment list, used when EnvironmentScope is 'Specified'. This replaces the current list, so resubmit the existing environments you want to keep. The update is rejected if it would remove an environment that a project trigger still runs this runbook in.
- **`FailTargetDiscovery`** :span[boolean]{.type-label}  
  Fail a run when one of its target discovery steps finds no matching deployment targets, instead of letting the step succeed. Resets to false when omitted.
- **`ForcePackageDownload`** :span[boolean]{.type-label}  
  Re-download every package on each run instead of reusing the copy already cached on the deployment target. Resets to false when omitted.
- **`GitRef`** :span[string]{.type-label} *(required)*  
  The Git branch to commit the change to. This must be a branch — a tag or commit cannot be written to — and the branch must not be protected in the project's version control settings. Use get_branches to list the project's branches.
- **`Id`** :span[string]{.type-label} *(required)*  
  The ID of the runbook to update. A runbook stored in Git uses its slug as the ID, which is only unique within its project and Git ref.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Whether the runbook can be run for tenants. One of 'Untenanted' (untenanted runs only), 'Tenanted' (a tenant must be supplied for every run), or 'TenantedOrUntenanted' (either is allowed). Resets to 'Untenanted' when omitted.  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  The ID of the project the runbook belongs to. Must be a version-controlled project that stores its runbooks in Git.
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}  
  The ID of the runbook snapshot to publish. Resubmit the current value to leave the published snapshot alone.
- **`RunRetentionPolicy`** :span[object]{.type-label} *(required)*
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}  
  Leave this as the value returned by get_runbook. Octopus manages the link between a runbook and its process.
- **`RunbookTags`** :span[array of string]{.type-label}  
  The runbook's complete set of tags, each written as "TagSet/Tag" using either the names or the IDs of the tag set and tag (for example "Ops/Nightly"). This replaces the current tags, so resubmit the existing ones you want to keep. Call find_tag_sets to discover which tag sets apply to runbooks.
- **`Slug`** :span[string]{.type-label}  
  A short URL-friendly identifier for the runbook, unique within the project. The current slug is kept when omitted.
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
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
:::

**Response**

`200` — Confirmation that the Runbook has been modified, containing the updated Runbook

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}
- **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}
- **`RunbookTags`** :span[array of string]{.type-label}  
  List of tags assigned to this runbook.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Delete an existing Runbook

:span[DELETE]{.api-delete} `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*  
  The GitRef containing the resource(s).
- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook to delete.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`ChangeDescription`** :span[string]{.type-label}  
  The commit message for updating the Git repository.
- **`GitRef`** :span[string]{.type-label} *(required)*  
  The GitRef containing the resource(s).
- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook to delete.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  The ID of the project.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "ChangeDescription": "string",
  "GitRef": "string",
  "Id": "string",
  "ProjectId": "string",
  "SpaceId": "string"
}
```
:::

**Response**

`200` — Success

## Get a list of environments a Runbook can be run within, based on its EnvironmentScope

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}/environments`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}/environments`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}/environments`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*  
  The Git ref to read the runbook from.
- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project containing this resource.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Runbook Environments

- **`AllowDynamicInfrastructure`** :span[boolean]{.type-label}  
  If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** :span[array of string]{.type-label}  
  List of tags assigned to this environment.
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** :span[string]{.type-label}
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

:::api-example{label="Response"}
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
:::

## Get a list of environments a Runbook can be run within, based on its EnvironmentScope

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}/environments/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}/environments/v2`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`id`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project containing this resource. Will be inferred if not provided.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Runbook Environments

- **`Environments`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
  - **`EnvironmentTags`** :span[array of string]{.type-label}  
    List of tags assigned to this environment.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this environment. This should be short, preferably 5-20 characters. Minimum length 1.
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.
  - **`SpaceId`** :span[string]{.type-label}
  - **`Type`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get all of the information necessary for creating or editing a Runbook Run for this Runbook (when you do not have a snapshot)

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRunTemplate`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRunTemplate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRunTemplate`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*  
  Gitref to get the runbook template from.
- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook to get a Runbook Run Template for.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the project the runbook belongs to.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Runbook Template

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsGitResourceModified`** :span[boolean]{.type-label}
- **`IsLibraryVariableSetModified`** :span[boolean]{.type-label}
- **`IsRunbookProcessModified`** :span[boolean]{.type-label}
- **`IsVariableSetModified`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PromoteTo`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`TenantPromotions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`PromoteTo`** :span[array of object]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a Runbook Run Preview for a Runbook

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRuns/preview/{environment}`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRuns/preview/{environment}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRuns/preview/{environment}`.

Gets a Runbook Run Preview that describes what steps will/won't be run during a Runbook Run on a given environment (and tenant if supplied) for a Runbook.

**Path Parameters**

- **`environment`** :span[string]{.type-label} *(required)*  
  ID of the Environment.
- **`gitRef`** :span[string]{.type-label} *(required)*
- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`includeDisabledSteps`** :span[boolean]{.type-label}  
  Boolean to include/exclude disabled steps from response.
- **`tenant`** :span[string]{.type-label}  
  ID of the Tenant.

**Response**

`200` — Success

- **`Form`** :span[object]{.type-label}
  - **`Elements`** :span[array of object]{.type-label}  
    Elements of the form.
  - **`Values`** :span[object]{.type-label}  
    Values supplied for the form elements.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** :span[array of object]{.type-label}
  - **`ActionId`** :span[string]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`ActionNumber`** :span[string]{.type-label}
  - **`AvailableTagSets`** :span[array of object]{.type-label}
  - **`CanBeSkipped`** :span[boolean]{.type-label}
  - **`ExcludedMachines`** :span[array of object]{.type-label}
  - **`HasNoApplicableMachines`** :span[boolean]{.type-label}
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`MachineNames`** :span[array of string]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of string]{.type-label}
  - **`UnavailableMachines`** :span[array of object]{.type-label}
- **`UseGuidedFailureModeByDefault`** :span[boolean]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a Runbook Run Preview for a Runbook

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`.

Gets a Runbook Run Preview that describes what steps will/won't be run during a Runbook Run on a given environment (and tenant if supplied) for a Runbook.

**Path Parameters**

- **`environment`** :span[string]{.type-label} *(required)*  
  ID of the Environment.
- **`gitRef`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`tenant`** :span[string]{.type-label} *(required)*  
  ID of the Tenant.

**Query Parameters**

- **`includeDisabledSteps`** :span[boolean]{.type-label}  
  Boolean to include/exclude disabled steps from response.

**Response**

`200` — Success

- **`Form`** :span[object]{.type-label}
  - **`Elements`** :span[array of object]{.type-label}  
    Elements of the form.
  - **`Values`** :span[object]{.type-label}  
    Values supplied for the form elements.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** :span[array of object]{.type-label}
  - **`ActionId`** :span[string]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`ActionNumber`** :span[string]{.type-label}
  - **`AvailableTagSets`** :span[array of object]{.type-label}
  - **`CanBeSkipped`** :span[boolean]{.type-label}
  - **`ExcludedMachines`** :span[array of object]{.type-label}
  - **`HasNoApplicableMachines`** :span[boolean]{.type-label}
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`MachineNames`** :span[array of string]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of string]{.type-label}
  - **`UnavailableMachines`** :span[array of object]{.type-label}
- **`UseGuidedFailureModeByDefault`** :span[boolean]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a list of Runbook Run Previews for a Runbook

:span[POST]{.api-post} `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{runbookId}/runbookRuns/previews`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{runbookId}/runbookRuns/previews`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{runbookId}/runbookRuns/previews`.

Gets a list of Runbook Run Previews that describes what steps will/won't be run during a Runbook Run on a given environment and tenant for a Runbook.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`runbookId`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`DeploymentPreviews`** :span[array of object]{.type-label} *(required)*  
  A list of Tenant/Environment mappings to retrieve runbook run previews for.
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label} *(required)*
- **`IncludeDisabledSteps`** :span[boolean]{.type-label}  
  Boolean to include/exclude disabled steps from response.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`RunbookId`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
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
:::

**Response**

`200` — The requested list of Runbook Run previews

- **`Form`** :span[object]{.type-label}
  - **`Elements`** :span[array of object]{.type-label}  
    Elements of the form.
  - **`Values`** :span[object]{.type-label}  
    Values supplied for the form elements.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** :span[array of object]{.type-label}
  - **`ActionId`** :span[string]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`ActionNumber`** :span[string]{.type-label}
  - **`AvailableTagSets`** :span[array of object]{.type-label}
  - **`CanBeSkipped`** :span[boolean]{.type-label}
  - **`ExcludedMachines`** :span[array of object]{.type-label}
  - **`HasNoApplicableMachines`** :span[boolean]{.type-label}
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`MachineNames`** :span[array of string]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of string]{.type-label}
  - **`UnavailableMachines`** :span[array of object]{.type-label}
- **`UseGuidedFailureModeByDefault`** :span[boolean]{.type-label}

:::api-example{label="Response"}
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
:::

## Get all of the information necessary for creating or editing a Snapshot for a Runbook

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/{gitref}/runbooks/{runbookId}/runbookSnapshotTemplate`

Also reachable at `/api/projects/{projectId}/{gitref}/runbooks/{runbookId}/runbookSnapshotTemplate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitref}/runbooks/{runbookId}/runbookSnapshotTemplate`.

**Path Parameters**

- **`gitref`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*  
  Project Id of the project containing the runbook.
- **`runbookId`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Confirmation that a new Runbook Snapshot Template has been created, containing the template

- **`GitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`DefaultBranch`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FilePathFilters`** :span[array of string]{.type-label}
  - **`GitCredentialId`** :span[string]{.type-label}
  - **`GitHubConnectionId`** :span[string]{.type-label}
  - **`GitResourceSelectedLastRelease`** :span[object]{.type-label}
  - **`IsResolvable`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`RepositoryUri`** :span[string]{.type-label}  
    Minimum length 1.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NextNameIncrement`** :span[string]{.type-label}
- **`Packages`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`FeedId`** :span[string]{.type-label}
  - **`FeedName`** :span[string]{.type-label}
  - **`FixedVersion`** :span[string]{.type-label}
  - **`IsResolvable`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the PackageId or FeedId contain no references to other variables. Variables can be used to select different NuGet feeds or packages at deployment time, however, this means that it's not possible to resolve which feed/package to search when creating a release.
  - **`NuGetFeedId`** :span[string]{.type-label}
  - **`NuGetFeedName`** :span[string]{.type-label}
  - **`NuGetPackageId`** :span[string]{.type-label}
  - **`PackageId`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`VersionSelectedLastRelease`** :span[string]{.type-label}
- **`RunbookId`** :span[string]{.type-label}
- **`RunbookProcessId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a list of Runbooks

:span[GET]{.api-get} `/api/{spaceId}/runbooks`

Also reachable at `/api/runbooks`, `/api/spaces/{spaceIdentifier}/runbooks`.

Gets a paginated list of the Runbooks in the supplied Octopus Deploy Space (sorted by name).

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  List of Runbook IDs which if specified, filters the result to only include Runbooks with matching IDs.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of the Runbooks in the supplied Octopus Deploy Space (sorted by name).

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`CancelQueuedTasks`** :span[boolean]{.type-label}
  - **`CancelRunningTasks`** :span[boolean]{.type-label}
  - **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
    Allowed values: `EnvironmentDefault`, `Off`, `On`.
  - **`Description`** :span[string]{.type-label}
  - **`EnvironmentScope`** :span[enum]{.type-label}  
    Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
  - **`Environments`** :span[array of string]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MultiTenancyMode`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Name`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`PublishedRunbookSnapshotId`** :span[string]{.type-label}
  - **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`RunbookProcessId`** :span[string]{.type-label}
  - **`RunbookTags`** :span[array of string]{.type-label}  
    List of tags assigned to this runbook.
  - **`Slug`** :span[string]{.type-label}
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
:::

## Create a new Runbook or clone an existing Runbook

:span[POST]{.api-post} `/api/{spaceId}/runbooks`

Also reachable at `/api/runbooks`, `/api/spaces/{spaceIdentifier}/runbooks`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Clone`** :span[string]{.type-label}  
  The ID of an existing database runbook to copy. Cloning brings across the source runbook's settings, its process and steps, and any project triggers that target it. The source runbook's tags come across too, unless you supply RunbookTags. Leave unset to create a runbook from scratch, which starts with an empty process.
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  What a run does when a step fails. One of 'EnvironmentDefault' (follow the target environment's setting), 'Off' (fail the run immediately, the default), or 'On' (pause the run and wait for someone to choose whether to retry, ignore or abort).  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}  
  The description of the Runbook to create.
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Which environments the runbook may be run in. One of 'All' (every environment in the space, the default), 'Specified' (only the environments listed in Environments), or 'FromProjectLifecycles' (only the environments used by the project's lifecycles).  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}  
  The environments the runbook may be run in. Only applies when EnvironmentScope is 'Specified'; ignored otherwise.
- **`ForcePackageDownload`** :span[boolean]{.type-label}  
  Re-download every package on each run instead of reusing the copy already cached on the deployment target.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Whether the runbook can be run for tenants. One of 'Untenanted' (untenanted runs only, the default), 'Tenanted' (a tenant must be supplied for every run), or 'TenantedOrUntenanted' (either is allowed).  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the Runbook to create. Minimum length 1.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  The ID of the project to create the runbook in. Must be a project that stores its runbooks in the Octopus database.
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}  
  Leave unset. A snapshot can only be published after the runbook exists and has a process.
- **`RunRetentionPolicy`** :span[object]{.type-label} *(required)*
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}  
  Leave unset. Octopus creates an empty runbook process for the new runbook and links it automatically.
- **`RunbookTags`** :span[array of string]{.type-label}  
  Tags to apply to the runbook, each written as "TagSet/Tag" using either the names or the IDs of the tag set and tag (for example "Ops/Nightly"). Call find_tag_sets to discover which tag sets apply to runbooks and what tags they contain.
- **`Slug`** :span[string]{.type-label}  
  A short URL-friendly identifier for the runbook, unique within the project. Generated from the name when omitted.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}
- **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}
- **`RunbookTags`** :span[array of string]{.type-label}  
  List of tags assigned to this runbook.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a list of Runbooks

:span[GET]{.api-get} `/api/{spaceId}/runbooks/all`

Also reachable at `/api/runbooks/all`, `/api/spaces/{spaceIdentifier}/runbooks/all`.

Lists all of the Runbooks in the supplied Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  A list of Runbook resource ids used to filter a query.
- **`projectIds`** :span[array of string]{.type-label}  
  A list of Project ids used to filter a query.

**Response**

`200` — Requested list of Runbooks

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}
- **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}
- **`RunbookTags`** :span[array of string]{.type-label}  
  List of tags assigned to this runbook.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a Runbook by ID

:span[GET]{.api-get} `/api/{spaceId}/runbooks/{id}`

Also reachable at `/api/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/runbooks/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook to retrieve.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`projectId`** :span[string]{.type-label}

**Response**

`200` — Returns a runbook

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}
- **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}
- **`RunbookTags`** :span[array of string]{.type-label}  
  List of tags assigned to this runbook.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Update an existing Runbook

:span[PUT]{.api-put} `/api/{spaceId}/runbooks/{id}`

Also reachable at `/api/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/runbooks/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the runbook to update, for example 'Runbooks-123'.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`CancelQueuedTasks`** :span[boolean]{.type-label}  
  When a new run of this runbook is queued, automatically cancel earlier runs of it that are still queued and now superseded. This is a standing setting on the runbook, not an instruction to cancel anything right now. Omit to leave the current setting unchanged.
- **`CancelRunningTasks`** :span[boolean]{.type-label}  
  When a new run of this runbook is queued, automatically cancel an earlier run of it that is already executing and now superseded. This is a standing setting on the runbook, not an instruction to cancel anything right now. Omit to leave the current setting unchanged.
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  What a run does when a step fails. One of 'EnvironmentDefault' (follow the target environment's setting), 'Off' (fail the run immediately), or 'On' (pause the run and wait for someone to choose whether to retry, ignore or abort). Resets to 'Off' when omitted.  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Which environments the runbook may be run in. One of 'All' (every environment in the space), 'Specified' (only the environments listed in Environments), or 'FromProjectLifecycles' (only the environments used by the project's lifecycles). Resets to 'All' when omitted.  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}  
  The runbook's complete environment list, used when EnvironmentScope is 'Specified'. This replaces the current list, so resubmit the existing environments you want to keep. The update is rejected if it would remove an environment that a project trigger still runs this runbook in.
- **`FailTargetDiscovery`** :span[boolean]{.type-label}  
  Fail a run when one of its target discovery steps finds no matching deployment targets, instead of letting the step succeed. Resets to false when omitted.
- **`ForcePackageDownload`** :span[boolean]{.type-label}  
  Re-download every package on each run instead of reusing the copy already cached on the deployment target. Resets to false when omitted.
- **`Id`** :span[string]{.type-label} *(required)*  
  The ID of the runbook to update, for example 'Runbooks-123'.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Whether the runbook can be run for tenants. One of 'Untenanted' (untenanted runs only), 'Tenanted' (a tenant must be supplied for every run), or 'TenantedOrUntenanted' (either is allowed). Resets to 'Untenanted' when omitted.  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  The ID of the project the runbook belongs to. Must be a project that stores its runbooks in the Octopus database.
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}  
  The ID of the runbook snapshot to publish. Setting this to a different snapshot publishes that snapshot, which is what subsequent runs execute. Resubmit the current value to leave the published snapshot alone.
- **`RunRetentionPolicy`** :span[object]{.type-label} *(required)*
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}  
  Leave this as the value returned by get_runbook. Octopus manages the link between a runbook and its process.
- **`RunbookTags`** :span[array of string]{.type-label}  
  The runbook's complete set of tags, each written as "TagSet/Tag" using either the names or the IDs of the tag set and tag (for example "Ops/Nightly"). This replaces the current tags, so resubmit the existing ones you want to keep. Call find_tag_sets to discover which tag sets apply to runbooks.
- **`Slug`** :span[string]{.type-label}  
  A short URL-friendly identifier for the runbook, unique within the project. The current slug is kept when omitted.
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
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
:::

**Response**

`200` — Confirmation that the Runbook has been modified, containing the updated Runbook

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentScope`** :span[enum]{.type-label}  
  Allowed values: `All`, `Specified`, `FromProjectLifecycles`.
- **`Environments`** :span[array of string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MultiTenancyMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Name`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`PublishedRunbookSnapshotId`** :span[string]{.type-label}
- **`RunRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`RunbookProcessId`** :span[string]{.type-label}
- **`RunbookTags`** :span[array of string]{.type-label}  
  List of tags assigned to this runbook.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Delete an existing Runbook

:span[DELETE]{.api-delete} `/api/{spaceId}/runbooks/{id}`

Also reachable at `/api/runbooks/{id}`, `/api/spaces/{spaceIdentifier}/runbooks/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

## Get a list of environments a Runbook can be run within, based on its EnvironmentScope

:span[GET]{.api-get} `/api/{spaceId}/runbooks/{id}/environments`

Also reachable at `/api/runbooks/{id}/environments`, `/api/spaces/{spaceIdentifier}/runbooks/{id}/environments`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`projectId`** :span[string]{.type-label}  
  The ID of the project containing this resource. Will be inferred if not provided.

**Response**

`200` — The requested list of Runbook Environments

- **`AllowDynamicInfrastructure`** :span[boolean]{.type-label}  
  If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** :span[array of string]{.type-label}  
  List of tags assigned to this environment.
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** :span[string]{.type-label}
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

:::api-example{label="Response"}
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
:::

## Get all of the information necessary for creating or editing a Runbook Run for this Runbook (when you do not have a snapshot)

:span[GET]{.api-get} `/api/{spaceId}/runbooks/{id}/runbookRunTemplate`

Also reachable at `/api/runbooks/{id}/runbookRunTemplate`, `/api/spaces/{spaceIdentifier}/runbooks/{id}/runbookRunTemplate`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook to get a Runbook Run Template for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`projectId`** :span[string]{.type-label}  
  ID of the project the runbook belongs to.

**Response**

`200` — The requested Runbook Template

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsGitResourceModified`** :span[boolean]{.type-label}
- **`IsLibraryVariableSetModified`** :span[boolean]{.type-label}
- **`IsRunbookProcessModified`** :span[boolean]{.type-label}
- **`IsVariableSetModified`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PromoteTo`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`TenantPromotions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`PromoteTo`** :span[array of object]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a Runbook Run Preview for a Runbook

:span[GET]{.api-get} `/api/{spaceId}/runbooks/{id}/runbookRuns/preview/{environment}`

Also reachable at `/api/runbooks/{id}/runbookRuns/preview/{environment}`, `/api/spaces/{spaceIdentifier}/runbooks/{id}/runbookRuns/preview/{environment}`.

Gets a Runbook Run Preview that describes what steps will/won't be run during a Runbook Run on a given environment (and tenant if supplied) for a Runbook.

**Path Parameters**

- **`environment`** :span[string]{.type-label} *(required)*  
  ID of the Environment.
- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`includeDisabledSteps`** :span[boolean]{.type-label}  
  Boolean to include/exclude disabled steps from response.
- **`projectId`** :span[string]{.type-label}  
  ID of the Project.
- **`tenant`** :span[string]{.type-label}  
  ID of the Tenant.

**Response**

`200` — Success

- **`Form`** :span[object]{.type-label}
  - **`Elements`** :span[array of object]{.type-label}  
    Elements of the form.
  - **`Values`** :span[object]{.type-label}  
    Values supplied for the form elements.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** :span[array of object]{.type-label}
  - **`ActionId`** :span[string]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`ActionNumber`** :span[string]{.type-label}
  - **`AvailableTagSets`** :span[array of object]{.type-label}
  - **`CanBeSkipped`** :span[boolean]{.type-label}
  - **`ExcludedMachines`** :span[array of object]{.type-label}
  - **`HasNoApplicableMachines`** :span[boolean]{.type-label}
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`MachineNames`** :span[array of string]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of string]{.type-label}
  - **`UnavailableMachines`** :span[array of object]{.type-label}
- **`UseGuidedFailureModeByDefault`** :span[boolean]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a Runbook Run Preview for a Runbook

:span[GET]{.api-get} `/api/{spaceId}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`

Also reachable at `/api/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`, `/api/spaces/{spaceIdentifier}/runbooks/{id}/runbookRuns/preview/{environment}/{tenant}`.

Gets a Runbook Run Preview that describes what steps will/won't be run during a Runbook Run on a given environment (and tenant if supplied) for a Runbook.

**Path Parameters**

- **`environment`** :span[string]{.type-label} *(required)*  
  ID of the Environment.
- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`tenant`** :span[string]{.type-label} *(required)*  
  ID of the Tenant.

**Query Parameters**

- **`includeDisabledSteps`** :span[boolean]{.type-label}  
  Boolean to include/exclude disabled steps from response.
- **`projectId`** :span[string]{.type-label}  
  ID of the Project.

**Response**

`200` — Success

- **`Form`** :span[object]{.type-label}
  - **`Elements`** :span[array of object]{.type-label}  
    Elements of the form.
  - **`Values`** :span[object]{.type-label}  
    Values supplied for the form elements.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** :span[array of object]{.type-label}
  - **`ActionId`** :span[string]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`ActionNumber`** :span[string]{.type-label}
  - **`AvailableTagSets`** :span[array of object]{.type-label}
  - **`CanBeSkipped`** :span[boolean]{.type-label}
  - **`ExcludedMachines`** :span[array of object]{.type-label}
  - **`HasNoApplicableMachines`** :span[boolean]{.type-label}
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`MachineNames`** :span[array of string]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of string]{.type-label}
  - **`UnavailableMachines`** :span[array of object]{.type-label}
- **`UseGuidedFailureModeByDefault`** :span[boolean]{.type-label}

:::api-example{label="Response"}
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
:::

## Run the published version of this Runbook

:span[POST]{.api-post} `/api/{spaceId}/runbooks/{runbookId}/run`

Also reachable at `/api/runbooks/{runbookId}/run`, `/api/spaces/{spaceIdentifier}/runbooks/{runbookId}/run`.

**Path Parameters**

- **`runbookId`** :span[string]{.type-label} *(required)*  
  ID of the runbook to run.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`ChangeRequestSettings`** :span[array of object]{.type-label}  
  Change Request Settings.
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Comments`** :span[string]{.type-label}  
  Any additional information/context.
- **`DebugMode`** :span[string]{.type-label}  
  If set to true contributes the OctopusPrintVariables and OctopusPrintEvaluatedVariables variables to the runbook run.
- **`EnvironmentId`** :span[string]{.type-label}  
  Legacy single-environment field; prefer EnvironmentIds. If set, this environment is added to the ones the runbook runs in. At least one of EnvironmentIds or EnvironmentId is required.
- **`EnvironmentIds`** :span[array of string]{.type-label}  
  The environments to run the runbook in — the preferred way to specify targets, one run per environment. At least one of EnvironmentIds or EnvironmentId is required.
- **`ExcludedMachineIds`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be excluded from the runbook run.
- **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
  A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`FailTargetDiscovery`** :span[boolean]{.type-label}  
  Whether to skip or fail cloud discovery steps with no matching target (default false).
- **`ForcePackageDownload`** :span[boolean]{.type-label}  
  Whether to force downloading of already installed packages (flag, default false).
- **`FormValues`** :span[object]{.type-label}  
  Variables.
- **`Priority`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}  
  ID of the project that the runbook belongs to.
- **`QueueTime`** :span[string]{.type-label}  
  The time to execute the runbook run. Format `date-time`.
- **`QueueTimeExpiry`** :span[string]{.type-label}  
  The time at which the runbook run will timeout if it has not started executing. Format `date-time`.
- **`RunbookId`** :span[string]{.type-label} *(required)*  
  ID of the runbook to run.
- **`RunbookSnapshotNameOrId`** :span[string]{.type-label}  
  Name or ID of a specific snapshot to run. Leave unset to run the published snapshot; when you set this, also set UseDefaultSnapshot to false.
- **`SkipActions`** :span[array of string]{.type-label}  
  Actions that are to be skipped for this runbook.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`SpecificMachineIds`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that the runbook should be run on. If the collection is empty, all enabled machines are used.
- **`SpecificTargetTagIds`** :span[array of string]{.type-label}  
  A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`TenantId`** :span[string]{.type-label}  
  Legacy single-tenant field; prefer TenantIds. If set, this tenant is added to the ones the runbook runs for.
- **`TenantIds`** :span[array of string]{.type-label}  
  The tenants to run the runbook for — the preferred way to specify tenants, creating one run per environment/tenant combination. Leave empty for an untenanted run.
- **`TenantTagNames`** :span[array of string]{.type-label}  
  The tenant tags to filter tenants to run the runbook.
- **`UseDefaultSnapshot`** :span[boolean]{.type-label}  
  Whether to run the runbook's published (default) snapshot. Leave true to run the published snapshot; set to false when you name a specific snapshot in RunbookSnapshotNameOrId.
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, the runbook will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

:::api-example{label="Request"}
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
:::

**Response**

`200` — OK

## Get all of the information necessary for creating or editing a Snapshot for a Runbook

:span[GET]{.api-get} `/api/{spaceId}/runbooks/{runbookId}/runbookSnapshotTemplate`

Also reachable at `/api/runbooks/{runbookId}/runbookSnapshotTemplate`, `/api/spaces/{spaceIdentifier}/runbooks/{runbookId}/runbookSnapshotTemplate`.

**Path Parameters**

- **`runbookId`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`projectId`** :span[string]{.type-label}  
  Project Id of the project containing the runbook.

**Response**

`200` — Confirmation that a new Runbook Snapshot Template has been created, containing the template

- **`GitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`DefaultBranch`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FilePathFilters`** :span[array of string]{.type-label}
  - **`GitCredentialId`** :span[string]{.type-label}
  - **`GitHubConnectionId`** :span[string]{.type-label}
  - **`GitResourceSelectedLastRelease`** :span[object]{.type-label}
  - **`IsResolvable`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`RepositoryUri`** :span[string]{.type-label}  
    Minimum length 1.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NextNameIncrement`** :span[string]{.type-label}
- **`Packages`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`FeedId`** :span[string]{.type-label}
  - **`FeedName`** :span[string]{.type-label}
  - **`FixedVersion`** :span[string]{.type-label}
  - **`IsResolvable`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the PackageId or FeedId contain no references to other variables. Variables can be used to select different NuGet feeds or packages at deployment time, however, this means that it's not possible to resolve which feed/package to search when creating a release.
  - **`NuGetFeedId`** :span[string]{.type-label}
  - **`NuGetFeedName`** :span[string]{.type-label}
  - **`NuGetPackageId`** :span[string]{.type-label}
  - **`PackageId`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`VersionSelectedLastRelease`** :span[string]{.type-label}
- **`RunbookId`** :span[string]{.type-label}
- **`RunbookProcessId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::
