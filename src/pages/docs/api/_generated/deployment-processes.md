---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deployment Processes
---

## List all the deployment processes

:endpoint{method="GET" path="/api/\{spaceId\}/deploymentprocesses"}

Also reachable at `/api/deploymentprocesses`, `/api/spaces/{spaceIdentifier}/deploymentprocesses`.

Lists all the deployment processes in the supplied Octopus Deploy Space, sorted by Id.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  A list of DeploymentProcess IDs, to limit the matching of DeploymentProcesses to those with a particular ID. Example: ["deploymentprocess-Projects-1", "deploymentprocess-Projects-2"].
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Deployment Processes

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
      "ProjectId": "Projects-1",
      "SpaceId": "Spaces-1",
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

## Get a Release Snapshot Template

:endpoint{method="GET" path="/api/\{spaceId\}/deploymentprocesses/\{deploymentProcessId\}/template"}

Also reachable at `/api/deploymentprocesses/{deploymentProcessId}/template`, `/api/spaces/{spaceIdentifier}/deploymentprocesses/{deploymentProcessId}/template`.

**Path Parameters**

- **`deploymentProcessId`** :span[string]{.type-label} *(required)*  
  The ID of the Deployment Process to use.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`channel`** :span[string]{.type-label}  
  The channel ID to get the channel from.
- **`releaseId`** :span[string]{.type-label}  
  The ID of the release to get variables from.

**Response**

`200` — The requested Release Template.

- **`DeploymentProcessId`** :span[string]{.type-label}
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
- **`LastReleaseVersion`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NextVersionIncrement`** :span[string]{.type-label}
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
- **`VersioningPackageReferenceName`** :span[string]{.type-label}
- **`VersioningPackageStepName`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a specific snapshotted version of a deployment process

:endpoint{method="GET" path="/api/\{spaceId\}/deploymentprocesses/\{id\}"}

Also reachable at `/api/deploymentprocesses/{id}`, `/api/spaces/{spaceIdentifier}/deploymentprocesses/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the snapshotted deployment process, for example "deploymentprocess-Projects-1-s-4-ABCDE".
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Get a specific snapshotted version of a deployment process

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
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
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

## Get the deployment process for a project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/deploymentprocesses"}

Also reachable at `/api/projects/{projectId}/deploymentprocesses`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentprocesses`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Contains the deployment process for a project

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
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
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

## Modify a deployment process

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}/deploymentprocesses"}

Also reachable at `/api/projects/{projectId}/deploymentprocesses`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentprocesses`.

Modifies a deployment process. Only allowed for deployment processes owned by a project (cannot be used to change the deployment process owned by a release).

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChangeDescription`** :span[string]{.type-label}
- **`LastSnapshotId`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Steps`** :span[array of object]{.type-label} *(required)*
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
  "LastSnapshotId": "string",
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
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

`200` — Confirmation that the Deployment Process has been modified, containing the new Process

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
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
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

## Get the resolved deployment process for a project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/deploymentprocesses/resolved"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentprocesses/resolved`.

This request returns the deployment process with all process template usages resolved out to the deployment steps that are executed. If a process template usage cannot be resolved (e.g. if the process template is no longer shared with the space), the usage will be excluded from the response.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The deployment process for a project

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
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
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

## Get all of the information necessary for creating or editing a release using this deployment process

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/deploymentprocesses/template"}

Also reachable at `/api/projects/{projectId}/deploymentprocesses/template`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentprocesses/template`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the Project to use.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`channel`** :span[string]{.type-label}  
  The channel ID to get the channel from.
- **`releaseId`** :span[string]{.type-label}  
  The ID of the release to get variables from.

**Response**

`200` — The requested Release Template

- **`DeploymentProcessId`** :span[string]{.type-label}
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
- **`LastReleaseVersion`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NextVersionIncrement`** :span[string]{.type-label}
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
- **`VersioningPackageReferenceName`** :span[string]{.type-label}
- **`VersioningPackageStepName`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Validate the deployment process for common non-blocking issues, such as missing deployment targets for tags used within the process steps

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/deploymentprocesses/validate"}

Also reachable at `/api/projects/{projectId}/deploymentprocesses/validate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentprocesses/validate`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Contains the result of validation, such as warnings for the deployment process

- **`Details`** :span[object]{.type-label}
- **`HasWarnings`** :span[boolean]{.type-label}
- **`TagsWithoutTargetsByStepId`** :span[object]{.type-label}

:::api-example{label="Response"}
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
:::

## Get the deployment process for a version-controlled project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/deploymentprocesses"}

Also reachable at `/api/projects/{projectId}/{gitRef}/deploymentprocesses`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentprocesses`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Contains the deployment process for a project

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
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
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

## Modify a deployment process

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/deploymentprocesses"}

Also reachable at `/api/projects/{projectId}/{gitRef}/deploymentprocesses`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentprocesses`.

Modifies a deployment process. Only allowed for deployment processes owned by a project (cannot be used to change the deployment process owned by a release).

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChangeDescription`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label} *(required)*
- **`LastSnapshotId`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Steps`** :span[array of object]{.type-label} *(required)*
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
  "LastSnapshotId": "string",
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
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

`200` — Confirmation that the Deployment Process has been modified, containing the new Process

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
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
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

## Get the resolved deployment process for a version-controlled project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/deploymentprocesses/resolved"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentprocesses/resolved`.

This request returns the deployment process with all process template usages resolved out to the deployment steps that are executed. If a process template usage cannot be resolved (e.g. if the process template is no longer shared with the space), the usage will be excluded from the response.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The deployment process for a project

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
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
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

## Get all of the information necessary for creating or editing a release using this deployment process

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/deploymentprocesses/template"}

Also reachable at `/api/projects/{projectId}/{gitRef}/deploymentprocesses/template`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentprocesses/template`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*  
  GitRef for the project variables.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the Project to use.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`channel`** :span[string]{.type-label}  
  The channel ID to get the channel from.
- **`releaseId`** :span[string]{.type-label}  
  The ID of the release to get variables from.

**Response**

`200` — The requested Release Template

- **`DeploymentProcessId`** :span[string]{.type-label}
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
- **`LastReleaseVersion`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NextVersionIncrement`** :span[string]{.type-label}
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
- **`VersioningPackageReferenceName`** :span[string]{.type-label}
- **`VersioningPackageStepName`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Validate the deployment process for common non-blocking issues, such as missing deployment targets for tags used within the process steps

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/deploymentprocesses/validate"}

Also reachable at `/api/projects/{projectId}/{gitRef}/deploymentprocesses/validate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentprocesses/validate`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Contains the result of validation, such as warnings for the deployment process

- **`Details`** :span[object]{.type-label}
- **`HasWarnings`** :span[boolean]{.type-label}
- **`TagsWithoutTargetsByStepId`** :span[object]{.type-label}

:::api-example{label="Response"}
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
:::

## Modify a deployment process

:endpoint{method="PUT" path="/api/\{spaceId\}/deploymentprocesses/\{id\}" deprecated=true}

Also reachable at `/api/deploymentprocesses/{id}`, `/api/spaces/{spaceIdentifier}/deploymentprocesses/{id}`.

:::div{.warning}
**Deprecated.** This endpoint may be removed in a future release.
:::

Modifies a deployment process. Only allowed for deployment processes owned by a project (cannot be used to change the deployment process owned by a release).

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the deployment process to update. Example `deploymentprocess-Projects-1`.
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
- **`SpaceId`** :span[string]{.type-label}
- **`Steps`** :span[array of object]{.type-label} *(required)*
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
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
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

`200` — Success

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
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
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
