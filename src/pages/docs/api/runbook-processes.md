---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Runbook Processes
---

## Get a list of Runbook Processes

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/runbookProcesses"}

Also reachable at `/api/projects/{projectId}/runbookProcesses`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookProcesses`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project containing the Runbook Processes.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Returns the Runbook Processes

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastSnapshotId`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectId`** :span[string]{.type-label}
  - **`RunbookId`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`Steps`** :span[array of object]{.type-label}
  - **`Version`** :span[integer]{.type-label}
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
:::

## Get the runbook process for the given ID

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/runbookProcesses/\{id\}"}

Also reachable at `/api/projects/{projectId}/runbookProcesses/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookProcesses/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the runbook process to retrieve.
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Returns the Runbook Process

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`RunbookId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
:::

## Modify a Runbook Process

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}/runbookProcesses/\{id\}"}

Also reachable at `/api/projects/{projectId}/runbookProcesses/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookProcesses/{id}`.

Only allowed for Runbook Processes owned by a project.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Gets or sets a unique identifier for this resource.
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`RunbookId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** :span[integer]{.type-label} *(required)*

:::api-example{label="Request"}
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
:::

**Response**

`200` — Confirmation that the Runbook Process has been modified, containing the updated Process

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`RunbookId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
:::

## Get all of the information necessary for creating or editing a Runbook Snapshot using this Runbook Process

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/runbookProcesses/\{id\}/runbookSnapshotTemplate"}

Also reachable at `/api/projects/{projectId}/runbookProcesses/{id}/runbookSnapshotTemplate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookProcesses/{id}/runbookSnapshotTemplate`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Runbook Process.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project containing this resource. Will be inferred if not provided.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Runbook Process Snapshot Template

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

## Get the runbook process for the given ID

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/runbookProcesses/\{id\}"}

Also reachable at `/api/projects/{projectId}/{gitRef}/runbookProcesses/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbookProcesses/{id}`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*  
  The Git ref to read the runbook process from.
- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the runbook process to retrieve.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project the runbook process belongs to.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Returns the Runbook Process

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`RunbookId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
:::

## Modify a Runbook Process

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/runbookProcesses/\{id\}"}

Also reachable at `/api/projects/{projectId}/{gitRef}/runbookProcesses/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbookProcesses/{id}`.

Only allowed for Runbook Processes owned by a project.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*  
  The GitRef containing the resource(s).
- **`id`** :span[string]{.type-label} *(required)*  
  Gets or sets a unique identifier for this resource.
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChangeDescription`** :span[string]{.type-label}  
  The commit message for updating the Git repository.
- **`GitRef`** :span[string]{.type-label} *(required)*  
  The GitRef containing the resource(s).
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`RunbookId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** :span[integer]{.type-label} *(required)*

:::api-example{label="Request"}
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
:::

**Response**

`200` — Confirmation that the Runbook Process has been modified, containing the updated Process

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`RunbookId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a list of Runbook Processes

:endpoint{method="GET" path="/api/\{spaceId\}/runbookProcesses"}

Also reachable at `/api/runbookProcesses`, `/api/spaces/{spaceIdentifier}/runbookProcesses`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Returns the Runbook Processes

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastSnapshotId`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectId`** :span[string]{.type-label}
  - **`RunbookId`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`Steps`** :span[array of object]{.type-label}
  - **`Version`** :span[integer]{.type-label}
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
:::

## Get the runbook process for the given ID

:endpoint{method="GET" path="/api/\{spaceId\}/runbookProcesses/\{id\}"}

Also reachable at `/api/runbookProcesses/{id}`, `/api/spaces/{spaceIdentifier}/runbookProcesses/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the runbook process to retrieve.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Returns the Runbook Process

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`RunbookId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
:::

## Modify a Runbook Process

:endpoint{method="PUT" path="/api/\{spaceId\}/runbookProcesses/\{id\}"}

Also reachable at `/api/runbookProcesses/{id}`, `/api/spaces/{spaceIdentifier}/runbookProcesses/{id}`.

Only allowed for Runbook Processes owned by a project.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Gets or sets a unique identifier for this resource.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`RunbookId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** :span[integer]{.type-label} *(required)*

:::api-example{label="Request"}
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
:::

**Response**

`200` — Confirmation that the Runbook Process has been modified, containing the updated Process

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`RunbookId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
:::

## Get all of the information necessary for creating or editing a Runbook Snapshot using this Runbook Process

:endpoint{method="GET" path="/api/\{spaceId\}/runbookProcesses/\{id\}/runbookSnapshotTemplate"}

Also reachable at `/api/runbookProcesses/{id}/runbookSnapshotTemplate`, `/api/spaces/{spaceIdentifier}/runbookProcesses/{id}/runbookSnapshotTemplate`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Runbook Process.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`projectId`** :span[string]{.type-label}  
  The ID of the project containing this resource. Will be inferred if not provided.

**Response**

`200` — The requested Runbook Process Snapshot Template

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
