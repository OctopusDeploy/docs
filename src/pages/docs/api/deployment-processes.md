---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deployment Processes
---

## Lists all the deployment processes

`GET` `/api/{spaceId}/deploymentprocesses`

Also reachable at `/api/deploymentprocesses`, `/api/spaces/{spaceIdentifier}/deploymentprocesses`.

Lists all the deployment processes in the supplied Octopus Deploy Space, sorted by Id.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — A list of DeploymentProcess IDs, to limit the matching of DeploymentProcesses to those with a particular ID. Example: ["deploymentprocess-Projects-1", "deploymentprocess-Projects-2"].
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Deployment Processes

`DeploymentProcessResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastSnapshotId`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectId`** <span class="type-label">string</span>
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

## Get a Release Snapshot Template

`GET` `/api/{spaceId}/deploymentprocesses/{deploymentProcessId}/template`

Also reachable at `/api/deploymentprocesses/{deploymentProcessId}/template`, `/api/spaces/{spaceIdentifier}/deploymentprocesses/{deploymentProcessId}/template`.

**Parameters**

- **`deploymentProcessId`** <span class="type-label">string</span> *(required)* — The ID of the Deployment Process to use.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`channel`** <span class="type-label">string</span> — The channel ID to get the channel from.
- **`releaseId`** <span class="type-label">string</span> — The ID of the release to get variables from.

**Response**

`200` — The requested Release Template.

`ReleaseTemplateResource`.

- **`DeploymentProcessId`** <span class="type-label">string</span>
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
- **`LastReleaseVersion`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NextVersionIncrement`** <span class="type-label">string</span>
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
- **`VersioningPackageReferenceName`** <span class="type-label">string</span>
- **`VersioningPackageStepName`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "DeploymentProcessId": "string",
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
  "LastReleaseVersion": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NextVersionIncrement": "string",
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
  "VersioningPackageReferenceName": "string",
  "VersioningPackageStepName": "string"
}
```
</div>

## Gets a specific snapshotted version of a deployment process

`GET` `/api/{spaceId}/deploymentprocesses/{id}`

Also reachable at `/api/deploymentprocesses/{id}`, `/api/spaces/{spaceIdentifier}/deploymentprocesses/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the snapshotted deployment process, for example "deploymentprocess-Projects-1-s-4-ABCDE".
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Gets a specific snapshotted version of a deployment process

`DeploymentProcessResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
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

## Modifies a deployment process

`PUT` `/api/{spaceId}/deploymentprocesses/{id}`

Also reachable at `/api/deploymentprocesses/{id}`, `/api/spaces/{spaceIdentifier}/deploymentprocesses/{id}`.

**Deprecated.** This endpoint may be removed in a future release.

Modifies a deployment process. Only allowed for deployment processes owned by a project (cannot be used to change the deployment process owned by a release).

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the deployment process to update. Example `deploymentprocess-Projects-1`.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`DeploymentProcessResource`

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Steps`** <span class="type-label">array of object</span> *(required)*
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

`200` — Success

`DeploymentProcessResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
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

## Gets the deployment process for a project

`GET` `/api/{spaceId}/projects/{projectId}/deploymentprocesses`

Also reachable at `/api/projects/{projectId}/deploymentprocesses`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentprocesses`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Contains the deployment process for a project

`DeploymentProcessResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
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

## Modifies a deployment process

`PUT` `/api/{spaceId}/projects/{projectId}/deploymentprocesses`

Also reachable at `/api/projects/{projectId}/deploymentprocesses`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentprocesses`.

Modifies a deployment process. Only allowed for deployment processes owned by a project (cannot be used to change the deployment process owned by a release).

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyDeploymentProcessInDatabaseCommand`

- **`ChangeDescription`** <span class="type-label">string</span>
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`Steps`** <span class="type-label">array of object</span> *(required)*
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
  "LastSnapshotId": "string",
  "ProjectId": "string",
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

`200` — Confirmation that the Deployment Process has been modified, containing the new Process

`DeploymentProcessResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
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

## Gets the resolved deployment process for a project

`GET` `/api/{spaceId}/projects/{projectId}/deploymentprocesses/resolved`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentprocesses/resolved`.

This request returns the deployment process with all process template usages resolved out to the deployment steps that are executed. If a process template usage cannot be resolved (e.g. if the process template is no longer shared with the space), the usage will be excluded from the response.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The deployment process for a project

`DeploymentProcessResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
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

## Gets all of the information necessary for creating or editing a release using this deployment process

`GET` `/api/{spaceId}/projects/{projectId}/deploymentprocesses/template`

