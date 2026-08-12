---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Runbook Processes
---

## Get a list of Runbook Processes

`GET` `/api/{spaceId}/projects/{projectId}/runbookProcesses`

Also reachable at `/api/projects/{projectId}/runbookProcesses`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookProcesses`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project containing the Runbook Processes.
- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Returns the Runbook Processes

`RunbookProcessResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastSnapshotId`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectId`** <span class="type-label">string</span>
  - **`RunbookId`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Steps`** <span class="type-label">array of object</span>
  - **`Version`** <span class="type-label">integer</span>
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
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "LastSnapshotId": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "RunbookId": "string",
      "SpaceId": "string",
      "Steps": [
        {}
      ],
      "Version": 0
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

## Get the runbook process for the given ID

`GET` `/api/{spaceId}/projects/{projectId}/runbookProcesses/{id}`

Also reachable at `/api/projects/{projectId}/runbookProcesses/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookProcesses/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the runbook process to retrieve.
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Returns the Runbook Process

`RunbookProcessResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
- **`RunbookId`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Steps`** <span class="type-label">array of object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Condition`** <span class="type-label">enum</span> — Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PackageRequirement`** <span class="type-label">enum</span> — Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`StartTrigger`** <span class="type-label">enum</span> — Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** <span class="type-label">string</span> — Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastSnapshotId": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "string",
  "RunbookId": "string",
  "SpaceId": "string",
  "Steps": [
    {
      "Actions": [
        {}
      ],
      "Condition": "Success",
      "Id": "string",
      "Name": "string",
      "PackageRequirement": "LetOctopusDecide",
      "Properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "Slug": "string",
      "StartTrigger": "StartAfterPrevious",
      "Type": "string"
    }
  ],
  "Version": 0
}
```
</div>

## Modifies a Runbook Process

`PUT` `/api/{spaceId}/projects/{projectId}/runbookProcesses/{id}`

Also reachable at `/api/projects/{projectId}/runbookProcesses/{id}`, `/api/runbookProcesses/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookProcesses/{id}`, `/api/spaces/{spaceIdentifier}/runbookProcesses/{id}`, `/api/{spaceId}/runbookProcesses/{id}`.

Only allowed for Runbook Processes owned by a project.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Gets or sets a unique identifier for this resource.
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyRunbookProcessInDatabaseCommand`

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
- **`RunbookId`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Steps`** <span class="type-label">array of object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Condition`** <span class="type-label">enum</span> — Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`PackageRequirement`** <span class="type-label">enum</span> — Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`StartTrigger`** <span class="type-label">enum</span> — Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** <span class="type-label">string</span> — Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** <span class="type-label">integer</span> *(required)*

<div data-example="Request">

```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastSnapshotId": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "string",
  "RunbookId": "string",
  "SpaceId": "string",
  "Steps": [
    {
      "Actions": [
        {}
      ],
      "Condition": "Success",
      "Id": "string",
      "Name": "string",
      "PackageRequirement": "LetOctopusDecide",
      "Properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "Slug": "string",
      "StartTrigger": "StartAfterPrevious",
      "Type": "string"
    }
  ],
  "Version": 0
}
```
</div>

**Response**

`200` — Confirmation that the Runbook Process has been modified, containing the updated Process

`RunbookProcessResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
- **`RunbookId`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Steps`** <span class="type-label">array of object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Condition`** <span class="type-label">enum</span> — Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PackageRequirement`** <span class="type-label">enum</span> — Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`StartTrigger`** <span class="type-label">enum</span> — Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** <span class="type-label">string</span> — Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastSnapshotId": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "string",
  "RunbookId": "string",
  "SpaceId": "string",
  "Steps": [
    {
      "Actions": [
        {}
      ],
      "Condition": "Success",
      "Id": "string",
      "Name": "string",
      "PackageRequirement": "LetOctopusDecide",
      "Properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "Slug": "string",
      "StartTrigger": "StartAfterPrevious",
      "Type": "string"
    }
  ],
  "Version": 0
}
```
</div>

## Gets all of the information necessary for creating or editing a Runbook Snapshot using this Runbook Process

`GET` `/api/{spaceId}/projects/{projectId}/runbookProcesses/{id}/runbookSnapshotTemplate`

Also reachable at `/api/projects/{projectId}/runbookProcesses/{id}/runbookSnapshotTemplate`, `/api/runbookProcesses/{id}/runbookSnapshotTemplate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookProcesses/{id}/runbookSnapshotTemplate`, `/api/spaces/{spaceIdentifier}/runbookProcesses/{id}/runbookSnapshotTemplate`, `/api/{spaceId}/runbookProcesses/{id}/runbookSnapshotTemplate`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Runbook Process.
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project containing this resource. Will be inferred if not provided.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Runbook Process Snapshot Template

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

## Get the runbook process for the given ID

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbookProcesses/{id}`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbookProcesses/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbookProcesses/{id}`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)* — The Git ref to read the runbook process from.
- **`id`** <span class="type-label">string</span> *(required)* — The ID of the runbook process to retrieve.
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project the runbook process belongs to.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Returns the Runbook Process

`RunbookProcessResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
- **`RunbookId`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Steps`** <span class="type-label">array of object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Condition`** <span class="type-label">enum</span> — Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PackageRequirement`** <span class="type-label">enum</span> — Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`StartTrigger`** <span class="type-label">enum</span> — Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** <span class="type-label">string</span> — Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastSnapshotId": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "string",
  "RunbookId": "string",
  "SpaceId": "string",
  "Steps": [
    {
      "Actions": [
        {}
      ],
      "Condition": "Success",
      "Id": "string",
      "Name": "string",
      "PackageRequirement": "LetOctopusDecide",
      "Properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "Slug": "string",
      "StartTrigger": "StartAfterPrevious",
      "Type": "string"
    }
  ],
  "Version": 0
}
```
</div>

## Modifies a Runbook Process

`PUT` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbookProcesses/{id}`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbookProcesses/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbookProcesses/{id}`.

Only allowed for Runbook Processes owned by a project.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)* — The GitRef containing the resource(s).
- **`id`** <span class="type-label">string</span> *(required)* — Gets or sets a unique identifier for this resource.
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyRunbookProcessInGitCommand`

- **`ChangeDescription`** <span class="type-label">string</span> — The commit message for updating the Git repository.
- **`GitRef`** <span class="type-label">string</span> *(required)* — The GitRef containing the resource(s).
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
- **`RunbookId`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Steps`** <span class="type-label">array of object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Condition`** <span class="type-label">enum</span> — Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`PackageRequirement`** <span class="type-label">enum</span> — Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`StartTrigger`** <span class="type-label">enum</span> — Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** <span class="type-label">string</span> — Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** <span class="type-label">integer</span> *(required)*

<div data-example="Request">

```json
{
  "ChangeDescription": "string",
  "GitRef": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastSnapshotId": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "string",
  "RunbookId": "string",
  "SpaceId": "string",
  "Steps": [
    {
      "Actions": [
        {}
      ],
      "Condition": "Success",
      "Id": "string",
      "Name": "string",
      "PackageRequirement": "LetOctopusDecide",
      "Properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "Slug": "string",
      "StartTrigger": "StartAfterPrevious",
      "Type": "string"
    }
  ],
  "Version": 0
}
```
</div>

**Response**

`200` — Confirmation that the Runbook Process has been modified, containing the updated Process

`RunbookProcessResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
- **`RunbookId`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Steps`** <span class="type-label">array of object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Condition`** <span class="type-label">enum</span> — Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PackageRequirement`** <span class="type-label">enum</span> — Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`StartTrigger`** <span class="type-label">enum</span> — Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** <span class="type-label">string</span> — Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastSnapshotId": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "string",
  "RunbookId": "string",
  "SpaceId": "string",
  "Steps": [
    {
      "Actions": [
        {}
      ],
      "Condition": "Success",
      "Id": "string",
      "Name": "string",
      "PackageRequirement": "LetOctopusDecide",
      "Properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "Slug": "string",
      "StartTrigger": "StartAfterPrevious",
      "Type": "string"
    }
  ],
  "Version": 0
}
```
</div>

## Get a list of Runbook Processes

`GET` `/api/{spaceId}/runbookProcesses`

Also reachable at `/api/runbookProcesses`, `/api/spaces/{spaceIdentifier}/runbookProcesses`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Returns the Runbook Processes

`RunbookProcessResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastSnapshotId`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectId`** <span class="type-label">string</span>
  - **`RunbookId`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Steps`** <span class="type-label">array of object</span>
  - **`Version`** <span class="type-label">integer</span>
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
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "LastSnapshotId": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "RunbookId": "string",
      "SpaceId": "string",
      "Steps": [
        {}
      ],
      "Version": 0
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

## Get the runbook process for the given ID

`GET` `/api/{spaceId}/runbookProcesses/{id}`

Also reachable at `/api/runbookProcesses/{id}`, `/api/spaces/{spaceIdentifier}/runbookProcesses/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the runbook process to retrieve.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Returns the Runbook Process

`RunbookProcessResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
- **`RunbookId`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Steps`** <span class="type-label">array of object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Condition`** <span class="type-label">enum</span> — Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PackageRequirement`** <span class="type-label">enum</span> — Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`StartTrigger`** <span class="type-label">enum</span> — Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** <span class="type-label">string</span> — Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastSnapshotId": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "string",
  "RunbookId": "string",
  "SpaceId": "string",
  "Steps": [
    {
      "Actions": [
        {}
      ],
      "Condition": "Success",
      "Id": "string",
      "Name": "string",
      "PackageRequirement": "LetOctopusDecide",
      "Properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "Slug": "string",
      "StartTrigger": "StartAfterPrevious",
      "Type": "string"
    }
  ],
  "Version": 0
}
```
</div>