Also reachable at `/api/projects/{projectId}/deploymentprocesses/template`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentprocesses/template`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the Project to use.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`channel`** <span class="type-label">string</span> — The channel ID to get the channel from.
- **`releaseId`** <span class="type-label">string</span> — The ID of the release to get variables from.

**Response**

`200` — The requested Release Template

`ReleaseTemplateResource`.

- **`DeploymentProcessId`** <span class="type-label">string</span>
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
- **`LastReleaseVersion`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NextVersionIncrement`** <span class="type-label">string</span>
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
- **`VersioningPackageReferenceName`** <span class="type-label">string</span>
- **`VersioningPackageStepName`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "DeploymentProcessId": "string",
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
  "LastReleaseVersion": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NextVersionIncrement": "string",
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
  "VersioningPackageReferenceName": "string",
  "VersioningPackageStepName": "string"
}
```
</div>

## Validates the deployment process for common non-blocking issues, such as missing deployment targets for tags used within the process steps

`POST` `/api/{spaceId}/projects/{projectId}/deploymentprocesses/validate`

Also reachable at `/api/projects/{projectId}/deploymentprocesses/validate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentprocesses/validate`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Contains the result of validation, such as warnings for the deployment process

`ValidateDeploymentProcessInDatabaseResponse`.

- **`Details`** <span class="type-label">object</span>
- **`HasWarnings`** <span class="type-label">boolean</span>
- **`TagsWithoutTargetsByStepId`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "Details": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "HasWarnings": true,
  "TagsWithoutTargetsByStepId": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  }
}
```
</div>

## Gets the deployment process for a version-controlled project

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/deploymentprocesses`

Also reachable at `/api/projects/{projectId}/{gitRef}/deploymentprocesses`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentprocesses`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Contains the deployment process for a project

`DeploymentProcessResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
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

## Modifies a deployment process

`PUT` `/api/{spaceId}/projects/{projectId}/{gitRef}/deploymentprocesses`

Also reachable at `/api/projects/{projectId}/{gitRef}/deploymentprocesses`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentprocesses`.

Modifies a deployment process. Only allowed for deployment processes owned by a project (cannot be used to change the deployment process owned by a release).

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyDeploymentProcessInGitCommand`

- **`ChangeDescription`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`Steps`** <span class="type-label">array of object</span> *(required)*
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
  "LastSnapshotId": "string",
  "ProjectId": "string",
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

`200` — Confirmation that the Deployment Process has been modified, containing the new Process

`DeploymentProcessResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
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

## Gets the resolved deployment process for a version-controlled project

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/deploymentprocesses/resolved`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentprocesses/resolved`.

This request returns the deployment process with all process template usages resolved out to the deployment steps that are executed. If a process template usage cannot be resolved (e.g. if the process template is no longer shared with the space), the usage will be excluded from the response.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The deployment process for a project

`DeploymentProcessResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastSnapshotId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
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

## Gets all of the information necessary for creating or editing a release using this deployment process

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/deploymentprocesses/template`

Also reachable at `/api/projects/{projectId}/{gitRef}/deploymentprocesses/template`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentprocesses/template`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)* — GitRef for the project variables.
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the Project to use.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`channel`** <span class="type-label">string</span> — The channel ID to get the channel from.
- **`releaseId`** <span class="type-label">string</span> — The ID of the release to get variables from.

**Response**

`200` — The requested Release Template

`ReleaseTemplateResource`.

- **`DeploymentProcessId`** <span class="type-label">string</span>
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
- **`LastReleaseVersion`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NextVersionIncrement`** <span class="type-label">string</span>
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
- **`VersioningPackageReferenceName`** <span class="type-label">string</span>
- **`VersioningPackageStepName`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "DeploymentProcessId": "string",
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
  "LastReleaseVersion": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NextVersionIncrement": "string",
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
  "VersioningPackageReferenceName": "string",
  "VersioningPackageStepName": "string"
}
```
</div>

## Validates the deployment process for common non-blocking issues, such as missing deployment targets for tags used within the process steps

`POST` `/api/{spaceId}/projects/{projectId}/{gitRef}/deploymentprocesses/validate`

Also reachable at `/api/projects/{projectId}/{gitRef}/deploymentprocesses/validate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentprocesses/validate`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Contains the result of validation, such as warnings for the deployment process

`ValidateDeploymentProcessInGitResponse`.

- **`Details`** <span class="type-label">object</span>
- **`HasWarnings`** <span class="type-label">boolean</span>
- **`TagsWithoutTargetsByStepId`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "Details": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "HasWarnings": true,
  "TagsWithoutTargetsByStepId": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  }
}
```
</div>
